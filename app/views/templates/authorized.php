<?php
    ob_start();
?>

<div class="d-flex">
    <?php require_once __DIR__ . '/../templates/sidebar.php'; ?>
    <div id="main-content">
        <div id="header">
            <div class="d-flex align-items-center">
                <span onclick="handleSidebarMenu()"><i class="bi bi-list fs-4 me-3 pointer"></i></span>
                <span id="spUserLoggedName"></span>
                <div class="ms-auto">
                    <a id="menuUsers" href="/users" class="visually-hidden text-secondary text-decoration-none hover-orange" title="Gestione Utenti">
                        <i class="bi bi-people fs-4"></i>
                    </a>
                    <a id="menuSettings" href="/settings" class="visually-hidden text-secondary text-decoration-none hover-orange" title="Impostazioni">
                        <i class="bi bi-gear fs-4"></i>
                    </a>
                    <a id="menuUserProfile" href="/user-profile" class="text-secondary text-decoration-none hover-orange" title="Profilo Utente">
                        <i class="bi bi-person-circle fs-4"></i>
                    </a>
                    <a href="#" class="text-secondary text-decoration-none hover-orange" title="Logout" onclick="logout();">
                        <i class="bi bi-box-arrow-right fs-4"></i>
                    </a>
                </div>
            </div>
        </div>
        <div><?= $content ?></div>
    </div>
</div>

<?php
$content = ob_get_clean();
require_once __DIR__ . '/../templates/naked.php';

