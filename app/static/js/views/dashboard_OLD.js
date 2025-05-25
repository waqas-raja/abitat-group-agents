const dataSource = [
    { city: 'Torino', month: 'Jan', apartments: 4, houses: 3, villas: 1, apartmentsValue: 100, housesValue: 150, villasValue: 70 },
    { city: 'Moncalieri', month: 'Jan', apartments: 40, houses: 30, villas: 15, apartmentsValue: 40, housesValue: 60, villasValue: 55 },
    { city: 'Roma', month: 'Jan', apartments: 10, houses: 20, villas: 30, apartmentsValue: 60, housesValue: 40, villasValue: 45 },
    { city: 'Torino', month: 'Feb', apartments: 40, houses: 30, villas: 15, apartmentsValue: 100, housesValue: 200, villasValue: 300 },
    { city: 'Moncalieri', month: 'Feb', apartments: 40, houses: 30, villas: 15, apartmentsValue: 40, housesValue: 60, villasValue: 55 },
    { city: 'Roma', month: 'Feb', apartments: 10, houses: 20, villas: 30, apartmentsValue: 60, housesValue: 40, villasValue: 45 },
    { city: 'Torino', month: 'Mar', apartments: 40, houses: 30, villas: 15, apartmentsValue: 100, housesValue: 200, villasValue: 300 },
    { city: 'Moncalieri', month: 'Mar', apartments: 40, houses: 30, villas: 15, apartmentsValue: 40, housesValue: 60, villasValue: 55 },
    { city: 'Roma', month: 'Mar', apartments: 10, houses: 20, villas: 30, apartmentsValue: 60, housesValue: 40, villasValue: 45 },
    { city: 'Torino', month: 'Apr', apartments: 40, houses: 30, villas: 15, apartmentsValue: 100, housesValue: 200, villasValue: 300 },
    { city: 'Moncalieri', month: 'Apr', apartments: 40, houses: 30, villas: 15, apartmentsValue: 40, housesValue: 60, villasValue: 55 },
    { city: 'Roma', month: 'Apr', apartments: 10, houses: 20, villas: 30, apartmentsValue: 60, housesValue: 40, villasValue: 45 },
    { city: 'Torino', month: 'May', apartments: 40, houses: 30, villas: 15, apartmentsValue: 100, housesValue: 200, villasValue: 300 },
    { city: 'Moncalieri', month: 'May', apartments: 40, houses: 30, villas: 15, apartmentsValue: 40, housesValue: 60, villasValue: 55 },
    { city: 'Roma', month: 'May', apartments: 10, houses: 20, villas: 30, apartmentsValue: 60, housesValue: 40, villasValue: 45 },
    { city: 'Torino', month: 'Jun', apartments: 40, houses: 30, villas: 15, apartmentsValue: 100, housesValue: 200, villasValue: 300 },
    { city: 'Moncalieri', month: 'Jun', apartments: 4, houses: 30, villas: 15, apartmentsValue: 40, housesValue: 60, villasValue: 55 },
    { city: 'Roma', month: 'Jun', apartments: 10, houses: 20, villas: 30, apartmentsValue: 90, housesValue: 240, villasValue: 145 },
];
let _dynamicDataSource = [];
let _filteredDataSource = [];
let _classes = ["alert-success", "alert-secondary", "alert-info", "alert-primary"];
const chartPalette = 'Soft Pastel';
document.addEventListener("DOMContentLoaded", async () => {
    await getAllPropertiesForDashboard();
    document.getElementById("ddlTimeInterval").addEventListener("change", function () {
        filterDataSourceAsPerSelection(parseInt(this.value));
    });
    initInternalTabs();
    filterDataSourceAsPerSelection(1);
});

