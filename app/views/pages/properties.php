<?php
$title = 'Elenco Immobili';
ob_start();
require_once __DIR__ . '/../modals/add-property.php';
?>

<div id="properties">
    <div class="pai-card mb-3 d-flex justify-content-start align-items-center gap-4">
        <span class="pai-title">Elenco immobili:</span>
        <div class="pai-tabs">
            <div class="pai-tab active" data-tab="tabContentTorino" onclick="loadList(1)">Torino</div>
            <div class="pai-tab" data-tab="tabContentTorino" onclick="loadList(2)">Moncalieri</div>
            <div class="pai-tab" data-tab="tabContentTorino" onclick="loadList(3)">Roma</div>
        </div>
    </div>
    <div id="tabContentTorino" class="pai-tab-content active">
        <?php require_once __DIR__ . "/../partials/property-torino.php"; ?>
    </div>
    <!-- <div id="tabContentMoncalieri" class="pai-tab-content">
        milano
        <?php //require __DIR__ . "/../partials/property-torino.php"; ?>
    </div>
    <div id="tabContentRoma" class="pai-tab-content">
        roma
        <?php //require __DIR__ . "/../partials/property-torino.php"; ?>
    </div> -->
</div>
<script src="/static/js/views/properties.js"></script>

<?php
$content = ob_get_clean();
require_once __DIR__ . '/../templates/authorized.php';
