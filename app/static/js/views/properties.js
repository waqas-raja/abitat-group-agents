const BRANCHES = { Torino: 1, Moncalieri: 2, Roma: 3 };
let _selectedBranch = BRANCHES.Torino;

document.addEventListener("DOMContentLoaded", async () => {
    initInternalTabs();
    showDataAsPerLoggedUser();
    await Promise.all([
        populateDropdown('ddlPropertyLocation', 'branches', '--Seleziona la sede--'),
        populateDropdown('ddlPropertyType', 'property-types', '--Seleziona il tipo di proprietà--'),
        loadAgentFromBranch(),
        loadList(_selectedBranch)
    ]);
    initDateControl("txtPropertySoldDate", true);
    initDateControl("txtPropertyAcquisitionDate", true);
    initDateControl("txtPropertyAcquisitionDate", true);
    initDateControl("txtPropertyExpireDate");

});

function showDataAsPerLoggedUser() {
    if (localStorage.ulocation !== "null") {
        _selectedBranch = localStorage.ulocation;
        const tabs = document.querySelectorAll('.pai-tab');
        tabs.forEach((ele) => { ele.classList.add('visually-hidden'); });
        switch (parseInt(localStorage.ulocation)) {
            case BRANCHES.Torino: document.getElementById('tabTorino').classList.remove("visually-hidden"); break;
            case BRANCHES.Moncalieri: document.getElementById('tabMoncalieri').classList.remove("visually-hidden"); break;
            case BRANCHES.Roma: document.getElementById('tabRoma').classList.remove("visually-hidden"); break;
        }
    }
}

async function populateDropdown(ctrl_id, entry_point, title) {
    const response = await fetch('/api/' + entry_point);
    const r = await response.json();
    const ddlLocation = document.getElementById(ctrl_id);
    ddlLocation.innerHTML = '<option value="-1" selected disabled>' + title + '</option>';
    r.payload.forEach(el => { ddlLocation.innerHTML += `<option value="${el.id}">${el.name}</option>`; });
}

async function changeBranch(branch_id) {
    _selectedBranch = branch_id;
    await loadList();
    await loadAgentFromBranch();
}

