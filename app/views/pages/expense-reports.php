<?php
$title = 'Note spese';
ob_start();
require_once __DIR__ . "/../modals/add-expense-report.php";
?>

<div id="noteSpese">
        <div class="pai-card d-flex justify-content-between align-items-center">
        <span class="pai-title">Note spese</span>
        <button type="button" class="btn btn-orange" onclick="showModalAddExpenseReport()">
            <i class="bi bi-plus-lg me-2"></i> Aggiungi Note spese
        </button>
    </div>
</div>
<div class="mt-3">
    <div class="pai-card">
        <div id="listOfExpense" class="mt-3">
        </div>
    </div>
</div>
<script src="/static/js/views/expense-report.js"></script>

<?php
$content = ob_get_clean();
require_once __DIR__ . '/../templates/authorized.php';
