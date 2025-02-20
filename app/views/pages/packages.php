<?php
$title = 'Pacchetti';
ob_start();
require_once __DIR__ . "/../modals/add-package.php";
require_once __DIR__ . "/../modals/edit-package.php";
require_once __DIR__ . "/../modals/confirm-delete.php";
?>

<div id="package">
    <div class="pai-card">
        <span class="pai-title">Pacchetti</span>
    </div>
    <div class="pai-card mt-3">
        <div id="listOfPackages"></div>
    </div>
</div>
<script src="/static/js/views/packages.js"></script>

<?php
$content = ob_get_clean();
require_once __DIR__ . '/../templates/authorized.php';
