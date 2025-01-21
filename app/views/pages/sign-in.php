<?php
    $title = 'Login';
    ob_start();
?>
    <div class="container-fluid vh-100">
        <div class="row h-100">
            <div id="login-emotional" class="col-12 col-md-6 align-items-center justify-content-center p-5">
                <div class="overlay"></div>
                <img src="/static/imgs/logo.svg" alt="Logo">
                <div class="text-center position-relative z-index-1 text-white">
                    <h1 class="display-4 fw-bold">Bentornato!</h1>
                    Entra nel tuo portale e ottimizza la gestione del tuo lavoro.<br>
                    Tutto ciò che ti serve, in un unico posto.
                </div>
            </div>
            <div id="login-forms" class="col-6 align-items-center justify-content-center">
                <img src="/static/imgs/logo.svg" alt="Logo">
                <div id="login-card" class="card shadow-lg p-4" style="width: 100%; max-width: 400px; border-radius: 15px;">
                    <h3 class="text-center mb-4">Accedi al portale</h3>
                    <form>
                        <div class="mb-3">
                            <label for="txtLoginEmail" class="form-label">Indirizzo email</label>
                            <input id="txtLoginEmail" type="email" class="form-control">
                        </div>
                        <div class="mb-3 position-relative">
                            <label for="txtLoginPsw" class="form-label">Password</label>
                            <div class="position-relative">
                                <input id="txtLoginPsw" type="password" class="form-control">
                                <span id="togglePassword" class="position-absolute" onclick="togglePassword()">
                                    <i class="bi bi-eye"></i>
                                </span>
                            </div>
                        </div>

                        <button id="btnLogin" type="button" class="btn btn-glp btn-blue w-100 mt-3" onclick="signIn()">Accedi</button>
                    </form>
                    <span id="spLoginResult" class="text-center text-danger d-block mt-3"></span>
                    <div class="text-center mt-4">
                        <p class="mb-0">
                            <a href="#" class="text-decoration-none text-blue" onclick="showForgotPassword()">Hai dimenticato la password?</a>
                        </p>
                    </div>
                </div>

                <div id="forgot-password-card" class="card shadow-lg p-4 m-4 d-none" style="width: 100%; max-width: 400px; border-radius: 15px;">
                    <h3 class="text-center mb-4">Recupera Password</h3>
                    <form>
                        <div class="mb-3">
                            <label for="txtRecoveryEmail" class="form-label">Indirizzo email</label>
                            <input id="txtRecoveryEmail" type="email" class="form-control" >
                        </div>
                        <button id="btnRecovery" type="button" class="btn btn-glp btn-blue w-100 mt-3" onclick="recoverPassword()">Invia</button>
                    </form>
                    <span id="spRecoveryResult" class="text-center text-danger d-block mt-3"></span>
                    <div class="text-center mt-4">
                        <p class="mb-0">
                            <a href="#" class="text-decoration-none text-blue" onclick="showLogin()">Torna al login</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="/static/js/views/sign-in.js"></script>
<?php
    $content = ob_get_clean();
    require_once __DIR__ . '/../templates/naked.php';
