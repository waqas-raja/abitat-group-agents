<?php
$title = 'Dettaglio Pacchetti';
ob_start();
$pid = htmlspecialchars($pid, ENT_QUOTES, 'UTF-8');
require_once __DIR__ . "/../modals/confirm-delete.php";
require_once __DIR__ . "/../modals/select-alternate-package.php";
?>

<input id="hPackageId" type="hidden" value="<?= $pid ?>">

<div id="agent_detail">
    <div class="pai-card d-flex justify-content-between align-items-center mb-3">
        <span class="pai-title">Dettaglio Pacchetto</span>
        <button type="button" class="btn btn-link text-danger border" onclick="deletePackageModal()">
            <i class="bi bi-trash3 me-2"></i> Elimina pacchetti
        </button>
    </div>
    <?php require_once __DIR__ . "/../partials/package-overview.php"; ?>
</div>
<script src="/static/js/views/package-detail.js"></script>

<?php
$content = ob_get_clean();
require_once __DIR__ . '/../templates/authorized.php';
