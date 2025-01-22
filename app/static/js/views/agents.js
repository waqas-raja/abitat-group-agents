document.addEventListener("DOMContentLoaded", () => {
    initInternalTabs();
    init();
});

async function init() {
    const ids = ["listOfMoncalieriAgents", "listOfRomeAgents", "listOfTurinAgents"];
    const datas = [getDateMoncalieri(), getDateRoma(), getDateTorino()];
    for (let i = 0; i < ids.length; i++) { loadList(ids[i], datas[i]); }
}

function loadList(id, data) {
    new DevExpress.ui.dxDataGrid(document.getElementById(id), {
        dataSource: data,
        columnAutoWidth: true,
        showBorders: true,
        rowAlternationEnabled: false,
        grouping: { autoExpandAll: false },
        groupPanel: { visible: true, emptyPanelText: "Trascina qui le colonne per raggruppare" },
        filterRow: { visible: true, applyFilter: "auto" },
        headerFilter: { visible: true },
        // export: { enabled: true, allowExportSelectedData: true, formats: ['xlsx'] },
        columns: [
            { dataField: "first_name", caption: "First Name", allowFiltering: true },
            { dataField: "last_name", caption: "Last Name", allowFiltering: true },
            { dataField: "commission", caption: "Commission", allowFiltering: true },
            { dataField: "fixed_cost", caption: "Fixed Cost", allowFiltering: true },
            { dataField: "number_of_properties_managed", caption: "Number of Properties Managed", allowFiltering: true },
        ],
        paging: { pageSize: 10 },
        pager: { showPageSizeSelector: true, allowedPageSizes: [5, 10, 20], showInfo: true },
        toolbar: {
            items: [
                "groupPanel",
                "searchPanel",
                "exportButton",
                {
                    location: "after",
                    widget: "dxButton",
                    options: {
                        icon: "add",
                        text: "Aggiungi Agente",
                        onClick: function () {
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
        // onExporting: function (e) {
        //     if (e.format === 'xlsx') {
        //         const workbook = new ExcelJS.Workbook();
        //         const worksheet = workbook.addWorksheet("Agents");
        //         DevExpress.excelExporter.exportDataGrid({
        //             worksheet: worksheet,
        //             component: e.component,
        //         }).then(function () {
        //             workbook.xlsx.writeBuffer().then(function (buffer) {
        //                 saveAs(new Blob([buffer], { type: "application/octet-stream" }), "abitat-agents.xlsx");
        //             });
        //         });
        //     }
        // }
    });
}

async function saveAgent() {
    const btn = document.getElementById("btnSaveAgent");
    const spinner = document.getElementById("spinnerNewAgent");
    const firstName = document.getElementById("txtFirstName").value.trim();
    const lastName = document.getElementById("txtLastName").value.trim();
    const fixedCost = document.getElementById("txtFixedCost");
    const commission = document.getElementById("txtCommission");
    const result = document.getElementById("spNewAgentResult");

    btn.disabled = true;
    spinner.classList.remove("d-none");
    result.classList.add("d-none");
    result.innerText = "";
}

function preSelectLocation() {
    const parent = document.querySelector(".pai-tabs");
    const child = parent.querySelector(".active");
    switch (child.dataset.tab) {
        case 'tabContentMilan': document.getElementById('ddlLocation').value = 1; break;
        case 'tabContentRome': document.getElementById('ddlLocation').value = 2; break;
        case 'tabContentTurin': document.getElementById('ddlLocation').value = 3; break;
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
            "number_of_properties_managed": 25
        },
        {
            "id": 2,
            "first_name": "Laura",
            "last_name": "Bianchi",
            "commission": "6%",
            "fixed_cost": 1300,
            "number_of_properties_managed": 18
        },
        {
            "id": 3,
            "first_name": "Elena",
            "last_name": "Galli",
            "commission": "4.5%",
            "fixed_cost": 1600,
            "number_of_properties_managed": 30
        },
        {
            "id": 4,
            "first_name": "Martina",
            "last_name": "Ferrari",
            "commission": "5.5%",
            "fixed_cost": 1400,
            "number_of_properties_managed": 20
        }
    ];
}