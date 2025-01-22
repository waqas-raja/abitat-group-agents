document.addEventListener("DOMContentLoaded", () => {
    initInternalTabs();
    init();
});

async function init() {
    const data = [
        {
            "id": 1,
            "first_name": "Alfa SRL",
            "last_name": "Residential",
            "commission": "Tecnologia",
            "fixed_cost": "Lombardia",
            "number_of_properties_managed": "50",
        },
        {
            "id": 2,
            "first_name": "Alfa SRL",
            "last_name": "Residential",
            "commission": "Tecnologia",
            "fixed_cost": "Lombardia",
            "number_of_properties_managed": "50",
        },
    ];
    ids = ["listOfMilanAgents", "listOfRomeAgents", "listOfTurinAgents"];
    for (let i = 0; i < ids.length; i++) { loadList(ids[i], data); }
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