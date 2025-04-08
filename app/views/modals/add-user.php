<div id="modalAddUser" class="modal fade" tabindex="-1" aria-labelledby="modalAddUserLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalAddUserLabel"><i class="bi bi-journal-plus me-3"></i>Aggiungi Utente</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="addUserForm">
                    <div class="row mb-3">
                        <label for="txtNewUserName" class="col-sm-5 col-form-label">Nome<span class="text-danger ms-2">*</span></label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control" id="txtNewUserName">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="txtNewUserSurname" class="col-sm-5 col-form-label">Cognome<span class="text-danger ms-2">*</span></label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control" id="txtNewUserSurname">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="txtNewUserEmail" class="col-sm-5 col-form-label">Email<span class="text-danger ms-2">*</span></label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control" id="txtNewUserEmail">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="txtNewUserPassword" class="col-sm-5 col-form-label">Password<span class="text-danger ms-2">*</span></label>
                        <div class="col-sm-7">
                            <input type="password" class="form-control" id="txtNewUserPassword">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="ddlNewUserRole" class="col-sm-5 col-form-label">Ruolo<span class="text-danger ms-2">*</span></label>
                        <div class="col-sm-7">
                            <select id="ddlNewUserRole" class="form-select" onchange="handleStaffLocation()">
                                <!-- <option value="900">Admin</option>
                                <option value="500">Staff</option> -->
                            </select>
                        </div>
                    </div>
                    <div id="userLocationSection" class="row mb-3 d-none">
                        <label for="ddlNewUserLocation" class="col-sm-5 col-form-label">Sede<span class="text-danger ms-2">*</span></label>
                        <div class="col-sm-7">
                            <select id="ddlNewUserLocation" class="form-select">
                            </select>
                        </div>
                    </div>
                    <span id="spNewUserResult" class="text-danger d-none"></span>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal"><i class="bi bi-x"></i> Annulla</button>
                <button id="btnSaveUser" type="button" class="btn btn-orange" onclick="saveUser()">
                    <i class="bi bi-check-lg"></i> Salva
                    <div id="spinnerNewUser" class="spinner-border spinner-border-sm d-none" role="status"><span class="visually-hidden">Loading...</span></div>
                </button>
            </div>
        </div>
    </div>
</div>