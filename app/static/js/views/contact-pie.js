const dataTest = [
        {
            "id": 1,
            "full_name": "Mario Rossi",
            "fiscalcode": "RSSMRA80A01H501Z",
            "last_date": "2024-12-15",
            "derivation": "Manuale",
            "list_name": "Lista A",
            "agent_name": "Giulia Bianchi",
            "phone1": "1234567890",
            "email": "mario.rossi@example.com"
        }
    ]
;


document.addEventListener("DOMContentLoaded", loadList);


function loadList() {
    const lid = document.getElementById("ddlList").value;
    const sid = document.getElementById("ddlStatus").value;
    // const data = getData(lid, sid);
    const data = dataTest;
    const hasData = data && data.length > 0;

    new DevExpress.ui.dxDataGrid(document.getElementById("listOfContacts"), {
        dataSource: data,
        columnAutoWidth: true,
        showBorders: true,
        rowAlternationEnabled: false,
        grouping: { autoExpandAll: false },
        groupPanel: { visible: hasData, emptyPanelText: "Trascina qui le colonne per raggruppare" },
        filterRow: { visible: hasData, applyFilter: "auto" },
        headerFilter: { visible: hasData },
        export: { enabled: true, allowExportSelectedData: true, formats: ['xlsx'] },
        columns: [
            { dataField: "full_name", caption: "Nome Cognome", allowFiltering: true },
            { dataField: "fiscalcode", caption: "Codice Fiscale", allowFiltering: true },
            { dataField: "last_date", caption: "Ultima Data", allowFiltering: true, dataType: "date" },
            { dataField: "derivation", caption: "Derivazione", allowFiltering: true },
            { dataField: "list_name", caption: "Nome Lista", allowFiltering: true },
            { dataField: "agent_name", caption: "Operatore", allowFiltering: true },
            { dataField: "phone1", caption: "Telefono", allowFiltering: true },
            { dataField: "email", caption: "Email", allowFiltering: true }
        ],
        paging: { pageSize: 10 },
        pager: { showPageSizeSelector: true, allowedPageSizes: [5, 10, 20], showInfo: true },
        searchPanel: { visible: true, width: 300, placeholder: "Cerca..." },
        onExporting: function(e) {
            if (e.format === 'xlsx') {
                const workbook = new ExcelJS.Workbook();
                const worksheet = workbook.addWorksheet("Leeds");
                DevExpress.excelExporter.exportDataGrid({
                    worksheet: worksheet,
                    component: e.component,
                }).then(function() {
                    workbook.xlsx.writeBuffer().then(function(buffer) {
                        saveAs(new Blob([buffer], { type: "application/octet-stream" }), "glprestiti-leeds.xlsx");
                    });
                });
            }
        },
        onRowClick: function(e) { if(e.rowType === "data") { window.location = `/contact/${e.data.id}`; } },
    });
}