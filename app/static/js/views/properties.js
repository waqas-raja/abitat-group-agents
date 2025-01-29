const cities = [
    { id: 1, name: 'Torino' },
    { id: 2, name: 'Moncalieri' },
    { id: 3, name: 'Roma' },
];
let city_id = 1;
document.addEventListener("DOMContentLoaded", () => {
    initInternalTabs();
    loadList(city_id);
});

function populateDropdown(d, ctrl_id) {
    document.getElementById(ctrl_id).innerHTML = '';
    for (let i = 0; i < d.length; i++) {
        const opt = document.createElement('option');
        opt.value = d[i].id;
        opt.textContent = d[i].assigned_agent;
        document.getElementById(ctrl_id).appendChild(opt);
    }
}

function loadList(cid) {
    city_id = cid;
    const d = getData();
    populateDropdown(d, 'ddlPropertyAcquiredBy');
    const data = d.filter(function (el) { return el.city_id === parseInt(city_id); });
    const ddlLocation = document.getElementById('ddlPropertyLocation');
    if (ddlLocation !== null) ddlLocation.value = city_id;
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
            {
                dataField: "type",
                caption: "Tipologia",
                allowFiltering: true,
                calculateCellValue: function (data) {
                    switch (data.type) {
                        case 1: return "Apartment";
                        case 2: return "Villa";
                        case 3: return "Farmhouse";
                    }
                }
            },
            { dataField: "address", caption: "Indirizzo", allowFiltering: true },
            { dataField: "surface_area", caption: "Superficie", allowFiltering: true },
            {
                dataField: "price",
                caption: "Prezzo acquisto",
                allowFiltering: true,
                calculateCellValue: function (data) {
                    return formatNumber(data.price);
                }
            },
            { dataField: "purchase_date", caption: "Data acquisto", allowFiltering: true },
            { dataField: "assigned_agent", caption: "Acquistare da", allowFiltering: true },
            { dataField: "assigned_agent", caption: "Venduto da", allowFiltering: true },
            { dataField: "sale_date", caption: "Data vendita", allowFiltering: true },
            {
                dataField: "sale_price",
                caption: "Prezzo vendita",
                allowFiltering: true,
                calculateCellValue: function (data) {
                    if (data.sale_price !== null) return formatNumber(data.sale_price);
                }
            },
            {
                caption: "Delta",
                allowFiltering: true,
                calculateCellValue: function (data) {
                    if (data.sale_price !== null) return formatNumber(data.sale_price - data.price);
                }
            }
        ],
        masterDetail: {
            enabled: true,
            template: function (container, options) {
                const details = options.data.details;
                $("<div>")
                    .addClass("dx-datagrid-group-panel")
                    .html('<div class="dx-group-panel-message">Elenco delle riduzioni di prezzo</div>')
                    .appendTo(container)
                $("<div>")
                    .addClass("internal-grid")
                    .appendTo(container)
                    .dxDataGrid({
                        dataSource: details,
                        columnAutoWidth: true,
                        showBorders: true,
                        width: "100%",
                        columns: [
                            { dataField: "date", caption: "Data" },
                            {
                                caption: "Nuovo prezzo",
                                calculateCellValue: function (data) {
                                    if (data.new_price !== null) return formatNumber(data.new_price);
                                }
                             },
                            { dataField: "note", caption: "Notes" },
                        ]
                    });
            }
        },
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
                //             showEditPropertyModal(null, 'Aggiungi proprietà');
                //         },
                //         elementAttr: { class: "btn-orange" }
                //     }
                // }
            ]
        },
        onRowClick: function (e) {
            if ($(e.event.target).closest(".dx-datagrid-expand").length) {
                e.event.stopPropagation();
                return;
            }
            if (e.rowType === "data") {
                const res = data.filter(function (el) { return el.id === parseInt(e.data.id); });
                showEditPropertyModal(res, 'Modifica proprietà');
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
    const acquiredBy = document.getElementById("ddlPropertyAcquiredBy").value.trim();
    const type = document.getElementById("ddlPropertyType").value.trim();
    const address = document.getElementById("txtPropertyAddress");
    const price = document.getElementById("txtPropertyPurchasePrice");
    const location = document.getElementById("ddlPropertyLocation").value.trim();
    const ele = document.getElementsByClassName('pai-tabs');
    if (parseInt(location) === 1) ele[0].children[0].click();
    else if (parseInt(location) === 2) ele[0].children[1].click();
    else if (parseInt(location) === 3) ele[0].children[2].click();
    const result = document.getElementById("spNewPorpertyResult");

    btn.disabled = true;
    spinner.classList.remove("d-none");
    result.classList.add("d-none");
    result.innerText = "";
    // TODO SAVE NEW PROPERTY API...
}

function showEditPropertyModal(res, modalTitle) {
    // document.getElementById('txtPropertyName').value = res !== null ? res[0].title : '';
    document.getElementById('ddlPropertyType').value = res !== null ? res[0].type : '';
    document.getElementById('txtPropertyAddress').value = res !== null ? res[0].address : '';
    document.getElementById('txtPropertyPurchasePrice').value = res !== null ? res[0].price : '';
    document.getElementById('modalAddPropertyLabel').innerText = modalTitle;
    document.getElementById('ddlPropertyLocation').value = city_id;
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
            "city_id": 1,
            "surface_area": 120,
            "price": 350000,
            "status": "In vendita",
            "assigned_agent": "Marco Rossi",
            "publication_date": "01/12/2024",
            "purchase_date": "01/12/2024",
            "sale_date": null,
            "sale_price": null,
            "details": [
                {
                    "date": "28/12/2024",
                    "new_price": 60000,
                    "note": "Chiamata di follow-up per documenti mancanti",
                },
                {
                    "date": "28/12/2024",
                    "new_price": 60000,
                    "note": "Chiamata di follow-up per documenti mancanti",
                },
            ]
        },
        {
            "id": 2,
            "title": "Bilocale Economico",
            "type": 1,
            "address": "Corso Francia, 120, Torino",
            "city_id": 1,
            "surface_area": 65,
            "price": 120000,
            "status": "Venduto",
            "assigned_agent": "Laura Bianchi",
            "publication_date": "15/10/2024",
            "purchase_date": "01/12/2024",
            "sale_date": "10/01/2025",
            "sale_price": 115000,
            "details": [
                {
                    "date": "28/12/2024",
                    "new_price": 60000,
                    "note": "Chiamata di follow-up per documenti mancanti",
                },
                {
                    "date": "28/12/2024",
                    "new_price": 60000,
                    "note": "Chiamata di follow-up per documenti mancanti",
                },
            ]
        },
        {
            "id": 3,
            "title": "Villa con Giardino",
            "type": 3,
            "address": "Via delle Mimose, 10, Roma",
            "city_id": 3,
            "surface_area": 240,
            "price": 650000,
            "status": "In vendita",
            "assigned_agent": "Alessandro Verdi",
            "publication_date": "01/11/2024",
            "purchase_date": "01/12/2024",
            "sale_date": null,
            "sale_price": null,
            "details": [
                {
                    "date": "28/12/2024",
                    "new_price": 60000,
                    "note": "Chiamata di follow-up per documenti mancanti",
                },
                {
                    "date": "28/12/2024",
                    "new_price": 60000,
                    "note": "Chiamata di follow-up per documenti mancanti",
                },
            ]
        },
        {
            "id": 4,
            "title": "Monolocale Moderno",
            "type": 1,
            "address": "Via Garibaldi, 22, Torino",
            "city_id": 1,
            "surface_area": 40,
            "price": 95000,
            "status": "Venduto",
            "assigned_agent": "Giulia Neri",
            "publication_date": "10/09/2024",
            "purchase_date": "01/12/2024",
            "sale_date": "05/01/2025",
            "sale_price": 97000,
            "details": [
                {
                    "date": "28/12/2024",
                    "new_price": 60000,
                    "note": "Chiamata di follow-up per documenti mancanti",
                },
                {
                    "date": "28/12/2024",
                    "new_price": 60000,
                    "note": "Chiamata di follow-up per documenti mancanti",
                },
            ]
        },
        {
            "id": 5,
            "title": "Trilocale Panoramico",
            "type": 2,
            "address": "Via Tiburtina, 78, Roma",
            "city_id": 3,
            "surface_area": 95,
            "price": 210000,
            "status": "In vendita",
            "assigned_agent": "Luca Ferrari",
            "publication_date": "20/12/2024",
            "purchase_date": "01/12/2024",
            "sale_date": null,
            "sale_price": null,
            "details": [
                {
                    "date": "28/12/2024",
                    "new_price": 60000,
                    "note": "Chiamata di follow-up per documenti mancanti",
                },
                {
                    "date": "28/12/2024",
                    "new_price": 60000,
                    "note": "Chiamata di follow-up per documenti mancanti",
                },
            ]
        },
        {
            "id": 6,
            "title": "Rustico con Terreno",
            "type": 4,
            "address": "Strada Provinciale 32, Torino",
            "city_id": 1,
            "surface_area": 180,
            "price": 180000,
            "status": "In vendita",
            "assigned_agent": "Elena Galli",
            "publication_date": "05/11/2024",
            "purchase_date": "01/12/2024",
            "sale_date": null,
            "sale_price": null,
            "details": [
                {
                    "date": "28/12/2024",
                    "new_price": 60000,
                    "note": "Chiamata di follow-up per documenti mancanti",
                },
                {
                    "date": "28/12/2024",
                    "new_price": 60000,
                    "note": "Chiamata di follow-up per documenti mancanti",
                },
            ]
        },
        {
            "id": 7,
            "title": "Appartamento di Lusso",
            "type": 2,
            "address": "Via Veneto, 15, Roma",
            "city_id": 3,
            "surface_area": 150,
            "price": 950000,
            "status": "Venduto",
            "assigned_agent": "Simone De Luca",
            "publication_date": "01/08/2024",
            "purchase_date": "01/12/2024",
            "sale_date": "20/12/2024",
            "sale_price": 930000,
            "details": [
                {
                    "date": "28/12/2024",
                    "new_price": 60000,
                    "note": "Chiamata di follow-up per documenti mancanti",
                },
                {
                    "date": "28/12/2024",
                    "new_price": 60000,
                    "note": "Chiamata di follow-up per documenti mancanti",
                },
            ]
        },
        {
            "id": 8,
            "title": "Open Space in Centro",
            "type": 1,
            "address": "Piazza Castello, 8, Torino",
            "city_id": 1,
            "surface_area": 80,
            "price": 220000,
            "status": "In vendita",
            "assigned_agent": "Martina Bianchi",
            "publication_date": "15/12/2024",
            "purchase_date": "01/12/2024",
            "sale_date": null,
            "sale_price": null,
            "details": [
                {
                    "date": "28/12/2024",
                    "new_price": 60000,
                    "note": "Chiamata di follow-up per documenti mancanti",
                },
                {
                    "date": "28/12/2024",
                    "new_price": 60000,
                    "note": "Chiamata di follow-up per documenti mancanti",
                },
            ]
        },
        {
            "id": 9,
            "title": "Casa Storica",
            "type": 3,
            "address": "Via Appia Antica, 45, Roma",
            "city_id": 3,
            "surface_area": 300,
            "price": 1250000,
            "status": "In vendita",
            "assigned_agent": "Alberto Russo",
            "publication_date": "01/01/2025",
            "purchase_date": "01/12/2024",
            "sale_date": null,
            "sale_price": null,
            "details": [
                {
                    "date": "28/12/2024",
                    "new_price": 60000,
                    "note": "Chiamata di follow-up per documenti mancanti",
                },
                {
                    "date": "28/12/2024",
                    "new_price": 60000,
                    "note": "Chiamata di follow-up per documenti mancanti",
                },
            ]
        },
        {
            "id": 10,
            "title": "Quadrilocale Ristrutturato",
            "type": 2,
            "address": "Via Po, 16, Torino",
            "city_id": 1,
            "surface_area": 110,
            "price": 320000,
            "status": "Venduto",
            "assigned_agent": "Giovanni Conte",
            "publication_date": "25/09/2024",
            "purchase_date": "01/12/2024",
            "sale_date": "18/01/2025",
            "sale_price": 315000,
            "details": [
                {
                    "date": "28/12/2024",
                    "new_price": 60000,
                    "note": "Chiamata di follow-up per documenti mancanti",
                },
                {
                    "date": "28/12/2024",
                    "new_price": 60000,
                    "note": "Chiamata di follow-up per documenti mancanti",
                },
            ]
        }
    ];
}