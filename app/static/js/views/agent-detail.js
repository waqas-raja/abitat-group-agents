document.addEventListener("DOMContentLoaded", async () => {
    await loadPackages();
    await Promise.all([
        loadAgentDetail(),
        loadAgentTransactions()
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
    document.getElementById("txtFirstName").value = r.payload.name ?? "";
    document.getElementById("spLastName").innerText = r.payload.surname ?? "";
    document.getElementById("txtLastName").value = r.payload.surname ?? "";
    document.getElementById("spPackage").innerText = r.payload.package_name ?? "";
    document.getElementById("ddlPackage").value = r.payload.package_id.toString() ?? "";
    document.getElementById("spFee").innerText = r.payload.package_fee + " €" ?? "";
    document.getElementById("spCommission").innerText = r.payload.package_commission + " %" ?? "";
    document.getElementById("spEmail").innerText = r.payload.email ?? "";
    document.getElementById("txtEmail").value =r.payload.email ?? "";
    document.getElementById("spPhone").innerText = r.payload.phone ?? "";
    document.getElementById("txtPhone").value = r.payload.phone ?? "";
    document.getElementById("spLocation").innerText = r.payload.branch_name ?? "";
    document.getElementById("ddlLocation").value = r.payload.branch_id ?? 1;
}

function allowEditGeneralInfo() {
    const valueControls = document.querySelectorAll('.valueControl');
    const editControls = document.querySelectorAll('.editControl');
    valueControls.forEach(valueControl => valueControl.classList.add('d-none'));
    editControls.forEach(editControl => editControl.classList.remove('d-none'));
    document.getElementById("iconSaveEditGenericInfo").classList.remove('d-none');
    document.getElementById("iconCancelEditGenericInfo").classList.remove('d-none');
    document.getElementById("iconAllowEditGenericInfo").classList.add('d-none');
}

function cancelEditGeneralInfo() {
    const valueControls = document.querySelectorAll('.valueControl');
    const editControls = document.querySelectorAll('.editControl');
    valueControls.forEach(valueControl => valueControl.classList.remove('d-none'));
    editControls.forEach(editControl => editControl.classList.add('d-none'));
    document.getElementById("iconSaveEditGenericInfo").classList.add('d-none');
    document.getElementById("iconCancelEditGenericInfo").classList.add('d-none');
    document.getElementById("iconAllowEditGenericInfo").classList.remove('d-none');
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
            await loadAgentDetail();
            cancelEditGeneralInfo();
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

async function loadAgentTransactions() {
    const aid = document.getElementById("hAgentId").value;
    const response = await fetch(`/api/agent/${aid}/report`);
    const res = await response.json();
    const hasData = res.payload.length > 0;
    new DevExpress.ui.dxDataGrid(document.getElementById("listOfReport"), {
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
                calculateCellValue: function (data) {
                    const d = (data.dt).split('-');
                    return d[2] + '/' + d[1] + '/' + d[0];
                }
            },
            {
                caption: "Tipologia", allowFiltering: true,
                calculateCellValue: function (data) {
                    switch (data.expense_type) {
                        case 'A': return 'Acquisizione';
                        case 'S': return 'Vendita';
                        case 'E': return 'Extra';
                        case 'P': return 'Pagamento provvigioni';
                        default: return '';
                    }
                }
            },
            {
                caption: "Descrizione", allowFiltering: true,
                calculateCellValue: function (data) {
                    switch (data.expense_type) {
                        case 'A': return data.property;
                        case 'S': return data.property;
                        case 'E': return data.reason;
                        case 'P': return '';
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
                        elementAttr: { id: "btnAddPayment" },
                        onClick: addPayment
                    }
                }
            ]
        },
        onContentReady: function () {updateSummary();}
    });
}

async function addPayment() {
    const aid = document.getElementById("hAgentId").value;
    const amount = $("#txtAmount").dxNumberBox("instance").option("value");
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
        DevExpress.ui.notify("Inserisci un importo valido", "warning", 2000);
        return;
    }
    try {
        const response = await fetch(`/api/agent/${aid}/payment`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ amount: parseFloat(amount) })
        });

        const result = await response.json();

        if (result.result) {
            DevExpress.ui.notify("Pagamento registrato con successo", "success", 2000);
            $("#txtAmount").dxNumberBox("instance").option("value", ""); // reset
        } else {
            DevExpress.ui.notify("Errore: " + result.message, "error", 3000);
        }
    } catch (error) {
        DevExpress.ui.notify("Errore di rete o server", "error", 3000);
        console.error(error);
    }
}

function updateSummary() {
    const grid = $("#listOfReport").dxDataGrid("instance");
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
    $("#spSummary").removeClass("text-success text-danger").addClass(colorClass).text(formatted);
}