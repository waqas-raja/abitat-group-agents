<div id="modalAddProperty" class="modal fade" tabindex="-1" aria-labelledby="modalAddPropertyLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalAddPropertyLabel"><i class="bi bi-buildings me-3"></i>Aggiungi Immobile</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="">
                    <input type="hidden" id="hEditProperty" value="">
                    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-2">
                        <div class="col">
                            <div class="row mb-3">
                                <label for="ddlPropertyLocation" class="col-sm-5 col-form-label">Agenzia<span class="text-danger ms-2">*</span></label>
                                <div class="col-sm-7">
                                    <select class="form-select" id="ddlPropertyLocation">
                                    </select>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label for="ddlAcquisitionAgent" class="col-sm-5 col-form-label">Agente che ha acquisito<span class="text-danger ms-2">*</span></label>
                                <div class="col-sm-7">
                                    <select class="form-select" id="ddlAcquisitionAgent">
                                    </select>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label for="txtPropertyAddress" class="col-sm-5 col-form-label">Indirizzo<span class="text-danger ms-2">*</span></label>
                                <div class="col-sm-7">
                                    <input type="text" class="form-control" id="txtPropertyAddress" required>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label for="txtPropertyCity" class="col-sm-5 col-form-label">Città<span class="text-danger ms-2">*</span></label>
                                <div class="col-sm-7">
                                    <input type="text" class="form-control" id="txtPropertyCity" required>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label for="ddlPropertyType" class="col-sm-5 col-form-label">Tipologia<span class="text-danger ms-2">*</span></label>
                                <div class="col-sm-7">
                                    <select class="form-select" id="ddlPropertyType"></select>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="row mb-3">
                                <label for="txtPropertyAcquisitionDate" class="col-sm-5 col-form-label">Data di acquisizione<span class="text-danger ms-2">*</span></label>
                                <div class="col-sm-7">
                                    <div id="txtPropertyAcquisitionDate" style="font-size: 1.1rem; color:#212529;"></div>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label for="txtPropertyExpireDate" class="col-sm-5 col-form-label">Scadenza mandato<span class="text-danger ms-2">*</span></label>
                                <div class="col-sm-7">
                                    <div id="txtPropertyExpireDate" style="font-size: 1.1rem; color: #212529;"></div>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label for="txtPropertyAcquisitionPrice" class="col-sm-5 col-form-label">Prezzo di acquisizione<span class="text-danger ms-2">*</span></label>
                                <div class="col-sm-7">
                                    <input type="number" class="form-control" id="txtPropertyAcquisitionPrice" required>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label for="txtAgencyPropertyCommission" class="col-sm-5 col-form-label">Commissione AbitatGroup<span class="text-danger ms-2">*</span></label>
                                <div class="col-sm-7">
                                    <div class="input-group">
                                        <input type="number" class="form-control" id="txtAgencyPropertyCommission" value="3">
                                        <span class="input-group-text">%</span>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                    <span id="spNewPorpertyResult" class="text-danger d-none"></span>
                </form>
            </div>
            <div class="modal-footer d-flex justify-content-between">
                <div>
                    <button type="button" id="btnMarkPropertySold" class="btn btn-outline-success">Imposta venduto</button>
                </div>
                <div>
                    <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal"><i class="bi bi-x"></i> Annulla</button>
                    <button id="btnSaveProperty" type="button" class="btn btn-orange" onclick="saveProperty()">
                        <i class="bi bi-check-lg"></i> Salva
                        <div id="spinnerNewProperty" class="spinner-border spinner-border-sm d-none" role="status"><span class="visually-hidden">Loading...</span></div>
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>