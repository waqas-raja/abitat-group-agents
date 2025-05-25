let packageID = 0;
let linkedAgents = [];
document.addEventListener("DOMContentLoaded", async () => {
    packageID = parseInt(document.getElementById("hPackageId").value);
    await loadPackageDetail();
    await loadListOfLinkedAgent();
});

async function loadPackageDetail() {
    const response = await fetch('/api/package/' + packageID);
    const r = await response.json();
    document.getElementById("spPackageName").innerText = r.payload.name ?? "n.d.";
    document.getElementById("txtUpdateName").value = r.payload.name ?? "n.d.";
    document.getElementById("spPackageFixedCost").innerText = r.payload.fee ?? 0;
    document.getElementById("txtUpdateFixedFee").value = r.payload.fee ?? 0;
    document.getElementById("spPackagePercentage").innerText = r.payload.commission ?? 0;
    document.getElementById("txtUpdatePercentage").value = r.payload.commission ?? 0;
    document.getElementById("spPackageNote").innerText = r.payload.note ?? "n.d.";
    document.getElementById("txtUpdateDescription").value =r.payload.note ?? "n.d.";
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

async function loadListOfLinkedAgent() {
    const response = await fetch('/api/package/agents/' + packageID);
    const r = await response.json();
    linkedAgents = r.payload
    const hasData = r.payload.length > 0;
    new DevExpress.ui.dxDataGrid(document.getElementById("listOfLinkedAgents"), {
        dataSource: r.payload,
        columnAutoWidth: true,
        showBorders: true,
        rowAlternationEnabled: false,
        groupPanel: { visible: hasData, emptyPanelText: "Trascina qui le colonne per raggruppare" },
        filterRow: { visible: hasData, applyFilter: "auto" },
        headerFilter: { visible: hasData },
        columns: [
            { dataField: "id", caption: "ID", allowFiltering: true },
            {
                dataField: "name",
                caption: "Nome",
                allowFiltering: true,
                // calculateCellValue: function (data) { return (data.sale_date).slice(3); }
            },
            { dataField: "surname", caption: "Cognome", allowFiltering: true },
        ],
        paging: { pageSize: 10 },
        pager: { showPageSizeSelector: true, allowedPageSizes: [5, 10, 20], showInfo: true },

        onRowClick: function (e) {
            if (e.rowType === "data") {
                window.location = `/agent/${e.data.id}`;
            }
        },
    });
}

async function updatePackageInfo() {
    const name = document.getElementById("txtUpdateName").value.trim();
    const fee = document.getElementById("txtUpdateFixedFee").value.trim();
    const commission = document.getElementById("txtUpdatePercentage").value.trim();
    const description = document.getElementById("txtUpdateDescription").value.trim();
    const result = document.getElementById("errUpdatePackage");
    if (name === '' || fee === "" || commission === "") {
        result.innerText = "Si prega di compilare tutti i campi richiesti";
        result.classList.remove("d-none");
        return;
    }
    result.classList.add("d-none");
    result.innerText = "";
    try {
        const response = await fetch("/api/package/" + packageID, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "name": name, "fee": parseFloat(fee), "commission": parseFloat(commission), "note": description })
        });
        const res = await response.json();
        if (res.result) {
            await loadPackageDetail();
            cancelEditGeneralInfo();
        } else throw new Error("Something went wrong while updating package!");
    } catch (error) {
        result.classList.remove("d-none");
        result.innerText = error.message !== undefined ? error.message : error;
    }
}

async function deletePackageModal() {
    showDeleteConfirmationModal(async function (confirmed) {
        if (confirmed) {
            try {
                $('#modalConfirmDelete').modal('hide');
                if (linkedAgents.length > 0) {
                    const ddlPackage = document.getElementById('ddlSelectAlternatePackage');
                    ddlPackage.innerHTML = '<option value="-1" selected disabled>--Seleziona un pacchetto--</option>';
                    const response = await fetch('/api/packages');
                    const packages = await response.json();
                    packages.payload.forEach(el => { if (el.id !== packageID) ddlPackage.innerHTML += `<option value="${el.id}">${el.name}</option>`; });
                    $('#modalAlternatePackageSelection').modal('show');
                } else continuePackageDeletion();
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

async function continuePackageDeletion() {
    let result = false;
    const alternatePackageID = parseInt(document.getElementById('ddlSelectAlternatePackage').value);
    let resultDiv = document.getElementById('errorMessagePackageSelection');
    resultDiv.innerHTML = '';
    if (alternatePackageID !== undefined && alternatePackageID !== -1) {
        linkedAgents.forEach(async (agent) => {
            const response = await fetch(`/api/agent/${alternatePackageID}/alter-package`, {
                method: "PATCH",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ "agent_id": agent.id })
            });
            const res = await response.json();
            if (!res.result) result = true;
        })
    }
    if (!result) {
        const response = await fetch("/api/package/" + packageID, {method: "DELETE" });
        const res = await response.json();
        if (res.result) {
            $('#modalAlternatePackageSelection').modal('hide');
            window.location = '/packages';
        } else {
            resultDiv.innerHTML = "Qualcosa è andato storto durante l'eliminazione del pacchetto!";
            setTimeout(() => { $('#modalAlternatePackageSelection').modal('hide'); }, 5000);    
        }
    } else {
        resultDiv.innerHTML = "Qualcosa è andato storto durante l'eliminazione del pacchetto!";
        setTimeout(() => { $('#modalAlternatePackageSelection').modal('hide'); }, 5000);
    }
}