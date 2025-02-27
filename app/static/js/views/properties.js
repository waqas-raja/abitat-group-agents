const BRANCHES = { Torino: 1, Moncalieri: 2, Roma: 3 };
let _selectedBranch = BRANCHES.Torino;

document.addEventListener("DOMContentLoaded", async () => {
    initInternalTabs();
    initDateControl("txtPropertySoldDate", true);
    initDateControl("txtPropertyPurchaseDate", true);
    initDateControl("txtPropertyPurchaseDate", true);
    initDateControl("txtPropertyExpireDate");
    await populateDropdown('ddlPropertyLocation', 'branches', 'Seleziona la sede');
    await populateDropdown('ddlPropertyType', 'property-types', 'Seleziona il tipo di proprietà');
    await loadAgentFromBranch();
    await loadList(_selectedBranch);
});

async function populateDropdown(ctrl_id, entry_point, title) {
    const response = await fetch('/api/' + entry_point);
    const r = await response.json();
    if (ctrl_id === "ddlPropertyType") initAutocompleteControl(r.payload, 'autocompletePropertyType', 'name', 'name');
    else {
        const ddlLocation = document.getElementById(ctrl_id);
        ddlLocation.innerHTML = '<option value="-1" selected disabled>' + title + '</option>';
        r.payload.forEach(el => { ddlLocation.innerHTML += `<option value="${el.id}">${el.name}</option>`; });
    }
}

async function changeBranch(branch_id) {
    _selectedBranch = branch_id;
    await loadList();
    await loadAgentFromBranch();
}

async function loadAgentFromBranch() {
    const ddl = document.getElementById("ddlPurchaseAgent");
    ddl.innerHTML = '<option value="-1" selected disabled>Seleziona agente</option>';
    const ddlSold = document.getElementById("ddlPropertySoldAgent");
    ddlSold.innerHTML = '<option value="-1" selected disabled>Seleziona agente</option>';
    const response = await fetch(`/api/agents?b=${_selectedBranch}}`);
    const r = await response.json();
    r.payload.forEach(el => ddl.innerHTML += `<option value="${el.id}">${el.name} ${el.surname}</option>`);
    r.payload.forEach(el => ddlSold.innerHTML += `<option value="${el.id}">${el.name} ${el.surname}</option>`);
}

async function loadList() {
    const response = await fetch('/api/properties?branch_id=' + _selectedBranch);
    const r = await response.json();
    const hasData = r.payload.length > 0;
    new DevExpress.ui.dxDataGrid(document.getElementById("listOfProperties"), {
        dataSource: r.payload,
        columnAutoWidth: true,
        showBorders: true,
        noDataText: "Non risultano immobili registrati per questa sede",
        rowAlternationEnabled: false,
        grouping: { autoExpandAll: false },
        groupPanel: { visible: hasData, emptyPanelText: "Trascina qui le colonne per raggruppare" },
        filterRow: { visible: hasData, applyFilter: "auto" },
        headerFilter: { visible: hasData },
        columns: [
            {
                caption: "Dati generali",
                alignment: "center",
                cssClass: "bg-light",
                columns: [
                    {
                        dataField: "type",
                        caption: "Tipologia",
                        allowFiltering: true,
                        calculateCellValue: function (data) {
                            switch (data.property_type) {
                                case 1: return "Apartment";
                                case 2: return "Villa";
                                case 3: return "Farmhouse";
                            }
                        }
                    },
                    { dataField: "address", caption: "Indirizzo", allowFiltering: true },
                ]
            },
            {
                caption: "Acquisto",
                alignment: "center",
                cssClass: "alert alert-warning rounded-0",
                columns: [
                    {
                        dataField: "purchase_date",
                        caption: "Data",
                        allowFiltering: true,
                        calculateCellValue: function (data) {
                            const d = (data.purchase_date).split('-');
                            return d[2] + '/' + d[1] + '/' + d[0];
                        }
                    },
                    {
                        dataField: "purchase_price",
                        caption: "Prezzo",
                        allowFiltering: true,
                        calculateCellValue: function (data) {
                            return formatNumber(parseFloat(data.purchase_price));
                        }
                    },
                    {
                        dataField: "purchase_agency_percentage",
                        caption: "Percentuale",
                        allowFiltering: true,
                        calculateCellValue: function (data) {
                            return data.purchase_agency_percentage + " %";
                        }
                    },
                    { dataField: "purchase_agent", caption: "Agente", allowFiltering: true },
                    {
                        dataField: "mandate_expiration",
                        caption: "Scadenza",
                        allowFiltering: true,
                        calculateCellValue: function (data) {
                            const d = (data.mandate_expiration).split('-');
                            return d[2] + '/' + d[1] + '/' + d[0];
                        }
                    },
                ]
            },
            {
                caption: "Vendita",
                alignment: "center",
                cssClass: "alert alert-success rounded-0",
                columns: [
                    {
                        dataField: "sale_date",
                        caption: "Data",
                        allowFiltering: true,
                        calculateCellValue: function (data) {
                            if (data.sale_date !== null && data.sale_date !== undefined) {
                                const d = (data.sale_date).split('-');
                                return d[2] + '/' + d[1] + '/' + d[0];
                            }
                        }
                    },
                    {
                        dataField: "sale_price",
                        caption: "Prezzo",
                        allowFiltering: true,
                        calculateCellValue: function (data) {
                            if (data.sale_price !== null) return formatNumber(parseFloat(data.sale_price));
                        }
                    },
                    {
                        dataField: "sale_percentage",
                        caption: "Percentuale",
                        allowFiltering: true,
                        calculateCellValue: function (data) {
                            if (data.sale_agency_percentage !== null && data.sale_agency_percentage > 0) return data.sale_agency_percentage + " %";
                            else return '';
                        }
                    },
                    { dataField: "sale_agent_name", caption: "Agente", allowFiltering: true },
                    {
                        caption: "Guadagno",
                        allowFiltering: true,
                        cellTemplate: function (container, options) {
                            options.data.sale_date !== null ? container.text(formatNumber(parseInt(options.data.delta))) : '';
                        }
                    }
                ]
            },
        ],

        // TODO MASTER DETAIL AS PER DYNAMIC DATA FETCHED
        masterDetail: {
            enabled: false,
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
                const res = r.payload.length === 1 ? r.payload : r.payload.filter(function (el) { return el.id === parseInt(e.data.id); });
                showEditPropertyModal(res, 'Modifica proprietà');
            }
        },
    });
}

