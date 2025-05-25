<?php
$title = 'Panoramica';
ob_start();
?>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<div id="dashboard">
    <div class="pai-card w-50">
    <div class="row">
        <div class="col-4">
            <b>Migliori 10 Agenti</b>
            <div id="listTop10Agents"></div>
        </div>
        <div class="col-4"></div>
        <div class="col-4"></div>
    </div>


    </div>
</div>
<script src="/static/js/views/dashboard.js"></script>

<?php
$content = ob_get_clean();
require_once __DIR__ . '/../templates/authorized.php';
