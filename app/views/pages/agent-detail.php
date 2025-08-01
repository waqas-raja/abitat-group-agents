<?php
    $title = 'Dettaglio Agente';
    ob_start();
    $aid = htmlspecialchars($aid, ENT_QUOTES, 'UTF-8');
    require_once __DIR__ . "/../modals/confirm-delete.php";
    require_once __DIR__ . "/../modals/edit-agent.php";
?>

<input id="hAgentId" type="hidden" value="<?= $aid ?>">

<div id="agent_detail">
    <div class="pai-card d-flex justify-content-between align-items-center mb-3">
        <span class="pai-title">
            <span id="spFirstName" class="fw-bold fs-3 text-blue"></span>&nbsp;<span id="spLastName" class="fw-bold fs-3 text-blue"></span>
            <span id="spContacts" class="text-orange"></span>
            <br>
            Pacchetto <span id="spPackage"></span> (<span id="spFee"></span> + <span id="spCommission"></span>)<br>
        </span>
        <div class="d-flex">
            <button type="button" class="btn btn-blue-inverted border me-2" data-bs-toggle="modal" data-bs-target="#modalEditAgent">
                <i class="bi bi-pencil"></i>
            </button>
            <button type="button" class="btn btn-outline-danger border" onclick="deleteAgentModal()">
                <i class="bi bi-trash3"></i>
            </button>
        </div>
    </div>

    <div class="row">
        <div class="col-sm-12 col-md-6">
            <div class="pai-card mb-3">
                <div class="d-flex justify-content-between align-items-center">
                    <p class="lato-black text-blue mb-0">
                        <i class="bi bi-cash-coin me-2"></i>Provvigioni
                    </p>
                    <span id="spBalanceReturn" class="fw-bold"></span>
                </div>
                <div id="listOfReturns" class="mt-3"></div>
            </div>
        </div>
        <div class="col-sm-12 col-md-6">
            <div class="pai-card mb-3">
                <div class="d-flex justify-content-between align-items-center">
                    <p class="lato-black text-blue mb-0">
                        <i class="bi bi-arrow-return-left me-2"></i>Rientri
                    </p>
                    <span id="spBalanceReturnAgent" class="fw-bold"></span>
                </div>
                <div id="listOfReturnsAgent" class="mt-3"></div>
            </div>
        </div>
    </div>
</div>


<script src="/static/js/views/agent-detail.js"></script>

<?php
$content = ob_get_clean();
require_once __DIR__ . '/../templates/authorized.php';
