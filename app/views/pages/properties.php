<?php
    $title = 'Elenco Immobili';
    ob_start();
?>

<div id="properties">
    <div class="pai-card">
        <span class="pai-title">Elenco immobili</span>
        <div class="bg-light p-3 mt-3"><i>Pagina in allestimento</i></div>
    </div>
</div>
<script src="/static/js/views/properties.js"></script>

<?php
    $content = ob_get_clean();

    require_once __DIR__ . '/../templates/authorized.php';
