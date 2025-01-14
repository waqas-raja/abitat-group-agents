<?php
    $title = 'Dettaglio Contatto';
    ob_start();
    $cid = htmlspecialchars($cid, ENT_QUOTES, 'UTF-8');
    require_once __DIR__ . "/../modals/add-call.php";
    require_once __DIR__ . "/../modals/add-appointment.php";
    require_once __DIR__ . "/../modals/add-company-lead.php";
    require_once __DIR__ . "/../modals/add-connected-people.php";
    require_once __DIR__ . "/../modals/confirm-delete.php";
?>

    <input id="hContactId" type="hidden" value="<?= $cid ?>">

    <div id="contact_detail">

        <div class="glp-card mb-3">
            <div class="glp-tabs">
                <div id="contact_name" class="me-2">
                    <i class="bi bi-gender-male me-2"></i>
                    Nome e cognome
                </div>
                <div class="glp-tab active" data-tab="tabContentDashboard">Panoramica</div>
                <div class="glp-tab" data-tab="tabContentGeneral">Anagrafica</div>
                <div class="glp-tab" data-tab="tabContentRequests">Preventivi</div>
                <div class="icon-container">
                    <button class="btn btn-orange-inverted" data-bs-toggle="modal" data-bs-target="#modalAddCall"><i class="bi bi-telephone mb-2"></i></button>
                    <button class="btn btn-orange-inverted" data-bs-toggle="modal" data-bs-target="#modalAddAppointment"><i class="bi bi-calendar mb-2"></i></button>
                </div>
            </div>
        </div>

        <div id="tabContentDashboard" class="glp-tab-content active">
            <?php require_once __DIR__ . "/../partials/contact-overview.php"; ?>
        </div>

        <div id="tabContentGeneral" class="glp-tab-content">
            <div class="glp-card mb-3">
                <?php require_once __DIR__ . "/../partials/contact-registry.php"; ?>
            </div>
        </div>

        <div id="tabContentRequests" class="glp-tab-content">
            <div class="glp-card mb-3">
                <div class="text-small">
                    <div id="listOfRequests" class="mt-3"></div>
                </div>
            </div>
        </div>
    </div>
    <script src="/static/js/views/contact-detail.js"></script>

<?php
    $content = ob_get_clean();
    require_once __DIR__ . '/../templates/authorized.php';
