<?php
$title = 'Panoramica';
ob_start();
?>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<div id="dashboard">
    <div class="pai-card mb-3">
        <div class="d-flex align-items-center justify-content-between">
            <span class="pai-title">Dashboard</span>
            <div>
                <select id="ddlTimeInterval" class="form-select">
                    <option value="1" selected>Last 1 Month</option>
                    <option value="3">Last 3 Months</option>
                    <option value="6">Last 6 Months</option>
                </select>
            </div>
        </div>
        <div class="pai-tabs">
            <div class="pai-tab active" data-tab="tabContentPropertiesSummary">Properties</div>
            <div class="pai-tab" data-tab="tabContentLeadsSummary">Leads</div>
        </div>
    </div>
    <div id="tabContentPropertiesSummary" class="pai-tab-content active">
        <div class="row row-cols-4">
            <div class="col">
                <div class="pai-card p-0">
                    <div class="alert alert-success px-3 py-2">
                        <div id="totApartment" class="fs-5 fw-bold">80</div>
                        <small class="">Total Apartments</small>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="pai-card p-0">
                    <div class="alert alert-secondary px-3 py-2">
                        <div id="totHouse" class="fs-5 fw-bold">80</div>
                        <small class="">Total Houses</small>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="pai-card p-0">
                    <div class="alert alert-info px-3 py-2">
                        <div id="totVilla" class="fs-5 fw-bold">80</div>
                        <small class="">Total Villas</small>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="pai-card p-0">
                    <div class="alert alert-primary px-3 py-2">
                        <div id="overallProp" class="fs-5 fw-bold">240</div>
                        <small class="">Overall Properties</small>
                    </div>
                </div>
            </div>
        </div>
        <div class="row mb-3">
            <div class="col-lg-8">
                <div class="pai-card">
                    <div id="locationBasedSummaryChart"></div>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="row row-cols-2">
                    <div class="col">
                        <div class="pai-card mb-3">
                            <div class="card p-3">
                                <span id="torinoSummary"></span>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="pai-card mb-3">
                            <div class="card p-3"><span id="moncalieriSummary"></span></div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="pai-card mb-3">
                            <div class="card p-3"><span id="romaSummary"></span></div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="pai-card mb-3">
                            <div class="card p-3"><span id="overallSummary"></span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-3">
                <div class="pai-card">
                    <div id="torinoPie" class=""></div>
                </div>
            </div>
            <div class="col-lg-3">
                <div class="pai-card">
                    <div id="moncalieriPie" class=""></div>
                </div>
            </div>
            <div class="col-lg-3">
                <div class="pai-card">
                    <div id="romaPie" class=""></div>
                </div>
            </div>
            <div class="col-lg-3">
                <div class="pai-card">
                    <div id="totalPie" class=""></div>
                </div>
            </div>
        </div>
    </div>
    <div id="tabContentLeadsSummary" class="pai-tab-content">
        Leads
    </div>
</div>
<script src="/static/js/views/dashboard.js"></script>

<?php
$content = ob_get_clean();
require_once __DIR__ . '/../templates/authorized.php';
