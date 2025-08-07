const softPalette = [
    "#AEC6CF", // Blue-gray
    "#FFE4B5", // Moccasin
    "#D8BFD8", // Thistle
    "#E6E6FA", // Lavender
    "#F5F5DC", // Beige
    "#F0E68C", // Khaki
    "#FADADD", // Pink Mist
    "#E0FFFF", // Light Cyan
    "#FFFACD", // Lemon Chiffon
    "#F5DEB3", // Wheat
    "#E0E0F8", // Light Lavender Blue
    "#FFEFD5", // Papaya Whip
    "#D1EEEE", // Light Turquoise
    "#EED5D2", // Light Rose
    "#C1FFC1", // Pale Green
    "#FFF0F5", // Lavender Blush
    "#F0FFF0", // Honeydew
    "#FDF5E6", // Old Lace
    "#FFDEAD", // Navajo White
    "#FFEBCD"  // Blanched Almond
];

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
        const sortedData = res.payload.sort((a, b) => a.total - b.total);
        $("#listTop10Agents").dxChart({
            title: "Migliori 5 agenti",
            dataSource: sortedData,
            palette: softPalette,
            rotated: true,
            series: {
                argumentField: "agent_name",
                valueField: "total",
                type: "bar",
                name: "Provvigioni"
            },
            argumentAxis: { label: { font: { size: 12 }}},
            valueAxis: { label: { format: { type: "fixedPoint", precision: 0 }}},
            tooltip: {
                enabled: true,
                format: { type: "fixedPoint", precision: 0 }
            },
            legend: {
                visible: true,
                position: 'top',
                horizontalAlignment: 'right',
                verticalAlignment: 'top',
                font: { size: 12 },
                markerSize: 10
            }
        });
    } catch (error) { console.error("Errore nel caricamento dei dati agenti:", error); }
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
            title: "Vendite ultimo anno",
            dataSource: data.reverse(),
            palette: softPalette,
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
                customizeTooltip: function (arg) { return { text: `${arg.argumentText}: ${arg.valueText}` }; }
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
            title: "Immobili in gestione",
            dataSource: data,
            palette: softPalette,
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
