const GL_SVILUPPO = 1;
const SVILUPPO_PERSONALE = 2;
const CREDITIS = 3;

const WAITING = 1;
const WORKING = 2;
const CLOSED = 3;
const PRIORITY = 4;

document.addEventListener("DOMContentLoaded", init);

async function init() {
    try {
        const response = await fetch("/api/dashboard");
        const data = await response.json();
        if(data.payload === undefined) throw new Error("Data payload is undefined");
        loadChart('pieGlSviluppo', data.payload.charts_info[0]);
        loadChart('pieSviluppoPersonale', data.payload.charts_info[1]);
        loadChart('pieCreditis', data.payload.charts_info[2]);
        loadListOfCalls(data.payload.calls);
    } catch (error) { console.error("Errore durante la chiamata:", error); }
}

function loadChart(chartId, data) {
    const transformedData = [
        { category: "Prioritario", value: data.priority },
        { category: "In Gestione", value: data.working },
        { category: "Da Lavorare", value: data.waiting },
        { category: "Chiusi", value: data.closed }
    ];
    new DevExpress.viz.dxPieChart(document.getElementById(chartId), {
        type: "doughnut",
        dataSource: transformedData,
        title: null,
        legend: {
            visible: true,
            position: "right",
            font: { size: 14 },
            customizeItems: function (items) {
                // Aggiunge il valore numerico accanto al nome della categoria
                return items.map((item, index) => {
                    item.text += ` (${transformedData[index].value})`;
                    return item;
                });
            }
        },
        palette: ["#fbbc05", "#ed7d31", "#4472c4", "#a5a5a5"],
        series: [{
            argumentField: "category",
            valueField: "value",
            label: { visible: false }
        }],
        tooltip: { enabled: false },
        onPointClick: function (e) {
            let st = "";
            let list = "";
            switch (e.target.argument.replaceAll(" ", "_").toLowerCase()) {
                case "priorirario": st = PRIORITY; break;
                case "in_gestione": st = WORKING; break;
                case "da_lavorare": st = WAITING; break;
                case "chiusi": st = CLOSED; break;
            }
            switch (chartId) {
                case "pieGlSviluppo": list = GL_SVILUPPO; break;
                case "pieSviluppoPersonale": list = SVILUPPO_PERSONALE; break;
                case "pieCreditis": list = CREDITIS; break;
            }
            window.location.href = "/contact/pie/" + list + "/" + st;
        }
    });
}

function loadListOfCalls(data) {

    data = [
        {
            id: 1,
            contact_name: "Mario Rossi",
            event_dt: new Date(2024, 11, 29), // 29 dicembre 2024
            event_hour: new Date(2024, 11, 29, 10, 30), // 10:30
            phone1: "+39 333 1234567",
            owner_note: "Chiamata per discutere del contratto di prestito personale"
        },
        {
            id: 2,
            contact_name: "Luisa Bianchi",
            event_dt: new Date(2024, 11, 28), // 28 dicembre 2024
            event_hour: new Date(2024, 11, 28, 15, 45), // 15:45
            phone1: "+39 333 9876543",
            owner_note: "Follow-up per ricezione dei documenti richiesti"
        }
    ];


    new DevExpress.ui.dxDataGrid(document.getElementById("listOfCalls"), {
        dataSource: data,
        columnAutoWidth: true,
        showBorders: true,
        rowAlternationEnabled: false,
        grouping: { autoExpandAll: false },
        groupPanel: { visible: true, emptyPanelText: "Trascina qui le colonne per raggruppare" },
        columns: [
            { dataField: "contact_name", caption: "Cliente" },
            { dataField: "event_dt", caption: "Data", dataType: "date", format: "dd/MM/yyyy" },
            { dataField: "event_hour", caption: "Orario", dataType: "date", format: "HH:mm" },
            { dataField: "phone1", caption: "Telefono" },
            { dataField: "owner_note", caption: "Descrizione" },
        ],
        paging: { pageSize: 10 },
        pager: { showPageSizeSelector: true, allowedPageSizes: [5, 10, 20], showInfo: true },
        searchPanel: { visible: true, width: 300, placeholder: "Cerca..." },
        onRowClick: function(e) { if(e.rowType === "data") { window.location = `/contact/${e.data.id}`; } },
    });
}