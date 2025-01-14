document.addEventListener("DOMContentLoaded", async () => {
    loadOverview();
    initInternalTabs();
    loadListOfCalls();
    loadListOfRequests();
    await loadContactActivityStatus();
    initAutocompleteCompanies();
    initAutocompleteCompanyLeadName();
    //loadNationality();
    //loadProfessions();
    //loadLists();
    //loadTypeOfIdentificationDocument();
});

async function loadOverview() {
    const id = document.getElementById("hContactId").value.trim();
    const response = await fetch(`/api/contact/${id}`);
    const json = await response.json();
    if(json.payload !== undefined) {
        const el = json.payload;
        document.getElementById("spName").innerText = el.name + " " + el.surname;
        document.getElementById("spProfession").innerText = el.profession_name ?? "n.d.";
        document.getElementById("spEmail").innerText = el.email ?? "n.d.";
        document.getElementById("spPec").innerText = el.pec ?? "n.d.";
        document.getElementById("spPhone1").innerText = el.phone1 ?? "n.d.";
        document.getElementById("spPhone2").innerText = el.phone2 ?? "n.d.";
        document.getElementById("spSalesperson").innerText = el.agent_name ?? "n.d.";
        document.getElementById("spList").innerText = el.list_name ?? "n.d.";
        document.getElementById("spSource").innerText = el.source_name ?? "n.d.";
        document.getElementById("spCompany").innerText = "n.d."; //TODO ELI :: manca nella risposta
        document.getElementById("spCobligor").innerText = "n.d."; //TODO ELI :: manca nella risposta
    }
}

async function loadContactActivityStatus() {
    const response = await fetch("/api/contact-activity-status");
    const json = await response.json();
    const ddl = document.getElementById("ddlContactActivityStatus");
    ddl.innerHTML = "";
    const defaultOption = document.createElement("option");
    defaultOption.textContent = "Seleziona la chiusura";
    defaultOption.value = "";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    ddl.appendChild(defaultOption);
    const sortedData = json.payload.sort((a, b) => a.name.localeCompare(b.name));
    sortedData.forEach(element => {
        const option = document.createElement("option");
        option.value = element.id;
        option.textContent = element.name;
        option.setAttribute("data-category", element.category);
        option.setAttribute("data-definitive", element.definitive);
        ddl.appendChild(option);
    });
}


async function saveNewStatus() {
    const new_status = document.getElementById("ddlContactActivityStatus").value;
    //TODO ELI :: terminare salvataggio
}

function loadListOfCalls() {
    const data = getCallsData();
    new DevExpress.ui.dxDataGrid(document.getElementById("listOfCalls"), {
        dataSource: data,
        columnAutoWidth: true,
        showBorders: true,
        rowAlternationEnabled: false,
        keyExpr: "id",
        paging: { pageSize: 10 },
        pager: { showPageSizeSelector: true, allowedPageSizes: [5, 10, 20], showInfo: true },
        columns: [
            {
                caption: "Quando",
                calculateCellValue: function (data) {
                    const eventDate = new Date(data.event_dt);
                    return eventDate.toLocaleDateString("it-IT") + " alle " + eventDate.toLocaleTimeString("it-IT", { hour: '2-digit', minute: '2-digit' });
                }
            },
            { dataField: "response", caption: "Esito" },
            { dataField: "operator", caption: "Operatore" },
            { dataField: "owner_note", caption: "Note" },
            { dataField: "extraction", caption: "Estrazione" },
        ],
        masterDetail: {
            enabled: true,
            template: function (container, options) {
                const details = options.data.details;
                // Creazione della sotto-griglia
                $("<div>")
                    .addClass("internal-grid")
                    .appendTo(container)
                    .dxDataGrid({
                        dataSource: details,
                        columnAutoWidth: true,
                        showBorders: true,
                        columns: [
                            {
                                caption: "Quando",
                                calculateCellValue: function (data) {
                                    const eventDate = new Date(data.event_dt);
                                    return eventDate.toLocaleDateString("it-IT") + " alle " + eventDate.toLocaleTimeString("it-IT", { hour: '2-digit', minute: '2-digit' });
                                }
                            },
                            { dataField: "response", caption: "Esito" },
                            { dataField: "operator", caption: "Operatore" },
                            { dataField: "owner_note", caption: "Note" },
                            { dataField: "extraction", caption: "Estrazione" },
                        ]
                    });
            }
        }
    });
}

