<?php
$title = 'Panoramica';
ob_start();
?>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<div id="dashboard">
    <div class="pai-card mb-3">
        <div class="float-end">
            <select id="ddlTimeInterval" class="form-select">
                <option value="1" selected>Ultimo mese</option>
                <option value="3">Ultimi 3 mesi</option>
                <option value="6">Ultimi 6 mesi</option>
            </select>
        </div>
        <div class="pai-tabs">
            <div class="pai-tab active" data-tab="tabContentPropertiesSummary">Andamento immobili</div>
            <div class="pai-tab" data-tab="tabContentLeadsSummary">Andamento agenti</div>
        </div>
    </div>
    <div id="tabContentPropertiesSummary" class="pai-tab-content active">
        <div id="propertyCategorySection" class="row row-cols-md-3 row-cols-lg-5">
            <div class="col">
                <div class="pai-card p-0">
                    <div class="alert alert-success px-3 py-2">
                        <div id="totApartment" class="fs-5 fw-bold">80</div>
                        <small class="">Numero di Appartamenti</small>
                    </div>
                </div>
            </div>
        </div>
        <div class="row mb-3">
            <div class="col-lg-7">
                <div class="pai-card">
                    <div id="locationBasedSummaryChart" style="height:auto;"></div>
                </div>
            </div>
            <div class="col-lg-5">
                <div id="propertySummaries" class="row row-cols-2">
                    <div class="col">
                        <div class="pai-card mb-3">
                            <div class="card p-3">
                                <span id="torinoSummary"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="pieChartsPresentation" class="row row-cols-md-2 row-cols-lg-4">
            <div class="col">
                <div class="pai-card">
                    <div id="torinoPie" class=""></div>
                </div>
            </div>
        </div>
    </div>
    <div id="tabContentLeadsSummary" class="pai-tab-content">
        <div class="bg-light p-3 mt-3"><i>Sezione in allestimento</i></div>
    </div>
</div>
<script src="/static/js/views/dashboard.js"></script>

<?php
$content = ob_get_clean();
require_once __DIR__ . '/../templates/authorized.php';
