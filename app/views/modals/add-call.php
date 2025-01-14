<div id="modalAddCall" class="modal fade" tabindex="-1" aria-labelledby="modalAddCallLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalAddCallLabel"><i class="bi bi-telephone me-3"></i>Pianifica Chiamata</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form autocomplete="off">
                    <div class="row mb-3">
                        <div class="col-md-6">
                            <label for="txtNewCallContact" class="form-label text-small">Cliente </label>
                            <input id="txtNewCallContact" type="text" class="form-control" placeholder="Cerca cliente...">
                        </div>
                        <div class="col-md-6">
                            <label for="txtNewCallAssignedTo" class="form-label text-small">Assegnato a</label>
                            <select id="txtNewCallAssignedTo" class="form-select">
                                <option>Larisa Potorac</option>
                                <option>Altro Responsabile</option>
                            </select>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="txtNewCallNote" class="form-label text-small">Descrizione</label>
                        <textarea id="txtNewCallNote" class="form-control" rows="4"></textarea>
                    </div>
                    <div class="row mb-3">
                        <div class="col-md-6">
                            <label for="txtNewCallDate" class="form-label text-small">Data</label>
                            <input id="txtNewCallDate" type="date" class="form-control">
                        </div>
                        <div class="col-md-6">
                            <label for="txtNewCallHour" class="form-label text-small">Ora</label>
                            <input id="txtNewCallHour" type="time" class="form-control">
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal"><i class="bi bi-x"></i> Annulla</button>
                <button  id="btnSaveCall" type="button" class="btn btn-orange" onclick="saveCall()">
                    <i class="bi bi-check-lg"></i> Salva
                    <div id="spinnerNewCall" class="spinner-border spinner-border-sm d-none" role="status"><span class="visually-hidden">Loading...</span></div>
                </button>
            </div>
        </div>
    </div>
</div>
