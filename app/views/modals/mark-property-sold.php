<div id="modalMarkPropertySold" class="modal fade" tabindex="-1" aria-labelledby="modalMarkPropertySoldLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalMarkPropertySoldLabel"><i class="bi bi-buildings me-3"></i>Contrassegna la proprietà venduta</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="">
                    <input type="hidden" id="hSoldProperty">
                    <input type="hidden" id="hPropertyPurchasePrice">
                    <div class="row mb-3">
                        <label for="txtAddressDisable" class="col-sm-4 col-form-label">Indirizzo</label>
                        <div class="col-sm-8">
                            <input type="text" id="txtAddressDisable" class="form-control" disabled>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="txtPropertySoldDate" class="col-sm-4 col-form-label">Data di vendita<span class="text-danger ms-2">*</span></label>
                        <div class="col-sm-8">
                            <div id="txtPropertySoldDate" style="font-size: 1rem;"></div>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="txtPropertySoldPrice" class="col-sm-4 col-form-label">Prezzo di vendita<span class="text-danger ms-2">*</span></label>
                        <div class="col-sm-8">
                            <input type="number" class="form-control" id="txtPropertySoldPrice" required>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="txtAgencyPropertySoldCommission" class="col-sm-4 col-form-label">Commissione agenzia (%)<span class="text-danger ms-2">*</span></label>
                        <div class="col-sm-8">
                            <div class="input-group">
                                <input type="number" class="form-control" id="txtAgencyPropertySoldCommission">
                                <span class="input-group-text">%</span>
                            </div>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="ddlPropertySoldAgent" class="col-sm-4 col-form-label">Agente<span class="text-danger ms-2">*</span></label>
                        <div class="col-sm-8">
                            <select class="form-select" id="ddlPropertySoldAgent">
                            </select>
                        </div>
                    </div>
                    <span id="spMarkPropertySoldResult" class="text-danger d-none"></span>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal"><i class="bi bi-x"></i> Annulla</button>
                <button id="btnSaveMarkPropertySold" type="button" class="btn btn-orange" onclick="savePropertyMarkedAsSold()">
                    <i class="bi bi-check-lg"></i> Salva
                    <div id="spinnerMarkPropertySold" class="spinner-border spinner-border-sm d-none" role="status"><span class="visually-hidden">Loading...</span></div>
                </button>
            </div>
        </div>
    </div>
</div>