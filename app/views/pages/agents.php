<?php
$title = 'Elenco Leads';
ob_start();
require_once __DIR__ . "/../modals/add-agent.php";
?>

<div id="agents">

    <div class="pai-card mb-3 d-flex justify-content-between align-items-center">
        <div class="d-flex justify-content-start align-items-center gap-5">
            <span class="pai-title">Elenco agenti:</span>
            <div class="pai-tabs">
                <div class="pai-tab active" data-tab="tabContentTorino">Torino</div>
                <div class="pai-tab" data-tab="tabContentMoncalieri">Moncalieri</div>
                <div class="pai-tab" data-tab="tabContentRoma">Roma</div>
            </div>
        </div>
        <button type="button" class="btn btn-orange" onclick="showAddNewAgentModal()">
            <i class="bi bi-plus-lg me-2"></i> Aggiungi Agente
        </button>
    </div>


    <div id="tabContentTorino" class="pai-tab-content active">
        <?php require_once __DIR__ . "/../partials/agent-torino.php"; ?>
    </div>
    <div id="tabContentRoma" class="pai-tab-content">
        <?php require_once __DIR__ . "/../partials/agent-roma.php"; ?>
    </div>
    <div id="tabContentMoncalieri" class="pai-tab-content">
        <?php require_once __DIR__ . "/../partials/agent-moncalieri.php"; ?>
    </div>
</div>
<script src="/static/js/views/agents.js"></script>

<?php
$content = ob_get_clean();
require_once __DIR__ . '/../templates/authorized.php';
