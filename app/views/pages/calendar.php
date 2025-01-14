<?php
    $title = 'Calendario';
    ob_start();
    require_once __DIR__ . "/../modals/add-call.php";
    require_once __DIR__ . "/../modals/add-appointment.php";
?>

    <div id="calendar">
        <div class="glp-card">
            <div class="d-flex justify-content-between align-items-center mb-3">
                <p class="glp-title mb-3">Calendario</p>
                <div>
                    <button class="btn btn-outline-secondary me-2" data-bs-toggle="modal" data-bs-target="#modalAddCall">
                        <i class="bi bi-telephone me-2"></i> Pianifica chiamata
                    </button>
                    <button class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#modalAddAppointment">
                        <i class="bi bi-calendar-event me-2"></i> Pianifica appuntamento
                    </button>
                </div>
            </div>
            <div id="scheduler"></div>
        </div>
    </div>
    <script src="/static/js/views/calendar.js"></script>

<?php
$content = ob_get_clean();
require_once __DIR__ . '/../templates/authorized.php';
