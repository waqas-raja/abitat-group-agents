document.addEventListener("DOMContentLoaded", () => {
    loadList("listOfPackages", getData());
});

function loadList(id, data) {
    new DevExpress.ui.dxDataGrid(document.getElementById(id), {
        dataSource: data,
        columnAutoWidth: true,
        showBorders: true,
        rowAlternationEnabled: false,
        grouping: { autoExpandAll: false },
        groupPanel: { visible: true, emptyPanelText: "Trascina qui le colonne per raggruppare" },
        filterRow: { visible: true, applyFilter: "auto" },
        headerFilter: { visible: true },
        // export: { enabled: true, allowExportSelectedData: true, formats: ['xlsx'] },
        columns: [
            { dataField: "id", caption: "Id", allowFiltering: true },
            { dataField: "name", caption: "Nome", allowFiltering: true },
            {
                dataField: "fixed_fee",
                caption: "Canone fisso",
                allowFiltering: true,
                calculateCellValue: function (data) {
                    return formatNumber(data.fixed_fee);
                }
            },
            {
                dataField: "percentage",
                caption: "Percentuale",
                allowFiltering: true,
                calculateCellValue: function (data) {
                    return data.percentage + '%';
                }
            },
            { dataField: "description", caption: "Descrizione", allowFiltering: true },
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

function savePackage() {
    const btn = document.getElementById("btnSavePackage");
    const spinner = document.getElementById("spinnerNewPackage");
    const name = document.getElementById("txtName").value.trim();
    const fixedFee = document.getElementById("txtFixedFee").value.trim();
    const percentage = document.getElementById("txtPercentage").value.trim();
    const description = document.getElementById("txtDescription").value.trim();
    const result = document.getElementById("spNewPackageResult");
    if (name === '' || fixedFee === "" || percentage === "") {
        result.innerText = "Si prega di compilare tutti i campi richiesti";
        result.classList.remove("d-none");
        return;
    }
    btn.disabled = true;
    spinner.classList.remove("d-none");
    result.classList.add("d-none");
    result.innerText = "";
}

function getData() {
    return [
        {
            "id": 1,
            "name": "Basic",
            "fixed_fee": 500,
            "percentage": 30,
            "description": "Basso rischio con guadagni stabili, adatto a chi ha meno esperienza"
        },
        {
            "id": 2,
            "name": "Premium",
            "fixed_fee": 1500,
            "percentage": 60,
            "description": "Alto guadagno per agenti esperti con elevato volume di vendite"
        },
        {
            "id": 3,
            "name": "Flex",
            "fixed_fee": 800,
            "percentage": 45,
            "description": "Equilibrio tra sicurezza e rendimento"
        },
        {
            "id": 4,
            "name": "Elite",
            "fixed_fee": 0,
            "percentage": 50,
            "description": "Nessun costo fisso, percentuale più alte"
        },
    ];
}