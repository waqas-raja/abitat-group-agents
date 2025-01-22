document.addEventListener("DOMContentLoaded", () => {
    init();
});

async function init() {
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
    loadList(data);
}

function loadList(data) {
    new DevExpress.ui.dxDataGrid(document.getElementById("listOfProperties"), {
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
            { dataField: "id", caption: "Property ID", allowFiltering: true },
            { dataField: "title", caption: "Property Title/Name", allowFiltering: true },
            { dataField: "type", caption: "Type", allowFiltering: true },
            { dataField: "address", caption: "Address", allowFiltering: true },
            { dataField: "surface_area", caption: "Surface Area", allowFiltering: true },
            { dataField: "price", caption: "Price", allowFiltering: true },
            { dataField: "status", caption: "Status", allowFiltering: true },
            { dataField: "assigned_agent", caption: "Assigned Agent", allowFiltering: true },
            { dataField: "publication_date", caption: "Publication Date", allowFiltering: true },
            { dataField: "sale_date", caption: "Sale Date", allowFiltering: true },
            { dataField: "sale_price", caption: "Sale Price", allowFiltering: true },
            {
                caption: "Action",
                width: 100,
                cellTemplate: function (container, options) {
                    $("<i>")
                        .addClass("dx-icon dx-icon-edit")
                        .css("cursor", "pointer")
                        .on("click", function (event) {
                            event.stopImmediatePropagation();
                            alert("Edit: " + options.data.id);
                        })
                        .appendTo(container);
                    container.append("&nbsp;&nbsp;")
                    $("<i>")
                        .addClass("dx-icon dx-icon-trash")
                        .css("cursor", "pointer")
                        .on("click", function (event) {
                            event.stopImmediatePropagation();
                            if (confirm("Are you sure you want to delete this record?")) {
                                alert("Delete: " + options.data.id);
                            }
                        })
                        .appendTo(container);
                },
            },
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
                        text: "Aggiungi Proprietà",
                        onClick: function () {
                            const modalElement = document.getElementById("modalAddProperty");
                            const modal = new bootstrap.Modal(modalElement);
                            modal.show();
                        },
                        elementAttr: { class: "btn-orange" }
                    }
                }
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

async function saveProperty() {
    const btn = document.getElementById("btnSaveProperty");
    const spinner = document.getElementById("spinnerNewProperty");
    const name = document.getElementById("txtPropertyName").value.trim();
    const type = document.getElementById("txtPropertyType").value.trim();
    const address = document.getElementById("txtPropertyAddress");
    const price = document.getElementById("txtPropertyPurchasePrice");
    const result = document.getElementById("spNewPorpertyResult");

    btn.disabled = true;
    spinner.classList.remove("d-none");
    result.classList.add("d-none");
    result.innerText = "";
}
