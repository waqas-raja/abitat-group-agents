document.addEventListener("DOMContentLoaded", () => {
    initInternalTabs();
    const htmlEditor = initHtmlEditor("editorNote");
    loadGenericFields(htmlEditor);
    loadListOfLeads();
    initAutocompleteLeads();
});

function loadGenericFields(htmlEditor) {
    //TODO MANCANO API
    htmlEditor.option("value", "");
}

function loadListOfLeads() {
    //TODO MANCANO API
    const data = [{"id": 1, "full_name": "Mario Rossi", "fiscalcode": "RSSMRA80A01H501Z", "jobtitle": "Manager"}];
    const hasData = data && data.length > 0;

    new DevExpress.ui.dxDataGrid(document.getElementById("listOfLeads"), {
        dataSource: data,
        columnAutoWidth: true,
        showBorders: true,
        rowAlternationEnabled: false,
        grouping: { autoExpandAll: false },
        groupPanel: { visible: true, emptyPanelText: "Trascina qui le colonne per raggruppare" },
        columns: [
            { dataField: "full_name", caption: "Nome Cognome", allowFiltering: true },
            { dataField: "fiscalcode", caption: "Codice Fiscale", allowFiltering: true },
            { dataField: "jobtitle", caption: "Ruolo", width: "auto" }
        ],
        paging: { pageSize: 10 },
        pager: { showPageSizeSelector: true, allowedPageSizes: [5, 10, 20], showInfo: true },
        searchPanel: { visible: true, width: 300, placeholder: "Cerca..." },
        toolbar: {
            items: [
                {
                    location: "after",
                    widget: "dxButton",
                    options: {
                        icon: "plus",
                        text: "Collega Lead",
                        onClick: function () {
                            const leadsContent = document.getElementById("autocompleteLeadsContent");
                            leadsContent.classList.remove("visually-hidden");
                            const modalElement = document.getElementById("modalAddCompanyLead");
                            const modal = new bootstrap.Modal(modalElement);
                            modal.show();
                        }
                    }
                }
            ]
        },
        onRowClick: function(e) { if(e.rowType === "data") { window.location = `/contact/${e.data.id}`; } },
    });
}

function initAutocompleteLeads() {
    //TODO MANCANO API
    const data = [
        { id: 1, name: "Mario Rossi" },
        { id: 2, name: "Luigi Bianchi" },
        { id: 3, name: "Carla Verdi" },
        { id: 4, name: "Anna Neri" },
        { id: 5, name: "Paolo Gialli" }
    ];
    $("#autocompleteCompanyLeadName").dxAutocomplete({
        dataSource: new DevExpress.data.DataSource({
            store: data,
            map: function (d) { return {id: d.id, name: d.name, displayText: `${d.name}`}; }
        }),
        displayExpr: "displayText",
        valueExpr: "displayText",
        placeholder: "Cerca per nome e cognome...",
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