async function getAllPropertiesForDashboard() {
    // const response = await fetch(`/api/properties`);
    // const json = await response.json();
    // _dynamicDataSource = json.payload;
    _dynamicDataSource = [
        {
            "id": 3,
            "address": "via xxI aparmento streeto",
            "branch_id": 1,
            "city": "Turino",
            "property_type": 1,
            "acquisition_date": "2025-02-25",
            "acquisition_price": "5500.00",
            "acquisition_agent_id": 7,
            "acquisition_agent_percentage": 5,
            "acquisition_agency_percentage": 3,
            "mandate_expiration": "2025-02-27",
            "sale_date": "2025-02-26",
            "sale_price": "6325.00",
            "sale_agent_id": 8,
            "sale_agent_percentage": null,
            "sale_agency_percentage": 10,
            "sale_down_payment": "0.00",
            "sale_commission_other_agency": "0.00",
            "delta": "825.00",
            "dtcr": "2025-02-26 08:46:26",
            "ucr": 3,
            "acquisition_agent": "Villa Federica",
            "sale_agent_name": "Serra Fabrizio",
            "property_name": "Appartamento"
        },
        {
            "id": 4,
            "address": "via xx 15",
            "branch_id": 1,
            "city": "Turino",
            "property_type": 2,
            "acquisition_date": "2025-02-19",
            "acquisition_price": "150000.00",
            "acquisition_agent_id": 7,
            "acquisition_agent_percentage": 5,
            "acquisition_agency_percentage": 3,
            "mandate_expiration": "2025-02-21",
            "sale_date": "2025-02-27",
            "sale_price": "160500.00",
            "sale_agent_id": 8,
            "sale_agent_percentage": null,
            "sale_agency_percentage": 3,
            "sale_down_payment": "0.00",
            "sale_commission_other_agency": "0.00",
            "delta": "10500.00",
            "dtcr": "2025-02-26 10:42:56",
            "ucr": 2,
            "acquisition_agent": "Villa Federica",
            "sale_agent_name": "Serra Fabrizio",
            "property_name": "Villa"
        },
        {
            "id": 5,
            "address": "via aparmento streeto",
            "branch_id": 2,
            "city": "Moncalari",
            "property_type": 2,
            "acquisition_date": "2025-02-27",
            "acquisition_price": "1258.00",
            "acquisition_agent_id": 8,
            "acquisition_agent_percentage": 5,
            "acquisition_agency_percentage": 22,
            "mandate_expiration": "2025-02-28",
            "sale_date": null,
            "sale_price": null,
            "sale_agent_id": null,
            "sale_agent_percentage": null,
            "sale_agency_percentage": 0,
            "sale_down_payment": "0.00",
            "sale_commission_other_agency": "0.00",
            "delta": "0.00",
            "dtcr": "2025-02-27 12:28:10",
            "ucr": 3,
            "acquisition_agent": "Serra Fabrizio",
            "sale_agent_name": null,
            "property_name": "Villa"
        },
        {
            "id": 8,
            "address": "via magazzino 16",
            "branch_id": 2,
            "city": "Moncalari",
            "property_type": 1,
            "acquisition_date": "2025-02-28",
            "acquisition_price": "16000.00",
            "acquisition_agent_id": 8,
            "acquisition_agent_percentage": 5,
            "acquisition_agency_percentage": 3,
            "mandate_expiration": "2025-03-20",
            "sale_date": null,
            "sale_price": null,
            "sale_agent_id": null,
            "sale_agent_percentage": null,
            "sale_agency_percentage": 0,
            "sale_down_payment": "0.00",
            "sale_commission_other_agency": "0.00",
            "delta": "0.00",
            "dtcr": "2025-02-28 10:12:15",
            "ucr": 2,
            "acquisition_agent": "Serra Fabrizio",
            "sale_agent_name": null,
            "property_name": "Appartamento"
        },
        {
            "id": 9,
            "address": "via xx 15",
            "branch_id": 3,
            "city": "Roma",
            "property_type": 4,
            "acquisition_date": "2025-03-03",
            "acquisition_price": "1500.00",
            "acquisition_agent_id": 8,
            "acquisition_agent_percentage": 5,
            "acquisition_agency_percentage": 3,
            "mandate_expiration": "2025-03-05",
            "sale_date": null,
            "sale_price": null,
            "sale_agent_id": null,
            "sale_agent_percentage": null,
            "sale_agency_percentage": 0,
            "sale_down_payment": "0.00",
            "sale_commission_other_agency": "0.00",
            "delta": "0.00",
            "dtcr": "2025-03-03 01:33:44",
            "ucr": 2,
            "acquisition_agent": "Serra Fabrizio",
            "sale_agent_name": null,
            "property_name": "Magazzino"
        },
        {
            "id": 10,
            "address": "via cara bianca",
            "branch_id": 3,
            "city": "Roma",
            "property_type": 5,
            "acquisition_date": "2025-03-04",
            "acquisition_price": "5387.00",
            "acquisition_agent_id": 8,
            "acquisition_agent_percentage": 5,
            "acquisition_agency_percentage": 7,
            "mandate_expiration": "2025-03-27",
            "sale_date": "2025-03-04",
            "sale_price": "9987.00",
            "sale_agent_id": 7,
            "sale_agent_percentage": null,
            "sale_agency_percentage": 10,
            "sale_down_payment": "555.00",
            "sale_commission_other_agency": "666.00",
            "delta": "4600.00",
            "dtcr": "2025-03-04 12:02:56",
            "ucr": 3,
            "acquisition_agent": "Serra Fabrizio",
            "sale_agent_name": "Villa Federica",
            "property_name": "Casa bianca"
        },
        {
            "id": 11,
            "address": "via ventimiglia 1",
            "branch_id": 1,
            "city": "Turino",
            "property_type": 3,
            "acquisition_date": "2025-03-05",
            "acquisition_price": "16200.00",
            "acquisition_agent_id": 8,
            "acquisition_agent_percentage": 5,
            "acquisition_agency_percentage": 3,
            "mandate_expiration": "2025-11-15",
            "sale_date": null,
            "sale_price": null,
            "sale_agent_id": null,
            "sale_agent_percentage": null,
            "sale_agency_percentage": 0,
            "sale_down_payment": "0.00",
            "sale_commission_other_agency": "0.00",
            "delta": "0.00",
            "dtcr": "2025-03-05 14:06:03",
            "ucr": 2,
            "acquisition_agent": "Serra Fabrizio",
            "sale_agent_name": null,
            "property_name": "Rudere"
        }
    ];
    console.log(_dynamicDataSource);
    if (localStorage.ulocation !== "null") {
        switch (parseInt(localStorage.ulocation)) {
            case 1: _dynamicDataSource = _dynamicDataSource.filter((ele) => { return ele.branch_id === parseInt(localStorage.ulocation) }); break;
            case 2: _dynamicDataSource = _dynamicDataSource.filter((ele) => { return ele.branch_id === parseInt(localStorage.ulocation) }); break;
            case 3: _dynamicDataSource = _dynamicDataSource.filter((ele) => { return ele.branch_id === parseInt(localStorage.ulocation) }); break;
        }
    }
}