async function loadAgentFromBranch() {
    const ddl = document.getElementById("ddlAcquisitionAgent");
    ddl.innerHTML = '<option value="-1" selected disabled>--Seleziona agente--</option>';
    const ddlSold = document.getElementById("ddlPropertySoldAgent");
    ddlSold.innerHTML = '<option value="-1" selected disabled>--Seleziona agente--</option>';
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
        keyExpr: "id",
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
                    { dataField: "property_name", caption: "Tipologia", allowFiltering: true },
                    { dataField: "city", caption: "Città", allowFiltering: true },
                    { dataField: "address", caption: "Indirizzo", allowFiltering: true },
                ]
            },
            {
                caption: "Acquisizione",
                alignment: "center",
                cssClass: "alert alert-warning rounded-0",
                columns: [
                    {
                        dataField: "acquisition_date",
                        caption: "Data",
                        allowFiltering: true,
                        calculateCellValue: function (data) {
                            const d = (data.acquisition_date).split('-');
                            return d[2] + '/' + d[1] + '/' + d[0];
                        }
                    },
                    {
                        dataField: "last_price",
                        caption: "Prezzo",
                        allowFiltering: false,
                        calculateCellValue: function (data) {
                            return formatNumber(parseFloat(data.last_price));
                        }
                    },
                    {
                        dataField: "acquisition_agency_percentage",
                        caption: "% Abitat",
                        allowFiltering: false,
                        calculateCellValue: function (data) {
                            return (data.acquisition_agency_percentage) + " %";
                        }
                    },
                    { dataField: "acquisition_agent", caption: "Agente", allowFiltering: true },
                    {
                        dataField: "acquisition_agent_percentage",
                        caption: "% Agente",
                        allowFiltering: false,
                        calculateCellValue: function (data) {
                            return (data.acquisition_agent_percentage) + " %";
                        }
                    },
                    {
                        dataField: "mandate_expiration",
                        caption: "Scadenza",
                        allowFiltering: true,
                        sortIndex: 1,
                        sortOrder: "asc",
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
                        sortIndex: 0,
                        sortOrder: "asc",
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
                        allowFiltering: false,
                        calculateCellValue: function (data) {
                            if (data.sale_price !== null) return formatNumber(parseFloat(data.sale_price));
                        }
                    },
                    {
                        dataField: "sale_percentage",
                        caption: "% Abitat",
                        allowFiltering: false,
                        calculateCellValue: function (data) {
                            if (data.sale_agency_percentage !== null && data.sale_agency_percentage > 0) return data.sale_agency_percentage + " %";
                            else return '';
                        }
                    },
                    { dataField: "sale_agent_name", caption: "Agente", allowFiltering: true },
                    {
                        dataField: "sale_agent_percentage",
                        caption: "% Agente",
                        allowFiltering: false,
                        calculateCellValue: function (data) {
                            const val = data.sale_agent_percentage;
                            return (val !== null && val !== undefined) ? val + " %" : "";
                        }
                    },
                ]
            },
        ],
        sorting: {mode: "multiple"},
        masterDetail: {
            enabled: true,
            template: function (container, options) {
                const propertyData = options.data;
                const details = propertyData.details || [];
                // 1) Creiamo un contenitore flex per titolo + bottone
                const headerWrapper = $("<div>")
                    .css({
                        display: "flex",
                        "justify-content": "space-between",
                        "align-items": "center",
                        "padding-bottom": "8px"
                    })
                    .appendTo(container);
                $("<div>")
                    .text("Elenco delle riduzioni di prezzo")
                    .css({"font-size": "1rem", "font-weight": "500"})
                    .appendTo(headerWrapper);
                $("<div>")
                    .appendTo(headerWrapper)
                    .dxButton({
                        text: "Aggiungi un ribasso",
                        icon: "add",
                        onClick: function () {
                            $("#hPropertyNewPrice").val(propertyData.id);
                            const fullAddress = propertyData.address + ", " + propertyData.city;
                            $("#txtAddressNewPrice").val(fullAddress);
                            $("#spNewPriceResult").val("");
                            $("#modalAddNewPrice").modal("show");
                        }
                    });
                $("<div>")
                    .addClass("internal-grid")
                    .appendTo(container)
                    .dxDataGrid({
                        dataSource: details,
                        columnAutoWidth: true,
                        showBorders: true,
                        width: "100%",
                        columns: [
                            {
                                dataField: "date",
                                caption: "Data",
                                calculateCellValue: function (data) {
                                    const iso = data.date.split(" ")[0]; // "YYYY-MM-DD"
                                    const parts = iso.split("-");
                                    return parts[2] + "/" + parts[1] + "/" + parts[0];
                                }
                            },
                            {
                                dataField: "new_price",
                                caption: "Prezzo",
                                calculateCellValue: function (data) {
                                    return formatNumber(parseFloat(data.new_price));
                                }
                            },
                            {
                                dataField: "user",
                                caption: "Utente",
                                allowFiltering: true
                            }
                        ],

                        // 3) Ordinamento decrescente per data (anche se il server già manda i dettagli ordinati, ridondante ma sicuro)
                        sort: [{ selector: "date", desc: true }],

                        // 4) Paging per la griglia interna
                        paging: { pageSize: 5 },
                        pager: { visible: true, showInfo: true }
                    });
            }
        },
        remoteOperations: { paging: true, filtering: true, sorting: true },
        paging: { pageSize: 10 },
        pager: { showPageSizeSelector: true, allowedPageSizes: [5, 10, 20], showInfo: true },
        toolbar: { items: ["groupPanel", "searchPanel" ] },
        onRowPrepared: function (e) {
            if (e.rowType === 'data' && e.data.sale_date) {
                $(e.rowElement).addClass('row-sold');
            }
        },
        onRowClick: function (e) {
            if ($(e.event.target).closest(".dx-datagrid-expand").length) {
                e.event.stopPropagation();
                return;
            }
            if (e.rowType === "data") {
                if (e.data.sale_date) return; // Disabilita click se venduto
                const res = r.payload.length === 1 ? r.payload : r.payload.filter(el => el.id === parseInt(e.data.id));
                showModalAddEditProperty(res, 'Dettaglio immobile');
            }
        },
    });
}

