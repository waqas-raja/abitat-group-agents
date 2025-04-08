<div id="modalMarkPropertySold" class="modal fade" tabindex="-1" aria-labelledby="modalMarkPropertySoldLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalMarkPropertySoldLabel"><i class="bi bi-buildings me-3"></i>Contrassegna la proprietà venduta</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <input id="hSoldProperty" type="hidden">
                <div class="row row-cols-1 row-cols-sm-2 row-cols-md-2">
                    <div class="col">
                        <div class="row mb-3">
                            <label for="txtAddressDisable" class="col-sm-5 col-form-label">Indirizzo</label>
                            <div class="col-sm-7">
                                <input id="txtAddressDisable" type="text" class="form-control" disabled>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="txtPropertySoldDate" class="col-sm-5 col-form-label">Data vendita<span class="text-danger ms-2">*</span></label>
                            <div class="col-sm-7">
                                <div id="txtPropertySoldDate" style="font-size: 1rem;"></div>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="txtPropertySoldPrice" class="col-sm-5 col-form-label">Prezzo di vendita<span class="text-danger ms-2">*</span></label>
                            <div class="col-sm-7">
                                <input id="txtPropertySoldPrice" type="number" class="form-control" required>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="txtSaleDownPayment" class="col-sm-5 col-form-label">Acconto<span class="text-danger ms-2">*</span></label>
                            <div class="col-sm-7">
                                <input id="txtSaleDownPayment" type="number" class="form-control">
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="row mb-3">
                            <label for="ddlPropertySoldAgent" class="col-sm-5 col-form-label">Agente che ha venduto<span class="text-danger ms-2">*</span></label>
                            <div class="col-sm-7">
                                <select id="ddlPropertySoldAgent" class="form-select"></select>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="txtAgencyPropertySoldCommission" class="col-sm-5 col-form-label">Commissione AbitatGroup<span class="text-danger ms-2">*</span></label>
                            <div class="col-sm-7">
                                <div class="input-group">
                                    <input id="txtAgencyPropertySoldCommission" type="number" class="form-control">
                                    <span class="input-group-text">%</span>
                                </div>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="ddlExternalAgencyType" class="col-sm-5 col-form-label">Agenzia esterna<span class="text-danger ms-2">*</span></label>
                            <div class="col-sm-7">
                                <select id="ddlExternalAgencyType" class="form-select" onchange="ddlExternalAgencyType_change(this)">
                                    <option value="N" selected>Nessuna</option>
                                    <option value="F">Sì, con importo fisso</option>
                                    <option value="P">Sì, con percentuale</option>
                                </select>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="txtExternalAgencyName" class="col-sm-5 col-form-label">
                                Nome altra agenzia
                                <span class="text-danger ms-2 asteriskExternalAgency" style="display:none">*</span>
                            </label>
                            <div class="col-sm-7">
                                <input id="txtExternalAgencyName" type="text" class="form-control" disabled>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="txtExternalAgencyValue" class="col-sm-5 col-form-label">
                                Valore altra agenzia
                                <span class="text-danger ms-2 asteriskExternalAgency" style="display:none">*</span>
                            </label>
                            <div class="col-sm-7">
                                <input id="txtExternalAgencyValue" type="number" class="form-control" disabled>
                            </div>
                        </div>
                    </div>
                </div>
                <span id="spMarkPropertySoldResult" class="text-danger d-none"></span>
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