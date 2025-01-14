<div id="modalCallDetails" class="modal fade" tabindex="-1" aria-labelledby="modalCallDetailsLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="detailsModalLabel">Dettagli chiamata</h5>
                <button type="button" class="btn-close text-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="d-flex align-items-center mb-4">
                    <i class="bi bi-person" style="font-size: 40px;"></i>
                    <div class="ms-3">
                        <span id="modalName" class="glp-title"></span><br>
                        <span id="modalPhone" class="glp-title text-blue"></span>
                    </div>
                </div>
                <div class="mb-3">
                    <span class="glp-title">Quando:</span><br>
                    <span id="modalWhenDate" class="text-muted"></span> alle <span id="modalWhenTime" class="text-muted"></span>
                </div>
                <div class="mb-3">
                    <span class="glp-title">Note</span><br>
                    <p id="modalNote" class="mb-0 text-muted"></p>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal"><i class="bi bi-pen"></i> Modifica</button>
                <button type="button" class="btn btn-orange"><i class="bi bi-check-lg"></i> Segna come fatto</button>
            </div>
        </div>
    </div>
</div>
