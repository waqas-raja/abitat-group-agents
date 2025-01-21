<?php
    $title = 'Profilo utente';
    ob_start();
?>

    <div id="user_profile">
        <div class="row">
            <!-- Prima Card: Dati Personali -->
            <div class="col-md-6">
                <div class="pai-card shadow-sm">
                    <span class="pai-title">Modifica Dati Personali</span>
                    <form class="mt-3" autocomplete="off">
                        <div class="mb-3">
                            <label for="txtName" class="form-label text-small">Nome</label>
                            <input id="txtName" type="text" class="form-control">
                        </div>
                        <div class="mb-3">
                            <label for="txtSurname" class="form-label text-small">Cognome</label>
                            <input id="txtSurname" type="text" class="form-control">
                        </div>
                        <div class="mb-3">
                            <label for="txtEmail" class="form-label text-small">Email</label>
                            <input id="txtEmail" type="email" class="form-control">
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                            <span id="resultPersonalData"></span>
                            <button id="btnUpdatePersonalData" type="button" class="btn btn-orange" onclick="updatePersonalData()">
                                <i class="bi bi-check-lg"></i> Salva
                                <div id="spinnerPersonalData" class="spinner-border spinner-border-sm d-none" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </button>
                        </div>

                    </form>
                </div>
            </div>
            <div class="col-md-6">
                <div class="pai-card shadow-sm">
                    <span class="pai-title">Modifica Password</span>
                    <form class="mt-3" autocomplete="off">
                        <div class="mb-3">
                            <label for="txtOldPassword" class="form-label text-small">Vecchia Password</label>
                            <input id="txtOldPassword" type="password" class="form-control">
                        </div>
                        <div class="mb-3">
                            <label for="txtNewPassword" class="form-label text-small">Nuova Password</label>
                            <input id="txtNewPassword" type="password" class="form-control">
                        </div>
                        <div class="mb-3">
                            <label for="txtConfirmPassword" class="form-label text-small">Conferma Password</label>
                            <input id="txtConfirmPassword" type="password" class="form-control">
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                            <span id="resultChangePsw"></span>
                            <button id="btnUpdatePassword" type="button" class="btn btn-orange" onclick="updatePassword()">
                                <i class="bi bi-check-lg"></i> Salva
                                <div id="spinnerPassword" class="spinner-border spinner-border-sm d-none" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>


    <script src="/static/js/views/user-profile.js"></script>

<?php
    $content = ob_get_clean();
    require_once __DIR__ . '/../templates/authorized.php';
