<div id="modalConfirmDelete" class="modal fade" tabindex="-1" aria-labelledby="modalConfirmDeleteLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalConfirmDeleteLabel"><i class="bi bi-trash3 me-3"></i>Conferma eliminazione</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <input id="recordId" type="hidden">
                <p>Sei sicuro di voler eliminare l'elemento selezionato?</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal"><i class="bi bi-x"></i> No, annulla</button>
                <button id="btnConfirmDelete" type="button" class="btn btn-danger" onclick="">
                    <i class="bi bi-check-lg"></i> Si, elimina
                    <div id="spinnerConfirmDelete" class="spinner-border spinner-border-sm d-none" role="status"><span class="visually-hidden">Loading...</span></div>
                </button>
            </div>
        </div>
    </div>
</div>