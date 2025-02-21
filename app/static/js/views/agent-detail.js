document.addEventListener("DOMContentLoaded", async () => {
    await loadPackages();
    await Promise.all([
        loadAgentDetail(),
        loadSoldPropertiesByAgent()
    ]);
});

async function loadPackages() {
    const ddlPackage = document.getElementById('ddlPackage');
    ddlPackage.innerHTML = '<option value="-1" selected disabled>Seleziona un pacchetto</option>';
    const response = await fetch('/api/packages');
    const r = await response.json();
    r.payload.forEach(el => { ddlPackage.innerHTML += `<option value="${el.id}">${el.name}</option>`; });
}

async function loadAgentDetail() {
    const aid = document.getElementById("hAgentId").value;
    const response = await fetch('/api/agent/' + aid);
    const r = await response.json();
    document.getElementById("spFirstName").innerText = r.payload.name ?? "n.d.";
    document.getElementById("txtFirstName").value = r.payload.name ?? "n.d.";
    document.getElementById("spLastName").innerText = r.payload.surname ?? "n.d.";
    document.getElementById("txtLastName").value = r.payload.surname ?? "n.d.";
    document.getElementById("spPackage").innerText = r.payload.package_name ?? "n.d.";
    document.getElementById("ddlPackage").value = r.payload.package_id ?? "n.d.";
    document.getElementById("spEmail").innerText = r.payload.email ?? "n.d.";
    document.getElementById("txtEmail").value =r.payload.email ?? "n.d.";
    document.getElementById("spPhone").innerText = r.payload.phone ?? "n.d.";
    document.getElementById("txtPhone").value = r.payload.phone ?? "n.d.";
    document.getElementById("spLocation").innerText = r.payload.branch_name ?? "n.d.";
    document.getElementById("ddlLocation").value = r.payload.branch_id ?? 1;
}

function allowEditGeneralInfo() {
    const valueControls = document.querySelectorAll('.valueControl');
    const editControls = document.querySelectorAll('.editControl');
    valueControls.forEach(valueControl => valueControl.classList.add('d-none'));
    editControls.forEach(editControl => editControl.classList.remove('d-none'));
    document.getElementById("iconSaveEditGenericInfo").classList.remove('d-none');
    document.getElementById("iconCancelEditGenericInfo").classList.remove('d-none');
    document.getElementById("iconAllowEditGenericInfo").classList.add('d-none');
}

function cancelEditGeneralInfo() {
    const valueControls = document.querySelectorAll('.valueControl');
    const editControls = document.querySelectorAll('.editControl');
    valueControls.forEach(valueControl => valueControl.classList.remove('d-none'));
    editControls.forEach(editControl => editControl.classList.add('d-none'));
    document.getElementById("iconSaveEditGenericInfo").classList.add('d-none');
    document.getElementById("iconCancelEditGenericInfo").classList.add('d-none');
    document.getElementById("iconAllowEditGenericInfo").classList.remove('d-none');
}

async function updateGenericInfo() {
    const aid = document.getElementById("hAgentId").value;
    const name = document.getElementById("txtFirstName").value.trim();
    const surname = document.getElementById("txtLastName").value.trim();
    const package_id = parseInt(document.getElementById("ddlPackage").value);
    const email = document.getElementById("txtEmail").value.trim();
    const phone = document.getElementById("txtPhone").value.trim();
    const branch = parseInt(document.getElementById("ddlLocation").value);
    const err = document.getElementById('errEditAgent');
    err.innerText = '';
    if (name === "" || surname === "" || package_id <= 0 || branch < 0) {
        err.textContent = "Si prega di compilare tutti i campi obbligatori";
        return;
    }
    if (email !== "" && !isValidEmail(email)) {
        err.textContent = "L'email fornita non risulta valida";
        return;
    }
    try {
        const response = await fetch("/api/agent/" + aid + "/general-info", {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                name: name,
                surname: surname,
                package_id: package_id,
                phone:phone,
                email:email,
                branch_id: branch
            })
        });
        const res = await response.json();
        if (res.result) {
            await loadAgentDetail();
            cancelEditGeneralInfo();
        } else err.innerText = "Si sono verificati degli errori";
    } catch (error) {
        err.innerText = "Si sono verificati degli errori";
        console.error(error.message !== undefined ? error.message : error);
    }
}

async function deleteAgentModal() {
    showDeleteConfirmationModal(async function (confirmed) {
        if (confirmed) {
            try {
                const aid = document.getElementById("hAgentId").value;
                const response = await fetch("/api/agent/" + aid, {method: "DELETE" });
                const res = await response.json();
                if (res.result) {
                    const modalElement = document.getElementById("modalConfirmDelete");
                    modalElement.classList.remove("show");
                    modalElement.style.display = "none";
                    document.body.classList.remove("modal-open");
                    document.querySelector(".modal-backdrop")?.remove();
                    window.location = `/agents`;
                } else throw new Error("Error while deleting the agent!");
            } catch (error) {
                result.innerText = error.message !== undefined ? error.message : error;
            }
        }
    });
}

function showDeleteConfirmationModal(callback) {
    const modalElement = document.getElementById("modalConfirmDelete");
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
    const confirmButton = document.getElementById("btnConfirmDelete");
    confirmButton.removeEventListener("click", confirmButton.clickHandler);
    confirmButton.clickHandler = function (e) {
        e.stopPropagation();
        callback(true);
    };
    confirmButton.addEventListener("click", confirmButton.clickHandler);
}

function loadSoldPropertiesByAgent() {
    const data = [];
    const hasData = data.length > 0;
    new DevExpress.ui.dxDataGrid(document.getElementById("listOfReport"), {
        dataSource: data,
        columnAutoWidth: true,
        showBorders: true,
        rowAlternationEnabled: false,
        groupPanel: { visible: hasData, emptyPanelText: "Trascina qui le colonne per raggruppare" },
        filterRow: { visible: hasData, applyFilter: "auto" },
        headerFilter: { visible: hasData },
        columns: [
            {
                caption: "Data vendita",
                allowFiltering: true,
                calculateCellValue: function (data) { return (data.sale_date).slice(3); }
            },
            { dataField: "title", caption: "Immobile", allowFiltering: true },
            {
                caption: "Propr/Acquir", allowFiltering: true,
                calculateCellValue: function (data) {
                    return (data.seller + '/' + data.buyer);
                }
            },
            {
                caption: "Provvigioni",
                allowFiltering: true,
                calculateCellValue: function (data) { return formatNumber(data.commission); }
            },

            { dataField: "payment_date", caption: "Data pagamento", allowFiltering: true }
        ],
        paging: { pageSize: 10 },
        pager: { showPageSizeSelector: true, allowedPageSizes: [5, 10, 20], showInfo: true },

        onRowClick: function (e) {
            if (e.rowType === "data") {
                // window.location = `/property/${e.data.id}`; 
            }
        },
    });
}