async function saveProperty() {
    const btn = document.getElementById("btnSaveProperty");
    const spinner = document.getElementById("spinnerNewProperty");
    const location = parseInt(document.getElementById("ddlPropertyLocation").value);
    const type = parseInt(document.getElementById("hTxtPropertyType").value);
    const address = document.getElementById("txtPropertyAddress").value.trim();
    const propertyPurchaseDate = $("#txtPropertyPurchaseDate").dxDateBox("instance").option("text");
    const propertyPurchasePrice = document.getElementById("txtPropertyPurchasePrice").value.trim();
    const agencyCommission = document.getElementById("txtAgencyPropertyCommission").value.trim();
    const purchaseAgent = parseInt(document.getElementById("ddlPurchaseAgent").value);
    const propertyExpireDate = $("#txtPropertyExpireDate").dxDateBox("instance").option("text");
    const result = document.getElementById("spNewPorpertyResult");
    if (location === -1 || type === -1 || address === "" || propertyPurchaseDate === "" || propertyPurchasePrice === "" || agencyCommission === "" || purchaseAgent === -1 || propertyExpireDate === "") {
        result.innerText = 'Si prega di compilare tutti i campi richiesti';
        result.classList.remove("d-none");
        return false;
    }
    btn.disabled = true;
    spinner.classList.remove("d-none");
    result.classList.add("d-none");
    result.innerText = "";
    // TODO SAVE NEW PROPERTY API...  AND EIDT PROPERTY DETAIL API...
    try {
        let proID = document.getElementById('hEditProperty').value;
        let entrPoint = '';
        if (proID !== '') {
            proID = parseInt(proID);
            entrPoint = '/api/property/' + proID;
        } else entrPoint = '/api/property';
        const response = await fetch(entrPoint, {
            method: proID === '' ? "POST" : "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "branch_id": location, "property_type": type, "address": address, "purchase_date": propertyPurchaseDate, "purchase_price": parseFloat(propertyPurchasePrice), "purchase_agency_percentage": parseInt(agencyCommission), "purchase_agent_id": purchaseAgent, "mandate_expiration": propertyExpireDate })
        });
        const res = await response.json();
        if (res.result) {
            const ele = document.getElementsByClassName('pai-tabs');
            loadList();
            if (parseInt(location) === 1) ele[0].children[0].click();
            else if (parseInt(location) === 2) ele[0].children[1].click();
            else if (parseInt(location) === 3) ele[0].children[2].click();
            btn.disabled = false;
            spinner.classList.add("d-none");
            $('#modalAddProperty').modal('hide');
        } else throw new Error("Something went wrong while manipulating the property!");
    } catch (error) {
        btn.disabled = true;
        spinner.classList.remove("d-none");
        result.classList.remove("d-none");
        result.innerText = error.message !== undefined ? error.message : error;
    }
}

