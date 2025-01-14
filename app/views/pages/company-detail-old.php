<?php
    $title = 'Dettaglio Contatto';
    ob_start();
    $cid = htmlspecialchars($cid, ENT_QUOTES, 'UTF-8');
?>

    <input id="hCompanyId" type="hidden" value="<?= $cid ?>">
    <div id="company_detail">
        <div class="row">
            <div class="col-md-3">
                <div class="glp-card text-center mb-3">
                    <i class="bi bi-buildings" style="font-size: 50px;"></i>
                    <p id="userName" class="lato-black" style="font-size:1.4em;margin-bottom:-5px">Ragione Sociale</p>
                    <i id="userRole" class="card-text">Settore</i><br><br>
                    <p class="text-muted mb-2">
                        <i class="bi bi-envelope"></i> email@example.com<br>
                        <i class="bi bi-envelope"></i> email@pec.com
                    </p>
                    <p class="text-muted">
                        <i class="bi bi-phone"></i> +39 123 456 7890<br>
                        <i class="bi bi-phone"></i> +39 123 456 7890
                    </p>
                    <!--<div class="py-3">
                        <button class="btn btn-blue-inverted me-2" data-bs-toggle="modal" data-bs-target="#modalAddCall"><i class="bi bi-telephone me-2 mb-2"></i> Chiamata</button>
                        <button class="btn btn-blue-inverted"  data-bs-toggle="modal" data-bs-target="#modalAddAppointment"><i class="bi bi-calendar3 me-2 mb-2"></i>Appuntamento</button>
                    </div>-->
                </div>
            </div>

            <div class="col-md-9">
                <div class="glp-card mb-3">
                    <div class="glp-tabs">
                        <div class="glp-tab active" data-tab="tabContentGeneral">Informazioni Generali</div>
                        <div class="glp-tab" data-tab="tabContentLeads">Leads Collegati</div>
                        <div class="glp-tab" data-tab="tabContentNote">Note</div>
                    </div>
                </div>

                <div id="tabContentGeneral" class="glp-tab-content active">
                    <div class="row d-flex">
                        <div class="col-4">
                            <div class="glp-card mb-3 w-100 flex-column h-100">
                                <div class="float-end">
                                    <i class="bi bi-pencil-square text-orange pointer" data-bs-toggle="modal" data-bs-target="#modalEditGeneralDetails"></i>
                                </div>
                                <p class="lato-black text-blue"><i class="bi bi-file-earmark-person me-2"></i>Dati generali</p>
                                <div class="text-small">
                                    <span style="display:inline-block;width:120px">Ragione sociale:</span> <strong>Ragione sociale</strong><br>
                                    <span style="display:inline-block;width:120px">Partita IVA:</span> <strong>Partita IVA</strong><br>
                                    <span style="display:inline-block;width:120px">Codice fiscale:</span> <strong>Codice fiscale</strong><br>
                                    <span style="display:inline-block;width:120px">SDI:</span> <strong>SDI</strong><br>
                                    <span style="display:inline-block;width:120px">Settore:</span> <strong>Settore</strong><br>

                                </div>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="glp-card mb-3 w-100 flex-column h-100">
                                <div class="float-end">
                                    <i class="bi bi-pencil-square text-orange pointer" data-bs-toggle="modal" data-bs-target="#modalEditContactDetails"></i>
                                </div>
                                <p class="lato-black text-blue"><i class="bi bi-chat-dots me-2"></i>Contatti</p>
                                <div class="text-small">
                                    <span style="display:inline-block;width:120px">Telefono 1:</span> <strong>+39 123 456 7890</strong><br>
                                    <span style="display:inline-block;width:120px">Telefono 2:</span> <strong>+39 098 765 4321</strong><br>
                                    <span style="display:inline-block;width:120px">Email:</span> <strong>email@example.com</strong><br>
                                    <span style="display:inline-block;width:120px">PEC:</span> <strong>pec@example.com</strong><br>
                                    <span style="display:inline-block;width:120px">Indirizzo:</span> <strong>Via Roma, 1</strong><br>
                                    <span style="display:inline-block;width:120px">Città:</span> <strong>Milano</strong><br>
                                    <span style="display:inline-block;width:120px">CAP:</span> <strong>20100</strong><br>
                                </div>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="glp-card mb-3 w-100 flex-column h-100">
                                <div class="float-end">
                                    <i class="bi bi-pencil-square text-orange pointer" data-bs-toggle="modal" data-bs-target="#modalEditGlPrestitiDetails"></i>
                                </div>
                                <p class="lato-black text-blue"><i class="bi bi-person-vcard me-2"></i>GL Prestiti</p>
                                <div class="text-small">
                                    <span style="display:inline-block;width:120px">Operatore:</span> <strong>Operatore</strong><br>
                                    <span style="display:inline-block;width:120px">Rating:</span> <strong>Rating</strong><br>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="tabContentLeads" class="glp-tab-content">
                    <div class="glp-card mb-3">
                        <div class="text-small">
                            <div id="listOfLeads" class="mt-3"></div>
                        </div>
                    </div>
                </div>

                <div id="tabContentNote" class="glp-tab-content">
                    <div class="glp-card mb-3">
                        <div id="editorNote" class="my-3"></div>
                        <div class="text-end">
                            <button class="btn btn-blue-inverted me-2"><i class="bi bi-check mb-2"></i> Salva note</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="/static/js/views/company-detail.js"></script>

<?php
$content = ob_get_clean();
require_once __DIR__ . '/../templates/authorized.php';
