<?php
$title = 'Note spese';
ob_start();
require_once __DIR__ . "/../modals/add-expense-report.php";
?>

<div id="noteSpese">
    <div class="pai-card">
        <span class="pai-title">Note spese</span>
        <!-- <div class="bg-light p-3 mt-3"><i>Pagina in allestimento</i></div> -->
    </div>
</div>
<div class="mt-3">
    <?php require_once __DIR__ . "/../partials/expense-report-overview.php"; ?>
</div>
<script src="/static/js/views/expense-report.js"></script>

<?php
$content = ob_get_clean();
require_once __DIR__ . '/../templates/authorized.php';
