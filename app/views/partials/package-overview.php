<div class="row">
    <div class="col-4">
        <div class="pai-card position-relative">
            <div class="position-relative">
                <p class="lato-black text-blue"><i class="bi bi-person-vcard me-2"></i>Informazioni pacchetto</p>
                <span id="iconAllowEditGenericInfo" class="position-absolute editIcon" role="button" style="right:0px;top:0;" title="Edit" onclick="allowEditGeneralInfo()">
                    <i class="bi bi-pencil"></i>
                </span>
                <button id="iconSaveEditGenericInfo" class="btn btn-orange-inverted position-absolute saveIcon d-none py-0 px-2" role="button" style="right:0px;top:0;" title="Save" onclick="updatePackageInfo()">
                    <i class="bi bi-floppy"></i> Salva
                </button>
                <button id="iconCancelEditGenericInfo" class="btn btn-outline-secondary position-absolute cancelIcon d-none py-0 px-2" role="button" style="right:80px;top:0;" title="Cancel" onclick="cancelEditGeneralInfo()">
                    <i class="bi bi-x-circle"></i> Annulla
                </button>
            </div>
            <div id="divInfo">
                <div class="row mb-0 align-items-center">
                    <label for="txtUpdateName" class="col-sm-5 col-form-label">Nome:<span class="text-danger ms-2 editControl d-none">*</span></label>
                    <div class="col-sm-7">
                        <span id="spPackageName" class="valueControl"></span>
                        <input type="text" id="txtUpdateName" class="form-control editControl d-none mb-1" value="">
                    </div>
                </div>
                <div class="row mb-0 align-items-center">
                    <label for="txtUpdateFixedFee" class="col-sm-5 col-form-label">Canone fisso:<span class="text-danger ms-2 editControl d-none">*</span></label>
                    <div class="col-sm-7">
                        <span id="spPackageFixedCost" class="valueControl"></span>
                        <input type="number" id="txtUpdateFixedFee" class="form-control editControl d-none mb-1" value="">
                    </div>
                </div>
                <div class="row mb-0 align-items-center">
                    <label for="txtUpdatePercentage" class="col-sm-5 col-form-label">Percentuale:<span class="text-danger ms-2 editControl d-none">*</span></label>
                    <div class="col-sm-7">
                        <span id="spPackagePercentage" class="valueControl"></span>
                        <div class="input-group editControl d-none mb-1">
                            <input type="number" id="txtUpdatePercentage" class="form-control" value="">
                            <span class="input-group-text">%</span>
                        </div>
                    </div>
                </div>
                <div class="row mb-0 align-items-center">
                    <label for="txtUpdateDescription" class="col-sm-5 col-form-label">Descrizione:</label>
                    <div class="col-sm-7">
                        <span id="spPackageNote" class="valueControl"></span>
                        <textarea id="txtUpdateDescription" class="form-control editControl d-none mb-1" rows="3"></textarea>
                    </div>
                </div>
                <div id="errUpdatePackage" class="text-danger d-none"></div>
            </div>
        </div>
    </div>
    <div class="col-8">
        <div class="pai-card mb-3">
            <div class="d-flex justify-content-between align-items-center">
                <p class="lato-black text-blue mb-0">
                    <i class="bi bi-piggy-bank me-2"></i>Elenco degli agenti collegati
                </p>
            </div>
            <div id="listOfLinkedAgents" class="mt-3"></div>
        </div>
    </div>
</div>