<div id="modalAddCompanyLead" class="modal fade" tabindex="-1" aria-labelledby="modalAddCompanyLeadLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalAddCompanyLeadLabel"><i class="bi bi-journal-plus me-3"></i>Aggiungi relazione tra Azienda e Lead</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form>
                    <div id="autocompleteLeadsContent" class="mb-3 visually-hidden">
                        <label for="autocompleteCompanyLeadName" class="form-label text-small">Lead</label>
                        <div>
                            <div id="autocompleteCompanyLeadName"></div>
                        </div>
                    </div>
                    <div id="autocompleteCompaniesContent" class="mb-3 visually-hidden">
                        <label for="autocompleteCompanyLeadBizname" class="form-label text-small">Azienda</label>
                        <div>
                            <div id="autocompleteCompanyLeadBizname"></div>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="ddlCompanyLeadRole" class="form-label text-small">Ruolo</label>
                        <select id="ddlCompanyLeadRole" class="form-select" required>
                            <option value="100">Manager</option>
                            <option value="500">Impiegato</option>
                            <option value="900">Responsabile</option>
                        </select>
                    </div>
                    <span id="spCompanyLeadResult" class="text-danger d-none"></span>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal"><i class="bi bi-x"></i> Annulla</button>
                <button  id="btnSaveCompanyLead" type="button" class="btn btn-orange" onclick="saveCompanyLead()">
                    <i class="bi bi-check-lg"></i> Salva
                    <div id="spinnerCompanyLead" class="spinner-border spinner-border-sm d-none" role="status"><span class="visually-hidden">Loading...</span></div>
                </button>
            </div>
        </div>
    </div>
</div>