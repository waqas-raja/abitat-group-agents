<div id="modalAddCompany" class="modal fade" tabindex="-1" aria-labelledby="modalAddCompanyLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalAddCompanyLabel"><i class="bi bi-buildings me-3"></i>Aggiungi Azienda</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="addCompanyForm">
                    <div class="mb-3">
                        <label for="txtNewCompanyBizname" class="form-label text-small">Ragione Sociale</label>
                        <input id="txtNewCompanyBizname" type="text" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label for="txtNewCompanyVat" class="form-label text-small">Partita IVA</label>
                        <input id="txtNewCompanyVat" type="text" class="form-control" required>
                    </div>
                    <span id="spNewCompanyResult" class="text-danger d-none"></span>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal"><i class="bi bi-x"></i> Annulla</button>
                <button  id="btnSaveCompany" type="button" class="btn btn-orange" onclick="saveCompany()">
                    <i class="bi bi-check-lg"></i> Salva
                    <div id="spinnerNewCompany" class="spinner-border spinner-border-sm d-none" role="status"><span class="visually-hidden">Loading...</span></div>
                </button>
            </div>
        </div>
    </div>
</div>