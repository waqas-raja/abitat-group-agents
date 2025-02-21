const ids = ["listOfTorinoAgents", "listOfMoncalieriAgents", "listOfRomaAgents"];
document.addEventListener("DOMContentLoaded", () => {
    initInternalTabs();
    init();
});

async function init() {
    const datas = [getDateMoncalieri(), getDateRoma(), getDateTorino()];
    // for (let i = 0; i < ids.length; i++) { loadList(ids[i], datas[i]); }
    for (let i = 0; i < ids.length; i++) { loadList(ids[i], i + 1); }
}

async function loadList(ctrl_id, branch_id) {
    new DevExpress.ui.dxDataGrid(document.getElementById(ctrl_id), {
        dataSource: new DevExpress.data.CustomStore({
            key: "id",
            load: async function (loadOptions) {
                let params = new URLSearchParams();
                params.append("branch_id", branch_id);
                params.append("limit", loadOptions.take || 10);
                params.append("page", loadOptions.skip / loadOptions.take + 1 || 1);
                if (loadOptions.filter !== undefined) {
                    params.append("search", loadOptions.filter.filterValue);
                }
                try {
                    const response = await fetch(`/api/agents?${params.toString()}`);
                    const json = await response.json();
                    return {
                        data: json.payload,
                        totalCount: json.totalCount
                    };
                } catch (error) {
                    console.error("Data fetch error:", error);
                    return { data: [], totalCount: 0 };
                }
            }
        }),
        // dataSource: data,
        columnAutoWidth: true,
        allowColumnResizing: true,
        allowColumnReordering: true,
        showBorders: true,
        noDataText: "Nessun dato disponibile",
        rowAlternationEnabled: false,
        grouping: { autoExpandAll: false },
        groupPanel: { visible: true, emptyPanelText: "Trascina qui le colonne per raggruppare" },
        filterRow: { visible: true, applyFilter: "auto" },
        headerFilter: { visible: true },
        stateStoring: { // Permette di salvare la configurazione delle colonne
            enabled: true,
            type: "localStorage",
            storageKey: "gridState"
        },
        columns: [
            {
                caption: "Nome Cognome",
                allowFiltering: true,
                visibleIndex: 0,
                calculateCellValue: function (data) {
                    return data.name + ' ' + data.surname;
                }
            },
            { dataField: "commission", caption: "Commissioni", allowFiltering: true, visibleIndex: 1, },
            {
                dataField: "fixed_cost",
                caption: "Costi fissi",
                allowFiltering: true,
                visibleIndex: 2,
                calculateCellValue: function (data) {
                    return formatNumber(data.fixed_cost);
                }
            },
            { dataField: "number_of_properties_managed", caption: "Proprietà in gestione", allowFiltering: true, visibleIndex: 3, },
            {
                dataField: "properties_sold",
                caption: "Proprietà vendute",
                allowFiltering: true,
                visibleIndex: 4,
            },
            {
                caption: "Totale vendite",
                allowFiltering: true,
                visibleIndex: 5,
                calculateCellValue: function (data) {
                    return formatNumber((data.number_of_properties_managed * data.fixed_cost) - data.fixed_cost);
                }
            },
            {
                caption: "Totale commissioni",
                allowFiltering: true,
                visibleIndex: 6,
                calculateCellValue: function (data) {
                    return formatNumber(((data.fixed_cost * (parseFloat(data.commission) / 100)) * data.number_of_properties_managed) - data.fixed_cost);
                }
            },
        ],
        remoteOperations: { paging: true, filtering: true, sorting: true },
        paging: { pageSize: 10 },
        pager: { showPageSizeSelector: true, allowedPageSizes: [5, 10, 20], showInfo: true },
        toolbar: {
            items: [
                "groupPanel",
                "searchPanel",
                // {
                //     location: "after",
                //     widget: "dxButton",
                //     options: {
                //         icon: "add",
                //         text: "Aggiungi Agente",
                //         onClick: function () {
                //             document.getElementById("spNewAgentResult").innerText = '';
                //             const modalElement = document.getElementById("modalAddAgent");
                //             const modal = new bootstrap.Modal(modalElement);
                //             modal.show();
                //             preSelectLocation();
                //         },
                //         elementAttr: { class: "btn-orange" }
                //     }
                // }
            ]
        },
        onRowClick: function (e) { if (e.rowType === "data") { window.location = `/agent/${e.data.id}`; } },
    });
}

