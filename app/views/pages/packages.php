<?php
$title = 'Pacchetti';
ob_start();
require_once __DIR__ . "/../modals/add-package.php";
require_once __DIR__ . "/../modals/edit-package.php";
require_once __DIR__ . "/../modals/confirm-delete.php";
?>

<div id="package">
    <div class="pai-card d-flex justify-content-between align-items-center">
        <span class="pai-title">Pacchetti</span>
        <button type="button" class="btn btn-orange" onclick="showAddNewPackageModal()">
            <i class="bi bi-plus-lg me-2"></i> Aggiungi Pacchetto
        </button>
    </div>
    <div class="mt-3">
        <?php require_once __DIR__ . "/../partials/package-overview.php"; ?>
    </div>
</div>
<script src="/static/js/views/packages.js"></script>

<?php
$content = ob_get_clean();
require_once __DIR__ . '/../templates/authorized.php';
