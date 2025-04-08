<div id="modalAlternatePackageSelection" class="modal fade" tabindex="-1" aria-labelledby="modalAlternatePackageSelectionLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalAlternatePackageSelectionLabel"><i class="bi bi-trash3 me-3"></i>
                    Seleziona pacchetto alternativo</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <input id="recordId" type="hidden">
                <p id="confirmMessage">
                    Il pacchetto che stai tentando di rimuovere ha agenti collegati.<br>
                    Seleziona un pacchetto alternativo per trasferire automaticamente tutti gli agenti associati.
                </p>
                <div class="row mb-3">
                    <label for="ddlSelectAlternatePackage" class="col-sm-4 col-form-label">Trasferisci in:</label>
                    <div class="col-sm-8">
                        <select class="form-select" id="ddlSelectAlternatePackage"></select>
                    </div>
                </div>
                <div id="errorMessagePackageSelection" class="text-danger"></div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal"><i class="bi bi-x"></i> Annulla cancellazione</button>
                <button id="btnPackageSelection" type="button" class="btn btn-danger" onclick="continuePackageDeletion()">
                    <i class="bi bi-check-lg"></i> Trasferisci e cancella
                    <div id="spinnerPackageSelection" class="spinner-border spinner-border-sm d-none" role="status"><span class="visually-hidden">Loading...</span></div>
                </button>
            </div>
        </div>
    </div>
</div>