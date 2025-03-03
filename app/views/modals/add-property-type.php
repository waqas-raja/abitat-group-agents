<div id="modalAddPropertyType" class="modal fade" tabindex="-1" aria-labelledby="modalAddPropertyTypeLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalAddPropertyTypeLabel"><i class="bi bi-shop me-3"></i>Aggiungi Tipo di proprietà</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="">
                    <input type="hidden" id="hPropertyType">
                    <div class="row mb-3">
                        <label for="txtDate" class="col-sm-4 col-form-label">Tipo<span class="text-danger ms-2">*</span></label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" id="txtPropertyType" required>
                        </div>
                    </div>
                    <span id="spNewPropertyTypeResult" class="text-danger d-none"></span>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal"><i class="bi bi-x"></i> Annulla</button>
                <button id="btnPropertyType" type="button" class="btn btn-orange" onclick="savePropertyType()">
                    <i class="bi bi-check-lg"></i> Salva
                    <div id="spinnerNewPropertyType" class="spinner-border spinner-border-sm d-none" role="status"><span class="visually-hidden">Loading...</span></div>
                </button>
            </div>
        </div>
    </div>
</div>