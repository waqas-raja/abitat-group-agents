let barChart, pieChart1, pieChart2, pieChart3, pieChartTotal;
const dataTorino = [40, 20, 15];
const dataMoncalieri = [30, 50, 20];
const dataRoma = [10, 10, 40];
let total = [];
const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const dataValues = [5000, 7000, 6000, 8000, 4000, 9000, 3000, 7000, 6000, 2000, 4000, 1000];
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("ddlTimeInterval").addEventListener("change", function () {
        loadBarChart(parseInt(this.value));
    });
    loadBarChart(3);
    loadSummaries();

    const ctxPie1 = document.getElementById("pieChart1").getContext("2d");
    const ctxPie2 = document.getElementById("pieChart2").getContext("2d");
    const ctxPie3 = document.getElementById("pieChart3").getContext("2d");
    const ctxPieTotal = document.getElementById("pieChartTotal").getContext("2d");

    loadPieChart(pieChart1, ctxPie1, dataTorino);
    loadPieChart(pieChart2, ctxPie2, dataMoncalieri);
    loadPieChart(pieChart3, ctxPie3, dataRoma);

    total = sumArrays(dataTorino, dataMoncalieri, dataRoma);
    loadPieChart(pieChartTotal, ctxPieTotal, total);
});

function loadPieChart(pieChart, ctx, data) {
    if (pieChart) pieChart.destroy();
    pieChart = new Chart(ctx, {
        type: "pie",
        data: {
            labels: ["Apartments", "Houses", "Villas"],
            datasets: [{ data: data, backgroundColor: ["#ed7d31", "#4472c4", "#009A6B"] }]
        }
    });
}

function loadBarChart(months) {
    const ctxBar = document.getElementById("barChart").getContext("2d");
    const selectedLabels = labels.slice(-months);
    const selectedData = dataValues.slice(-months);
    if (barChart) barChart.destroy();
    barChart = new Chart(ctxBar, {
        type: "bar",
        data: {
            labels: selectedLabels,
            datasets: [{
                label: "Price Delta (€)",
                data: selectedData,
                backgroundColor: "#f07f3c"
            }]
        }
    });
}

function loadSummaries() {
    document.getElementById('torinoSummary').textContent = "Torino: " + formatNumber(5000);
    document.getElementById('moncalieriSummary').textContent = "Moncalieri: " + formatNumber(7000);
    document.getElementById('romaSummary').textContent = "Roma: " + formatNumber(6000);
    document.getElementById('overallSummary').textContent = "Summary: " + formatNumber(18000);
}

function sumArrays(...arrays) {
    const n = arrays.reduce((max, xs) => Math.max(max, xs.length), 0);
    const result = Array.from({ length: n });
    return result.map((_, i) => arrays.map(xs => xs[i] || 0).reduce((sum, x) => sum + x, 0));
}