function filterDataSourceAsPerSelection(months) {
    const uniqueMonths = [...new Set(dataSource.map(d => d.month))];
    const selectedMonths = uniqueMonths.slice(-months);
    _filteredDataSource = dataSource.filter(d => selectedMonths.includes(d.month));
    if (localStorage.ulocation !== "null") {
        switch (parseInt(localStorage.ulocation)) {
            case 1: _filteredDataSource = _filteredDataSource.filter((ele) => { return ele.city === "Torino" }); break;
            case 2: _filteredDataSource = _filteredDataSource.filter((ele) => { return ele.city === "Moncalieri" }); break;
            case 3: _filteredDataSource = _filteredDataSource.filter((ele) => { return ele.city === "Roma" }); break;
        }
    }

    loadBarChart('locationBasedSummaryChart');
    loadPieChart();
    loadSummaries();
}

function loadPieChart() {
    const groupedByBranchArray = Object.entries(
        _dynamicDataSource.reduce((acc, item) => {
            const { branch_id } = item;
            if (!acc[branch_id]) acc[branch_id] = [];
            acc[branch_id].push(item);
            return acc;
        }, {})
    ).map(([branch_id, properties]) => ({
        branch_id: Number(branch_id),
        properties: properties
    }));

    let div = document.getElementById('pieChartsPresentation');
    div.innerHTML = '';
    for (let i = 0; i < groupedByBranchArray.length; i++) {
        const propertyCount = groupedByBranchArray[i].properties.reduce((acc, item) => {
            const { property_name } = item;
            const existing = acc.find(obj => obj.category === property_name);
            if (existing) existing.value += 1;
            else acc.push({ category: property_name, value: 1 });
            return acc;
        }, []);
        populateDynamicPieChart(propertyCount, div, "branch_" + groupedByBranchArray[i].branch_id, groupedByBranchArray[i].properties[0].city);
    }
    if (groupedByBranchArray.length > 1) {
        const propertyCount = _dynamicDataSource.reduce((acc, item) => {
            const { property_name } = item;
            const existing = acc.find(obj => obj.category === property_name);
            if (existing) existing.value += 1;
            else acc.push({ category: property_name, value: 1 });
            return acc;
        }, []);
        populateDynamicPieChart(propertyCount, div, "branch_total", "Totale");
    }
}

