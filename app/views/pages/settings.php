<?php
    $title = 'Impostazioni di sistema';
    ob_start();
?>

    <div id="settings" class="row">
        <div class="col-6">
            <div class="glp-card">
                <span class="glp-title">Impostazioni di sistema</span>
                <p class="mt-3 text-small">
                    In questa sezione puoi configurare i colori associati agli utenti e agli eventi condivisi.
                    Ogni utente ha un colore personale, che verrà utilizzato per identificare i suoi eventi nel calendario, rendendo più semplice distinguere le attività.
                    Inoltre, puoi impostare un colore generale che sarà utilizzato per rappresentare gli eventi in cui partecipano tutti gli utenti.
                </p>
                <div class="mt-3">
                    <div class="d-flex align-items-center">
                        <input id="colorGeneral" type="color" name="color" class="me-2">
                        <label for="colorGeneral">Generale</label>
                    </div>
                    <hr>
                    <div id="listOfUsers"></div>
                    <div class="d-flex justify-content-between align-items-center">
                        <span id="resultColors" class="me-auto"></span>
                        <div class="d-flex align-items-center">
                            <button id="btnRestore" type="button" class="btn btn-outline-secondary me-2 d-none" onclick="drowPage()">
                                <i class="bi bi-x"></i> Ripristina
                            </button>
                            <button id="btnSaveColors" type="button" class="btn btn-orange d-none" onclick="saveColors()">
                                <i class="bi bi-check-lg"></i> Salva
                                <div id="spinnerColors" class="spinner-border spinner-border-sm d-none" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-6">
            <div class="glp-card">
                <span class="glp-title">Importa dati</span>
                <p class="mt-3 text-small">
                    La funzionalità di importazione dati consente di caricare il file xlsx contenente i dati esportati da Teamleader nel nuovo sistema.
                    Una volta caricato, il file verrà elaborato per integrare le informazioni nel nuovo CRM, garantendo la continuità delle operazioni
                    e l'accesso ai tuoi dati storici senza interruzioni.
                    Assicurati che il file sia nel formato corretto per evitare errori durante l'importazione.
                </p>
                <div class="mt-3">
                    <div id="file-uploader"></div>
                    <span id="resultImport" class="d-block mt-3"></span>
                </div>
            </div>
        </div>
    </div>
    <script src="/static/js/views/settings.js"></script>

<?php
$content = ob_get_clean();
require_once __DIR__ . '/../templates/authorized.php';
