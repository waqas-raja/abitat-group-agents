<div id="modalAddExpenseReport" class="modal fade" tabindex="-1" aria-labelledby="modalAddExpenseReportLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalAddExpenseReportLabel"><i class="bi bi-piggy-bank me-3"></i>Aggiungi Note spese</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="">
                    <input type="hidden" id="hExpenseReportId">
                <div class="row mb-3">
                        <label for="ddlLocation" class="col-sm-4 col-form-label">Sede</label>
                        <div class="col-sm-8">
                            <select class="form-select" id="ddlLocation" onchange="getRelevantAgents()">
                            </select>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="ddlAgent" class="col-sm-4 col-form-label">Agente<span class="text-danger ms-2">*</span></label>
                        <div class="col-sm-8">
                            <select class="form-select" id="ddlAgent">
                            </select>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="txtDate" class="col-sm-4 col-form-label">Data<span class="text-danger ms-2">*</span></label>
                        <div class="col-sm-8">
                            <input type="date" class="form-control" id="txtDate" required>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="txtCost" class="col-sm-4 col-form-label">Costo<span class="text-danger ms-2">*</span></label>
                        <div class="col-sm-8">
                            <input type="number" class="form-control" id="txtCost" required>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="txtDescription" class="col-sm-4 col-form-label">Descrizione</label>
                        <div class="col-sm-8">
                            <textarea class="form-control" id="txtDescription" rows="3"></textarea>
                        </div>
                    </div>
                    
                    <span id="spNewExpenseResult" class="text-danger d-none"></span>
                </form>
            </div>
            <div class="modal-footer d-flex justify-content-between">
                <div>
                    <button type="button" id="btnEliminateExpense" class="btn btn-link text-danger border d-none" onclick="deleteExpenseModal()"><i class="bi bi-trash3 me-2"></i> Elimina Note spese</button>
                </div>
                <div>
                    <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal"><i class="bi bi-x"></i> Annulla</button>
                    <button id="btnSaveExpense" type="button" class="btn btn-orange" onclick="saveExpenseReport()">
                        <i class="bi bi-check-lg"></i> Salva
                        <div id="spinnerNewExpense" class="spinner-border spinner-border-sm d-none" role="status"><span class="visually-hidden">Loading...</span></div>
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>