async function saveProperty() {
    const btn = document.getElementById("btnSaveProperty");
    const spinner = document.getElementById("spinnerNewProperty");
    const location = parseInt(document.getElementById("ddlPropertyLocation").value);
    const type = parseInt(document.getElementById("ddlPropertyType").value);
    const address = document.getElementById("txtPropertyAddress").value.trim();
    const city = document.getElementById("txtPropertyCity").value.trim();
    const propertyAcquisitionDate = $("#txtPropertyAcquisitionDate").dxDateBox("instance").option("text");
    const propertyAcquisitionPrice = document.getElementById("txtPropertyAcquisitionPrice").value.trim();
    const agencyCommission = document.getElementById("txtAgencyPropertyCommission").value.trim();
    const acquisitionAgent = parseInt(document.getElementById("ddlAcquisitionAgent").value);
    const propertyExpireDate = $("#txtPropertyExpireDate").dxDateBox("instance").option("text");
    const result = document.getElementById("spNewPorpertyResult");
    if (
        location === -1 || type === -1 || address === "" || city === "" || propertyAcquisitionDate === "" ||
        propertyAcquisitionPrice === "" || agencyCommission === "" || acquisitionAgent === -1 ||
        propertyExpireDate === ""
    ) {
        result.innerText = 'Si prega di compilare tutti i campi richiesti';
        result.classList.remove("d-none");
        return false;
    }
    btn.disabled = true;
    spinner.classList.remove("d-none");
    result.classList.add("d-none");
    result.innerText = "";
    try {
        const proID = document.getElementById('hEditProperty').value;
        const entrPoint = proID !== '' ? `/api/property/${proID}` : '/api/property';
        const response = await fetch(entrPoint, {
            method: proID === '' ? "POST" : "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                "branch_id": location,
                "property_type": type,
                "address": address,
                "city": city,
                "acquisition_date": propertyAcquisitionDate,
                "acquisition_price": parseFloat(propertyAcquisitionPrice),
                "acquisition_agency_percentage": parseInt(agencyCommission),
                "acquisition_agent_id": acquisitionAgent,
                "mandate_expiration": propertyExpireDate
            })
        });
        const res = await response.json();
        if (res.result) {
            const ele = document.getElementsByClassName('pai-tabs');
            await loadList();
            if (parseInt(location) === 1) ele[0].children[0].click();
            else if (parseInt(location) === 2) ele[0].children[1].click();
            else if (parseInt(location) === 3) ele[0].children[2].click();
            btn.disabled = false;
            spinner.classList.add("d-none");
            $('#modalAddProperty').modal('hide');
        } else {
            debugger;
            throw new Error("Si sono verificati degli errori");
        }
    } catch (error) {
        btn.disabled = false;
        spinner.classList.add("d-none");
        result.classList.remove("d-none");
        result.innerText = error.message !== undefined ? error.message : error;
    }
}

