const BRANCHES = { Torino: 1, Moncalieri: 2, Roma: 3 };
let _selectedBranch = BRANCHES.Torino;

document.addEventListener("DOMContentLoaded", async () => {
    initInternalTabs();
    initDateControl("txtPropertySoldDate");
    await loadList(_selectedBranch);
});

async function loadAgentFromBranch() {
    const ddl = document.getElementById("ddlPurchaseAgent");
    ddl.innerHTML = '';
    const response = await fetch(`/api/agents?b=${_selectedBranch}}`);
    const r = await response.json();
    r.payload.forEach(el => ddl.innerHTML += `<option value="${el.id}">${el.surname} ${name}</option>`);
}

async function loadList(cid) {
    _selectedBranch = cid;
    await loadAgentFromBranch();
    const response = await fetch('/api/properties?branch_id=' + _selectedBranch);
    const r = await response.json();
    new DevExpress.ui.dxDataGrid(document.getElementById("listOfProperties"), {
        dataSource: r.payload,
        columnAutoWidth: true,
        allowColumnResizing: true,
        allowColumnReordering: true,
        showBorders: true,
        noDataText: "Non risultano immobili registrati per questa sede",
        rowAlternationEnabled: false,
        grouping: { autoExpandAll: false },
        groupPanel: { visible: true, emptyPanelText: "Trascina qui le colonne per raggruppare" },
        filterRow: { visible: true, applyFilter: "auto" },
        headerFilter: { visible: true },
        export: { enabled: true, allowExportSelectedData: true, formats: ['xlsx'] },
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

        // TODO MASTER DETAIL AS PER DYNAMIC DATA FETCHED
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
        remoteOperations: { paging: true, filtering: true, sorting: true },
        paging: { pageSize: 10 },
        pager: { showPageSizeSelector: true, allowedPageSizes: [5, 10, 20], showInfo: true },
        toolbar: {
            items: [
                "groupPanel",
                "searchPanel",
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
    });
}

async function saveProperty() {
    const btn = document.getElementById("btnSaveProperty");
    const spinner = document.getElementById("spinnerNewProperty");
    const acquiredBy = document.getElementById("ddlPurchaseAgent").value.trim();
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
    document.getElementById('ddlPropertyLocation').value = _selectedBranch;
    const modalElement = document.getElementById("modalAddProperty");
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
}

function showMarkPropertySoldModal(data) {
    const label = document.getElementById("cbMarkPropertySoldLabel");
    label.innerHTML = 'Contrassegna la proprietà a '+ data.address +' come venduta <span class="text-danger ms-2">*</span>';
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
    const date = $("#txtPropertySoldDate").dxDateBox("instance").option("value");
    const price = document.getElementById("txtPropertySoldPrice").value;
    const agent = document.getElementById("ddlPropertySoldAgent").value;
    const mark = document.getElementById("cbMarkPropertySold");
    const result = document.getElementById("spMarkPropertySoldResult");
    if (date.toLocaleDateString("en-GB") === "" || price === "" || agent === "" || !mark.checked) {
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