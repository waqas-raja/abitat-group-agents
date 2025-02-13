<?php
$title = 'Note spese';
ob_start();
?>

    <div id="settings">
        <div class="pai-card">
            <span class="pai-title">Note spese</span>
            <div class="bg-light p-3 mt-3"><i>Pagina in allestimento</i></div>
        </div>
    </div>
    <script src="/static/js/views/expense-report.js"></script>

<?php
$content = ob_get_clean();
require_once __DIR__ . '/../templates/authorized.php';
