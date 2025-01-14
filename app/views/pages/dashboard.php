<?php
    $title = 'Panoramica';
    ob_start();
?>

    <div id="dashboard">
        <div class="row mb-4">
            <div class="col-4">
                <div class="glp-card">
                    <p class="glp-title">GL Sviluppo</p>
                    <div id="pieGlSviluppo" class="pieChart"></div>
                </div>
            </div>
            <div class="col-4">
                <div class="glp-card">
                    <p class="glp-title">Sviluppo Personale</p>
                    <div id="pieSviluppoPersonale" class="pieChart"></div>
                </div>
            </div>
            <div class="col-4">
                <div class="glp-card">
                    <p class="glp-title">Creditis</p>
                    <div id="pieCreditis" class="pieChart"></div>
                </div>
            </div>
        </div>
        <div class="glp-card">
            <span class="glp-title">Elenco chiamate da effettuare</span>
            <div id="listOfCalls" class="mt-3"></div>
        </div>

        <?php require_once __DIR__ . '/../modals/call-detail.php'; ?>
    </div>
    <script src="/static/js/views/dashboard.js"></script>

<?php
    $content = ob_get_clean();
    require_once __DIR__ . '/../templates/authorized.php';
