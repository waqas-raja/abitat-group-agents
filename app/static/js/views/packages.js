document.addEventListener("DOMContentLoaded", () => {
    loadList("listOfPackages", getData());
});

function loadList(id, data) {
    debugger;
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
            { dataField: "id", caption: "Id", allowFiltering: true },
            { dataField: "name", caption: "Nome", allowFiltering: true },
            { 
                dataField: "fixed_fee",
                caption: "Canone fisso",
                allowFiltering: true,
                calculateCellValue: function (data) {
                    return formatNumber(data.fixed_fee);
                }
            },
            { 
                dataField: "percentage",
                caption: "Percentuale",
                allowFiltering: true,
                calculateCellValue: function (data) {
                    return data.percentage + '%';
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
                        text: "Aggiungi Agente",
                        onClick: function () {
                            const modalElement = document.getElementById("modalAddPackage");
                            const modal = new bootstrap.Modal(modalElement);
                            modal.show();
                            // preSelectLocation();
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

function savePackage() {

}

function getData() {
    return [
        {
            "id": 1,
            "name": "Marco",
            "fixed_fee": 1500,
            "percentage": 15,
            "description": "description description"
        },
        {
            "id": 2,
            "name": "Elisa",
            "fixed_fee": 1100,
            "percentage": 11,
            "description": "description description"
        },
        {
            "id": 3,
            "name": "Waqas",
            "fixed_fee": 1200,
            "percentage": 12,
            "description": "description description"
        },
        {
            "id": 4,
            "name": "Rahat",
            "fixed_fee": 1300,
            "percentage": 13,
            "description": "description description"
        },
    ];
}