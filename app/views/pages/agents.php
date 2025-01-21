<?php
    $title = 'Elenco Leads';
    ob_start();
?>

<div id="agents">
    <div class="pai-card">
        <span class="pai-title">Elenco agenti</span>
        <div class="bg-light p-3 mt-3"><i>Pagina in allestimento</i></div>
    </div>
</div>
<script src="/static/js/views/agents.js"></script>

<?php
    $content = ob_get_clean();
    require_once __DIR__ . '/../templates/authorized.php';
