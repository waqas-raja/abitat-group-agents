<?php
    $title = 'Elenco Leads';
    ob_start();
    require_once(__DIR__ . "/../modals/add-contact.php");
?>

<div id="contacts">
    <div class="glp-card">
        <span class="glp-title">Elenco leads</span>
        <div id="listOfContacts" class="mt-3"></div>
    </div>
</div>
<script src="/static/js/views/contacts.js"></script>

<?php
    $content = ob_get_clean();
    require_once __DIR__ . '/../templates/authorized.php';
