const BRANCHES = { Torino: 1, Moncalieri: 2, Roma: 3 };
const BRANCHES_ID = {[BRANCHES.Torino]: "listOfTorinoAgents", [BRANCHES.Moncalieri]: "listOfMoncalieriAgents", [BRANCHES.Roma]: "listOfRomaAgents"};
document.addEventListener("DOMContentLoaded", async () => {
    initInternalTabs();
    await Promise.all([
        loadPackages(),
        loadList(BRANCHES.Torino),
        loadList(BRANCHES.Moncalieri),
        loadList(BRANCHES.Roma)
    ]);
});

async function loadPackages() {
    const ddlPackage = document.getElementById('ddlPackage');
    ddlPackage.innerHTML = '<option value="-1" selected disabled>Seleziona un pacchetto</option>';
    const response = await fetch('/api/packages');
    const r = await response.json();
    r.payload.forEach(el => { ddlPackage.innerHTML += `<option value="${el.id}">${el.name}</option>`; });
}

async function loadList(branch_id) {
    const list_id = BRANCHES_ID[branch_id];
    const response = await fetch("/api/agents?b=" + branch_id);
    const r = await response.json();
    new DevExpress.ui.dxDataGrid(document.getElementById(list_id), {
        dataSource: r.payload,
        columnAutoWidth: true,
        showBorders: true,
        noDataText: "Non risultano agenti inseriti in questa filiale",
        rowAlternationEnabled: false,
        grouping: { autoExpandAll: false },
        groupPanel: { visible: true, emptyPanelText: "Trascina qui le colonne per raggruppare" },
        filterRow: { visible: true, applyFilter: "auto" },
        headerFilter: { visible: true },
        columns: [
            {
                caption: "Nome Cognome",
                allowFiltering: true,
                calculateCellValue: function (data) { return data.name +' '+ data.surname; }
            },
            { dataField: "package_name", caption: "Pacchetto", allowFiltering: true },
            { dataField: "package_percentage", caption: "Commissioni", allowFiltering: true },
            { dataField: "package_fixed_cost", caption: "Costi fissi", allowFiltering: true },
            { dataField: "managed_properties", caption: "Proprietà in gestione", allowFiltering: true },
            { dataField: "properties_sold", caption: "Proprietà vendute", allowFiltering: true },
            { dataField: "total_sales", caption: "Totale vendite", allowFiltering: true },
            { dataField: "total_commissions", caption: "Totale commissioni", allowFiltering: true },
        ],
        remoteOperations: { paging: true, filtering: true, sorting: true },
        paging: { pageSize: 10 },
        pager: { showPageSizeSelector: true, allowedPageSizes: [5, 10, 20], showInfo: true },
        toolbar: {
            items: [
                "groupPanel",
                "searchPanel",
                {
                    location: "after",
                    widget: "dxButton",
                    options: {
                        icon: "add",
                        text: "Aggiungi Agente",
                        onClick: function () {
                            document.getElementById("spNewAgentResult").innerText = '';
                            const modalElement = document.getElementById("modalAddAgent");
                            const modal = new bootstrap.Modal(modalElement);
                            modal.show();
                            preSelectLocation();
                        },
                        elementAttr: { class: "btn-orange" }
                    }
                }
            ]
        },
        onRowClick: function (e) { if (e.rowType === "data") { window.location = `/agent/${e.data.id}`; } },
    });
}

async function saveAgent() {
    const btn = document.getElementById("btnSaveAgent");
    const spinner = document.getElementById("spinnerNewAgent");
    const firstName = document.getElementById("txtFirstName").value.trim();
    const lastName = document.getElementById("txtLastName").value.trim();
    const packageID = parseInt(document.getElementById("ddlPackage").value);
    const branchID = parseInt(document.getElementById("ddlLocation").value);
    const result = document.getElementById("spNewAgentResult");
    if (firstName === '' || lastName === "" || packageID === -1) {
        result.innerText = "Si prega di compilare tutti i campi richiesti";
        result.classList.remove("d-none");
        return;
    }
    btn.disabled = true;
    spinner.classList.remove("d-none");
    result.classList.add("d-none");
    result.innerText = "";
    try {
        const response = await fetch("/api/agent", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ "name": firstName, "surname": lastName, "package_id": packageID, "branch_id": branchID })
        });
        const res = await response.json();
        if (res.result) {
            await loadList(branchID);
            btn.disabled = true;
            spinner.classList.add("d-none");
            $("#modalAddAgent").modal("hide");
        } else {
            result.innerText = "Si sono verificati degli errori durante il salvataggio";
            btn.disabled = true;
            spinner.classList.remove("d-none");
            result.classList.remove("d-none");
        }
    } catch (error) {
        console.error(error.message);
        result.innerText = "Si è verificato un errore";
        btn.disabled = true;
        spinner.classList.remove("d-none");
        result.classList.remove("d-none");
    }
}

function preSelectLocation() {
    const parent = document.querySelector(".pai-tabs");
    const child = parent.querySelector(".active");
    switch (child.dataset.tab) {
        case 'tabContentTorino': document.getElementById('ddlLocation').value = BRANCHES.Torino; break;
        case 'tabContentMoncalieri': document.getElementById('ddlLocation').value = BRANCHES.Moncalieri; break;
        case 'tabContentRoma': document.getElementById('ddlLocation').value = BRANCHES.Roma; break;
    }
}