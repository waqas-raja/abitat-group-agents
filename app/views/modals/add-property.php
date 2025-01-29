<div id="modalAddProperty" class="modal fade" tabindex="-1" aria-labelledby="modalAddPropertyLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalAddPropertyLabel"><i class="bi bi-buildings me-3"></i>Aggiungi Proprietà</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="">
                    <div class="row mb-3">
                        <label for="ddlPropertyAcquiredBy" class="col-sm-4 col-form-label">Agente che ha acquisito</label>
                        <div class="col-sm-8">
                            <select class="form-select" id="ddlPropertyAcquiredBy">
                            </select>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="ddlPropertyType" class="col-sm-4 col-form-label">Tipo</label>
                        <div class="col-sm-8">
                            <select class="form-select" id="ddlPropertyType">
                                <option value="" selected>Seleziona la tipologia...</option>
                                <option value="1">Appartamento</option>
                                <option value="2">Villa</option>
                                <option value="3">Rudere</option>
                            </select>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="txtPropertyAddress" class="col-sm-4 col-form-label">Indirizzo</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" id="txtPropertyAddress" required>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="txtPropertyPurchasePrice" class="col-sm-4 col-form-label">Prezzo d'acquisto</label>
                        <div class="col-sm-8">
                            <input type="number" class="form-control" id="txtPropertyPurchasePrice" required>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="ddlPropertyLocation" class="col-sm-4 col-form-label">Posizione</label>
                        <div class="col-sm-8">
                            <select class="form-select" id="ddlPropertyLocation">
                                <option value="" selected>Seleziona la sede...</option>
                                <option value="1">Torino</option>
                                <option value="2">Moncalieri</option>
                                <option value="3">Roma</option>
                            </select>
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