<div id="modalEditPackage" class="modal fade" tabindex="-1" aria-labelledby="modalEditPackageLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalEditPackageLabel"><i class="bi bi-percent me-3"></i>Aggiungi Pacchetto</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <input type="hidden" class="form-control" id="hPackageId" required>
                <form id="">
                    <div class="row mb-3">
                        <label for="txtUpdateName" class="col-sm-4 col-form-label">Nome<span class="text-danger ms-2">*</span></label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" id="txtUpdateName" required>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="txtUpdateFixedFee" class="col-sm-4 col-form-label">Canone fisso<span class="text-danger ms-2">*</span></label>
                        <div class="col-sm-8">
                            <input type="number" class="form-control" id="txtUpdateFixedFee" required>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="txtUpdatePercentage" class="col-sm-4 col-form-label">Percentuale<span class="text-danger ms-2">*</span></label>
                        <div class="col-sm-8">
                            <input type="number" class="form-control" id="txtUpdatePercentage" required>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="txtUpdateDescription" class="col-sm-4 col-form-label">Descrizione</label>
                        <div class="col-sm-8">
                            <textarea class="form-control" id="txtUpdateDescription" rows="3"></textarea>
                        </div>
                    </div>
                    
                    <span id="spUpdatePackageResult" class="text-danger d-none"></span>
                </form>
            </div>
            <div class="modal-footer d-flex justify-content-between">
                <div>
                    <button type="button" class="btn btn-outline-secondary" onclick="deletePackage()"><i class="bi bi-trash3"></i> Eliminare</button>
                </div>
                <div>
                    <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal"><i class="bi bi-x"></i> Annulla</button>
                    <button id="btnUpdatePackage" type="button" class="btn btn-orange" onclick="editPackage()">
                        <i class="bi bi-check-lg"></i> Salva
                        <div id="spinnerUpdatePackage" class="spinner-border spinner-border-sm d-none" role="status"><span class="visually-hidden">Loading...</span></div>
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>