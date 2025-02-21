<div id="modalAddAgent" class="modal fade" tabindex="-1" aria-labelledby="modalAddAgentLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalAddAgentLabel"><i class="bi bi-buildings me-3"></i>Aggiungi Agente</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="">
                    <div class="row mb-3">
                        <label for="txtFirstName" class="col-sm-4 col-form-label">Nome<span class="text-danger ms-2">*</span></label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" id="txtFirstName" required>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="txtLastName" class="col-sm-4 col-form-label">Cognome<span class="text-danger ms-2">*</span></label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" id="txtLastName" required>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="txtFixedCost" class="col-sm-4 col-form-label">Costi fissi<span class="text-danger ms-2">*</span></label>
                        <div class="col-sm-8">
                            <input type="number" class="form-control" id="txtFixedCost" required>
                        </div>
                    </div>
                    <!-- <div class="row mb-3">
                        <label for="txtCommission" class="col-sm-4 col-form-label">Commission</label>
                        <div class="col-sm-8">
                            <input type="number" class="form-control" id="txtCommission" required>
                        </div>
                    </div> -->
                    <div class="row mb-3">
                        <label for="ddlPackage" class="col-sm-4 col-form-label">Pacchetto<span class="text-danger ms-2">*</span></label>
                        <div class="col-sm-8">
                            <select class="form-select" id="ddlPackage">
                                <option selected>Scegli...</option>
                                <option value="1">Basic</option>
                                <option value="2">Express</option>
                                <option value="3">Golden</option>
                            </select>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="ddlLocation" class="col-sm-4 col-form-label">Sede<span class="text-danger ms-2">*</span></label>
                        <div class="col-sm-8">
                            <select class="form-select" id="ddlLocation">
                                <option selected>Scegli...</option>
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