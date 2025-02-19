document.addEventListener("DOMContentLoaded", () => {
    loadList("listOfPackages");
});

async function loadList(id) {
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
                    const response = await fetch(`/api/packages?${params.toString()}`);
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
        // dataSource: data,
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
        stateStoring: { // Permette di salvare la configurazione delle colonne
            enabled: true,
            type: "localStorage",
            storageKey: "gridState"
        },
        columns: [
            { dataField: "id", caption: "Id", allowFiltering: true },
            { dataField: "name", caption: "Nome", allowFiltering: true },
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
                // window.location = `/agent/${e.data.id}`;
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