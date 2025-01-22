<div class="row">
    <div class="col-4">
        <div class="pai-card position-relative">
            <div class="position-relative">
                <p class="lato-black text-blue"><i class="bi bi-person-vcard"></i>&nbsp;&nbsp;Informazioni agente</p>

                <span class="position-absolute editIcon" role="button" style="right:20px;top:0;" title="Edit">
                    <i class="bi bi-pencil"></i>
                </span>
                <span class="position-absolute saveIcon d-none" role="button" style="right:20px;top:0;" title="Save" onclick="saveGenericInfo()">
                    <i class="bi bi-floppy"></i>
                </span>
                <span class="position-absolute cancelIcon d-none" role="button" style="right:45px;top:0;" title="Cancel">
                    <i class="bi bi-x-circle"></i>
                </span>
            </div>
            <div id="divInfo">
                <div class="row mb-0 align-items-center">
                    <label for="txtFirstName" class="col-sm-5 col-form-label">First Name:</label>
                    <div class="col-sm-7">
                        <span id="spFirstName" class="valueControl"></span>
                        <input type="text" id="txtFirstName" class="form-control editControl d-none" value="">
                    </div>
                </div>
                <div class="row mb-0 align-items-center">
                    <label for="txtLastName" class="col-sm-5 col-form-label">Last Name:</label>
                    <div class="col-sm-7">
                        <span id="spLastName" class="valueControl"></span>
                        <input type="text" id="txtLastName" class="form-control editControl d-none" value="">
                    </div>
                </div>
                <div class="row mb-0 align-items-center">
                    <label for="txtFixedCost" class="col-sm-5 col-form-label">Fixed Costs:</label>
                    <div class="col-sm-7">
                        <span id="spFixedCost" class="valueControl"></span>
                        <input type="text" id="txtFixedCost" class="form-control editControl d-none" value="">
                    </div>
                </div>
                <div class="row mb-0 align-items-center">
                    <label for="txtCommission" class="col-sm-5 col-form-label">Commission:</label>
                    <div class="col-sm-7">
                        <span id="spCommission" class="valueControl"></span>
                        <input type="text" id="txtCommission" class="form-control editControl d-none" value="">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-8">
        <div class="pai-card mb-3">
            <div class="d-flex justify-content-between align-items-center">
                <p class="lato-black text-blue mb-0">
                    <i class="bi bi-telephone me-2"></i>Elenco degli immobili venduti dall'agente
                </p>
                <!-- <button class="btn btn-orange" data-bs-toggle="modal" data-bs-target="#callModal">
                    <i class="bi bi-plus me-2"></i>Registra chiamata effettuata
                </button> -->
            </div>
            <div id="listOfSoldProperties" class="mt-3"></div>
        </div>
    </div>
</div>