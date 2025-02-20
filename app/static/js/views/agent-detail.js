document.addEventListener("DOMContentLoaded", async () => {
    await loadPackages();
    await Promise.all([
        loadAgentDetail(),
        loadSoldPropertiesByAgent()
    ]);
});

async function loadPackages() {
    const ddlPackage = document.getElementById('ddlPackage');
    ddlPackage.innerHTML = '<option value="-1" selected disabled>Seleziona un pacchetto</option>';
    const response = await fetch('/api/packages');
    const r = await response.json();
    r.payload.forEach(el => { ddlPackage.innerHTML += `<option value="${el.id}">${el.name}</option>`; });
}

async function loadAgentDetail() {
    const id = document.getElementById('hAgentId').value;
    const response = await fetch('/api/agent/' + id);
    const r = await response.json();
    document.getElementById("spFirstName").innerText = r.payload.name ?? "n.d.";
    document.getElementById("txtFirstName").value = r.payload.name ?? "n.d.";
    document.getElementById("spLastName").innerText = r.payload.surname ?? "n.d.";
    document.getElementById("txtLastName").value = r.payload.surname ?? "n.d.";
    document.getElementById("spPackage").innerText = r.payload.package_name ?? "n.d.";
    document.getElementById("ddlPackage").value = r.payload.package_id ?? "n.d.";
    document.getElementById("spEmail").innerText = r.payload.email ?? "n.d.";
    document.getElementById("txtEmail").value =r.payload.email ?? "n.d.";
    document.getElementById("spPhone").innerText = r.payload.phone ?? "n.d.";
    document.getElementById("txtPhone").value = r.payload.phone ?? "n.d.";
    document.getElementById("spLocation").innerText = r.payload.location ?? "n.d.";
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
            ]
        },
        onRowClick: function (e) {
            if (e.rowType === "data") {
                // window.location = `/property/${e.data.id}`; 
            }
        },
    });
}