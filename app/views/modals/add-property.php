<div id="modalAddProperty" class="modal fade" tabindex="-1" aria-labelledby="modalAddPropertyLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalAddPropertyLabel"><i class="bi bi-buildings me-3"></i>Aggiungi Proprietà</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="">
                    <div class="mb-3">
                        <label for="txtPropertyName" class="form-label text-small">Nome</label>
                        <input id="txtPropertyName" type="text" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label for="txtPropertyType" class="form-label text-small">Tipo</label>
                        <input id="txtPropertyType" type="text" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label for="txtPropertyAddress" class="form-label text-small">Indirizzo</label>
                        <input id="txtPropertyAddress" type="text" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label for="txtPropertyPurchasePrice" class="form-label text-small">Prezzo d'acquisto</label>
                        <input id="txtPropertyPurchasePrice" type="number" class="form-control" required>
                    </div>
                    <span id="spNewPorpertyResult" class="text-danger d-none"></span>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal"><i class="bi bi-x"></i> Annulla</button>
                <button  id="btnSaveProperty" type="button" class="btn btn-orange" onclick="saveProperty()">
                    <i class="bi bi-check-lg"></i> Salva
                    <div id="spinnerNewProperty" class="spinner-border spinner-border-sm d-none" role="status"><span class="visually-hidden">Loading...</span></div>
                </button>
            </div>
        </div>
    </div>
</div>