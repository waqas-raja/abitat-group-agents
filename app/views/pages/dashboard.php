<?php
$title = 'Panoramica';
ob_start();
?>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<div id="dashboard">
    <div class="pai-card">
        <div class="d-flex align-items-center justify-content-between">
            <span class="pai-title">Dashboard</span>
            <div>
                <select id="ddlTimeInterval" class="form-select">
                    <option value="3" selected>Last 3 Months</option>
                    <option value="6">Last 6 Months</option>
                    <option value="12">Last 12 Months</option>
                </select>
            </div>
        </div>
    </div>
    <div class="row my-4">
        <div class="col-lg-8">
            <div class="pai-card">
                <canvas id="barChart"></canvas>
            </div>
        </div>
        <div class="col-lg-4">
            <div class="pai-card">
                <div class="card p-3 mb-2"><span id="torinoSummary"></span></div>
                <div class="card p-3 mb-2"><span id="moncalieriSummary"></span></div>
                <div class="card p-3 mb-2"><span id="romaSummary"></span></div>
                <div class="card p-3 bg-orange text-white"><span id="overallSummary"></span></div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-3">
            <div class="pai-card">
                <canvas id="pieChart1"></canvas>
                <div class="text-center mt-2">Torino</div>
            </div>
        </div>
        <div class="col-lg-3">
            <div class="pai-card">
                <canvas id="pieChart2"></canvas>
                <div class="text-center mt-2">Moncalieri</div>
            </div>
        </div>
        <div class="col-lg-3">
            <div class="pai-card">
                <canvas id="pieChart3"></canvas>
                <div class="text-center mt-2">Roma</div>
            </div>
        </div>
        <div class="col-lg-3">
            <div class="pai-card">
                <canvas id="pieChartTotal"></canvas>
                <div class="card text-center mt-2 bg-orange text-white">Total</div>
            </div>
        </div>
    </div>
</div>
<script src="/static/js/views/dashboard.js"></script>

<?php
$content = ob_get_clean();
require_once __DIR__ . '/../templates/authorized.php';
