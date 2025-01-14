<div id="modalAddConnectedPerson" class="modal fade" tabindex="-1" aria-labelledby="modalAddConnectedPersonLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalAddConnectedPersonLabel"><i class="bi bi-journal-plus me-3"></i>Aggiungi persona</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form>
                    <div id="autocompleteCompanyLeadContent" class="mb-3 visually-hidden">
                        <label for="autocompleteCompanyLeadPersonName" class="form-label text-small">Lead</label>
                        <div>
                            <div id="autocompleteCompanyLeadPersonName"></div>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="txtRelationshipType" class="form-label text-small">Tipo di relazione</label>
                        <input id="txtRelationshipType" type="text" class="form-control" placeholder="" required>
                    </div>
                    <div class="form-check mb-3">
                        <input id="txtObligated" class="form-check-input" type="checkbox" value="">
                        <label class="form-check-label text-small" for="txtObligated">
                            Coobbligata
                        </label>
                    </div>
                    <span id="spCompanyLeadResult" class="text-danger d-none"></span>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal"><i class="bi bi-x"></i> Annulla</button>
                <button id="btnSaveCompanyLead" type="button" class="btn btn-orange" onclick="addConnectedPerson()">
                    <i class="bi bi-check-lg"></i> Salva
                    <div id="spinnerCompanyLead" class="spinner-border spinner-border-sm d-none" role="status"><span class="visually-hidden">Loading...</span></div>
                </button>
            </div>
        </div>
    </div>
</div>