<?php
    $title = 'Dettaglio statistiche torta';
    ob_start();

    const GL_SVILUPPO = 1;
    const SVILUPPO_PERSONALE = 2;
    const CREDITIS = 3;

    const WAITING = 1;
    const WORKING = 2;
    const CLOSED = 3;
    const PRIORITY = 4;

    $list_names = [GL_SVILUPPO => 'GL Sviluppo', SVILUPPO_PERSONALE => 'Sviluppo Personale', CREDITIS => 'Creditis'];
    $status_names = [PRIORITY => "Prioritario", WAITING => 'Da Lavorare', WORKING => 'In Gestione', CLOSED => 'Chiusi'];

?>

    <div id="contact-pie">
        <div class="glp-card">
            <span class="glp-title">Contatti filtrati per la lista</span>

                <select id="ddlList" class="form-select d-inline-block mx-2" style="width:200px" onchange="loadList()">
                    <option value="<?= GL_SVILUPPO ?>" <?= $list_id == GL_SVILUPPO ? 'selected' : '' ?>>GL Sviluppo</option>
                    <option value="<?= SVILUPPO_PERSONALE ?>" <?= $list_id == SVILUPPO_PERSONALE ? 'selected' : '' ?>>Sviluppo Personale</option>
                    <option value="<?= CREDITIS ?>" <?= $list_id == CREDITIS ? 'selected' : '' ?>>Creditis</option>
                </select>
                nello stato
                <select id="ddlStatus" class="form-select d-inline-block mx-2" style="width:150px" onchange="loadList()">
                    <option value="<?= WAITING ?>" <?= $status_id == WAITING ? 'selected' : '' ?>>Prioritario</option>
                    <option value="<?= PRIORITY ?>" <?= $status_id == PRIORITY ? 'selected' : '' ?>>In Gestione</option>
                    <option value="<?= WAITING ?>" <?= $status_id == WAITING ? 'selected' : '' ?>>Da Lavorare</option>
                    <option value="<?= CLOSED ?>" <?= $status_id == CLOSED ? 'selected' : '' ?>>Chiusi</option>
                </select>

            <div id="listOfContacts" class="mt-3"></div>
        </div>
    </div>
    <script src="/static/js/views/contact-pie.js"></script>

<?php
    $content = ob_get_clean();
    require_once __DIR__ . '/../templates/authorized.php';