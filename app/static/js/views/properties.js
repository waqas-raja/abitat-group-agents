document.addEventListener("DOMContentLoaded", () => {

    loadList();
});

function loadList() {
    const data = getData();
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
            {
                dataField: "type",
                caption: "Type",
                allowFiltering: true,
                calculateCellValue: function (data) {
                    switch (data.type) {
                        case 1: return "Apartment";
                        case 2: return "Villa";
                        case 3: return "Farmhouse";
                    }
                }
            },
            { dataField: "address", caption: "Address", allowFiltering: true },
            { dataField: "surface_area", caption: "Surface Area", allowFiltering: true },
            { dataField: "price", caption: "Price", allowFiltering: true },
            { dataField: "status", caption: "Status", allowFiltering: true },
            { dataField: "assigned_agent", caption: "Assigned Agent", allowFiltering: true },
            { dataField: "publication_date", caption: "Publication Date", allowFiltering: true },
            { dataField: "sale_date", caption: "Sale Date", allowFiltering: true },
            { dataField: "sale_price", caption: "Sale Price", allowFiltering: true },
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
                            document.getElementById('txtPropertyName').value = '';
                            document.getElementById('ddlPropertyType').value = '';
                            document.getElementById('txtPropertyAddress').value = '';
                            document.getElementById('txtPropertyPurchasePrice').value = '';
                            const modalElement = document.getElementById("modalAddProperty");
                            const modal = new bootstrap.Modal(modalElement);
                            modal.show();
                        },
                        elementAttr: { class: "btn-orange" }
                    }
                }
            ]
        },
        onRowClick: function (e) {
            if (e.rowType === "data") {
                const res = data.filter(function (el) { return el.id === parseInt(e.data.id); });
                showEditPropertyModal(res);
                // window.location = `/property/${e.data.id}`; 
            }
        },
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

function showEditPropertyModal(res) {
    document.getElementById('txtPropertyName').value = res[0].title;
    document.getElementById('ddlPropertyType').value = res[0].type;
    document.getElementById('txtPropertyAddress').value = res[0].address;
    document.getElementById('txtPropertyPurchasePrice').value = res[0].price;
    const modalElement = document.getElementById("modalAddProperty");
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
}


function getData() {
    return [
        {
            "id": 1,
            "title": "Attico in Centro",
            "type": 2,
            "address": "Via Roma, 45, Torino",
            "surface_area": 120,
            "price": 350000,
            "status": "In vendita",
            "assigned_agent": "Marco Rossi",
            "publication_date": "01/12/2024",
            "sale_date": null,
            "sale_price": null
        },
        {
            "id": 2,
            "title": "Bilocale Economico",
            "type": 1,
            "address": "Corso Francia, 120, Torino",
            "surface_area": 65,
            "price": 120000,
            "status": "Venduto",
            "assigned_agent": "Laura Bianchi",
            "publication_date": "15/10/2024",
            "sale_date": "10/01/2025",
            "sale_price": 115000
        },
        {
            "id": 3,
            "title": "Villa con Giardino",
            "type": 3,
            "address": "Via delle Mimose, 10, Roma",
            "surface_area": 240,
            "price": 650000,
            "status": "In vendita",
            "assigned_agent": "Alessandro Verdi",
            "publication_date": "01/11/2024",
            "sale_date": null,
            "sale_price": null
        },
        {
            "id": 4,
            "title": "Monolocale Moderno",
            "type": 1,
            "address": "Via Garibaldi, 22, Torino",
            "surface_area": 40,
            "price": 95000,
            "status": "Venduto",
            "assigned_agent": "Giulia Neri",
            "publication_date": "10/09/2024",
            "sale_date": "05/01/2025",
            "sale_price": 92000
        },
        {
            "id": 5,
            "title": "Trilocale Panoramico",
            "type": 2,
            "address": "Via Tiburtina, 78, Roma",
            "surface_area": 95,
            "price": 210000,
            "status": "In vendita",
            "assigned_agent": "Luca Ferrari",
            "publication_date": "20/12/2024",
            "sale_date": null,
            "sale_price": null
        },
        {
            "id": 6,
            "title": "Rustico con Terreno",
            "type": 4,
            "address": "Strada Provinciale 32, Torino",
            "surface_area": 180,
            "price": 180000,
            "status": "In vendita",
            "assigned_agent": "Elena Galli",
            "publication_date": "05/11/2024",
            "sale_date": null,
            "sale_price": null
        },
        {
            "id": 7,
            "title": "Appartamento di Lusso",
            "type": 2,
            "address": "Via Veneto, 15, Roma",
            "surface_area": 150,
            "price": 950000,
            "status": "Venduto",
            "assigned_agent": "Simone De Luca",
            "publication_date": "01/08/2024",
            "sale_date": "20/12/2024",
            "sale_price": 930000
        },
        {
            "id": 8,
            "title": "Open Space in Centro",
            "type": 1,
            "address": "Piazza Castello, 8, Torino",
            "surface_area": 80,
            "price": 220000,
            "status": "In vendita",
            "assigned_agent": "Martina Bianchi",
            "publication_date": "15/12/2024",
            "sale_date": null,
            "sale_price": null
        },
        {
            "id": 9,
            "title": "Casa Storica",
            "type": 3,
            "address": "Via Appia Antica, 45, Roma",
            "surface_area": 300,
            "price": 1250000,
            "status": "In vendita",
            "assigned_agent": "Alberto Russo",
            "publication_date": "01/01/2025",
            "sale_date": null,
            "sale_price": null
        },
        {
            "id": 10,
            "title": "Quadrilocale Ristrutturato",
            "type": 2,
            "address": "Via Po, 16, Torino",
            "surface_area": 110,
            "price": 320000,
            "status": "Venduto",
            "assigned_agent": "Giovanni Conte",
            "publication_date": "25/09/2024",
            "sale_date": "18/01/2025",
            "sale_price": 315000
        }
    ];
}