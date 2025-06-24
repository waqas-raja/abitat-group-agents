document.addEventListener("DOMContentLoaded", async () => {
    await loadPackages();
    await Promise.all([
        loadAgentDetail(),
        loadListOfReturns(),
        loadListOfReturnsAgent()
    ]);
});

async function loadPackages() {
    const ddlPackage = document.getElementById('ddlPackage');
    ddlPackage.innerHTML = '<option value="-1" selected disabled>--Seleziona un pacchetto--</option>';
    const response = await fetch('/api/packages');
    const r = await response.json();
    r.payload.forEach(el => { ddlPackage.innerHTML += `<option value="${el.id}">${el.name}</option>`; });
}

async function loadAgentDetail() {
    const aid = document.getElementById("hAgentId").value;
    const response = await fetch('/api/agent/' + aid);
    const r = await response.json();
    document.getElementById("spFirstName").innerText = r.payload.name ?? "";
    document.getElementById("spLastName").innerText = r.payload.surname ?? "";
    document.getElementById("spPackage").innerText = r.payload.package_name ?? "";
    document.getElementById("spFee").innerText = r.payload.package_fee + " €" ?? "";
    document.getElementById("spCommission").innerText = r.payload.package_commission + " %" ?? "";
    const email = r.payload.email?.trim() || '';
    const phone = r.payload.phone?.trim() || '';
    const branch = r.payload.branch_name?.trim() || '';
    const contactSpan = document.getElementById("spContacts");
    const contacts = [];
    if (branch) contacts.push(`<i class="bi bi-house ms-3"></i> ${branch}`);
    if (email) contacts.push(`<i class="bi bi-envelope ms-3"></i> ${email}`);
    if (phone) contacts.push(`<i class="bi bi-telephone ms-3"></i> ${phone}`);
    contactSpan.innerHTML = contacts.length > 0 ? contacts.join('  ') : 'contatti non inseriti';

    // Input fields for edit modal
    document.getElementById("txtFirstName").value = r.payload.name ?? "";
    document.getElementById("txtLastName").value = r.payload.surname ?? "";
    document.getElementById("ddlPackage").value = r.payload.package_id.toString() ?? "";
    document.getElementById("txtEmail").value = r.payload.email ?? "";
    document.getElementById("txtPhone").value = r.payload.phone ?? "";
    document.getElementById("ddlLocation").value = r.payload.branch_id ?? 1;
}

async function updateGenericInfo() {
    const aid = document.getElementById("hAgentId").value;
    const name = document.getElementById("txtFirstName").value.trim();
    const surname = document.getElementById("txtLastName").value.trim();
    const package_id = parseInt(document.getElementById("ddlPackage").value);
    const email = document.getElementById("txtEmail").value.trim();
    const phone = document.getElementById("txtPhone").value.trim();
    const branch = parseInt(document.getElementById("ddlLocation").value);
    const err = document.getElementById('errEditAgent');
    err.innerText = '';
    if (name === "" || surname === "" || package_id <= 0 || branch < 0) {
        err.textContent = "Si prega di compilare tutti i campi obbligatori";
        return;
    }
    if (email !== "" && !isValidEmail(email)) {
        err.textContent = "L'email fornita non risulta valida";
        return;
    }
    try {
        const response = await fetch("/api/agent/" + aid + "/general-info", {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                name: name,
                surname: surname,
                package_id: package_id,
                phone:phone,
                email:email,
                branch_id: branch
            })
        });
        const res = await response.json();
        if (res.result) {
            const modalElement = document.getElementById('modalEditAgent');
            const modal = bootstrap.Modal.getInstance(modalElement);
            modal.hide();
            await loadAgentDetail();
        } else err.innerText = "Si sono verificati degli errori";
    } catch (error) {
        err.innerText = "Si sono verificati degli errori";
        console.error(error.message !== undefined ? error.message : error);
    }
}

