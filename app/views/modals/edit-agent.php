<div class="modal fade" id="modalEditAgent" tabindex="-1" aria-labelledby="modalEditAgentLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalEditAgentLabel"><i class="bi bi-pencil me-2"></i> Modifica Agente</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row mb-3">
                    <label for="txtFirstName" class="col-sm-4 col-form-label">Nome:<span
                            class="text-danger ms-2">*</span></label>
                    <div class="col-sm-8">
                        <input type="text" id="txtFirstName" class="form-control" value="">
                    </div>
                </div>
                <div class="row mb-3">
                    <label for="txtLastName" class="col-sm-4 col-form-label">Cognome:<span class="text-danger ms-2">*</span></label>
                    <div class="col-sm-8">
                        <input type="text" id="txtLastName" class="form-control" value="">
                    </div>
                </div>
                <div class="row mb-3">
                    <label for="ddlPackage" class="col-sm-4 col-form-label">Pacchetto:<span
                            class="text-danger ms-2">*</span></label>
                    <div class="col-sm-8">
                        <select class="form-select" id="ddlPackage"></select>
                    </div>
                </div>
                <div class="row mb-3">
                    <label for="txtEmail" class="col-sm-4 col-form-label">Email:</label>
                    <div class="col-sm-8">
                        <input type="text" id="txtEmail" class="form-control" value="">
                    </div>
                </div>
                <div class="row mb-3">
                    <label for="txtPhone" class="col-sm-4 col-form-label">Telefono:</label>
                    <div class="col-sm-8">
                        <input type="text" id="txtPhone" class="form-control" value="">
                    </div>
                </div>
                <div class="row mb-3">
                    <label for="ddlLocation" class="col-sm-4 col-form-label">Sede:<span
                            class="text-danger ms-2">*</span></label>
                    <div class="col-sm-8">
                        <select class="form-select" id="ddlLocation">
                            <option selected>Scegli...</option>
                            <option value="1">Torino</option>
                            <option value="2">Moncalieri</option>
                            <option value="3">Roma</option>
                        </select>
                    </div>
                </div>
                <div id="errEditAgent" class="text-danger"></div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal"><i class="bi bi-x"></i> Annulla</button>

                <button id="btnUpdateAgent" type="button" class="btn btn-orange" onclick="updateGenericInfo()">
                    <i class="bi bi-check-lg"></i> Salva
                    <div id="spinnerUpdatePackage" class="spinner-border spinner-border-sm d-none" role="status"><span class="visually-hidden">Loading...</span></div>
                </button>
            </div>
        </div>
    </div>
</div>