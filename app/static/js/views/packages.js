document.addEventListener("DOMContentLoaded", async () => await loadList());

async function loadList() {
    const response = await fetch('/api/packages');
    const r = await response.json();
    new DevExpress.ui.dxDataGrid(document.getElementById("listOfPackages"), {
        dataSource: r.payload,
        columnAutoWidth: true,
        showBorders: true,
        noDataText: "Non risultano pacchetti inseriti",
        rowAlternationEnabled: false,
        columns: [
            { dataField: "name", caption: "Nome" },
            {
                dataField: "fixed_cost",
                caption: "Canone fisso",
                calculateCellValue: function (data) {
                    return formatNumber(data.fixed_cost);
                }
            },
            {
                dataField: "percentage",
                caption: "Commissione",
                calculateCellValue: function (data) { return data.percentage + '%'; }
            },
            { dataField: "note", caption: "Descrizione" },
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
                        text: "Aggiungi Pacchetto",
                        onClick: function () {
                            const modalElement = document.getElementById("modalAddPackage");
                            const modal = new bootstrap.Modal(modalElement);
                            modal.show();
                            // preSelectLocation();
                        },
                        elementAttr: { class: "btn-orange" }
                    }
                }
            ]
        },
        onRowClick: function (e) {
            if (e.rowType === "data") {
                document.getElementById('hPackageId').value = e.data.id;
                document.getElementById('txtUpdateName').value = e.data.name;
                document.getElementById('txtUpdateFixedFee').value = e.data.fixed_cost;
                document.getElementById('txtUpdatePercentage').value = e.data.percentage;
                document.getElementById('txtUpdateDescription').value = e.data.note;
                const modalElement = document.getElementById("modalEditPackage");
                const modal = new bootstrap.Modal(modalElement);
                modal.show();
            }
        },
    });
}

async function savePackage() {
    const btn = document.getElementById("btnSavePackage");
    const spinner = document.getElementById("spinnerNewPackage");
    const name = document.getElementById("txtName").value.trim();
    const fixedCost = document.getElementById("txtFixedFee").value.trim();
    const percentage = document.getElementById("txtPercentage").value.trim();
    const description = document.getElementById("txtDescription").value.trim();
    const result = document.getElementById("spNewPackageResult");
    if (name === '' || fixedCost === "" || percentage === "") {
        result.innerText = "Si prega di compilare tutti i campi richiesti";
        result.classList.remove("d-none");
        return;
    }
    btn.disabled = true;
    spinner.classList.remove("d-none");
    result.classList.add("d-none");
    result.innerText = "";
    try {
        const response = await fetch("/api/package", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "name": name, "fixed_cost": fixedCost, "percentage": percentage, "note": description })
        });
        const res = await response.json();
        if (res.result) {
            loadList("listOfPackages");
            btn.disabled = false;
            spinner.classList.add("d-none");
            document.getElementById("txtName").value = '';
            document.getElementById("txtFixedFee").value = '';
            document.getElementById("txtPercentage").value = '';
            document.getElementById("txtDescription").value = '';
            const modalElement = document.getElementById("modalAddPackage");
            modalElement.classList.remove("show");
            modalElement.style.display = "none";
            document.body.classList.remove("modal-open");
            document.querySelector(".modal-backdrop")?.remove();
        } else throw new Error("Something went wrong while inserting new package!");
    } catch (error) {
        btn.disabled = true;
        spinner.classList.remove("d-none");
        result.classList.remove("d-none");
        result.innerText = error.message !== undefined ? error.message : error;
    }
}

async function editPackage() {
    const btn = document.getElementById("btnUpdatePackage");
    const spinner = document.getElementById("spinnerUpdatePackage");
    const pid = document.getElementById("hPackageId").value.trim();
    const name = document.getElementById("txtUpdateName").value.trim();
    const fixedCost = document.getElementById("txtUpdateFixedFee").value.trim();
    const percentage = document.getElementById("txtUpdatePercentage").value.trim();
    const description = document.getElementById("txtUpdateDescription").value.trim();
    const result = document.getElementById("spUpdatePackageResult");
    if (name === '' || fixedCost === "" || percentage === "") {
        result.innerText = "Si prega di compilare tutti i campi richiesti";
        result.classList.remove("d-none");
        return;
    }
    btn.disabled = true;
    spinner.classList.remove("d-none");
    result.classList.add("d-none");
    result.innerText = "";
    try {
        const response = await fetch("/api/package/" + parseInt(pid), {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "name": name, "fixed_cost": parseFloat(fixedCost), "percentage": parseInt(percentage), "note": description })
        });
        const res = await response.json();
        if (res.result) {
            loadList("listOfPackages");
            btn.disabled = false;
            spinner.classList.add("d-none");
            const modalElement = document.getElementById("modalEditPackage");
            modalElement.classList.remove("show");
            modalElement.style.display = "none";
            document.body.classList.remove("modal-open");
            document.querySelector(".modal-backdrop")?.remove();
        } else throw new Error("Something went wrong while updating package!");
    } catch (error) {
        btn.disabled = true;
        spinner.classList.remove("d-none");
        result.classList.remove("d-none");
        result.innerText = error.message !== undefined ? error.message : error;
    }
}

async function deletePackage() {
    const modalElement = document.getElementById("modalEditPackage");
    modalElement.classList.remove("show");
    modalElement.style.display = "none";
    document.body.classList.remove("modal-open");
    document.querySelector(".modal-backdrop")?.remove();
    showDeleteConfirmationModal(async function (confirmed) {
        if (confirmed) {
            let pid = parseInt(document.getElementById("hPackageId").value);
            let result = document.getElementById('deleteErrorMessage');
            result.innerHTML = '';
            try {
                const response = await fetch("/api/package/" + parseInt(pid), {
                    method: "DELETE"
                });
                const res = await response.json();
                if (res.result) {
                    loadList("listOfPackages");
                    const modalElement = document.getElementById("modalConfirmDelete");
                    modalElement.classList.remove("show");
                    modalElement.style.display = "none";
                    document.body.classList.remove("modal-open");
                    document.querySelector(".modal-backdrop")?.remove();
                } else throw new Error("Something went wrong while deleting the package!");
            } catch (error) {
                result.innerText = error.message !== undefined ? error.message : error;
            }
        }
    });
}

function showDeleteConfirmationModal(callback) {
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