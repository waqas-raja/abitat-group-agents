<?php
    $title = 'Elenco Agenti';
    ob_start();
    require_once __DIR__ . "/../modals/add-agent.php";
?>

<div id="agents">

    <div class="pai-card mb-3 d-flex justify-content-between align-items-center">
        <div class="d-flex justify-content-start align-items-center gap-5">
            <span class="pai-title">Agenzia:</span>
            <div class="pai-tabs">
                <div id="tabTorino" class="pai-tab active" data-tab="tabContentTorino">Torino</div>
                <div id="tabMoncalieri" class="pai-tab" data-tab="tabContentMoncalieri">Moncalieri</div>
                <div id="tabRoma" class="pai-tab" data-tab="tabContentRoma">Roma</div>
            </div>
        </div>
        <button type="button" class="btn btn-orange" onclick="showAddNewAgentModal()">
            <i class="bi bi-plus-lg me-2"></i> Aggiungi Agente
        </button>
    </div>
    <div id="tabContentTorino" class="pai-tab-content active">
        <div class="pai-card">
            <div id="listOfTorinoAgents" class="mt-3"></div>
        </div>
    </div>
    <div id="tabContentRoma" class="pai-tab-content">
        <div class="pai-card">
            <div id="listOfRomaAgents" class="mt-3"></div>
        </div>
    </div>
    <div id="tabContentMoncalieri" class="pai-tab-content">
        <div class="pai-card">
            <div id="listOfMoncalieriAgents" class="mt-3"></div>
        </div>
    </div>
</div>
<script src="/static/js/views/agents.js"></script>

<?php
    $content = ob_get_clean();
    require_once __DIR__ . '/../templates/authorized.php';
