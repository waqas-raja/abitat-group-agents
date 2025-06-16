<?php
$title = 'Panoramica';
ob_start();
?>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<div id="dashboard">
    <div class="pai-card mb-3">
        <span class="pai-title">Dashboard</span>
    </div>
    <div class="row">
        <div class="col-4">
            <div class="pai-card">
                <div id="listTop10Agents"></div>
            </div>
        </div>
        <div class="col-4">
            <div class="pai-card">
                <div id="statsPie"></div>
            </div>
        </div>
        <div class="col-4">
            <div class="pai-card">
                <div id="statsHistogram"></div>
            </div>
        </div>
    </div>
</div>
<script src="/static/js/views/dashboard.js"></script>

<?php
$content = ob_get_clean();
require_once __DIR__ . '/../templates/authorized.php';