function showEditPropertyModal(res, modalTitle) {
    res === null ? document.getElementById('hEditProperty').value = '' : document.getElementById('hEditProperty').value = res[0].id;
    document.getElementById('modalAddPropertyLabel').innerHTML = '<i class="bi bi-buildings me-3"></i>' + modalTitle;
    document.getElementById('ddlPropertyLocation').value = res !== null ? res[0].branch_id : _selectedBranch;
    let propertyName = '';
    if (res !== null) {
        switch (res[0].property_type) {
            case 1: propertyName = "Apartment"; break;
            case 2: propertyName = "Villa"; break;
            case 3: propertyName = "Farmhouse"; break;
        }
    }
    $("#autocompletePropertyType").dxAutocomplete("instance").option("value", propertyName);
    document.getElementById('hTxtPropertyType').value = res !== null ? res[0].property_type : 0;
    document.getElementById('txtPropertyAddress').value = res !== null ? res[0].address : '';
    if (res !== null) $("#txtPropertyPurchaseDate").dxDateBox("instance").option("value", new Date(res[0].purchase_date));
    document.getElementById('txtPropertyPurchasePrice').value = res !== null ? res[0].purchase_price : '';
    document.getElementById('txtAgencyPropertyCommission').value = res !== null ? res[0].purchase_agency_percentage : '';
    document.getElementById('ddlPurchaseAgent').value = res !== null ? res[0].purchase_agent_id : '-1';
    $("#txtPropertyExpireDate").dxDateBox("instance").option("value", res !== null ? new Date(res[0].mandate_expiration) : '');
    let btn = document.getElementById('btnMarkPropertySold');
    btn.classList.add('d-none');
    if (res !== null) {
        if (res[0].sale_date === null) {
            btn.classList.remove('d-none');
            btn.replaceWith(btn.cloneNode(true));
            btn = document.getElementById('btnMarkPropertySold');
            btn.addEventListener('click', function () {
                $('#modalAddProperty').modal('hide');
                showMarkPropertySoldModal(res[0]);
            });
        }
    }
    const modalElement = document.getElementById("modalAddProperty");
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
}

function showMarkPropertySoldModal(data) {
    document.getElementById("hSoldProperty").value = data.id;
    document.getElementById("hPropertyPurchasePrice").value = data.purchase_price;
    const label = document.getElementById("txtAddressDisable");
    if (label !== undefined) label.value = data.address;
    document.getElementById("spMarkPropertySoldResult").innerText = '';
    const modalElement = document.getElementById("modalMarkPropertySold");
    const modal = new bootstrap.Modal(modalElement);
    if (data !== null) modal.show();
    else $('#modalMarkPropertySold').modal('hide');
}

async function savePropertyMarkedAsSold() {
    const btn = document.getElementById("btnSaveMarkPropertySold");
    const spinner = document.getElementById("spinnerMarkPropertySold");
    const date = $("#txtPropertySoldDate").dxDateBox("instance").option("text");
    const salePrice = document.getElementById("txtPropertySoldPrice").value;
    const commission = document.getElementById("txtAgencyPropertySoldCommission").value;
    const agent = document.getElementById("ddlPropertySoldAgent").value;
    const result = document.getElementById("spMarkPropertySoldResult");
    if (date === "" || salePrice === "" || commission === "" || agent === "") {
        result.innerText = "Si prega di compilare tutti i campi richiesti";
        result.classList.remove("d-none");
        return;
    }
    btn.disabled = true;
    spinner.classList.remove("d-none");
    result.classList.add("d-none");
    result.innerText = "";
    const proID = parseInt(document.getElementById('hSoldProperty').value);
    const purchasePrice = parseInt(document.getElementById('hPropertyPurchasePrice').value);
    const delta = parseFloat(parseInt(salePrice) - purchasePrice);
    // TODO SAVE NEW PROPERTY API...  AND EIDT PROPERTY DETAIL API...
    try {
        const response = await fetch('/api/property/sold/' + proID, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "sale_date": date, "sale_price": parseInt(salePrice), "sale_agency_percentage": parseInt(commission), "sale_agent_id": parseInt(agent), "delta": delta })
        });
        const res = await response.json();
        if (res.result) {
            loadList();
            const ele = document.getElementsByClassName('pai-tabs');
            if (parseInt(location) === 1) ele[0].children[0].click();
            else if (parseInt(location) === 2) ele[0].children[1].click();
            else if (parseInt(location) === 3) ele[0].children[2].click();
            btn.disabled = false;
            spinner.classList.add("d-none");
            $('#modalMarkPropertySold').modal('hide');
        } else throw new Error("Something went wrong while manipulating the property!");
    } catch (error) {
        btn.disabled = true;
        spinner.classList.remove("d-none");
        result.classList.remove("d-none");
        result.innerText = error.message !== undefined ? error.message : error;
    }
}

function initAutocompleteControl(data, ctr_id, displayExpr, searchExpr) {
    $(`#${ctr_id}`).dxAutocomplete({
        dataSource: data,
        displayExpr: displayExpr,
        valueExpr: displayExpr,
        placeholder: 'cercare',
        minSearchLength: 2,
        searchExpr: [searchExpr],
        searchTimeout: 300,
        onSelectionChanged: el => {
            if (el.selectedItem) document.getElementById('hTxtPropertyType').value = el.selectedItem.id;
        },
        onContentReady: function (e) {
            const items = e.component.getDataSource().items();
            // console.log("Items in Dropdown:", items);
        },
    });
}