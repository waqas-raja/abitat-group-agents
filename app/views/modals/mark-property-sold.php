<div id="modalMarkPropertySold" class="modal fade" tabindex="-1" aria-labelledby="modalMarkPropertySoldLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalMarkPropertySoldLabel"><i class="bi bi-buildings me-3"></i>Contrassegna la proprietà venduta</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="">
                    <div class="mb-3">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="cbMarkPropertySold" required>
                            <label id="cbMarkPropertySoldLabel" class="form-check-label" for="cbMarkPropertySold"></label>
                        </div>
                    </div>
                    <span id="spMarkPropertySoldResult" class="text-danger d-none"></span>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal"><i class="bi bi-x"></i> Annulla</button>
                <button id="btnSaveMarkPropertySold" type="button" class="btn btn-orange" onclick="savePropertyMarkedAsSold()">
                    <i class="bi bi-check-lg"></i> Salva
                    <div id="spinnerMarkPropertySold" class="spinner-border spinner-border-sm d-none" role="status"><span class="visually-hidden">Loading...</span></div>
                </button>
            </div>
        </div>
    </div>
</div>