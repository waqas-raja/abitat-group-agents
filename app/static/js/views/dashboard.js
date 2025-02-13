const dataSource = [
    { city: 'Torino', month: 'Jan', apartments: 40, houses: 30, villas: 15, apartmentsValue: 100, housesValue: 150, villasValue: 70 },
    { city: 'Moncalieri', month: 'Jan', apartments: 40, houses: 30, villas: 15, apartmentsValue: 40, housesValue: 60, villasValue: 55 },
    { city: 'Roma', month: 'Jan', apartments: 10, houses: 20, villas: 30, apartmentsValue: 60, housesValue: 40, villasValue: 45 },
    { city: 'Torino', month: 'Feb', apartments: 40, houses: 30, villas: 15, apartmentsValue: 100, housesValue: 200, villasValue: 300 },
    { city: 'Moncalieri', month: 'Feb', apartments: 40, houses: 30, villas: 15, apartmentsValue: 40, housesValue: 60, villasValue: 55 },
    { city: 'Roma', month: 'Feb', apartments: 10, houses: 20, villas: 30, apartmentsValue: 60, housesValue: 40, villasValue: 45 },
    { city: 'Torino', month: 'Mar', apartments: 40, houses: 30, villas: 15, apartmentsValue: 100, housesValue: 200, villasValue: 300 },
    { city: 'Moncalieri', month: 'Mar', apartments: 40, houses: 30, villas: 15, apartmentsValue: 40, housesValue: 60, villasValue: 55 },
    { city: 'Roma', month: 'Mar', apartments: 10, houses: 20, villas: 30, apartmentsValue: 60, housesValue: 40, villasValue: 45 },
    { city: 'Torino', month: 'Apr', apartments: 40, houses: 30, villas: 15, apartmentsValue: 100, housesValue: 200, villasValue: 300 },
    { city: 'Moncalieri', month: 'Apr', apartments: 40, houses: 30, villas: 15, apartmentsValue: 40, housesValue: 60, villasValue: 55 },
    { city: 'Roma', month: 'Apr', apartments: 10, houses: 20, villas: 30, apartmentsValue: 60, housesValue: 40, villasValue: 45 },
    { city: 'Torino', month: 'May', apartments: 40, houses: 30, villas: 15, apartmentsValue: 100, housesValue: 200, villasValue: 300 },
    { city: 'Moncalieri', month: 'May', apartments: 40, houses: 30, villas: 15, apartmentsValue: 40, housesValue: 60, villasValue: 55 },
    { city: 'Roma', month: 'May', apartments: 10, houses: 20, villas: 30, apartmentsValue: 60, housesValue: 40, villasValue: 45 },
    { city: 'Torino', month: 'Jun', apartments: 40, houses: 30, villas: 15, apartmentsValue: 100, housesValue: 200, villasValue: 300 },
    { city: 'Moncalieri', month: 'Jun', apartments: 40, houses: 30, villas: 15, apartmentsValue: 40, housesValue: 60, villasValue: 55 },
    { city: 'Roma', month: 'Jun', apartments: 10, houses: 20, villas: 30, apartmentsValue: 90, housesValue: 240, villasValue: 145 },
];
let filteredDataSource = [];
const chartPalette = 'Soft Pastel';
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("ddlTimeInterval").addEventListener("change", function () {
        filterDataSourceAsPerSelection(parseInt(this.value));
    });
    initInternalTabs();
    filterDataSourceAsPerSelection(1);
});

function filterDataSourceAsPerSelection(months) {
    const uniqueMonths = [...new Set(dataSource.map(d => d.month))];
    const selectedMonths = uniqueMonths.slice(-months);
    filteredDataSource = dataSource.filter(d => selectedMonths.includes(d.month));

    loadBarChart('locationBasedSummaryChart');
    loadPieChart('torinoPie');
    loadPieChart('moncalieriPie');
    loadPieChart('romaPie');
    loadPieChart('totalPie');
    loadSummaries();
}

