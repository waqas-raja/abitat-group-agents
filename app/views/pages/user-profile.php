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
                    <div class="row mb-3">
                        <label for="txtName" class="col-sm-3 col-form-label text-small">Nome</label>
                        <div class="col-sm-9">
                            <input type="text" id="txtName" class="form-control">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="txtSurname" class="col-sm-3 col-form-label text-small">Cognome</label>
                        <div class="col-sm-9">
                            <input type="text" id="txtSurname" class="form-control">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="txtEmail" class="col-sm-3 col-form-label text-small">Email</label>
                        <div class="col-sm-9">
                            <input type="email" id="txtEmail" class="form-control">
                        </div>
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
                    <div class="row mb-3">
                        <label for="txtOldPassword" class="col-sm-3 col-form-label text-small">Vecchia Password</label>
                        <div class="col-sm-9 position-relative">
                            <input type="password" id="txtOldPassword" class="form-control">
                            <i class="bi bi-eye-slash position-absolute" role="button" onclick="togglePassword(this)" style="right:24px; top:8px;"></i>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="txtNewPassword" class="col-sm-3 col-form-label text-small">Nuova Password</label>
                        <div class="col-sm-9 position-relative">
                            <input type="password" id="txtNewPassword" class="form-control">
                            <i class="bi bi-eye-slash position-absolute" onclick="togglePassword(this)" role="button" style="right:24px; top:8px;"></i>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="txtConfirmPassword" class="col-sm-3 col-form-label text-small">Conferma Password</label>
                        <div class="col-sm-9 position-relative">
                            <input type="password" id="txtConfirmPassword" class="form-control">
                            <i class="bi bi-eye-slash position-absolute" role="button" onclick="togglePassword(this)" style="right:24px; top:8px;"></i>
                        </div>
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
