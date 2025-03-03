<?php
$title = 'Tipi di proprietà';
ob_start();
require_once __DIR__ . "/../modals/add-property-type.php";
?>

<div id="propertyTyes">
        <div class="pai-card d-flex justify-content-between align-items-center">
        <span class="pai-title">Tipi di proprietà</span>
        <button type="button" class="btn btn-orange" onclick="showModalAddPropertyType(null, 'Aggiungi tipo di proprietà')">
            <i class="bi bi-plus-lg me-2"></i> Aggiungi Tipo di proprietà
        </button>
    </div>
</div>
<div class="mt-3">
    <div class="pai-card w-50">
        <div id="listOfPropertyTypes" class="mt-3">
        </div>
    </div>
</div>
<script src="/static/js/views/property-types.js"></script>

<?php
$content = ob_get_clean();
require_once __DIR__ . '/../templates/authorized.php';
