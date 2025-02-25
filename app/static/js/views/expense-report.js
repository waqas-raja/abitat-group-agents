document.addEventListener("DOMContentLoaded", async () => {
    await loadLocations();
    await getAndLoadAgents();
    await loadList("listOfExpense");
});

async function loadLocations() {
    const ddlLocation = document.getElementById('ddlLocation');
    ddlLocation.innerHTML = '<option value="-1" selected disabled>Seleziona la posizione</option>';
    const response = await fetch('/api/branches');
    const r = await response.json();
    r.payload.forEach(el => { ddlLocation.innerHTML += `<option value="${el.id}">${el.name}</option>`; });
}

async function getAndLoadAgents() {
    const ddlAgent = document.getElementById('ddlAgent');
    ddlAgent.innerHTML = '<option value="-1" selected disabled>Seleziona la agente</option>';
    const response = await fetch('/api/agents');
    const r = await response.json();
    r.payload.forEach(el => { ddlAgent.innerHTML += `<option value="${el.id}">${el.name + ` ` + el.surname}</option>`; });
}

async function getRelevantAgents() {
    const branchID = parseInt(document.getElementById('ddlLocation').value);
    const ddlAgent = document.getElementById('ddlAgent');
    ddlAgent.innerHTML = '<option value="-1" selected disabled>Seleziona la agente</option>';
    const response = await fetch('/api/expense-report/agents/' + branchID);
    const r = await response.json();
    if (r.payload.length > 0) r.payload.forEach(el => { ddlAgent.innerHTML += `<option value="${el.id}">${el.name + ` ` + el.surname}</option>`; });
    else getAndLoadAgents();
}

function loadList(id) {
    new DevExpress.ui.dxDataGrid(document.getElementById(id), {
        dataSource: new DevExpress.data.CustomStore({
            key: "id",
            load: async function (loadOptions) {
                let params = new URLSearchParams();
                params.append("limit", loadOptions.take || 10);
                params.append("page", loadOptions.skip / loadOptions.take + 1 || 1);
                if (loadOptions.filter !== undefined) {
                    params.append("search", loadOptions.filter.filterValue);
                }
                try {
                    const response = await fetch(`/api/expense-reports?${params.toString()}`);
                    const json = await response.json();
                    return {
                        data: json.payload,
                        totalCount: json.totalCount
                    };
                } catch (error) {
                    console.error("Data fetch error:", error);
                    return { data: [], totalCount: 0 };
                }
            }
        }),
        columnAutoWidth: true,
        allowColumnResizing: true,
        allowColumnReordering: true,
        showBorders: true,
        noDataText: "Nessun dato disponibile",
        rowAlternationEnabled: false,
        grouping: { autoExpandAll: false },
        groupPanel: { visible: true, emptyPanelText: "Trascina qui le colonne per raggruppare" },
        filterRow: { visible: true, applyFilter: "auto" },
        headerFilter: { visible: true },
        
        columns: [
            { dataField: "id", caption: "ID", allowFiltering: true },
            { 
                dataField: "agent_name",
                caption: "Agente",
                allowFiltering: true,
                cellTemplate: function (container, options) {
                    let agentId = options.data.agent_id;
                    $("<span>")
                    .addClass("dx-link")
                    .text(options.value)
                    .on("click", function () {
                        window.location.href = "/agent/" + agentId;
                    })
                    .appendTo(container);
                }
            },
            { dataField: "branch_name", caption: "Posizione", allowFiltering: true },
            { 
                dataField: "value",
                caption: "Costo",
                allowFiltering: true,
                calculateCellValue: function (data) {
                    return formatNumber(data.value);
                }
            },
            { dataField: "reason", caption: "Descrizione", allowFiltering: true },
        ],
        remoteOperations: { paging: true, filtering: true, sorting: true },
        paging: { pageSize: 10 },
        pager: { showPageSizeSelector: true, allowedPageSizes: [5, 10, 20], showInfo: true },
        toolbar: {
            items: [
                "groupPanel",
                "searchPanel",
                {
                    location: "after",
                    widget: "dxButton",
                    options: {
                        icon: "add",
                        text: "Aggiungi Note spese",
                        onClick: function () {
                            const modalElement = document.getElementById("modalAddExpenseReport");
                            const modal = new bootstrap.Modal(modalElement);
                            modal.show();
                        },
                        elementAttr: { class: "btn-orange" }
                    }
                }
            ]
        },
        onRowClick: function (e) { 
            if (e.rowType === "data") { 
                // window.location = `/agent/${e.data.id}`; 
            }
        },
    });
}

async function saveExpenseReport() {
    const btn = document.getElementById("btnSaveExpense");
    const spinner = document.getElementById("spinnerNewExpense");
    const date = document.getElementById("txtDate").value.trim();
    const agent = parseInt(document.getElementById("ddlAgent").value);
    const cost = document.getElementById("txtCost").value.trim();
    const reason = document.getElementById("txtDescription").value.trim();
    const result = document.getElementById("spNewExpenseResult");
    if (date === '' || cost === "") {
        result.innerText = "Si prega di compilare tutti i campi richiesti";
        result.classList.remove("d-none");
        return;
    }
    if (agent === "" || agent === -1) {
        result.innerText = "Manca l'agente";
        result.classList.remove("d-none");
        return;
    }
    btn.disabled = true;
    spinner.classList.remove("d-none");
    result.classList.add("d-none");
    result.innerText = "";
    try {
        const response = await fetch("/api/expense-report", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "date": date, "agent_id": agent, "cost": cost, "reason": reason })
        });
        const res = await response.json();
        if (res.result) {
            await loadList("listOfExpense");
            btn.disabled = false;
            spinner.classList.add("d-none");
            $("#modalAddExpenseReport").modal("hide");
        } else {
            result.innerText = "Si sono verificati degli errori durante il salvataggio";
            btn.disabled = false;
            spinner.classList.remove("d-none");
            result.classList.remove("d-none");
        }
    } catch (error) {
        console.error(error.message);
        result.innerText = "Si è verificato un errore";
        btn.disabled = false;
        spinner.classList.remove("d-none");
        result.classList.remove("d-none");
    }
}