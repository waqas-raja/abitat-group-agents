document.addEventListener("DOMContentLoaded", () => {
    loadList("listOfExpense", getData());
});

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
            { dataField: "date", caption: "Data", allowFiltering: true },
            { dataField: "agent_name", caption: "Agente", allowFiltering: true },
            { 
                dataField: "cost",
                caption: "Costo",
                allowFiltering: true,
                calculateCellValue: function (data) {
                    return formatNumber(data.cost);
                }
            },
            { dataField: "description", caption: "Descrizione", allowFiltering: true },
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
                        text: "Aggiungi Note spese",
                        onClick: function () {
                            const modalElement = document.getElementById("modalAddExpenseReport");
                            const modal = new bootstrap.Modal(modalElement);
                            modal.show();
                            // preSelectLocation();
                        },
                        elementAttr: { class: "btn-orange" }
                    }
                }
            ]
        },
        onRowClick: function (e) { 
            if (e.rowType === "data") { 
                // window.location = `/agent/${e.data.id}`; 
            }
        },
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

function saveExpenseReport() {

}

function getData() {
    return [
        {
            "date": 1,
            "agent_name": "Marco",
            "cost": 1200,
            "description": "description description"
        },
        {
            "date": 2,
            "agent_name": "Elisa",
            "cost": 1300,
            "description": "description description"
        },
        {
            "date": 3,
            "agent_name": "Derossi",
            "cost": 1500,
            "description": "description description"
        },
    ];
}