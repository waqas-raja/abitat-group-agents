const BRANCHES = { Torino: 1, Moncalieri: 2, Roma: 3 };
const BRANCHES_ID = { [BRANCHES.Torino]: "listOfTorinoAgents", [BRANCHES.Moncalieri]: "listOfMoncalieriAgents", [BRANCHES.Roma]: "listOfRomaAgents" };
document.addEventListener("DOMContentLoaded", async () => {
    initInternalTabs();
    showDataAsPerLoggedUser();
    await Promise.all([
        loadPackages(),
        loadList(BRANCHES.Torino),
        loadList(BRANCHES.Moncalieri),
        loadList(BRANCHES.Roma)
    ]);
});

function showDataAsPerLoggedUser() {
    if (localStorage.ulocation !== "null") {
        const tabs = document.querySelectorAll('.pai-tab');
        tabs.forEach((ele) => { ele.classList.add('visually-hidden'); });
        switch (parseInt(localStorage.ulocation)) {
            case BRANCHES.Torino: document.getElementById('tabTorino').classList.remove("visually-hidden"); break;
            case BRANCHES.Moncalieri: document.getElementById('tabMoncalieri').classList.remove("visually-hidden"); break;
            case BRANCHES.Roma: document.getElementById('tabRoma').classList.remove("visually-hidden"); break;
        }
    }
}

async function loadPackages() {
    const ddlPackage = document.getElementById('ddlPackage');
    ddlPackage.innerHTML = '<option value="-1" selected disabled>--Seleziona un pacchetto--</option>';
    const response = await fetch('/api/packages');
    const r = await response.json();
    r.payload.forEach(el => { ddlPackage.innerHTML += `<option value="${el.id}">${el.name}</option>`; });
}

async function loadList(branch_id) {
    const list_id = BRANCHES_ID[branch_id];
    const response = await fetch(`/api/agents?b=${branch_id}&f=${1}`);
    const r = await response.json();
    const hasData = r.payload.length > 0;
    new DevExpress.ui.dxDataGrid(document.getElementById(list_id), {
        dataSource: r.payload,
        columnAutoWidth: true,
        showBorders: true,
        noDataText: "Non risultano agenti inseriti in questa filiale",
        rowAlternationEnabled: false,
        grouping: { autoExpandAll: false },
        groupPanel: { visible: hasData, emptyPanelText: "Trascina qui le colonne per raggruppare" },
        searchPanel: { visible: hasData, highlightCaseSensitive: false, width:300 },
        headerFilter: { visible: false },
        columns: [
            {
                caption: "Nome Cognome",
                allowSearch:true,
                calculateCellValue: function (data) { return data.name + ' ' + data.surname; }
            },
            { dataField: "package_name", caption: "Pacchetto" },
            {
                dataField: "package_commission",
                caption: "Commissioni",
                allowFiltering: true,
                calculateCellValue: function (data) {
                    const val = parseFloat(data.package_commission);
                    if (isNaN(val)) return '';
                    return val.toFixed(2) + ' %';
                }
            },
            {
                dataField: "package_commission",
                caption: "Commissioni",
                allowFiltering: true,
                calculateCellValue: function (data) {
                    const value = parseFloat(data.package_fee);
                    if (isNaN(value)) return '';
                    return '€ ' + value.toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                }
            },
            {
                dataField: "package_fee",
                caption: "Costi fissi",
                allowFiltering: true,
                calculateCellValue: function (data) {
                    const value = parseFloat(data.package_fee);
                    if (isNaN(value)) return '';
                    return '€ ' + value.toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                }
            },
            { dataField: "managed_properties", caption: "Proprietà in gestione", alignment: "center" },
            { dataField: "properties_sold", caption: "Proprietà vendute", alignment: "center" },
            { dataField: "total_sales", caption: "Totale vendite", alignment: "center" },
            { dataField: "total_commissions", caption: "Totale commissioni", alignment: "center" },
            {
                dataField: "balance",
                caption: "Saldo",
                allowFiltering: true,
                calculateCellValue: function (data) {
                    const value = parseFloat(data.balance);
                    if (isNaN(value)) return '';
                    return '€ ' + value.toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                }
            },
        ],
        remoteOperations: { paging: true, sorting: true },
        paging: { pageSize: 10 },
        pager: { showPageSizeSelector: true, allowedPageSizes: [5, 10, 20], showInfo: true },
        toolbar: {
            items: [
                "groupPanel",
                "searchPanel"
            ]
        },
        onRowClick: function (e) { if (e.rowType === "data") { window.location = `/agent/${e.data.id}`; } },
    });
}


function showAddNewAgentModal() {
    document.getElementById("spNewAgentResult").innerText = '';
    document.getElementById("txtFirstName").value = '';
    document.getElementById("txtLastName").value = '';
    document.getElementById("ddlPackage").value = '-1';
    const modalElement = document.getElementById("modalAddAgent");
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
    preSelectLocation();
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
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "name": firstName, "surname": lastName, "package_id": packageID, "branch_id": branchID })
        });
        const res = await response.json();
        if (res.result) {
            await loadList(branchID);
            btn.disabled = false;
            spinner.classList.add("d-none");
            $("#modalAddAgent").modal("hide");
        } else {
            result.innerText = "Si sono verificati degli errori durante il salvataggio";
            btn.disabled = false;
            spinner.classList.remove("d-none");
            result.classList.remove("d-none");
        }
    } catch (error) {
        console.error(error.message);
        result.innerText = "Si è verificato un errore";
        btn.disabled = false;
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