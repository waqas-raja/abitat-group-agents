document.addEventListener("DOMContentLoaded", async () => {
    await loadList();
});

async function loadList() {
    new DevExpress.ui.dxDataGrid(document.getElementById('listOfPropertyTypes'), {
        dataSource: new DevExpress.data.CustomStore({
            key: "id",
            load: async function (loadOptions) {
                let params = new URLSearchParams();
                params.append("list", 1);
                params.append("limit", loadOptions.take || 10);
                params.append("page", loadOptions.skip / loadOptions.take + 1 || 1);
                if (loadOptions.filter !== undefined) {
                    params.append("search", loadOptions.filter.filterValue);
                }
                try {
                    const response = await fetch(`/api/property-types?${params.toString()}`);
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
        groupPanel: { visible: false, emptyPanelText: "Trascina qui le colonne per raggruppare" },
        filterRow: { visible: true, applyFilter: "auto" },
        headerFilter: { visible: true },
        export: { enabled: false, allowExportSelectedData: true, formats: ['xlsx'] },
        columns: [
            { dataField: "name", caption: "Tipo di proprietà", allowFiltering: true },
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
                        onClick: function () {
                            // add button click functionality
                        },
                        elementAttr: { class: "btn-orange" }
                    }
                }
            ]
        },
        onRowClick: function (e) {
            showModalAddPropertyType(e.data, "Modifica tipo di proprietà");
            if (e.rowType === "data") {
                // window.location = `/agent/${e.data.id}`; 
            }
        },
    });
}

function showModalAddPropertyType(data = null, title) {
    document.getElementById("modalAddPropertyTypeLabel").innerHTML = '<i class="bi bi-shop me-3"></i>' + title;
    document.getElementById("txtPropertyType").value = data !== null ? data.name : '';
    document.getElementById("hPropertyType").value = data !== null ? data.id : '';
    document.getElementById("spNewPropertyTypeResult").innerText = '';
    const modalElement = document.getElementById("modalAddPropertyType");
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
}

async function savePropertyType() {
    const btn = document.getElementById("btnPropertyType");
    const spinner = document.getElementById("spinnerNewPropertyType");
    const type = document.getElementById("txtPropertyType").value.trim();
    const result = document.getElementById("spNewPropertyTypeResult");
    if (type === '') {
        result.innerText = "Si prega di compilare tutti i campi richiesti";
        result.classList.remove("d-none");
        return;
    }
    btn.disabled = true;
    spinner.classList.remove("d-none");
    result.classList.add("d-none");
    result.innerText = "";
    let entryPoint = '';
    let typeID = document.getElementById('hPropertyType').value;
    if (typeID === '') entryPoint = '/api/property-type';
    else entryPoint = '/api/property-type/' + parseInt(typeID);
    try {
        const response = await fetch(entryPoint, {
            method: typeID === "" ? "POST" : "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "type": type })
        });
        const res = await response.json();
        if (res.result) {
            loadList();
            btn.disabled = false;
            spinner.classList.add("d-none");
            $('#modalAddPropertyType').modal('hide');
        } else throw new Error("Something went wrong while inserting new property type!");
    } catch (error) {
        btn.disabled = true;
        spinner.classList.remove("d-none");
        result.classList.remove("d-none");
        result.innerText = error.message !== undefined ? error.message : error;
    }
}