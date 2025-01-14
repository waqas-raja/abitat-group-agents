document.addEventListener("DOMContentLoaded", init);

async function init() {
    const data = [
        {
            "id": 1,
            "bizname": "Alfa SRL",
            "vat": "IT12345678901",
            "sector": "Tecnologia",
            "region": "Lombardia",
            "district": "Milano"
        },
        {
            "id": 2,
            "bizname": "Beta Spa",
            "vat": "IT98765432109",
            "sector": "Manifattura",
            "region": "Veneto",
            "district": "Verona"
        }
    ];
    loadList(data);
}

function loadList(data) {
    new DevExpress.ui.dxDataGrid(document.getElementById("listOfCompanies"), {
        dataSource: data,
        columnAutoWidth: true,
        showBorders: true,
        rowAlternationEnabled: false,
        grouping: { autoExpandAll: false },
        groupPanel: { visible: true, emptyPanelText: "Trascina qui le colonne per raggruppare" },
        filterRow: { visible: true, applyFilter: "auto" },
        headerFilter: { visible: true },
        export: { enabled: true, allowExportSelectedData: true, formats: ['xlsx'] },
        columns: [
            { dataField: "bizname", caption: "Ragione Sociale", allowFiltering: true },
            { dataField: "vat", caption: "Partita IVA", allowFiltering: true },
            { dataField: "sector", caption: "Settore", allowFiltering: true },
            { dataField: "region", caption: "Regione", allowFiltering: true },
            { dataField: "district", caption: "Provincia", allowFiltering: true }
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
                        text: "Aggiungi Azienda",
                        onClick: function () {
                            const modalElement = document.getElementById("modalAddCompany");
                            const modal = new bootstrap.Modal(modalElement);
                            modal.show();
                        },
                        elementAttr: { class: "btn-orange" }
                    }
                }
            ]
        },
        onRowClick: function(e) { if(e.rowType === "data") { window.location = `/company/${e.data.id}`; } },
        onExporting: function(e) {
            if (e.format === 'xlsx') {
                const workbook = new ExcelJS.Workbook();
                const worksheet = workbook.addWorksheet("Leeds");
                DevExpress.excelExporter.exportDataGrid({
                    worksheet: worksheet,
                    component: e.component,
                }).then(function() {
                    workbook.xlsx.writeBuffer().then(function(buffer) {
                        saveAs(new Blob([buffer], { type: "application/octet-stream" }), "glprestiti-companies.xlsx");
                    });
                });
            }
        }
    });
}


async function saveCompany() {
    const btn = document.getElementById("btnSaveCompany");
    const spinner = document.getElementById("spinnerNewCompany");
    const bizname = document.getElementById("txtNewCompanyBizname").value.trim();
    const vat = document.getElementById("txtNewCompanyVat").value.trim();
    const result = document.getElementById("spNewCompanyResult");

    btn.disabled = true;
    spinner.classList.remove("d-none");
    result.classList.add("d-none");
    result.innerText = "";
    if (!bizname || !vat) {
        result.innerText = "Attenzione, entrambi i campi sono obbligatori";
        result.classList.remove("d-none");
        spinner.classList.add("d-none");
        btn.disabled = false;
        return;
    }

    // const response = await fetch('/api/company', {
    //     method: 'POST',
    //     headers: {},
    //     body: JSON.stringify({ bizname: bizname, vat: vat })
    // });
    // const r = await response.json();
    //
    // window.location(`/company/${e.row.data.id}`);

    setTimeout(() => {
        result.innerText = "TEST OK";
        result.classList.remove("d-none");
        spinner.classList.add("d-none");
        btn.disabled = false;
    }, 3000);
}
