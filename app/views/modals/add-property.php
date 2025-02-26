<div id="modalAddProperty" class="modal fade" tabindex="-1" aria-labelledby="modalAddPropertyLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalAddPropertyLabel"><i class="bi bi-buildings me-3"></i>Aggiungi Immobile</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="">
                    <input type="hidden" id="hEditProperty" value="">
                    <div class="row mb-3">
                        <label for="ddlPropertyLocation" class="col-sm-4 col-form-label">Sede<span class="text-danger ms-2">*</span></label>
                        <div class="col-sm-8">
                            <select class="form-select" id="ddlPropertyLocation">
                            </select>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="ddlPropertyType" class="col-sm-4 col-form-label">Tipo<span class="text-danger ms-2">*</span></label>
                        <div class="col-sm-8">
                            <select class="form-select" id="ddlPropertyType">
                            </select>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="txtPropertyAddress" class="col-sm-4 col-form-label">Indirizzo<span class="text-danger ms-2">*</span></label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" id="txtPropertyAddress" required>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="txtPropertyPurchaseDate" class="col-sm-4 col-form-label">Data di acquisto<span class="text-danger ms-2">*</span></label>
                        <div class="col-sm-8">
                            <div id="txtPropertyPurchaseDate" style="font-size: 1rem;"></div>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="txtPropertyPurchasePrice" class="col-sm-4 col-form-label">Prezzo di acquisto<span class="text-danger ms-2">*</span></label>
                        <div class="col-sm-8">
                            <input type="number" class="form-control" id="txtPropertyPurchasePrice" required>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="txtAgencyPropertyCommission" class="col-sm-4 col-form-label">Prezzo di acquisto<span class="text-danger ms-2">*</span></label>
                        <div class="col-sm-8">
                            <div class="input-group">
                                <input type="number" class="form-control" id="txtAgencyPropertyCommission">
                                <span class="input-group-text">%</span>
                            </div>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="ddlPurchaseAgent" class="col-sm-4 col-form-label">Agente che ha acquisito<span class="text-danger ms-2">*</span></label>
                        <div class="col-sm-8">
                            <select class="form-select" id="ddlPurchaseAgent">
                            </select>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="txtPropertyExpireDate" class="col-sm-4 col-form-label">Data di scadenza<span class="text-danger ms-2">*</span></label>
                        <div class="col-sm-8">
                            <div id="txtPropertyExpireDate" style="font-size: 1rem;"></div>
                        </div>
                    </div>
                    <span id="spNewPorpertyResult" class="text-danger d-none"></span>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal"><i class="bi bi-x"></i> Annulla</button>
                <button id="btnSaveProperty" type="button" class="btn btn-orange" onclick="saveProperty()">
                    <i class="bi bi-check-lg"></i> Salva
                    <div id="spinnerNewProperty" class="spinner-border spinner-border-sm d-none" role="status"><span class="visually-hidden">Loading...</span></div>
                </button>
            </div>
        </div>
    </div>
</div>