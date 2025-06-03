<div id="modalAddNewPrice" class="modal fade" tabindex="-1" aria-labelledby="modalAddNewPriceLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalAddNewPriceLabel"><i class="bi bi-arrow-bar-down me-3"></i>Aggiungi un ribasso</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <input id="hPropertyNewPrice" type="hidden">
                <div class="row mb-3">
                    <label for="txtAddressNewPrice" class="col-sm-5 col-form-label">Indirizzo</label>
                    <div class="col-sm-7">
                        <input id="txtAddressNewPrice" type="text" class="form-control" disabled>
                    </div>
                </div>
                <div class="row mb-3">
                    <label for="txtNewPrice" class="col-sm-5 col-form-label">Nuovo prezzo<span class="text-danger ms-2">*</span></label>
                    <div class="col-sm-7">
                        <input type="number" class="form-control" id="txtNewPrice" required>
                    </div>
                </div>
                <span id="spNewPriceResult" class="text-danger d-none"></span>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal"><i class="bi bi-x"></i> Annulla</button>
                <button id="btnSaveNewPrice" type="button" class="btn btn-orange" onclick="saveNewPrice()">
                    <i class="bi bi-check-lg"></i> Salva
                    <div id="spinnerNewPrice" class="spinner-border spinner-border-sm d-none" role="status"><span class="visually-hidden">Loading...</span></div>
                </button>
            </div>
        </div>
    </div>
</div>