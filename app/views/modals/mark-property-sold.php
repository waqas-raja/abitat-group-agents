<div id="modalMarkPropertySold" class="modal fade" tabindex="-1" aria-labelledby="modalMarkPropertySoldLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalMarkPropertySoldLabel"><i class="bi bi-buildings me-3"></i>Contrassegna la proprietà venduta</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="">
                    <div class="row mb-3">
                        <label for="txtPropertySoldDate" class="col-sm-4 col-form-label">Data<span class="text-danger ms-2">*</span></label>
                        <div class="col-sm-8">
                            <div id="txtPropertySoldDate"></div>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="txtPropertySoldPrice" class="col-sm-4 col-form-label">Prezzo<span class="text-danger ms-2">*</span></label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" id="txtPropertySoldPrice" required>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="ddlPropertySoldAgent" class="col-sm-4 col-form-label">Agente<span class="text-danger ms-2">*</span></label>
                        <div class="col-sm-8">
                            <select class="form-select" id="ddlPropertySoldAgent">
                                <option value="" selected>Scegli...</option>
                                <option value="1">Marco</option>
                                <option value="2">Elisa</option>
                                <option value="3">Derossi</option>
                            </select>
                        </div>
                    </div>
                    <div class="mb-3">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="cbMarkPropertySold" required>
                            <label id="cbMarkPropertySoldLabel" class="form-check-label" for="cbMarkPropertySold"></label>
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