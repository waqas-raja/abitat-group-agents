document.addEventListener("DOMContentLoaded", async () => {
    await loadLocations();
    await loadList();
});

async function loadLocations() {
    const ddlLocation = document.getElementById('ddlLocation');
    ddlLocation.innerHTML = '<option value="-1" selected disabled>--Seleziona l\'agenzia--</option>';
    const response = await fetch('/api/branches');
    const r = await response.json();
    r.payload.forEach(el => { ddlLocation.innerHTML += `<option value="${el.id}">${el.name}</option>`; });
    const ddlAgent = document.getElementById('ddlAgent');
    ddlAgent.innerHTML = '<option value="-1" selected disabled>--Seleziona la agente--</option>';
}

async function getRelevantAgents() {
    const branchID = parseInt(document.getElementById('ddlLocation').value);
    const ddlAgent = document.getElementById('ddlAgent');
    ddlAgent.innerHTML = '<option value="-1" selected disabled>--Seleziona la agente--</option>';
    const response = await fetch('/api/expense-report/agents/' + branchID);
    const r = await response.json();
    if (r.payload.length > 0) r.payload.forEach(el => { ddlAgent.innerHTML += `<option value="${el.id}">${el.name + ` ` + el.surname}</option>`; });
}

async function loadList() {
    new DevExpress.ui.dxDataGrid(document.getElementById("listOfExpense"), {
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
                    const filteredData = localStorage.ulocation !== "null" ? json.payload.filter(function (el) { return el.branch_id === parseInt(localStorage.ulocation) }) : json.payload;
                    return {
                        data: filteredData,
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
        grouping: { autoExpandAll: true },
        groupPanel: { visible: true, emptyPanelText: "Trascina qui le colonne per raggruppare" },
        filterRow: { visible: true, applyFilter: "auto" },
        headerFilter: { visible: true },
        export: { enabled: false, allowExportSelectedData: true, formats: ['xlsx'] },
        columns: [
            {
                dataField: "dt",
                caption: "Data",
                allowFiltering: true,
                calculateCellValue: function (data) {
                    const dt = (data.dt).split('-');
                    return dt[2] + "/" + dt[1] + "/" + dt[0];
                }
            },
            { dataField: "reason", caption: "Descrizione", allowFiltering: true },
            {
                dataField: "agent_name",
                caption: "Agente",
                allowFiltering: true,
                cellTemplate: function (container, options) {
                    const agentId = options.data.agent_id;
                    const url = "/agent/" + agentId;
                    $("<a>")
                        .addClass("dx-link d-inline-flex align-items-center gap-1")
                        .attr("href", url)
                        .attr("target", "_blank")
                        .append(
                            $("<span>").text(options.value),
                            $("<i>").addClass("bi bi-box-arrow-up-right ms-2")
                        )
                        .appendTo(container);
                }
            },
            { dataField: "branch_name", caption: "Agenzia di", allowFiltering: true },
            {
                dataField: "value",
                caption: "Costo",
                allowFiltering: true,
                calculateCellValue: function (data) { return formatNumber(data.value); }
            },
        ],
        remoteOperations: { paging: true, filtering: true, sorting: true },
        paging: { pageSize: 10 },
        pager: { showPageSizeSelector: true, allowedPageSizes: [5, 10, 20], showInfo: true },
        toolbar: {
            visible: false,
            items: [
                "groupPanel",
                "searchPanel",
                {
                    location: "after",
                    widget: "dxButton",
                    options: {
                        icon: "add",
                        text: "Aggiungi Note spese",
                        onClick: function () { showModalAddExpenseReport(); },
                        elementAttr: { class: "btn-orange" }
                    }
                }
            ]
        },
        onRowClick: function (e) {
            if (e.rowType === "data") {
                showModalAddExpenseReport(e.data, 'Modifica spesa');
            }
        },
    });
}

async function showModalAddExpenseReport(data, title) {
    document.getElementById('btnEliminateExpense').classList.add('d-none');
    document.getElementById('modalAddExpenseReportLabel').innerHTML = '<i class="bi bi-piggy-bank me-3"></i>' + title;
    document.getElementById('hExpenseReportId').value = data !== null ? data.id : '';
    document.getElementById('ddlLocation').value = data !== null ? data.branch_id : -1;
    if (data !== null) {
        await getRelevantAgents();
        document.getElementById('btnEliminateExpense').classList.remove('d-none');
    }
    document.getElementById('ddlAgent').value = data !== null ? data.agent_id : -1;
    document.getElementById('txtDate').value = data !== null ? data.dt : '';
    document.getElementById('txtCost').value = data !== null ? data.value : '';
    document.getElementById('txtDescription').value = data !== null ? data.reason : '';
    const result = document.getElementById("spNewExpenseResult");
    result.classList.add("d-none");
    const modalElement = document.getElementById("modalAddExpenseReport");
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
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
    let entryPoint = '';
    let erID = document.getElementById('hExpenseReportId').value;
    if (erID === '') entryPoint = '/api/expense-report';
    else entryPoint = '/api/expense-report/' + parseInt(erID);
    try {
        const response = await fetch(entryPoint, {
            method: erID === '' ? "POST" : "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "date": date, "agent_id": agent, "cost": cost, "reason": reason })
        });
        const res = await response.json();
        if (res.result) {
            await loadList();
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

async function deleteExpenseModal() {
    $('#modalAddExpenseReport').modal('hide');
    showDeleteConfirmationModal(async function (confirmed) {
        if (confirmed) {
            try {
                const id = document.getElementById("hExpenseReportId").value;
                const response = await fetch("/api/expense-report/" + id, {method: "DELETE" });
                const res = await response.json();
                if (res.result) {
                    $("#modalConfirmDelete").modal('hide');
                    loadList();
                } else throw new Error("Error while deleting the expense report!");
            } catch (error) {
                document.getElementById("deleteErrorMessage").innerText = error.message !== undefined ? error.message : error;
            }
        }
    });
}

function showDeleteConfirmationModal(callback) {
    document.getElementById("deleteErrorMessage").innerHTML = '';
    const modalElement = document.getElementById("modalConfirmDelete");
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
    const confirmButton = document.getElementById("btnConfirmDelete");
    confirmButton.removeEventListener("click", confirmButton.clickHandler);
    confirmButton.clickHandler = function (e) {
        e.stopPropagation();
        callback(true);
    };
    confirmButton.addEventListener("click", confirmButton.clickHandler);
}