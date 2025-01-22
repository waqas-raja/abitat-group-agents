<?php
$title = 'Elenco Leads';
ob_start();
require_once __DIR__ . "/../modals/add-agent.php";
?>

<div id="agents">
    <div class="pai-card mb-3 d-flex justify-content-start align-items-center gap-4">
        <span class="pai-title">Elenco agenti:</span>
        <div class="pai-tabs">
            <div class="pai-tab active" data-tab="tabContentTurin">Torino</div>
            <div class="pai-tab" data-tab="tabContentMoncalieri">Moncalieri</div>
            <div class="pai-tab" data-tab="tabContentRome">Roma</div>
        </div>
    </div>
    <div id="tabContentTurin" class="pai-tab-content active">
        <?php require_once __DIR__ . "/../partials/agent-turin.php"; ?>
    </div>
    <div id="tabContentRome" class="pai-tab-content">
        <?php require_once __DIR__ . "/../partials/agent-rome.php"; ?>
    </div>
    <div id="tabContentMoncalieri" class="pai-tab-content">
        <?php require_once __DIR__ . "/../partials/agent-milan.php"; ?>
    </div>
</div>
<script src="/static/js/views/agents.js"></script>

<?php
$content = ob_get_clean();
require_once __DIR__ . '/../templates/authorized.php';
