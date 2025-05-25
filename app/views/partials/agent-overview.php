<div class="row">
    <div class="col-4">
        <div class="pai-card position-relative">
            <div class="position-relative">
                <p class="lato-black text-blue"><i class="bi bi-person-vcard"></i>&nbsp;&nbsp;Informazioni agente</p>
                <span id="iconAllowEditGenericInfo" class="position-absolute editIcon" role="button" style="right:0px;top:0;" title="Edit" onclick="allowEditGeneralInfo()">
                    <i class="bi bi-pencil"></i>
                </span>
                <button id="iconSaveEditGenericInfo" class="btn btn-orange-inverted position-absolute saveIcon d-none py-0 px-2" role="button" style="right:0px;top:0;" title="Save" onclick="updateGenericInfo()">
                    <i class="bi bi-floppy"></i> Salva
                </button>
                <button id="iconCancelEditGenericInfo" class="btn btn-outline-secondary position-absolute cancelIcon d-none py-0 px-2" role="button" style="right:80px;top:0;" title="Cancel" onclick="cancelEditGeneralInfo()">
                    <i class="bi bi-x-circle"></i> Annulla
                </button>
            </div>
            <div id="divInfo">
                <div class="row mb-0 align-items-center">
                    <label for="txtFirstName" class="col-sm-5 col-form-label">Nome:<span class="text-danger ms-2 editControl d-none">*</span></label>
                    <div class="col-sm-7">
                        <span id="spFirstName" class="valueControl"></span>
                        <input type="text" id="txtFirstName" class="form-control editControl d-none mb-1" value="">
                    </div>
                </div>
                <div class="row mb-0 align-items-center">
                    <label for="txtLastName" class="col-sm-5 col-form-label">Cognome:<span class="text-danger ms-2 editControl d-none">*</span></label>
                    <div class="col-sm-7">
                        <span id="spLastName" class="valueControl"></span>
                        <input type="text" id="txtLastName" class="form-control editControl d-none mb-1" value="">
                    </div>
                </div>
                <div class="row mb-0 align-items-center">
                    <label for="ddlPackage" class="col-sm-5 col-form-label">Pacchetto:<span class="text-danger ms-2 editControl d-none">*</span></label>
                    <div class="col-sm-7">
                        <span id="spPackage" class="valueControl"></span>
                        <div class="input-group editControl d-none mb-1">
                            <select class="form-select" id="ddlPackage"></select>
                        </div>
                    </div>
                </div>

                <div class="row mb-0 align-items-center valueControl">
                    <label for="spFee" class="col-sm-5 col-form-label">Fisso:<span class="text-danger ms-2 d-none">*</span></label>
                    <div class="col-sm-7"><span id="spFee"></span></div>
                </div>
                <div class="row mb-0 align-items-center valueControl">
                    <label for="spCommission" class="col-sm-5 col-form-label">Commissioni:<span class="text-danger ms-2 d-none">*</span></label>
                    <div class="col-sm-7"><span id="spCommission"></span></div>
                </div>


                <div class="row mb-0 align-items-center">
                    <label for="txtEmail" class="col-sm-5 col-form-label">Email:</label>
                    <div class="col-sm-7">
                        <span id="spEmail" class="valueControl"></span>
                        <input type="text" id="txtEmail" class="form-control editControl d-none mb-1" value="">
                    </div>
                </div>
                <div class="row mb-0 align-items-center">
                    <label for="txtPhone" class="col-sm-5 col-form-label">Telefono:</label>
                    <div class="col-sm-7">
                        <span id="spPhone" class="valueControl"></span>
                        <input type="text" id="txtPhone" class="form-control editControl d-none mb-1" value="">
                    </div>
                </div>
                <hr>
                <div class="row mb-0 align-items-center">
                    <label for="txtLocation" class="col-sm-5 col-form-label">Sede:<span class="text-danger ms-2 editControl d-none">*</span></label>
                    <div class="col-sm-7">
                        <span id="spLocation" class="valueControl"></span>
                        <select class="form-select editControl d-none" id="ddlLocation">
                            <option selected>Scegli...</option>
                            <option value="1">Torino</option>
                            <option value="2">Moncalieri</option>
                            <option value="3">Roma</option>
                        </select>
                    </div>
                    <div id="errEditAgent" class="text-danger"></div>
                </div>
                <hr>
                <button type="button" class="btn btn-link text-danger border" onclick="deleteAgentModal()">
                    <i class="bi bi-trash3 me-2"></i> Elimina agente
                </button>
            </div>
        </div>
    </div>
    <div class="col-8">
        <div class="pai-card mb-3">
            <div class="d-flex justify-content-between align-items-center">
                <p class="lato-black text-blue mb-0">
                    <i class="bi bi-piggy-bank me-2"></i>Riepilogo Rientri
                </p>
            </div>
            <div id="listOfReport" class="mt-3"></div>
        </div>
    </div>
</div>