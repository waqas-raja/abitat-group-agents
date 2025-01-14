<div class="row">
    <div class="col-sm-4">
        <p class="lato-black text-blue"><i class="bi bi-file-earmark-person me-2"></i>Dati generali</p>
        <div class="row mb-3">
            <label for="txtName" class="col-sm-4 col-form-label">Nome</label>
            <div class="col-sm-8">
                <input type="text" id="txtName" class="form-control">
            </div>
        </div>
        <div class="row mb-3">
            <label for="txtSurname" class="col-sm-4 col-form-label">Cognome</label>
            <div class="col-sm-8">
                <input type="text" id="txtSurname" class="form-control">
            </div>
        </div>
        <div class="row mb-3">
            <label for="txtFiscal" class="col-sm-4 col-form-label">Codice Fiscale</label>
            <div class="col-sm-8">
                <input type="text" id="txtFiscal" class="form-control">
            </div>
        </div>
        <div class="row mb-3">
            <label for="txtFieldDate" class="col-sm-4 col-form-label">Data di nascita</label>
            <div class="col-sm-8">
                <input type="date" id="txtFieldDate" class="form-control">
            </div>
        </div>
        <div class="row mb-3">
            <label for="txtBirthPlace" class="col-sm-4 col-form-label">Luogo di Nascita</label>
            <div class="col-sm-8">
                <input type="text" id="txtBirthPlace" class="form-control">
            </div>
        </div>
        <div class="row mb-3">
            <label for="ddlNationality" class="col-sm-4 col-form-label">Cittadinanza</label>
            <div class="col-sm-8">
                <select id="ddlNationality" class="form-select" required>
                    <option value="1">Italiana</option>
                </select>
            </div>
        </div>
        <div class="row mb-3">
            <label for="ddlMaritalState" class="col-sm-4 col-form-label">Stato civile</label>
            <div class="col-sm-8">
                <select id="ddlMaritalState" class="form-select" required>
                    <option value="0">Non dichiarato</option>
                    <option value="1">Celibe/Nubile</option>
                    <option value="2">Convivente</option>
                    <option value="3">Sposato/a</option>
                </select>
            </div>
        </div>
        <div class="row mb-3">
            <label for="ddlGender" class="col-sm-4 col-form-label">Genere</label>
            <div class="col-sm-8">
                <select id="ddlGender" class="form-select" required>
                    <option value="M">Maschio</option>
                    <option value="F">Femmina</option>
                </select>
            </div>
        </div>
    </div>
    <div class="col-sm-4">
        <p class="lato-black text-blue"><i class="bi bi-chat-dots me-2"></i>Contatti</p>
        <div class="row mb-3">
            <label for="txtPhoneOne" class="col-sm-4 col-form-label">Telefono 1</label>
            <div class="col-sm-8">
                <input type="text" id="txtPhoneOne" class="form-control">
            </div>
        </div>
        <div class="row mb-3">
            <label for="txtPhoneTwo" class="col-sm-4 col-form-label">Telefono 2</label>
            <div class="col-sm-8">
                <input type="text" id="txtPhoneTwo" class="form-control">
            </div>
        </div>
        <div class="row mb-3">
            <label for="txtEmail" class="col-sm-4 col-form-label">Email</label>
            <div class="col-sm-8">
                <input type="text" id="txtEmail" class="form-control">
            </div>
        </div>
        <div class="row mb-3">
            <label for="txtPec" class="col-sm-4 col-form-label">PEC</label>
            <div class="col-sm-8">
                <input type="text" id="txtPec" class="form-control">
            </div>
        </div>
        <div class="row mb-3">
            <label for="txtAddress" class="col-sm-4 col-form-label">Indirizzo</label>
            <div class="col-sm-8">
                <input type="text" id="txtAddress" class="form-control">
            </div>
        </div>
        <div class="row mb-3">
            <label for="txtCity" class="col-sm-4 col-form-label">Città</label>
            <div class="col-sm-8">
                <input type="text" id="txtCity" class="form-control">
            </div>
        </div>
        <div class="row mb-3">
            <label for="txtCap" class="col-sm-4 col-form-label">CAP</label>
            <div class="col-sm-8">
                <input type="text" id="txtCap" class="form-control">
            </div>
        </div>
    </div>
    <div class="col-sm-4">
        <p class="lato-black text-blue"><i class="bi bi-person-vcard me-2"></i>Documento d'identità</p>
        <div class="row mb-3">
            <label for="ddlType" class="col-sm-4 col-form-label">Tipologia</label>
            <div class="col-sm-8">
                <select id="ddlType" class="form-select" required>
                    <option value="1">Carta d'identità</option>
                    <option value="2">Passaporto</option>
                </select>
            </div>
        </div>
        <div class="row mb-3">
            <label for="txtNumber" class="col-sm-4 col-form-label">Numero</label>
            <div class="col-sm-8">
                <input type="text" id="txtNumber" class="form-control">
            </div>
        </div>
        <div class="row mb-3">
            <label for="txtReleaseDate" class="col-sm-4 col-form-label">Data di Rilascio</label>
            <div class="col-sm-8">
                <input type="date" id="txtReleaseDate" class="form-control">
            </div>
        </div>
        <div class="row mb-3">
            <label for="txtExpirationDate" class="col-sm-4 col-form-label">Scadenza</label>
            <div class="col-sm-8">
                <input type="date" id="txtExpirationDate" class="form-control">
            </div>
        </div>
        <div class="row mb-3">
            <label for="txtIssuedBy" class="col-sm-4 col-form-label">Rilasciato da</label>
            <div class="col-sm-8">
                <input type="text" id="txtIssuedBy" class="form-control">
            </div>
        </div>
    </div>
    <hr>
    <div class="col-sm-4">
        <p class="lato-black text-blue"><i class="bi bi-house-heart me-2"></i>Immobile</p>
        <div class="row mb-3">
            <label for="ddlTypology" class="col-sm-4 col-form-label">Tipologia</label>
            <div class="col-sm-8">
                <select id="ddlTypology" class="form-select" required>
                    <option value="1">Appartamento</option>
                    <option value="2">Casa indipendente</option>
                </select>
            </div>
        </div>
        <div class="row mb-3">
            <label for="txtValue" class="col-sm-4 col-form-label">Valore</label>
            <div class="col-sm-8">
                <input type="number" id="txtValue" class="form-control">
            </div>
        </div>
    </div>
    <div class="col-sm-4">
        <p class="lato-black text-blue"><i class="bi bi-cash-coin me-2"></i>GL Prestiti</p>
        <div class="row mb-3">
            <label for="ddlSource" class="col-sm-4 col-form-label">Fonte</label>
            <div class="col-sm-8">
                <select id="ddlSource" class="form-select" required>
                    <option value="1">GL Prestiti</option>
                    <option value="2">Prestito personale</option>
                    <option value="3">Creditis</option>
                </select>
            </div>
        </div>
        <div class="row mb-3">
            <label for="ddlSession" class="col-sm-4 col-form-label">Sessione</label>
            <div class="col-sm-8">
                <select id="ddlSession" class="form-select" required>
                    <option value="1">Corrente</option>
                </select>
            </div>
        </div>
        <div class="row mb-3">
            <label for="txtAtc" class="col-sm-4 col-form-label">ATC</label>
            <div class="col-sm-8">
                <input type="text" id="txtAtc" class="form-control">
            </div>
        </div>
        <div class="row mb-3">
            <label for="txtDerivation" class="col-sm-4 col-form-label">Derivazione</label>
            <div class="col-sm-8">
                <input type="text" id="txtDerivation" class="form-control">
            </div>
        </div>
        <div class="row mb-3">
            <label for="ddlExposure" class="col-sm-4 col-form-label">Esposizione</label>
            <div class="col-sm-8">
                <select id="ddlExposure" class="form-select" required>
                    <option value="1">CC</option>
                    <option value="2">CQ</option>
                </select>
            </div>
        </div>
    </div>
</div>