function showModalAddEditProperty(res, modalTitle) {
    const prop = res === null ? null : res[0];
    const isDetail = res !== null;
    document.getElementById('hEditProperty').value = isDetail ? prop.id : '';
    document.getElementById('modalAddPropertyLabel').innerHTML = '<i class="bi bi-buildings me-3"></i>' + modalTitle;
    document.getElementById('btnSaveProperty').style.display = isDetail ? "none" : "inline";
    document.getElementById('ddlPropertyLocation').value = isDetail ? prop.branch_id : _selectedBranch;
    document.getElementById('ddlPropertyLocation').disabled = isDetail;
    document.getElementById('ddlPropertyType').value = isDetail ? prop.property_type : -1;
    document.getElementById('ddlPropertyType').disabled = isDetail;
    document.getElementById('txtPropertyAddress').value = isDetail ? prop.address : '';
    document.getElementById('txtPropertyAddress').disabled = isDetail;
    document.getElementById('txtPropertyCity').value = isDetail ? prop.city : '';
    document.getElementById('txtPropertyCity').disabled = isDetail;
    if(isDetail) $("#txtPropertyAcquisitionDate").dxDateBox("instance").option("value", new Date(prop.acquisition_date));
    $("#txtPropertyAcquisitionDate").dxDateBox("instance").option("disabled", isDetail);
    document.getElementById('txtPropertyAcquisitionPrice').value = isDetail ? prop.acquisition_price : '';
    document.getElementById('txtPropertyAcquisitionPrice').disabled = isDetail;
    document.getElementById('txtAgencyPropertyCommission').value = isDetail ? prop.acquisition_agency_percentage : '3';
    document.getElementById('txtAgencyPropertyCommission').disabled = isDetail;
    document.getElementById('ddlAcquisitionAgent').value = isDetail ? prop.acquisition_agent_id : '-1';
    document.getElementById('ddlAcquisitionAgent').disabled = isDetail;
    $("#txtPropertyExpireDate").dxDateBox("instance").option("value", isDetail ? new Date(prop.mandate_expiration) : '');
    $("#txtPropertyExpireDate").dxDateBox("instance").option("disabled", isDetail);
    document.getElementById("spNewPorpertyResult").innerHTML = '';

    document.getElementById('btnAddPriceReduction').style.display = isDetail ? "inline" : "none";

    let btnMarkPropertySold = document.getElementById('btnMarkPropertySold');
    btnMarkPropertySold.classList.add('d-none');
    if (isDetail) {
        if (prop.sale_date === null) {
            btnMarkPropertySold.classList.remove('d-none');
            btnMarkPropertySold.replaceWith(btnMarkPropertySold.cloneNode(true));
            btnMarkPropertySold = document.getElementById('btnMarkPropertySold');
            btnMarkPropertySold.addEventListener('click', function () {
                $('#modalAddProperty').modal('hide');
                showMarkPropertySoldModal(prop);
            });
        }
    }



    let btnAddPriceReduction = document.getElementById('btnAddPriceReduction');
    btnAddPriceReduction.classList.add('d-none');
    if (isDetail) {
        if (prop.sale_date === null) {
            btnAddPriceReduction.classList.remove('d-none');
            btnAddPriceReduction.replaceWith(btnAddPriceReduction.cloneNode(true));
            btnAddPriceReduction = document.getElementById('btnAddPriceReduction');
            btnAddPriceReduction.addEventListener('click', function () {
                $('#modalAddProperty').modal('hide');
                showPropertyNewPriceModal(prop);
            });
        }
    }


    const modalElement = document.getElementById("modalAddProperty");
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
}

function showMarkPropertySoldModal(data) {
    document.getElementById("hSoldProperty").value = data.id;
    const label = document.getElementById("txtAddressDisable");
    if (label !== undefined) label.value = data.address + " - " + data.city;
    document.getElementById("spMarkPropertySoldResult").innerText = '';
    const modalElement = document.getElementById("modalMarkPropertySold");
    const modal = new bootstrap.Modal(modalElement);
    if (data !== null) modal.show();
    else $('#modalMarkPropertySold').modal('hide');
}

function showPropertyNewPriceModal(data) {
    document.getElementById("hPropertyNewPrice").value = data.id;
    const label = document.getElementById("txtAddressNewPrice");
    if (label !== undefined) label.value = data.address + " - " + data.city;
    document.getElementById("spNewPriceResult").innerText = '';
    const modalElement = document.getElementById("modalAddNewPrice");
    const modal = new bootstrap.Modal(modalElement);
    if (data !== null) modal.show();
    else $('#modalAddNewPrice').modal('hide');
}