function populateDynamicPieChart(data, div, id, city) {
    let colDiv = document.createElement('div');
    colDiv.classList.add('col');
    let piCardDiv = document.createElement('div');
    piCardDiv.classList.add('pai-card');
    let chartContainer = document.createElement('div');
    chartContainer.id = id;

    piCardDiv.appendChild(chartContainer);
    colDiv.appendChild(piCardDiv);
    div.appendChild(colDiv);

    $(`#${id}`).dxPieChart({
        // dataSource: formattedDynamicData.length > 0 ? formattedDynamicData : formatedData,
        dataSource: data,
        palette: chartPalette,
        series: [
            {
                argumentField: 'category',
                valueField: 'value',
                label: {
                    visible: true,
                    connector: { visible: true, width: 0.5 },
                    font: {
                        size: 14,
                        color: '#fff',
                        weight: 600
                    },
                },
            },
        ],
        title: {
            text: city !== '' ? city : 'Totale',
            font: {
                size: 16,
                color: '#aaa',
                weight: 600,
            },
            alignment: 'center',
        },
        export: {
            enabled: false,
        },
        onPointClick(e) {
            const point = e.target;
            toggleVisibility(point);
        },
        onLegendClick(e) {
            const arg = e.target;
            toggleVisibility(this.getAllSeries()[0].getPointsByArg(arg)[0]);
        },
    });
}

function toggleVisibility(item) {
    if (item.isVisible()) {
        item.hide();
    } else {
        item.show();
    }
}

function loadBarChart(chartId) {
    $(`#${chartId}`).dxChart({
        dataSource: _filteredDataSource,
        palette: chartPalette,
        title: {},
        commonSeriesSettings: {
            aggregation: {
                enabled: true,
                method: 'sum',
            },
            argumentField: 'city',
            type: 'bar',
        },
        series: [
            { valueField: 'apartmentsValue', name: 'Appartamenti' },
            { valueField: 'housesValue', name: 'Case' },
            { valueField: 'villasValue', name: 'Ville' }
        ],
        legend: { visible: true },
        label: { enabled: true },
        tooltip: {
            enabled: true,
            customizeTooltip: function (arg) {
                return { text: `${arg.seriesName}: ${formatNumber(arg.value)}` };
            }
        },
    });
}