function loadPieChart(chartId) {
    let city = '';
    switch (chartId) {
        case 'torinoPie': city = 'Torino'; break;
        case 'moncalieriPie': city = 'Moncalieri'; break;
        case 'romaPie': city = 'Roma'; break;
    }

    let totalApartments, totalHouses, totalVillas = 0;
    if (city === '') {
        totalApartments = filteredDataSource.reduce((sum, entry) => sum + entry.apartments, 0);
        totalHouses = filteredDataSource.reduce((sum, entry) => sum + entry.houses, 0);
        totalVillas = filteredDataSource.reduce((sum, entry) => sum + entry.villas, 0);
    } else {
        const locationData = filteredDataSource.filter(entry => entry.city === city);
        totalApartments = locationData.reduce((sum, item) => sum + item.apartments, 0);
        totalHouses = locationData.reduce((sum, item) => sum + item.houses, 0);
        totalVillas = locationData.reduce((sum, item) => sum + item.villas, 0);
    }
    const formatedData = [
        { category: "Appartamenti", value: totalApartments },
        { category: "Case", value: totalHouses },
        { category: "Ville", value: totalVillas }
    ];
    $(`#${chartId}`).dxPieChart({
        dataSource: formatedData,
        palette: chartPalette,
        series: [
            {
                argumentField: 'category',
                valueField: 'value',
                label: {
                    visible: true,
                    connector: { visible: true, width: 0.5},
                    font: {
                        size: 14,
                        color: '#fff',
                        weight: 600
                    },
                },
            },
        ],
        title: {
            text: city !== '' ? city : 'Totale',
            font: {
                size: 16,
                color: '#aaa',
                weight: 600,
            },
            alignment: 'center',
        },
        export: {
            enabled: false,
        },
        onPointClick(e) {
            const point = e.target;
            toggleVisibility(point);
        },
        onLegendClick(e) {
            const arg = e.target;
            toggleVisibility(this.getAllSeries()[0].getPointsByArg(arg)[0]);
        },
    });
}

function toggleVisibility(item) {
    if (item.isVisible()) {
        item.hide();
    } else {
        item.show();
    }
}

function loadBarChart(chartId) {
    $(`#${chartId}`).dxChart({
        dataSource: filteredDataSource,
        palette: chartPalette,
        title: {},
        commonSeriesSettings: {
            aggregation: {
                enabled: true,
                method: 'sum',
            },
            argumentField: 'city',
            type: 'bar',
        },
        series: [
            { valueField: 'apartmentsValue', name: 'Appartamenti' },
            { valueField: 'housesValue', name: 'Case' },
            { valueField: 'villasValue', name: 'Ville' }
        ],
        legend: { visible: true },
        label: { enabled: true },
        tooltip: {
            enabled: true,
            customizeTooltip: function (arg) {
                return { text: `${arg.seriesName}: ${formatNumber(arg.value)}` };
            }
        },
    });
}

function loadSummaries() {
    const aggregatedData = filteredDataSource.reduce((acc, entry) => {
        if (!acc[entry.city]) {
            acc[entry.city] = { total_apartments: 0, total_houses: 0, total_villas: 0, value_villas: 0, value_houses: 0, value_apartments: 0 };
        }
        acc[entry.city].total_apartments += entry.apartments;
        acc[entry.city].total_houses += entry.houses;
        acc[entry.city].total_villas += entry.villas;
        acc[entry.city].value_villas += entry.villasValue;
        acc[entry.city].value_houses += entry.housesValue;
        acc[entry.city].value_apartments += entry.apartmentsValue;
        return acc;
    }, {});
    const result = Object.entries(aggregatedData).map(([city, values]) => ({
        [city]: values
    }));
    console.log(result);
    const totApart = (result[0].Torino.total_apartments + result[1].Moncalieri.total_apartments + result[2].Roma.total_apartments);
    const totHouse = (result[0].Torino.total_houses + result[1].Moncalieri.total_houses + result[2].Roma.total_houses);
    const totVilla = (result[0].Torino.total_villas + result[1].Moncalieri.total_villas + result[2].Roma.total_villas);
    document.getElementById('totApartment').textContent = totApart;
    document.getElementById('totHouse').textContent = totHouse;
    document.getElementById('totVilla').textContent = totVilla;
    document.getElementById('overallProp').textContent = totApart + totHouse + totVilla;
    
    const totTorValue = result[0].Torino.value_apartments + result[0].Torino.value_houses + result[0].Torino.value_villas;
    const totMonValue = result[1].Moncalieri.value_apartments + result[1].Moncalieri.value_houses + result[1].Moncalieri.value_villas;
    const totRomValue = result[2].Roma.value_apartments + result[2].Roma.value_houses + result[2].Roma.value_villas;
    document.getElementById('torinoSummary').textContent = "Torino: " + formatNumber(totTorValue);
    document.getElementById('moncalieriSummary').textContent = "Moncalieri: " + formatNumber(totMonValue);
    document.getElementById('romaSummary').textContent = "Roma: " + formatNumber(totRomValue);
    document.getElementById('overallSummary').textContent = "Totale: " + formatNumber(totTorValue + totMonValue + totRomValue);
}

function getFilteredData(months) {
    const uniqueMonths = [...new Set(dataSource.map(d => d.month))];
    const selectedMonths = uniqueMonths.slice(-months);
    return dataSource.filter(d => selectedMonths.includes(d.month));
}

function sumArrays(...arrays) {
    const n = arrays.reduce((max, xs) => Math.max(max, xs.length), 0);
    const result = Array.from({ length: n });
    return result.map((_, i) => arrays.map(xs => xs[i] || 0).reduce((sum, x) => sum + x, 0));
}