<div id="modalAddAgent" class="modal fade" tabindex="-1" aria-labelledby="modalAddAgentLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalAddAgentLabel"><i class="bi bi-person-lines-fill me-3"></i>Aggiungi Agente</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="">
                    <div class="row mb-3">
                        <label for="txtFirstName" class="col-sm-4 col-form-label">Nome</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" id="txtFirstName" required>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="txtLastName" class="col-sm-4 col-form-label">Cognome</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" id="txtLastName" required>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="ddlPackage" class="col-sm-4 col-form-label">Pacchetto</label>
                        <div class="col-sm-8">
                            <select class="form-select" id="ddlPackage"></select>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="ddlLocation" class="col-sm-4 col-form-label">Sede</label>
                        <div class="col-sm-8">
                            <select class="form-select" id="ddlLocation">
                                <option value="1">Torino</option>
                                <option value="2">Moncalieri</option>
                                <option value="3">Roma</option>
                            </select>
                        </div>
                    </div>
                    <span id="spNewAgentResult" class="text-danger d-none"></span>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal"><i class="bi bi-x"></i> Annulla</button>
                <button id="btnSaveAgent" type="button" class="btn btn-orange" onclick="saveAgent()">
                    <i class="bi bi-check-lg"></i> Salva
                    <div id="spinnerNewAgent" class="spinner-border spinner-border-sm d-none" role="status"><span class="visually-hidden">Loading...</span></div>
                </button>
            </div>
        </div>
    </div>
</div>