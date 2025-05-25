
document.addEventListener("DOMContentLoaded", async () => {
    await Promise.all([
        loadTop10Agents()
    ]);
});

async function loadTop10Agents() {
    try {
        debugger;
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