async function deleteAgentModal() {
    showDeleteConfirmationModal(async function (confirmed) {
        if (confirmed) {
            try {
                const aid = document.getElementById("hAgentId").value;
                const response = await fetch("/api/agent/" + aid, {method: "DELETE" });
                const res = await response.json();
                if (res.result) {
                    $("#modalConfirmDelete").modal('hide');
                    window.location = `/agents`;
                } else throw new Error("Error while deleting the agent!");
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

async function loadListOfReturnsAgent() {
    const aid = document.getElementById("hAgentId").value;
    const response = await fetch(`/api/agent/${aid}/report-agent`);
    const res = await response.json();
    const hasData = res.payload.length > 0;
    new DevExpress.ui.dxDataGrid(document.getElementById("listOfReturnsAgent"), {
        dataSource: res.payload,
        columnAutoWidth: true,
        showBorders: true,
        rowAlternationEnabled: false,
        groupPanel: { visible: hasData, emptyPanelText: "Trascina qui le colonne per raggruppare" },
        filterRow: { visible: hasData, applyFilter: "auto" },
        headerFilter: { visible: hasData },
        columns: [
            {
                dataField: "dt",
                caption: "Data",
                allowFiltering: true,
                width:100,
                calculateCellValue: function (data) {
                    const d = (data.dt).split('-');
                    return d[2] + '/' + d[1] + '/' + d[0];
                }
            },
            {
                caption: "Descrizione", allowFiltering: true,
                calculateCellValue: function (data) {
                    switch (data.expense_type) {
                        case 'A': return data.property;
                        case 'S': return data.property;
                        case 'E': return data.reason;
                        case 'P': return data.reason;
                        default: return '';
                    }
                }
            },
            {
                caption: "Valore",
                allowFiltering: true,
                alignment:"right",
                cellTemplate: function (container, options) {
                    const isPositive = options.data.expense_type === 'P';
                    const colorClass = isPositive ? 'text-success' : 'text-danger';
                    const value = formatNumber(options.data.value) + " €";
                    $("<span>").addClass(colorClass).text(value).appendTo(container);
                }
            }
        ],
        paging: { pageSize: 10 },
        pager: { showPageSizeSelector: true, allowedPageSizes: [5, 10, 20], showInfo: true },
        toolbar: {
            items: [
                "groupPanel",
                {
                    location: "after",
                    widget: "dxNumberBox",
                    options: {
                        placeholder: "Importo",
                        width: 150,
                        showSpinButtons: false,
                        min:0,
                        elementAttr: { id: "txtAmountAgent" },
                        inputAttr: { style: "text-align: right;" }
                    }
                },
                {
                    location: "after",
                    widget: "dxButton",
                    options: {
                        icon: "plus",
                        text: "Registra rientro",
                        elementAttr: { id: "btnAddReturnAgent" },
                        onClick: () => addReturn(true)
                    }
                }
            ]
        },
        onContentReady: function () { updateSummary(true); }
    });
}

async function loadListOfReturns() {
    const aid = document.getElementById("hAgentId").value;
    const response = await fetch(`/api/agent/${aid}/report`);
    const res = await response.json();
    const hasData = res.payload.length > 0;
    new DevExpress.ui.dxDataGrid(document.getElementById("listOfReturns"), {
        dataSource: res.payload,
        columnAutoWidth: true,
        showBorders: true,
        rowAlternationEnabled: false,
        groupPanel: { visible: hasData, emptyPanelText: "Trascina qui le colonne per raggruppare" },
        filterRow: { visible: hasData, applyFilter: "auto" },
        headerFilter: { visible: hasData },

        columns: [
            {
                dataField: "dt",
                caption: "Data",
                allowFiltering: true,
                width:100,
                calculateCellValue: function (data) {
                    const d = (data.dt).split('-');
                    return d[2] + '/' + d[1] + '/' + d[0];
                }
            },
            {
                caption: "Descrizione", allowFiltering: true,
                calculateCellValue: function (data) {
                    switch (data.expense_type) {
                        case 'A': return "ACQ - " + data.property;
                        case 'S': return "VEN - " + data.property;
                        case 'P': return data.reason;
                        default: return '';
                    }
                }
            },
            {
                caption: "Provvigioni",
                allowFiltering: true,
                alignment:"right",
                cellTemplate: function (container, options) {
                    const isPositive = options.data.expense_type === 'P';
                    const colorClass = isPositive ? 'text-danger' : 'text-success';
                    const value = formatNumber(options.data.value) + " €";
                    $("<span>").addClass(colorClass).text(value).appendTo(container);
                }
            }
        ],
        paging: { pageSize: 10 },
        pager: { showPageSizeSelector: true, allowedPageSizes: [5, 10, 20], showInfo: true },
        toolbar: {
            items: [
                "groupPanel",
                {
                    location: "after",
                    widget: "dxNumberBox",
                    options: {
                        placeholder: "Importo",
                        width: 150,
                        showSpinButtons: false,
                        min:0,
                        elementAttr: { id: "txtAmount" },
                        inputAttr: { style: "text-align: right;" }
                    }
                },
                {
                    location: "after",
                    widget: "dxButton",
                    options: {
                        icon: "plus",
                        text: "Registra pagamento",
                        elementAttr: { id: "btnAddReturn" },
                        onClick: () => addReturn(false)
                    }
                }
            ]
        },
        onContentReady: function () { updateSummary(false); }
    });
}

async function addReturn(isAgent) {
    const aid = document.getElementById("hAgentId").value;
    const txtAmounId = isAgent ? "txtAmountAgent" : "txtAmount";
    const amount = $("#" + txtAmounId).dxNumberBox("instance").option("value");
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
        DevExpress.ui.notify("Inserisci un importo valido", "warning", 2000);
        return;
    }
    try {
        const response = await fetch(`/api/agent/${aid}/payment`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ amount: parseFloat(amount), is_agent: isAgent })
        });
        const result = await response.json();
        if (result.result) {
            DevExpress.ui.notify("Pagamento registrato con successo", "success", 2000);
            $("#" + txtAmounId).dxNumberBox("instance").option("value", ""); // reset
            isAgent ? await loadListOfReturnsAgent() : await loadListOfReturns();
        } else DevExpress.ui.notify("Errore: " + result.message, "error", 3000);
    } catch (error) {
        DevExpress.ui.notify("Errore di rete o server", "error", 3000);
        console.error(error);
    }
}

function updateSummary(isAgent) {
    const grid = $("#listOfReturns" + (isAgent ? "Agent" : "")).dxDataGrid("instance");
    const rows = grid.getVisibleRows();
    let total = 0;
    rows.forEach(row => {
        const data = row.data;
        const value = parseFloat(data.value);
        if (isNaN(value)) return;
        if (data.expense_type === 'P') total += value;
        else total -= value;
    });
    const formatted = total.toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";
    const colorClass = total >= 0 ? "text-success" : "text-danger";
    $("#spBalanceReturn" + (isAgent ? "Agent" : "")).removeClass("text-success text-danger").addClass(colorClass).text(formatted);
}