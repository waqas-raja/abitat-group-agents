<?php
    $title = 'Gestione utenti';
    ob_start();
    require_once __DIR__ . "/../modals/add-user.php";
    require_once __DIR__ . "/../modals/edit-user.php";
?>

    <div id="users">
        <div class="pai-card">
            <span class="pai-title">Elenco utenti</span>
            <div id="listOfUsers" class="mt-3"></div>
        </div>
    </div>
    <script src="/static/js/views/users.js"></script>

<?php
    $content = ob_get_clean();
    require_once __DIR__ . '/../templates/authorized.php';
