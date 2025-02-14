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
        opt.textContent = d[i].purchaseAgent;
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
                dataField: "status",
                caption: "Stato",
                allowFiltering: false,
                width: 50,
                alignment: "center",
                cellTemplate: function(container, options) {
                    let iconClass, tooltipText;
                    switch (options.value) {
                        case "sold":
                            iconClass = "bi bi-check-circle-fill text-success"; // Icona "venduto"
                            tooltipText = "Venduto";
                            break;
                        case "in_management":
                            iconClass = "bi bi-hourglass-split text-warning"; // Icona "in gestione"
                            tooltipText = "In gestione";
                            break;
                        default:
                            iconClass = "bi bi-question-circle text-secondary"; // Icona generica
                            tooltipText = "Stato sconosciuto";
                    }
                    $("<i>")
                        .addClass(iconClass)
                        .attr("title", tooltipText)
                        .appendTo(container);
                }
            },
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
            {
                caption: "Dati di Acquisto",
                alignment: "center",
                cssClass: "alert alert-warning",
                columns: [
                    { dataField: "purchase_date", caption: "Data", allowFiltering: true },
                    { dataField: "purchaseAgent", caption: "Agente", allowFiltering: true },
                    { dataField: "purchaseSubAgent", caption: "Subagente", allowFiltering: true },
                    {
                        dataField: "purchase_price",
                        caption: "Prezzo",
                        allowFiltering: true,
                        calculateCellValue: function (data) {
                            return formatNumber(data.purchase_price);
                        }
                    }
                ]
            },
            {
                caption: "Dati di Vendita",
                alignment: "center",
                cssClass: "alert alert-success",
                columns: [
                    { dataField: "sale_date", caption: "Data", allowFiltering: true },
                    { dataField: "saleAgent", caption: "Agente", allowFiltering: true },
                    { dataField: "saleSubAgent", caption: "Subagente", allowFiltering: true },
                    {
                        dataField: "sale_price",
                        caption: "Prezzo",
                        allowFiltering: true,
                        calculateCellValue: function (data) {
                            if (data.sale_price !== null) return formatNumber(data.sale_price);
                        }
                    },

                ]
            },
            {
                caption: "Delta",
                allowFiltering: true,
                // calculateCellValue: function (data) {
                //     if (data.sale_price !== null) return formatNumber(data.sale_price - data.purchase_price);
                // }
                cellTemplate: function(container, options) {
                    if (!options.data.sale_date && !options.data.sale_price) {
                        $("<button>")
                            .text("Venduto")
                            .addClass("btn btn-success")
                            .on("click", function (event) {
                                event.stopPropagation();
                                showMarkPropertySoldModal(options.data);
                            })
                            .appendTo(container);
                    } else {
                        container.text(formatNumber(options.data.sale_price - options.data.purchase_price));
                    }
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
    const purchase_price = document.getElementById("txtPropertyPurchasePrice");
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
    document.getElementById('txtPropertyPurchasePrice').value = res !== null ? res[0].purchase_price : '';
    document.getElementById('modalAddPropertyLabel').innerText = modalTitle;
    document.getElementById('ddlPropertyLocation').value = city_id;
    const modalElement = document.getElementById("modalAddProperty");
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
}

function showMarkPropertySoldModal(data) {
    const label = document.getElementById("cbMarkPropertySoldLabel");
    label.innerText = 'Contrassegna la proprietà a '+ data.address +' come venduta';
    document.getElementById("spMarkPropertySoldResult").innerText = '';
    const modalElement = document.getElementById("modalMarkPropertySold");
    const modal = new bootstrap.Modal(modalElement);
    if (data !== null) modal.show();
    else {
        modalElement.classList.remove("show");
        modalElement.style.display = "none";
        document.body.classList.remove("modal-open");
        document.querySelector(".modal-backdrop")?.remove();
    }
}

function savePropertyMarkedAsSold() {
    const btn = document.getElementById("btnSaveMarkPropertySold");
    const spinner = document.getElementById("spinnerMarkPropertySold");
    const mark = document.getElementById("cbMarkPropertySold");
    const result = document.getElementById("spMarkPropertySoldResult");
    if (!mark.checked) {
        result.innerText = "Si prega di compilare tutti i campi richiesti";
        result.classList.remove("d-none");
        return;
    }
    showMarkPropertySoldModal(null);
    btn.disabled = true;
    spinner.classList.remove("d-none");
    result.classList.add("d-none");
    result.innerText = "";
}

function getData() {
    return [
        {
            "id": 1,
            "title": "Attico in Centro",
            "type": 2,
            "address": "Via Roma, 45, Torino",
            "city_id": 1,
            "purchase_price": 350000,
            "status": "in_management",
            "purchaseAgent": "Marco Rossi (100%)",
            "purchaseSubAgent": "",
            "purchase_date": "01/12/2024",
            "sale_date": null,
            "sale_price": null,
            "saleAgent": "Elena Galli (100%)",
            "saleSubAgent": "",
            "details": [
                {
                    "date": "28/12/2024",
                    "new_price": 60000,
                    "note": "Adeguamento al mercato",
                },
                {
                    "date": "28/12/2024",
                    "new_price": 60000,
                    "note": "Riallineamento con immobili simili",
                },
            ]
        },
        {
            "id": 2,
            "title": "Bilocale Economico",
            "type": 1,
            "address": "Corso Francia, 120, Torino",
            "city_id": 1,
            "purchase_price": 120000,
            "status": "sold",
            "purchaseAgent": "Laura Bianchi (80%)",
            "purchaseSubAgent": "Mario Rossi (20%)",
            "purchase_date": "01/12/2024",
            "sale_date": "10/01/2025",
            "sale_price": 115000,
            "saleAgent": "Elena Galli (80%)",
            "saleSubAgent": "Mario Rossi (20%)",
            "details": [
                {
                    "date": "28/12/2024",
                    "new_price": 60000,
                    "note": "Maggiore richiesta nella zona",
                },
                {
                    "date": "28/12/2024",
                    "new_price": 60000,
                    "note": "Riduzione per incentivare l’acquisto",
                },
            ]
        },
        {
            "id": 3,
            "title": "Villa con Giardino",
            "type": 3,
            "address": "Via delle Mimose, 10, Roma",
            "city_id": 3,
            "purchase_price": 650000,
            "status": "in_management",
            "purchaseAgent": "Alessandro Verdi (50%)",
            "purchaseSubAgent": "Mario Rossi (50%)",
            "purchase_date": "01/12/2024",
            "sale_date": null,
            "sale_price": null,
            "saleAgent": "Alessandro Verdi (100%)",
            "saleSubAgent": "",
            "details": [
                {
                    "date": "28/12/2024",
                    "new_price": 60000,
                    "note": "Adeguamento ai prezzi della concorrenza",
                }
            ]
        },
        {
            "id": 4,
            "title": "Monolocale Moderno",
            "type": 1,
            "address": "Via Garibaldi, 22, Torino",
            "city_id": 1,
            "purchase_price": 95000,
            "status": "sold",
            "purchaseAgent": "Giulia Neri (100%)",
            "purchaseSubAgent": "",
            "purchase_date": "01/12/2024",
            "sale_date": "05/01/2025",
            "sale_price": 97000,
            "saleAgent": "Luca Ferrari (30%)",
            "saleSubAgent": "Laura Bianchi (70%)",
            "details": [

            ]
        },
        {
            "id": 5,
            "title": "Trilocale Panoramico",
            "type": 2,
            "address": "Via Tiburtina, 78, Roma",
            "city_id": 3,
            "purchase_price": 210000,
            "status": "in_management",
            "purchaseAgent": "Luca Ferrari (100%)",
            "purchaseSubAgent": "",
            "purchase_date": "01/12/2024",
            "sale_date": null,
            "sale_price": null,
            "saleAgent": "Alessandro Verdi (80%)",
            "saleSubAgent": "Laura Bianchi (20%)",
            "details": [
                {
                    "date": "28/12/2024",
                    "new_price": 60000,
                    "note": "Aggiornamento post perizia",
                },
                {
                    "date": "28/12/2024",
                    "new_price": 60000,
                    "note": "Richiesta del venditore",
                },
            ]
        },
        {
            "id": 6,
            "title": "Rustico con Terreno",
            "type": 4,
            "address": "Strada Provinciale 32, Torino",
            "city_id": 1,
            "purchase_price": 180000,
            "status": "in_management",
            "purchaseAgent": "Elena Galli (100%)",
            "purchaseSubAgent": "",
            "purchase_date": "01/12/2024",
            "sale_date": null,
            "sale_price": null,
            "saleAgent": "Alessandro Verdi (100%)",
            "saleSubAgent": "",
            "details": [

            ]
        },
        {
            "id": 7,
            "title": "Appartamento di Lusso",
            "type": 2,
            "address": "Via Veneto, 15, Roma",
            "city_id": 3,
            "purchase_price": 950000,
            "status": "sold",
            "purchaseAgent": "Simone De Luca (60%)",
            "purchaseSubAgent": "Elena Galli (40%)",
            "purchase_date": "01/12/2024",
            "sale_date": "20/12/2024",
            "sale_price": 930000,
            "saleAgent": "Elena Galli (100%)",
            "saleSubAgent": "",
            "details": [
                {
                    "date": "28/12/2024",
                    "new_price": 60000,
                    "note": "Adeguamento post valutazione bancaria",
                },
                {
                    "date": "28/12/2024",
                    "new_price": 60000,
                    "note": "Miglioramento condizioni di vendita",
                },
                {
                    "date": "28/12/2024",
                    "new_price": 60000,
                    "note": "Cambio di strategia di vendita",
                },
            ]
        },
        {
            "id": 8,
            "title": "Open Space in Centro",
            "type": 1,
            "address": "Piazza Castello, 8, Torino",
            "city_id": 1,
            "purchase_price": 220000,
            "status": "in_management",
            "purchaseAgent": "Martina Bianchi (100%)",
            "purchaseSubAgent": "",
            "purchase_date": "01/12/2024",
            "sale_date": null,
            "sale_price": null,
            "saleAgent": "Elena Galli (100%)",
            "saleSubAgent": "",
            "details": [

            ]
        },
        {
            "id": 9,
            "title": "Casa Storica",
            "type": 3,
            "address": "Via Appia Antica, 45, Roma",
            "city_id": 3,
            "purchase_price": 1250000,
            "status": "in_management",
            "purchaseAgent": "Alberto Russo (100%)",
            "purchaseSubAgent": "",
            "purchase_date": "01/12/2024",
            "sale_date": null,
            "sale_price": null,
            "saleAgent": "Elena Galli (100%)",
            "saleSubAgent": "",
            "details": [

            ]
        },
        {
            "id": 10,
            "title": "Quadrilocale Ristrutturato",
            "type": 2,
            "address": "Via Po, 16, Torino",
            "city_id": 1,
            "purchase_price": 320000,
            "status": "sold",
            "purchaseAgent": "Giovanni Conte (60%)",
            "purchaseSubAgent": "Simone De Luca (40%)",
            "purchase_date": "01/12/2024",
            "sale_date": "18/01/2025",
            "sale_price": 315000,
            "saleAgent": "Elena Galli (100%)",
            "saleSubAgent": "",
            "details": [
                {
                    "date": "28/12/2024",
                    "new_price": 60000,
                    "note": "Prezzo rivisto dopo trattativa",
                },
                {
                    "date": "28/12/2024",
                    "new_price": 60000,
                    "note": "Rialzo dovuto a rivalutazione della zona",
                },
            ]
        }
    ];
}