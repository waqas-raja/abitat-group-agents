<div id="modalEditUser" class="modal fade" tabindex="-1" aria-labelledby="modalEditUserLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalEditUserLabel"><i class="bi bi-pencil-square me-3"></i>Modifica Utente</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="editUserForm">
                    <input id="hUserId" type="hidden">
                    <div class="mb-3">
                        <label for="txtEditUserName" class="form-label text-small">Nome</label>
                        <input id="txtEditUserName" type="text" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label for="txtEditUserSurname" class="form-label text-small">Cognome</label>
                        <input id="txtEditUserSurname" type="text" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label for="txtEditUserEmail" class="form-label text-small">Email</label>
                        <input id="txtEditUserEmail" type="text" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label for="ddlEditUserRole" class="form-label text-small">Ruolo</label>
                        <select id="ddlEditUserRole" class="form-select" required>
                            <option value="900">Admin</option>
                            <option value="100">Agent</option>
                            <option value="500">Staff</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="txtEditUserPassword" class="form-label text-small">Password</label>
                        <div class="input-group">
                            <input id="txtEditUserPassword" type="text" class="form-control" disabled>
                            <button type="button" class="btn btn-outline-secondary" onclick="resetPasswordField()">Resetta</button>
                        </div>
                    </div>
                    <span id="spEditUserResult" class="text-danger d-none"></span>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal"><i class="bi bi-x"></i> Annulla</button>
                <button id="btnDisableUser" type="button" class="btn btn-outline-secondary" onclick="disableUser()"><i class="bi bi-x"></i> Disabilita utente</button>
                <button id="btnUpdateUser" type="button" class="btn btn-orange" onclick="updateUser()">
                    <i class="bi bi-check-lg"></i> Salva
                    <div id="spinnerEditUser" class="spinner-border spinner-border-sm d-none" role="status"><span class="visually-hidden">Loading...</span></div>
                </button>
            </div>
        </div>
    </div>
</div>