async function savePropertyMarkedAsSold() {
    const btn = document.getElementById("btnSaveMarkPropertySold");
    const spinner = document.getElementById("spinnerMarkPropertySold");
    const date = $("#txtPropertySoldDate").dxDateBox("instance").option("text");
    const salePrice = document.getElementById("txtPropertySoldPrice").value;
    const commission = document.getElementById("txtAgencyPropertySoldCommission").value;
    const agent = document.getElementById("ddlPropertySoldAgent").value;
    const saleDownPayment = document.getElementById("txtSaleDownPayment").value;
    const externalAgency = document.getElementById("ddlExternalAgencyType").value;
    const externalAgencyName = document.getElementById("txtExternalAgencyName").value;
    const externalAgencyValue = document.getElementById("txtExternalAgencyValue").value;
    const result = document.getElementById("spMarkPropertySoldResult");
    if (date === "" || salePrice === "" || commission === "" || agent === "-1") {
        result.innerText = "Si prega di compilare tutti i campi richiesti";
        result.classList.remove("d-none");
        return;
    }
    if(externalAgency !== "N" && (externalAgencyName === "" || externalAgencyValue === "0")) {
        result.innerText = "Indicare i dati dell'agenzia esterna";
        result.classList.remove("d-none");
        return;
    }
    btn.disabled = true;
    spinner.classList.remove("d-none");
    result.classList.add("d-none");
    result.innerText = "";
    const proID = parseInt(document.getElementById('hSoldProperty').value);
    try {
        const response = await fetch('/api/property/sold/' + proID, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                sale_date: date,
                sale_price: parseInt(salePrice),
                sale_agency_percentage: parseInt(commission),
                sale_agent_id: parseInt(agent),
                sale_down_payment: parseFloat(saleDownPayment),
                external_agency: externalAgency,
                external_agency_name: externalAgencyName,
                external_agency_value: parseFloat(externalAgencyValue)
            })
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
        } else throw new Error("Si sono verificati degli errori");
    } catch (error) {
        btn.disabled = false;
        spinner.classList.add("d-none");
        result.classList.remove("d-none");
        result.innerText = error.message !== undefined ? error.message : error;
    }
}

function ddlExternalAgencyType_change(ddl) {
    document.getElementById("txtExternalAgencyName").disabled = ddl.value === "N";
    document.getElementById("txtExternalAgencyValue").disabled = ddl.value === "N";
    const asterisks = document.getElementsByClassName("asteriskExternalAgency");
    Array.from(asterisks).forEach(el => el.style.display = ddl.value !== "N");
}

async function saveNewPrice() {
    const btn = document.getElementById("btnSaveNewPrice");
    const spinner = document.getElementById("spinnerNewPrice");
    const newPrice = document.getElementById("txtNewPrice").value;
    const result = document.getElementById("spNewPriceResult");
    if (newPrice === "" || newPrice < 1) {
        result.innerText = "Il valore inserito non risulta corretto";
        result.classList.remove("d-none");
        return;
    }
    btn.disabled = true;
    spinner.classList.remove("d-none");
    result.classList.add("d-none");
    result.innerText = "";
    const proID = parseInt(document.getElementById('hPropertyNewPrice').value);
    try {
        const response = await fetch('/api/property/new-price/' + proID, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ new_price: parseInt(newPrice) })
        });
        const res = await response.json();
        if (res.result) {
            await loadList();
            const ele = document.getElementsByClassName('pai-tabs');
            if (parseInt(location) === 1) ele[0].children[0].click();
            else if (parseInt(location) === 2) ele[0].children[1].click();
            else if (parseInt(location) === 3) ele[0].children[2].click();
            btn.disabled = false;
            spinner.classList.add("d-none");
            $('#modalAddNewPrice').modal('hide');
        } else throw new Error("Si sono verificati degli errori");
    } catch (error) {
        btn.disabled = false;
        spinner.classList.add("d-none");
        result.classList.remove("d-none");
        result.innerText = error.message !== undefined ? error.message : error;
    }
}