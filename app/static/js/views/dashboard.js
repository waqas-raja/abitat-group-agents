
document.addEventListener("DOMContentLoaded", async () => {
    await Promise.all([
        loadTop10Agents(),
        loadStatsHistogram(),
        loadStatsPie()
    ]);
});

async function loadTop10Agents() {
    try {
        const response = await fetch("/api/stats/top-agents");
        const res = await response.json();
        $("#listTop10Agents").dxDataGrid({
            dataSource: res.payload,
            columnAutoWidth: true,
            allowColumnResizing: true,
            allowColumnReordering: true,
            showBorders: true,
            noDataText: "Nessun dato disponibile",
            rowAlternationEnabled: true,
            columns: [
                { dataField: "agent_name", caption: "Nome" },
                { dataField: "agency", caption: "Agenzia" },
                { dataField: "total", caption: "Commissioni" }
            ],
            paging: { pageSize: 10 },
            pager: {
                showPageSizeSelector: true,
                allowedPageSizes: [5, 10, 20],
                showInfo: true
            }
        });
    } catch (error) {
        console.error("Errore nel caricamento dei dati agenti:", error);
    }
}

async function loadStatsHistogram() {
    try {
        const response = await fetch("/api/stats/histogram");
        const res = await response.json();
        const data = [];
        const oggi = new Date();
        for (let i = 0; i < 12; i++) {
            const meseCorrente = new Date(oggi.getFullYear(), oggi.getMonth() - i);
            data.push({
                bin: meseCorrente.toLocaleString('it-IT', { month: 'long' }),
                freq: parseInt(res.payload[0][`M${i + 1}`])
            });
        }
        $("#statsHistogram").dxChart({
            dataSource: data.reverse(),
            palette: [
                "#C1CAD0","#B7C8D1","#ADC6D2","#A3C4D3","#98C2D4",
                "#8EC0D5","#84BED6","#7ABCD7","#70BAD8","#66B8D9",
                "#5BB5DB","#51B3DC"
            ],
            commonSeriesSettings: { type: "bar", barPadding: 0.1 },
            series: [{
                argumentField: "bin",    // nome del mese
                valueField: "freq",      // valore per quel mese
                name: "Vendite mensili"
            }],
            valueAxis: { title: { text: "Numero vendite" }, min: 0 },
            legend: { visible: false },
            tooltip: {
                enabled: true,
                customizeTooltip: function(arg) { return { text: `${arg.argumentText}: ${arg.valueText}` }; }
            }
        });
    } catch (error) {
        console.error("Errore nel caricamento delle statistiche di vendita:", error);
    }
}

async function loadStatsPie() {
    try {
        const response = await fetch("/api/stats/pie");
        const res = await response.json();
        const data = res.payload.filter(item => item.qt > 0);
        $("#statsPie").dxPieChart({
            dataSource: data,
            palette: [
                "#C1CAD0","#B7C8D1","#ADC6D2","#A3C4D3","#98C2D4",
                "#8EC0D5","#84BED6","#7ABCD7","#70BAD8","#66B8D9",
                "#5BB5DB","#51B3DC","#47B1DD","#3DAFDE","#33ADDF",
                "#29ABE0","#1EA9E1","#14A7E2","#0AA5E3","#00A3E4"
            ],
            type: "pie",
            series: {
                argumentField: "name",
                valueField: "qt",
            },
            tooltip: {
                enabled: true,
                customizeTooltip: p => ({ text: `${p.argumentText}: ${p.value}` })
            },
            legend: {
                horizontalAlignment: "center",
                verticalAlignment: "bottom"
            }
        });
    } catch (error) {
        console.error("Errore nel caricamento delle statistiche di tipologia:", error);
    }
}
