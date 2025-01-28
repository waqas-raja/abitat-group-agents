document.addEventListener("DOMContentLoaded", () => {
    loadAgentDetail();
    loadSoldPropertiesByAgent();
});

async function loadAgentDetail() {
    const id = document.getElementById('hAgentId').value;
    const data = [
        {
            "id": 1,
            "first_name": "john",
            "last_name": "Wick",
            "commission": 5,
            "fixed_cost": 55000,
            "number_of_properties_managed": "50",
            "email": "john_wick99@mail.com",
            "phone": "00-33-4512789",
            "location": "Turino",
        },
        {
            "id": 2,
            "first_name": "Jason",
            "last_name": "Statham",
            "commission": 6,
            "fixed_cost": 22000,
            "number_of_properties_managed": "50",
            "email": "jason_statham222@mail.com",
            "phone": "00-33-4512789",
            "location": "Roma",
        },
    ];
    const res = data.filter(function (el) {
        return el.id === parseInt(id);
    });
    document.getElementById("spFirstName").innerText = res[0].first_name ?? "n.d.";
    document.getElementById("txtFirstName").value = res[0].first_name ?? "n.d.";
    document.getElementById("spLastName").innerText = res[0].last_name ?? "n.d.";
    document.getElementById("txtLastName").value = res[0].last_name ?? "n.d.";
    document.getElementById("spFixedCost").innerText = res[0].fixed_cost ?? "n.d.";
    document.getElementById("txtFixedCost").value = res[0].fixed_cost ?? "n.d.";
    document.getElementById("spCommission").innerText = res[0].commission ?? "n.d.";
    document.getElementById("txtCommission").value = res[0].commission ?? "n.d.";
    document.getElementById("spEmail").innerText = res[0].email ?? "n.d.";
    document.getElementById("txtEmail").value = res[0].email ?? "n.d.";
    document.getElementById("spPhone").innerText = res[0].phone ?? "n.d.";
    document.getElementById("txtPhone").value = res[0].phone ?? "n.d.";
    document.getElementById("spLocation").innerText = res[0].location ?? "n.d.";
    // document.getElementById("txtLocation").value = res[0].location ?? "n.d.";
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
    loadOverviewData();
}


async function loadSoldPropertiesByAgent() {
    const data = [
        {
            "id": 1,
            "title": "Alfa SRL",
            "type": "Residential",
            "address": "Tecnologia",
            "surface_area": "Lombardia",
            "price": 5000,
            "commission": 5,
            "status": "Milano",
            "assigned_agent": "Milano",
            "publication_date": "22/1/2025",
            "sale_date": "22/1/2025",
            "payment_date": "22/1/2025",
            "sale_price": 5500,
            "seller": 'Rahat',
            "buyer": 'Sarti',
            "note": 'Property is sold',
        },
        {
            "id": 2,
            "title": "Rahatsol SMC",
            "type": "Rental",
            "address": "Tecnologia",
            "surface_area": "Lombardia",
            "price": 6000,
            "commission": 6,
            "status": "Milano",
            "assigned_agent": "Milano",
            "publication_date": "22/1/2025",
            "sale_date": "22/1/2025",
            "payment_date": "22/1/2025",
            "sale_price": 6500,
            "seller": 'Sarti',
            "buyer": 'Bourne',
            "note": 'Property is handed over',
        },
    ];
    loadPropertiesList(data);
}

function loadPropertiesList(data) {
    new DevExpress.ui.dxDataGrid(document.getElementById("listOfSoldProperties"), {
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
            {
                caption: "Data vendita",
                allowFiltering: true,
                calculateCellValue: function (data) {
                    return (data.sale_date).slice(3);
                }
            },
            {
                caption: "Provvigioni",
                allowFiltering: true,
                calculateCellValue: function (data) {
                    return formatNumber(data.commission);
                }
            },
            { dataField: "title", caption: "Immobile", allowFiltering: true },
            {
                caption: "Propr/Acquir", allowFiltering: true,
                calculateCellValue: function (data) {
                    return (data.seller + '/' + data.buyer);
                }
            },
            { dataField: "payment_date", caption: "Data pagamento", allowFiltering: true },
            { dataField: "note", caption: "Note", allowFiltering: true },
        ],
        paging: { pageSize: 10 },
        pager: { showPageSizeSelector: true, allowedPageSizes: [5, 10, 20], showInfo: true },
        toolbar: {
            items: [
                "groupPanel",
                "searchPanel",
                "exportButton",
                // {
                //     location: "after",
                //     widget: "dxButton",
                //     options: {
                //         icon: "add",
                //         text: "Aggiungi Proprietà",
                //         onClick: function () {
                //             const modalElement = document.getElementById("modalAddProperty");
                //             const modal = new bootstrap.Modal(modalElement);
                //             modal.show();
                //         },
                //         elementAttr: { class: "btn-orange" }
                //     }
                // }
            ]
        },
        onRowClick: function (e) {
            if (e.rowType === "data") {
                // window.location = `/property/${e.data.id}`; 
            }
        },
        onExporting: function (e) {
            if (e.format === 'xlsx') {
                const workbook = new ExcelJS.Workbook();
                const worksheet = workbook.addWorksheet("Properties");
                DevExpress.excelExporter.exportDataGrid({
                    worksheet: worksheet,
                    component: e.component,
                }).then(function () {
                    workbook.xlsx.writeBuffer().then(function (buffer) {
                        saveAs(new Blob([buffer], { type: "application/octet-stream" }), "abitat-properties.xlsx");
                    });
                });
            }
        }
    });
}