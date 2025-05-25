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
        <div class="fw-bold border rounded px-3 py-2 bg-light">
            BILANCIO:
            <span id="spSummary">...</span>
        </div>
    </div>
    <?php require_once __DIR__ . "/../partials/agent-overview.php"; ?>
</div>
<script src="/static/js/views/agent-detail.js"></script>

<?php
$content = ob_get_clean();
require_once __DIR__ . '/../templates/authorized.php';
