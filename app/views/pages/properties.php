<?php
    $title = 'Elenco Immobili';
    ob_start();
    require_once __DIR__ . '/../modals/add-property.php';
?>

<div id="properties">
    <div class="pai-card">
        <span class="pai-title">Elenco immobili</span>
        <div id="listOfProperties" class="mt-3"></div>
    </div>
</div>
<script src="/static/js/views/properties.js"></script>

<?php
    $content = ob_get_clean();
    require_once __DIR__ . '/../templates/authorized.php';
