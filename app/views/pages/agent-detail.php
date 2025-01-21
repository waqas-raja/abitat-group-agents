<?php
    $title = 'Dettaglio Agente';
    ob_start();
    $aid = htmlspecialchars($aid, ENT_QUOTES, 'UTF-8');
    require_once __DIR__ . "/../modals/confirm-delete.php";
?>

    <input id="hAgentId" type="hidden" value="<?= $aid ?>">

    <div id="agent_detail">
        <div class="pai-card">
            <span class="pai-title">Dettaglio agente</span>
            <div class="bg-light p-3 mt-3"><i>Pagina in allestimento</i></div>
        </div>
    </div>
    <script src="/static/js/views/agent-detail.js"></script>

<?php
    $content = ob_get_clean();
    require_once __DIR__ . '/../templates/authorized.php';
