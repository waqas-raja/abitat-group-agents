document.addEventListener("DOMContentLoaded", () => {
    loadList("listOfPackages");
});

async function loadList(id) {
    const response = await fetch("/api/packages");
    const data = await response.json();
    new DevExpress.ui.dxDataGrid(document.getElementById(id), {
        dataSource: data.payload,
        columnAutoWidth: true,
        showBorders: true,
        rowAlternationEnabled: false,
        grouping: { autoExpandAll: false },
        groupPanel: { visible: true, emptyPanelText: "Trascina qui le colonne per raggruppare" },
        filterRow: { visible: false, applyFilter: "auto" },
        headerFilter: { visible: false },
        // export: { enabled: true, allowExportSelectedData: true, formats: ['xlsx'] },
        columns: [
            { dataField: "id", caption: "Id", allowFiltering: false },
            { dataField: "name", caption: "Nome", allowFiltering: false },
            {
                dataField: "fixed_cost",
                caption: "Canone fisso",
                allowFiltering: false,
                calculateCellValue: function (data) {
                    return formatNumber(data.fixed_cost);
                }
            },
            {
                dataField: "percentage",
                caption: "Percentuale",
                allowFiltering: false,
                calculateCellValue: function (data) {
                    return data.percentage + '%';
                }
            },
            { dataField: "note", caption: "Descrizione", allowFiltering: false },
        ],
        paging: { pageSize: 10 },
        pager: { showPageSizeSelector: true, allowedPageSizes: [5, 10, 20], showInfo: true },
        toolbar: {
            items: [
                "groupPanel",
                "searchPanel",
                "exportButton",
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
                // window.location = `/agent/${e.data.id}`;
            }
        },
        // onExporting: function (e) {
        //     if (e.format === 'xlsx') {
        //         const workbook = new ExcelJS.Workbook();
        //         const worksheet = workbook.addWorksheet("Agents");
        //         DevExpress.excelExporter.exportDataGrid({
        //             worksheet: worksheet,
        //             component: e.component,
        //         }).then(function () {
        //             workbook.xlsx.writeBuffer().then(function (buffer) {
        //                 saveAs(new Blob([buffer], { type: "application/octet-stream" }), "abitat-agents.xlsx");
        //             });
        //         });
        //     }
        // }
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
            btn.disabled = true;
            spinner.classList.add("d-none");
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