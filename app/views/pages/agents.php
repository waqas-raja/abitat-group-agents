<?php
$title = 'Elenco Leads';
ob_start();
require_once __DIR__ . "/../modals/add-agent.php";
?>

<div id="agents">
    <div class="pai-card mb-3">
        <span class="pai-title">Elenco agenti</span>
        <!-- <div class="bg-light p-3 mt-3"><i>Pagina in allestimento</i></div> -->
        <div class="pai-tabs">
            <div class="pai-tab active" data-tab="tabContentTurin">Turin</div>
            <div class="pai-tab" data-tab="tabContentRome">Rome</div>
            <div class="pai-tab" data-tab="tabContentMilan">Milan</div>
        </div>
    </div>
    <div id="tabContentTurin" class="pai-tab-content active">
        <?php require_once __DIR__ . "/../partials/agent-turin.php"; ?>
    </div>
    <div id="tabContentRome" class="pai-tab-content">
        <?php require_once __DIR__ . "/../partials/agent-rome.php"; ?>
    </div>
    <div id="tabContentMilan" class="pai-tab-content">
        <?php require_once __DIR__ . "/../partials/agent-milan.php"; ?>
    </div>
</div>
<script src="/static/js/views/agents.js"></script>

<?php
$content = ob_get_clean();
require_once __DIR__ . '/../templates/authorized.php';
