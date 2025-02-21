<?php
$title = 'Dettaglio Agente';
ob_start();
$aid = htmlspecialchars($aid, ENT_QUOTES, 'UTF-8');
require_once __DIR__ . "/../modals/confirm-delete.php";
?>

<input id="hAgentId" type="hidden" value="<?= $aid ?>">

<div id="agent_detail">
    <div class="pai-card d-flex justify-content-between align-items-center mb-3">
        <span class="pai-title">Dettaglio agente</span>
        <button type="button" class="btn btn-link text-danger border" onclick="deleteAgentModal()">
            <i class="bi bi-trash3 me-2"></i> Elimina agente
        </button>
    </div>
    <?php require_once __DIR__ . "/../partials/agent-overview.php"; ?>
</div>
<script src="/static/js/views/agent-detail.js"></script>

<?php
$content = ob_get_clean();
require_once __DIR__ . '/../templates/authorized.php';