function showAddNewAgentModal() {
    document.getElementById("spNewAgentResult").innerText = '';
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
    const fixedCost = document.getElementById("txtFixedCost").value.trim();
    // const commission = document.getElementById("txtCommission");
    const packageID = parseInt(document.getElementById("ddlPackage").value);
    const branchID = parseInt(document.getElementById("ddlLocation").value);
    const result = document.getElementById("spNewAgentResult");
    if (firstName === '' || lastName === "" || packageID === "" || fixedCost === "") {
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
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "name": firstName, "surname": lastName, "fixed_cost": parseFloat(fixedCost), "package_id": packageID, "branch_id": branchID })
        });
        const res = await response.json();
        if (res.result) {
            loadList(ids[branchID - 1], branchID);
            btn.disabled = true;
            spinner.classList.add("d-none");
            const modalElement = document.getElementById("modalAddAgent");
            modalElement.classList.remove("show");
            modalElement.style.display = "none";
            document.body.classList.remove("modal-open");
            document.querySelector(".modal-backdrop")?.remove();
        } else throw new Error("Something went wrong while inserting new agent!");
    } catch (error) {
        btn.disabled = true;
        spinner.classList.remove("d-none");
        result.classList.remove("d-none");
        result.innerText = error.message !== undefined ? error.message : error;
    }
}

function preSelectLocation() {
    const parent = document.querySelector(".pai-tabs");
    const child = parent.querySelector(".active");
    switch (child.dataset.tab) {
        case 'tabContentTorino': document.getElementById('ddlLocation').value = 1; break;
        case 'tabContentMoncalieri': document.getElementById('ddlLocation').value = 2; break;
        case 'tabContentRoma': document.getElementById('ddlLocation').value = 3; break;
    }
}


function getDateMoncalieri() {
    return [
        {
            "id": 1,
            "first_name": "Giovanni",
            "last_name": "Conte",
            "commission": "5.5%",
            "fixed_cost": 1350,
            "number_of_properties_managed": 22
        },
        {
            "id": 2,
            "first_name": "Simone",
            "last_name": "De Luca",
            "commission": "6%",
            "fixed_cost": 1500,
            "number_of_properties_managed": 28
        },
        {
            "id": 3,
            "first_name": "Giulia",
            "last_name": "Neri",
            "commission": "4.8%",
            "fixed_cost": 1450,
            "number_of_properties_managed": 19
        }
    ];
}

function getDateRoma() {
    return [
        {
            "id": 1,
            "first_name": "Alessandro",
            "last_name": "Verdi",
            "commission": "5%",
            "fixed_cost": 1700,
            "number_of_properties_managed": 35
        },
        {
            "id": 2,
            "first_name": "Luca",
            "last_name": "Ferrari",
            "commission": "5.5%",
            "fixed_cost": 1600,
            "number_of_properties_managed": 29
        },
        {
            "id": 3,
            "first_name": "Alberto",
            "last_name": "Russo",
            "commission": "6%",
            "fixed_cost": 1750,
            "number_of_properties_managed": 40
        },
        {
            "id": 4,
            "first_name": "Francesca",
            "last_name": "Romano",
            "commission": "4.5%",
            "fixed_cost": 1550,
            "number_of_properties_managed": 24
        },
        {
            "id": 5,
            "first_name": "Sofia",
            "last_name": "Bruni",
            "commission": "5%",
            "fixed_cost": 1650,
            "number_of_properties_managed": 31
        }
    ];
}

function getDateTorino() {
    return [
        {
            "id": 1,
            "first_name": "Marco",
            "last_name": "Rossi",
            "commission": "5%",
            "fixed_cost": 1500,
            "number_of_properties_managed": 25,
            "properties_sold": 7
        },
        {
            "id": 2,
            "first_name": "Laura",
            "last_name": "Bianchi",
            "commission": "6%",
            "fixed_cost": 1300,
            "number_of_properties_managed": 18,
            "properties_sold": 36
        },
        {
            "id": 3,
            "first_name": "Elena",
            "last_name": "Galli",
            "commission": "4.5%",
            "fixed_cost": 1600,
            "number_of_properties_managed": 30,
            "properties_sold": 13
        },
        {
            "id": 4,
            "first_name": "Martina",
            "last_name": "Ferrari",
            "commission": "5.5%",
            "fixed_cost": 1400,
            "number_of_properties_managed": 20,
            "properties_sold": 23
        }
    ];
}