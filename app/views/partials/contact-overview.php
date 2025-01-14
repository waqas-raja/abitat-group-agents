<div class="row">
    <div class="col-3">
        <div class="glp-card">
            <p class="lato-black text-blue"><i class="bi bi-person-vcard"></i>&nbsp;&nbsp;Informazioni contatto</p>
            <div class="text-small">
                <span style="display:inline-block;width:120px">Nome Cognome:</span> <strong id="spName">Marop rossi</strong><br>
                <span style="display:inline-block;width:120px">Professione:</span> <strong id="spProfession">Impiegato pubblico</strong><br>
                <hr>
                <span style="display:inline-block;width:120px">E-mail:</span> <strong id="spEmail">email@example.com</strong><br>
                <span style="display:inline-block;width:120px">PEC:</span> <strong id="spPec">email@pec.it</strong><br>
                <span style="display:inline-block;width:120px">Telefono 1:</span> <strong id="spPhone1">+39 123 456 7890</strong><br>
                <span style="display:inline-block;width:120px">Telefono 2:</span> <strong id="spPhone2">+39 123 456 7890</strong><br>
                <hr>
                <span style="display:inline-block;width:120px">Commerciale:</span> <strong id="spSalesperson">Ciaffi</strong><br>
                <span style="display:inline-block;width:120px">Lista:</span> <strong id="spList">GL Sviluppo</strong><br>
                <span style="display:inline-block;width:120px">Derivazione:</span> <strong id="spSource">Reference</strong><br>
                <hr>
                <span style="display:inline-block;width:120px">Azienda:</span> <strong id="spCompany">Croccanti srl</strong><br>
                <span style="display:inline-block;width:120px">Coobligato:</span> <strong id="spCobligor">Paola Croccanti</strong><br>
            </div>
        </div>
    </div>
    <div class="col-9">
        <div class="glp-card mb-3">
            <p class="lato-black text-blue"><i class="bi bi-telephone me-2"></i>Chiamate</p>
            <div class="text-small">
                <div class="border bg-light p-2 d-flex align-items-center gap-2">
                    <span class="lato-black d-inline" style="width:120px;">Nuova:</span>
                    <select id="ddlContactActivityStatus" class="form-select" style="width:310px;"></select>
                    <input type="text" class="form-control w-100" placeholder="Scrivi le note relative alla chiamata effettuata...">
                    <button class="btn btn-orange" onclick="saveNewStatus()" style="width:160px"><i class="bi bi-plus me-2"></i>Salva</button>
                </div>
                <div id="listOfCalls" class="mt-2"></div>
            </div>
        </div>
    </div>
</div>