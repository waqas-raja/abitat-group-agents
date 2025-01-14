<div id="modalAddUser" class="modal fade" tabindex="-1" aria-labelledby="modalAddUserLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalAddUserLabel"><i class="bi bi-journal-plus me-3"></i>Aggiungi Utente</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="addUserForm">
                    <div class="mb-3">
                        <label for="txtNewUserName" class="form-label text-small">Nome</label>
                        <input id="txtNewUserName" type="text" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label for="txtNewUserSurname" class="form-label text-small">Cognome</label>
                        <input id="txtNewUserSurname" type="text" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label for="txtNewUserEmail" class="form-label text-small">Email</label>
                        <input id="txtNewUserEmail" type="text" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label for="ddlNewUserRole" class="form-label text-small">Ruolo</label>
                        <select id="ddlNewUserRole" class="form-select" required>
                            <option value="100">Agente</option>
                            <option value="500">Staff</option>
                            <option value="900">Admin</option>
                        </select>
                    </div>
                    <span id="spNewUserResult" class="text-danger d-none"></span>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal"><i class="bi bi-x"></i> Annulla</button>
                <button  id="btnSaveUser" type="button" class="btn btn-orange" onclick="saveUser()">
                    <i class="bi bi-check-lg"></i> Salva
                    <div id="spinnerNewUser" class="spinner-border spinner-border-sm d-none" role="status"><span class="visually-hidden">Loading...</span></div>
                </button>
            </div>
        </div>
    </div>
</div>