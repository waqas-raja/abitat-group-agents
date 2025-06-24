<?php
    $title = "Reimposta la Password";
    ob_start();
    $code = isset($_GET["code"]) ? $_GET["code"] : "";
?>
    <div class="container-fluid vh-100 position-relative">
        <img id="siteLogo" src="/static/imgs/logo.svg" alt="Logo" style="position:absolute;top:16px;left:16px;width:260px">
        <div class="row h-100">
            <div id="login-forms" class="col-12 py-5 align-items-center justify-content-center">
                <div class="text-start" style="width: 450px;">
                    <h3 class="mb-3 fw-bold">Reimposta la password</h3>
                    <div class="card p-3" style="width: 100%; border-radius: 15px;">
                        <form autocomplete="off">
                            <div class="mb-2 position-relative">
                                <label for="txtNewPsw" class="form-label mb-1">Nuova Password</label>
                                <div class="position-relative">
                                    <input id="txtNewPsw" type="password" class="form-control form-control-lg rounded-3" autocomplete="off" placeholder="Inserisci la nuova password" onkeyup="checkBtnEnables()">
                                    <span id="toggleNewPassword" class="position-absolute togglePassword" onclick="togglePassword(false)">
                                        <i class="bi bi-eye"></i>
                                    </span>
                                </div>
                            </div>
                            <div class="mb-2 position-relative">
                                <label for="txtConfirmPsw" class="form-label mb-1">Conferma Password</label>
                                <div class="position-relative">
                                    <input id="txtConfirmPsw" type="password" class="form-control form-control-lg rounded-3" autocomplete="off"
                                           placeholder="Inserisci nuovamente la password"
                                           onkeyup="checkBtnEnables()">
                                        <span id="toggleConfirmPassword" class="position-absolute togglePassword" onclick="togglePassword(true)">
                                        <i class="bi bi-eye"></i>
                                    </span>
                                </div>
                            </div>
                            <button id="btnPswRecovery" type="button" class="btn btn-orange w-100 mt-1 btn-disabled" onclick="pswRecovery()">
                                Reimposta
                            </button>
                        </form>
                        <span id="spPswRecoveryResult" class="text-center text-danger d-block mt-2" onclick="pswRecovery()"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="/static/js/views/psw-recovery.js"></script>
<?php
$content = ob_get_clean();
require_once __DIR__ . '/../templates/naked.php';
