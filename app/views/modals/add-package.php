<div id="modalAddPackage" class="modal fade" tabindex="-1" aria-labelledby="modalAddPackageLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalAddPackageLabel"><i class="bi bi-percent me-3"></i>Aggiungi Pacchetto</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="">
                    <div class="row mb-3">
                        <label for="txtName" class="col-sm-4 col-form-label">Nome<span class="text-danger ms-2">*</span></label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" id="txtName" required>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="txtFixedFee" class="col-sm-4 col-form-label">Canone fisso<span class="text-danger ms-2">*</span></label>
                        <div class="col-sm-8">
                            <input type="number" class="form-control" id="txtFixedFee" required>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="txtPercentage" class="col-sm-4 col-form-label">Commissione<span class="text-danger ms-2">*</span></label>
                        <div class="col-sm-8">
                            <input type="number" class="form-control" id="txtPercentage" required>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="txtDescription" class="col-sm-4 col-form-label">Descrizione</label>
                        <div class="col-sm-8">
                            <textarea class="form-control" id="txtDescription" rows="3"></textarea>
                        </div>
                    </div>
                    
                    <span id="spNewPackageResult" class="text-danger d-none"></span>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal"><i class="bi bi-x"></i> Annulla</button>
                <button id="btnSavePackage" type="button" class="btn btn-orange" onclick="savePackage()">
                    <i class="bi bi-check-lg"></i> Salva
                    <div id="spinnerNewPackage" class="spinner-border spinner-border-sm d-none" role="status"><span class="visually-hidden">Loading...</span></div>
                </button>
            </div>
        </div>
    </div>
</div>