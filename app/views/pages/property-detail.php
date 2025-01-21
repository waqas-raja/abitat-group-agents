<?php
    $title = 'Dettaglio immobile';
    ob_start();
    $pid = htmlspecialchars($pid, ENT_QUOTES, 'UTF-8');
?>

    <input id="hPropertyId" type="hidden" value="<?= $pid ?>">
    <div id="property_detail">
        <div class="pai-card">
            <span class="pai-title">Dettaglio immobile</span>
            <div class="bg-light p-3 mt-3"><i>Pagina in allestimento</i></div>
        </div>
    </div>
    <script src="/static/js/views/property-detail.js"></script>

<?php
$content = ob_get_clean();
require_once __DIR__ . '/../templates/authorized.php';
