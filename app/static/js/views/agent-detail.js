let agentID = 0;
document.addEventListener("DOMContentLoaded", async () => {
    agentID = document.getElementById('hAgentId').value;
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
    const response = await fetch('/api/agent/' + agentID);
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
    const name = document.getElementById("txtFirstName").value.trim();
    const surname = document.getElementById("txtLastName").value.trim();
    const package = document.getElementById("ddlPackage").value;
    const email = document.getElementById("txtEmail").value.trim();
    const phone = document.getElementById("txtPhone").value.trim();
    const branch = document.getElementById("ddlLocation").value;
    let result = document.getElementById('errorMsgGen');
    result.innerText = '';
    if (!name || !surname || !package || !branch) {
        result.textContent = "Si prega di compilare tutti i campi obbligatori";
        result.classList.remove("d-none");
        return;
    }
    // TODO CHECK IF WE NEED THE EMAIL HERE AS THERE IS NO FIELD FOR IT IN DB...
    // if (!isValidEmail(email)) {
    //     result.textContent = "L'email fornita non risulta valida";
    //     result.classList.remove("d-none");
    //     return;
    // }
    if (!(result.classList.contains('d-none'))) result.classList.add("d-none");
    try {
        const response = await fetch("/api/agent/" + agentID + "/general-info", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "name": name, "surname": surname, "package_id": parseInt(package), "branch_id": parseInt(branch) })
        });
        const res = await response.json();
        if (res.result) {
            loadAgentDetail();
            cancelEditGeneralInfo();
        } else throw new Error("Error while updating the agent record!");
    } catch (error) {
        result.classList.remove("d-none");
        result.innerText = error.message !== undefined ? error.message : error;
    }

}

async function deleteAgentModal() {
    showDeleteConfirmationModal(async function (confirmed) {
        if (confirmed) {
            try {
                const response = await fetch("/api/agent/" + agentID, {
                    method: "DELETE"
                });
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

async function loadSoldPropertiesByAgent() {
    const data = [
        {
            "id": 1,
            "title": "Alfa SRL",
            "type": "Residential",
            "address": "Tecnologia",
            "surface_area": "Lombardia",
            "price": 5000,
            "commission": 5,
            "status": "Milano",
            "assigned_agent": "Milano",
            "publication_date": "22/1/2025",
            "sale_date": "22/1/2025",
            "payment_date": "22/1/2025",
            "sale_price": 5500,
            "seller": 'Rahat',
            "buyer": 'Sarti',
            "note": 'Property is sold',
        },
        {
            "id": 2,
            "title": "Rahatsol SMC",
            "type": "Rental",
            "address": "Tecnologia",
            "surface_area": "Lombardia",
            "price": 6000,
            "commission": 6,
            "status": "Milano",
            "assigned_agent": "Milano",
            "publication_date": "22/1/2025",
            "sale_date": "22/1/2025",
            "payment_date": "22/1/2025",
            "sale_price": 6500,
            "seller": 'Sarti',
            "buyer": 'Bourne',
            "note": 'Property is handed over',
        },
    ];
    loadPropertiesList(data);
}

function loadPropertiesList(data) {
    new DevExpress.ui.dxDataGrid(document.getElementById("listOfSoldProperties"), {
        dataSource: data,
        columnAutoWidth: true,
        showBorders: true,
        rowAlternationEnabled: false,
        grouping: { autoExpandAll: false },
        groupPanel: { visible: true, emptyPanelText: "Trascina qui le colonne per raggruppare" },
        filterRow: { visible: true, applyFilter: "auto" },
        headerFilter: { visible: true },
        columns: [
            {
                caption: "Data vendita",
                allowFiltering: true,
                calculateCellValue: function (data) {
                    return (data.sale_date).slice(3);
                }
            },
            {
                caption: "Provvigioni",
                allowFiltering: true,
                calculateCellValue: function (data) {
                    return formatNumber(data.commission);
                }
            },
            { dataField: "title", caption: "Immobile", allowFiltering: true },
            {
                caption: "Propr/Acquir", allowFiltering: true,
                calculateCellValue: function (data) {
                    return (data.seller + '/' + data.buyer);
                }
            },
            { dataField: "payment_date", caption: "Data pagamento", allowFiltering: true },
            { dataField: "note", caption: "Note", allowFiltering: true },
        ],
        paging: { pageSize: 10 },
        pager: { showPageSizeSelector: true, allowedPageSizes: [5, 10, 20], showInfo: true },
        toolbar: {
            items: [
                "groupPanel",
                "searchPanel",
            ]
        },
        onRowClick: function (e) {
            if (e.rowType === "data") {
                // window.location = `/property/${e.data.id}`; 
            }
        },
    });
}