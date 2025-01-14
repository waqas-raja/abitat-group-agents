<?php
    $title = 'Elenco Aziende';
    ob_start();
    require_once __DIR__ . '/../modals/add-company.php';
?>

<div id="companies">
    <div class="glp-card">
        <span class="glp-title">Elenco aziende</span>
        <div id="listOfCompanies" class="mt-3"></div>
    </div>
</div>
<script src="/static/js/views/companies.js"></script>

<?php
    $content = ob_get_clean();

    require_once __DIR__ . '/../templates/authorized.php';
