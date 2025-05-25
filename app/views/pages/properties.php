<?php
$title = 'Elenco Immobili';
ob_start();
require_once __DIR__ . '/../modals/add-property.php';
require_once __DIR__ . '/../modals/mark-property-sold.php';
?>

<div id="properties">
    <div class="pai-card mb-3 d-flex justify-content-between align-items-center">
        <div class="d-flex justify-content-start align-items-center gap-5">
            <span class="pai-title">Agenzia:</span>
            <div class="pai-tabs">
                <div id="tabTorino" class="pai-tab active" data-tab="tabContent" onclick="changeBranch(1)">Torino</div>
                <div id="tabMoncalieri" class="pai-tab" data-tab="tabContent" onclick="changeBranch(2)">Moncalieri</div>
                <div id="tabRoma" class="pai-tab" data-tab="tabContent" onclick="changeBranch(3)">Roma</div>
            </div>
        </div>
        <button type="button" class="btn btn-orange" onclick="showModalAddEditProperty(null, 'Nuovo immobile')"><i class="bi bi-plus-lg me-2"></i> Aggiungi Immobible</button>
    </div>
    <div id="tabContent" class="pai-tab-content active">
        <div class="pai-card">
            <div id="listOfProperties"></div>
        </div>
    </div>

</div>
<script src="/static/js/views/properties.js"></script>

<?php
$content = ob_get_clean();
require_once __DIR__ . '/../templates/authorized.php';
