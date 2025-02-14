<div id="modalAddExpenseReport" class="modal fade" tabindex="-1" aria-labelledby="modalAddExpenseReportLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalAddExpenseReportLabel"><i class="bi bi-buildings me-3"></i>Aggiungi Note spese</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="">
                    <div class="row mb-3">
                        <label for="txtDate" class="col-sm-4 col-form-label">Data<span class="text-danger ms-2">*</span></label>
                        <div class="col-sm-8">
                            <input type="date" class="form-control" id="txtDate" required>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="ddlAgent" class="col-sm-4 col-form-label">Agente<span class="text-danger ms-2">*</span></label>
                        <div class="col-sm-8">
                            <select class="form-select" id="ddlAgent">
                                <option value="" selected>Scegli...</option>
                                <option value="1">Marco</option>
                                <option value="2">Elisa</option>
                                <option value="3">Derossi</option>
                            </select>
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
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal"><i class="bi bi-x"></i> Annulla</button>
                <button id="btnSaveExpense" type="button" class="btn btn-orange" onclick="saveExpenseReport()">
                    <i class="bi bi-check-lg"></i> Salva
                    <div id="spinnerNewExpense" class="spinner-border spinner-border-sm d-none" role="status"><span class="visually-hidden">Loading...</span></div>
                </button>
            </div>
        </div>
    </div>
</div>