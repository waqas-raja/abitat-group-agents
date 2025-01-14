<div id="modalAddAppointment" class="modal fade" tabindex="-1" aria-labelledby="modalAddAppointmentLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalAddAppointmentLabel"><i class="bi bi-calendar-event me-3"></i>Pianifica Appuntamento</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form>

                    <div class="row mb-3">
                        <div class="col-md-6">
                            <label for="txtNewCallContact" class="form-label text-small">Cliente </label>
                            <input id="txtNewCallContact" type="text" class="form-control" placeholder="Cerca cliente...">
                        </div>
                        <div class="col-md-6">
                            <label for="txtNewCallAssignedTo" class="form-label text-small">Assegnato a</label>
                            <select id="txtNewCallAssignedTo" class="form-select">
                                <option>Larisa Potorac</option>
                                <option>Altro Responsabile</option>
                            </select>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="appointmentTitle" class="form-label text-small">Titolo</label>
                        <input type="text" id="appointmentTitle" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label for="txtNewCallNote" class="form-label text-small">Descrizione</label>
                        <textarea id="txtNewCallNote" class="form-control" rows="4"></textarea>
                    </div>
                    <div class="mb-3">
                        <label for="appointmentAddress" class="form-label text-small">Indirizzo</label>
                        <input type="text" id="appointmentAddress" class="form-control">
                    </div>
                    <div class="mb-3">
                        <div class="row">
                            <div class="col-md-4">
                                <label for="appointmentData" class="form-label text-small">Data</label>
                                <input type="date" id="appointmentData" class="form-control">
                            </div>
                            <div class="col-md-4">
                                <label for="appointmentOra" class="form-label text-small">alle</label>
                                <input type="time" id="appointmentOra" class="form-control">
                            </div>
                            <div class="col-md-4">
                                <label for="appointmentDurata" class="form-label text-small">Durata</label>
                                <select id="ddlNewAppointmentDuration" class="form-select">
                                    <?php
                                        $options = "";
                                        for ($i = 0.5; $i <= 24; $i += 0.5) {
                                            if (floor($i) == $i) $label = floor($i) . " ore";
                                            else $label = str_replace('.', ',', (string)$i) . " ore";
                                            $options .= "<option value='{$i}'>{$label}</option>\n";
                                        }
                                        echo $options;
                                    ?>
                                </select>
                            </div>
                        </div>
                    </div>

                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal"><i class="bi bi-x"></i> Annulla</button>
                <button  id="btnSaveAppointment" type="button" class="btn btn-orange" onclick="saveAppointment()">
                    <i class="bi bi-check-lg"></i> Salva
                    <div id="spinnerNewAppointment" class="spinner-border spinner-border-sm d-none" role="status"><span class="visually-hidden">Loading...</span></div>
                </button>
            </div>
        </div>
    </div>
</div>