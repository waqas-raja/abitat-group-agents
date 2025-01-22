<div id="modalAddAgent" class="modal fade" tabindex="-1" aria-labelledby="modalAddAgentLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalAddAgentLabel"><i class="bi bi-buildings me-3"></i>Aggiungi Agente</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="">
                    <div class="mb-3">
                        <label for="txtFirstName" class="form-label text-small">First Name</label>
                        <input id="txtFirstName" type="text" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label for="txtLastName" class="form-label text-small">Last Name</label>
                        <input id="txtLastName" type="text" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label for="txtFixedCost" class="form-label text-small">Fixed Costs</label>
                        <input id="txtFixedCost" type="text" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label for="txtCommission" class="form-label text-small">Commission</label>
                        <input id="txtCommission" type="text" class="form-control" required>
                    </div>
                    <span id="spNewAgentResult" class="text-danger d-none"></span>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal"><i class="bi bi-x"></i> Annulla</button>
                <button  id="btnSaveAgent" type="button" class="btn btn-orange" onclick="saveAgent()">
                    <i class="bi bi-check-lg"></i> Salva
                    <div id="spinnerNewAgent" class="spinner-border spinner-border-sm d-none" role="status"><span class="visually-hidden">Loading...</span></div>
                </button>
            </div>
        </div>
    </div>
</div>