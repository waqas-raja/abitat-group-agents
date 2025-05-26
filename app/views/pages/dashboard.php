<?php
$title = 'Panoramica';
ob_start();
?>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<div id="dashboard">
    <div class="pai-card">
        <div class="row">
            <div class="col-3">
                <h3>Migliori 5 Agenti</h3>
                <div id="listTop10Agents"></div>
            </div>
            <div class="col-3">
                <h3>Tipologie</h3>
                <div id="statsPie"></div>
            </div>
            <div class="col-6">
                <h3>Vendite ultimo anno</h3>
                <div id="statsHistogram"></div>
            </div>
        </div>
    </div>
</div>
<script src="/static/js/views/dashboard.js"></script>

<?php
$content = ob_get_clean();
require_once __DIR__ . '/../templates/authorized.php';
