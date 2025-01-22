document.addEventListener("DOMContentLoaded", () => {
    loadAgentDetail();
    loadSoldPropertiesByAgent();
});

async function loadAgentDetail() {
    const id = document.getElementById('hAgentId').value;
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
    const res = data.filter(function (el) {
        return el.id === parseInt(id);
    });
    document.getElementById("spFirstName").innerText = res[0].first_name ?? "n.d.";
    document.getElementById("txtFirstName").value = res[0].first_name ?? "n.d.";
    document.getElementById("spLastName").innerText = res[0].last_name ?? "n.d.";
    document.getElementById("txtLastName").value = res[0].last_name ?? "n.d.";
    document.getElementById("spFixedCost").innerText = res[0].fixed_cost ?? "n.d.";
    document.getElementById("txtFixedCost").value = res[0].fixed_cost ?? "n.d.";
    document.getElementById("spCommission").innerText = res[0].commission ?? "n.d.";
    document.getElementById("txtCommission").value = res[0].commission ?? "n.d.";
}

async function loadSoldPropertiesByAgent() {
    const data = [
        {
            "id": 1,
            "title": "Alfa SRL",
            "type": "Residential",
            "address": "Tecnologia",
            "surface_area": "Lombardia",
            "price": "50",
            "status": "Milano",
            "assigned_agent": "Milano",
            "publication_date": "22/1/2025",
            "sale_date": "22/1/2025",
            "sale_price": "55"
        },
        {
            "id": 2,
            "title": "Alfa SRL",
            "type": "Rental",
            "address": "Tecnologia",
            "surface_area": "Lombardia",
            "price": "60",
            "status": "Milano",
            "assigned_agent": "Milano",
            "publication_date": "22/1/2025",
            "sale_date": "22/1/2025",
            "sale_price": "65"
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
        // export: { enabled: true, allowExportSelectedData: true, formats: ['xlsx'] },
        columns: [
            { dataField: "title", caption: "Property Title/Name", allowFiltering: true },
            { dataField: "sale_price", caption: "Sale Price", allowFiltering: true },
            { dataField: "sale_date", caption: "Sale Date", allowFiltering: true },
        ],
        paging: { pageSize: 10 },
        pager: { showPageSizeSelector: true, allowedPageSizes: [5, 10, 20], showInfo: true },
        toolbar: {
            items: [
                "groupPanel",
                "searchPanel",
                "exportButton",
                // {
                //     location: "after",
                //     widget: "dxButton",
                //     options: {
                //         icon: "add",
                //         text: "Aggiungi Proprietà",
                //         onClick: function () {
                //             const modalElement = document.getElementById("modalAddProperty");
                //             const modal = new bootstrap.Modal(modalElement);
                //             modal.show();
                //         },
                //         elementAttr: { class: "btn-orange" }
                //     }
                // }
            ]
        },
        onRowClick: function (e) { if (e.rowType === "data") { window.location = `/property/${e.data.id}`; } },
        onExporting: function (e) {
            if (e.format === 'xlsx') {
                const workbook = new ExcelJS.Workbook();
                const worksheet = workbook.addWorksheet("Properties");
                DevExpress.excelExporter.exportDataGrid({
                    worksheet: worksheet,
                    component: e.component,
                }).then(function () {
                    workbook.xlsx.writeBuffer().then(function (buffer) {
                        saveAs(new Blob([buffer], { type: "application/octet-stream" }), "abitat-properties.xlsx");
                    });
                });
            }
        }
    });
}