async function loadSummaries() {
    let dynamicAggregatedData = await aggregateDynamicPropertyData();
    let divEle = document.getElementById('propertyCategorySection');
    divEle.innerHTML = '';
    for (let i = 0; i < dynamicAggregatedData.length; i++) {
        divEle.innerHTML += `<div class="col">
                                <div class="pai-card p-0">
                                    <div class="alert `+ _classes[Math.floor(Math.random() * _classes.length)] + ` px-3 py-2">
                                        <div id="tot_`+ dynamicAggregatedData[i].property_name + `" class="fs-5 fw-bold">` + dynamicAggregatedData[i].totalProperties + `</div>
                                        <small class="">Numero di `+ dynamicAggregatedData[i].property_name + `</small>
                                    </div>
                                </div>
                            </div>`;
    }
    const totalsByBranch = await calculateTotalsByBranch(dynamicAggregatedData);

    let divSum = document.getElementById('propertySummaries');
    divSum.innerHTML = '';
    for (let i = 0; i < totalsByBranch.length; i++) {
        divSum.innerHTML += `<div class="col">
                                <div class="pai-card mb-3">
                                    <div class="card p-3">
                                        <span id=""><b>Summary di `+ totalsByBranch[i].city + `</b></span>
                                        <span id="">Total Properties: `+ totalsByBranch[i].totalProperties + `</span>
                                        <span id="">Total Acquisition Price: `+ formatNumber(totalsByBranch[i].totalAcquisitionPrice) + `</span>
                                        <span id="">Total Sale Price: `+ formatNumber(totalsByBranch[i].totalSalePrice) + `</span>
                                    </div>
                                </div>
                            </div>`;
    }
}

function getFilteredData(months) {
    const uniqueMonths = [...new Set(dataSource.map(d => d.month))];
    const selectedMonths = uniqueMonths.slice(-months);
    return dataSource.filter(d => selectedMonths.includes(d.month));
}

function sumArrays(...arrays) {
    const n = arrays.reduce((max, xs) => Math.max(max, xs.length), 0);
    const result = Array.from({ length: n });
    return result.map((_, i) => arrays.map(xs => xs[i] || 0).reduce((sum, x) => sum + x, 0));
}

async function aggregateDynamicPropertyData() {
    let result = {};
    _dynamicDataSource.forEach(property => {
        let type = property.property_type;
        if (!result[type]) {
            result[type] = {
                category: type,
                branch: property.branch_id,
                branch_name: property.city,
                property_name: property.property_name,
                totalProperties: 0,
                totalSalePrice: 0,
                totalAcquisitionPrice: 0,
                totalAcquisitionDownPayment: 0,
                totalSaleDownPayment: 0,
                totalAcquisitionCommissionOtherAgency: 0,
                totalSaleCommissionOtherAgency: 0,
            };
        }
        result[type].totalProperties++;
        result[type].totalSalePrice += (property.sale_price !== null ? parseFloat(property.sale_price) : 0);
        result[type].totalAcquisitionPrice += parseFloat(property.acquisition_price) || 0;
        result[type].totalSaleDownPayment += parseFloat(property.sale_down_payment) || 0;
        result[type].totalAcquisitionCommissionOtherAgency += parseFloat(property.acquisition_commission_other_agency) || 0;
        result[type].totalSaleCommissionOtherAgency += parseFloat(property.sale_commission_other_agency) || 0;
    });
    return Object.values(result);
}

async function calculateTotalsByBranch(data) {
    let res = _dynamicDataSource.reduce((acc, item) => {
        const { branch_id, city, sale_price, acquisition_price } = item;
        if (!acc[branch_id]) {
            acc[branch_id] = {
                branch_id,
                city,
                totalProperties: 0,
                totalSalePrice: 0,
                totalAcquisitionPrice: 0
            };
        }
        acc[branch_id].totalProperties++;
        acc[branch_id].totalSalePrice += (sale_price !== null ? parseFloat(sale_price) : 0);
        acc[branch_id].totalAcquisitionPrice += (acquisition_price !== null ? parseFloat(acquisition_price) : 0);
        return acc;
    }, {});
    return Object.values(res);
}