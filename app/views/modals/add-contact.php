<div id="modalAddContact" class="modal fade" tabindex="-1" aria-labelledby="modalAddContactLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalAddContactLabel"><i class="bi bi-person-lines-fill me-3"></i> Aggiungi Contatto</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form class="row">
                    <div class="col-12 col-md-6 mb-3">
                        <label for="txtNewContactName" class="form-label text-small">Nome <span class="text-danger">*</span></label>
                        <input id="txtNewContactName" type="text" class="form-control" required>
                    </div>
                    <div class="col-12 col-md-6 mb-3">
                        <label for="txtNewContactSurname" class="form-label text-small">Cognome <span class="text-danger">*</span></label>
                        <input id="txtNewContactSurname" type="text" class="form-control" required>
                    </div>
                    <div class="col-12 col-md-6 mb-3">
                        <label for="txtNewContactPhone" class="form-label text-small">Telefono</label>
                        <input id="txtNewContactPhone" type="tel" class="form-control" oninput="validatePhoneInput(this)">
                    </div>
                    <div class="col-12 col-md-6 mb-3">
                        <label for="txtNewContactEmail" class="form-label text-small">Email</label>
                        <input id="txtNewContactEmail" type="text" class="form-control">
                    </div>
                </form>
                <span id="spNewContactResult" class="text-danger d-none"></span>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal"><i class="bi bi-x"></i> Annulla</button>
                <button  id="btnSaveContact" type="button" class="btn btn-orange" onclick="addContact()">
                    <i class="bi bi-check-lg"></i> Salva
                    <div id="spinnerNewContact" class="spinner-border spinner-border-sm d-none" role="status"><span class="visually-hidden">Loading...</span></div>
                </button>
            </div>
        </div>
    </div>
</div>