function getCallsData() {
    return [
        {
            id: 1,
            event_dt: "2024-12-29T10:30:00",
            operator: "Francesco Neri",
            owner_note: "Discussione contratto per prestito personale",
            response: "PRATICA LIQUIDATA",
            definitive: 1,
            extraction: "",
            details: [
                {
                    event_dt: "2024-12-28T17:45:00",
                    operator: "Silvia Rossi",
                    owner_note: "Chiamata di follow-up per documenti mancanti",
                    response: "ATTESA DOCUMENTI",
                    definitive: 0,
                    extraction: "",
                },
                {
                    event_dt: "2024-12-27T14:20:00",
                    operator: "Silvia Rossi",
                    owner_note: "Prima chiamata per verifica preliminare",
                    response: "INTERESSATO",
                    definitive: 0,
                    extraction: "",
                }
            ]
        },
        {
            id: 2,
            event_dt: "2024-12-27T09:00:00",
            operator: "Luca Bianchi",
            owner_note: "Discussione contratto per prestito consolidamento",
            response: "PRATICA RESPINTA",
            definitive: 1,
            extraction: "",
            details: [
                {
                    event_dt: "2024-12-26T15:30:00",
                    operator: "Anna Verdi",
                    owner_note: "Follow-up per conferma reddito netto",
                    response: "ATTESA CONFERMA PREVENTIVO",
                    definitive: 0,
                    extraction: "",
                },
                {
                    event_dt: "2024-12-25T10:00:00",
                    operator: "Anna Verdi",
                    owner_note: "Chiamata iniziale per proposta consolidamento",
                    response: "SVILUPPARE PREVENTIVO",
                    definitive: 0,
                    extraction: "",
                }
            ]
        },
        {
            id: 3,
            event_dt: "2024-12-30T11:00:00",
            operator: "Mario Gallo",
            owner_note: "Proposta prestito per pensionato",
            response: "NON INTERESSATO",
            definitive: 1,
            extraction: "",
            details: [
                {
                    event_dt: "2024-12-29T16:30:00",
                    operator: "Mario Gallo",
                    owner_note: "Chiamata di follow-up",
                    response: "INVITATO WA",
                    definitive: 0,
                    extraction: "",
                },
                {
                    event_dt: "2024-12-28T12:00:00",
                    operator: "Silvia Rossi",
                    owner_note: "Prima chiamata per offerta prestito",
                    response: "NON ACCETTA PREVENTIVO",
                    definitive: 0,
                    extraction: "",
                }
            ]
        }
    ];
}


function loadListOfRequests() {
    //TODO MANCANO API
    const data = [
        {
            "dt": "2025-01-01",
            "code": "P001",
            "product": "Prestito Personale",
            "reason": "Acquisto Auto",
            "expositions": 1,
            "total": 15000,
            "status": "Approvato"
        },
        {
            "dt": "2025-01-02",
            "code": "P002",
            "product": "Prestito Personale",
            "reason": "Acquisto Prima Casa",
            "expositions": 1,
            "total": 120000,
            "status": "In Revisione"
        }
    ];

    new DevExpress.ui.dxDataGrid(document.getElementById("listOfRequests"), {
        dataSource: data,
        columnAutoWidth: true,
        showBorders: true,
        rowAlternationEnabled: false,
        columns: [
            { dataField: "dt", caption: "Data", dataType: "date" },
            { dataField: "code", caption: "Codice interno", width: "auto" },
            { dataField: "product", caption: "Prodotto", width: "auto" },
            { dataField: "reason", caption: "Motivazione", width: "auto" },
            { dataField: "expositions", caption: "Esposizione", width: "auto" },
            { dataField: 'total', caption: 'Totale', width: "auto", dataType: 'number', format: 'currency', alignment: 'right' },
            { dataField: "status", caption: "Stato", width: "auto" }
        ],
        paging: { pageSize: 10 },
        pager: { showPageSizeSelector: true, allowedPageSizes: [5, 10, 20], showInfo: true }
    });
}

function initAutocompleteCompanies() {
    const testData = [
        { id: 1, name: "Azienda 1" },
        { id: 2, name: "Azienda 2" },
        { id: 3, name: "Azienda 3" },
        { id: 4, name: "Azienda 4" },
        { id: 5, name: "Azienda 5" }
    ];
    $("#autocompleteCompanyLeadBizname").dxAutocomplete({
        dataSource: new DevExpress.data.DataSource({
            store: testData,
            map: function (d) { return { id: d.id, name: d.name, displayText: `${d.name}` }; }
        }),
        displayExpr: "displayText",
        valueExpr: "displayText",
        placeholder: "Cerca per ragione sociale...",
        minSearchLength: 2,
        searchExpr: "name",
        onSelectionChanged: function (e) {
            if (e.selectedItem) {
                const selectedContact = e.selectedItem;
                console.log("Selected Contact ID:", selectedContact.id);
                console.log("Selected Contact Name:", selectedContact.name);
            }
        }
    });
}

function initAutocompleteCompanyLeadName() {
    const testData = [
        { id: 1, name: "Azienda 1" },
        { id: 2, name: "Azienda 2" },
        { id: 3, name: "Azienda 3" },
        { id: 4, name: "Azienda 4" },
        { id: 5, name: "Azienda 5" }
    ];
    $("#autocompleteCompanyLeadPersonName").dxAutocomplete({
        dataSource: new DevExpress.data.DataSource({
            store: testData,
            map: function (d) { return { id: d.id, name: d.name, displayText: `${d.name}` }; }
        }),
        displayExpr: "displayText",
        valueExpr: "displayText",
        placeholder: "Cerca per nome del lead...",
        minSearchLength: 2,
        searchExpr: "name",
        onSelectionChanged: function (e) {
            if (e.selectedItem) {
                const selectedContact = e.selectedItem;
                console.log("Selected Lead ID:", selectedContact.id);
                console.log("Selected Lead Name:", selectedContact.name);
            }
        }
    });
}

async function addConnectedPerson() {
    let text = "Connected person is going to add in the system";
    if (confirm(text) === true) {
        const modalElement = document.getElementById("modalAddConnectedPerson");
        // const modal = new bootstrap.Modal(modalElement);
        modalElement.classList.remove("show");
        modalElement.style.display = "none";
        document.body.classList.remove("modal-open");
        document.querySelector(".modal-backdrop").remove();
    }
}




