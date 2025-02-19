<?php
$title = 'Pacchetti';
ob_start();
require_once __DIR__ . "/../modals/add-package.php";
?>

<div id="package">
    <div class="pai-card">
        <span class="pai-title">Pacchetti</span>
        <!-- <div class="bg-light p-3 mt-3"><i>Pagina in allestimento</i></div> -->
    </div>
    <div class="mt-3">
        <?php require_once __DIR__ . "/../partials/package-overview.php"; ?>
    </div>
</div>
<script src="/static/js/views/packages.js"></script>

<?php
$content = ob_get_clean();
require_once __DIR__ . '/../templates/authorized.php';
