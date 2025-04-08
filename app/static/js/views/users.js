let _isStaff = false;
document.addEventListener("DOMContentLoaded", async () => {
    await init();
    loadRoles();
});

async function init() {
    try {
        const response = await fetch("/api/users");
        const data = await response.json();
        if (data.payload === undefined) throw new Error("Data payload is undefined");
        loadList(data.payload);
    } catch (error) { console.error("Errore durante la chiamata:", error); }
}

async function loadLocations() {
    const ddlLocation = document.getElementById('ddlNewUserLocation');
    ddlLocation.innerHTML = '<option value="-1" selected disabled>Seleziona la sede</option>';
    const response = await fetch('/api/branches');
    const r = await response.json();
    r.payload.forEach(el => { ddlLocation.innerHTML += `<option value="${el.id}">${el.name}</option>`; });
}

async function loadRoles() {
    const ddlLocation = document.getElementById('ddlNewUserRole');
    ddlLocation.innerHTML = '<option value="-1" selected disabled>Seleziona la ruolo</option>';
    const response = await fetch('/api/roles');
    const r = await response.json();
    r.payload.forEach(el => { ddlLocation.innerHTML += `<option value="${el.id}">${el.name}</option>`; });
}

function loadList(data) {
    new DevExpress.ui.dxDataGrid(document.getElementById("listOfUsers"), {
        dataSource: data,
        columnAutoWidth: true,
        showBorders: true,
        rowAlternationEnabled: false,
        grouping: { autoExpandAll: false },
        groupPanel: { visible: true, emptyPanelText: "Trascina qui le colonne per raggruppare" },
        filterRow: { visible: true, applyFilter: "auto" },
        headerFilter: { visible: true },
        columns: [
            { dataField: "full_name", caption: "Nome Cognome", allowFiltering: true },
            { dataField: "email", caption: "Email", allowFiltering: true },
            { dataField: "role_name", caption: "Ruolo", allowFiltering: true }
        ],
        paging: { pageSize: 10 },
        pager: { showPageSizeSelector: true, allowedPageSizes: [5, 10, 20], showInfo: true },
        toolbar: {
            items: [
                "groupPanel",
                "searchPanel",
                {
                    location: "after",
                    widget: "dxButton",
                    options: {
                        icon: "add",
                        text: "Aggiungi Utente",
                        onClick: function () {
                            const modalElement = document.getElementById("modalAddUser");
                            const modal = new bootstrap.Modal(modalElement);
                            modal.show();
                        },
                        elementAttr: { class: "btn-orange" }
                    }
                }
            ]
        },
        onRowClick: function (e) {
            document.getElementById("hUserId").value = e.data.id;
            document.getElementById("txtEditUserName").value = e.data.name || "N/A";
            document.getElementById("txtEditUserSurname").value = e.data.surname || "N/A";
            document.getElementById("txtEditUserEmail").value = e.data.email || "N/A";
            document.getElementById("ddlEditUserRole").value = e.data.role_id || "";
            document.getElementById("txtEditUserPassword").value = "*********";
            const modal = new bootstrap.Modal(document.getElementById("modalEditUser"));
            modal.show();
        }
    });
}

async function saveUser() {
    const name = document.getElementById("txtNewUserName").value.trim();
    const surname = document.getElementById("txtNewUserSurname").value.trim();
    const email = document.getElementById("txtNewUserEmail").value.trim();
    const password = document.getElementById("txtNewUserPassword").value.trim();
    const role = document.getElementById("ddlNewUserRole").value;
    const result = document.getElementById("spNewUserResult");
    result.textContent = "";
    result.classList.add("d-none");
    if (!name || !surname || !email || !password || role == '-1') {
        result.textContent = "Tutti i campi sono obbligatori";
        result.classList.remove("d-none");
        return;
    }
    let location = '';
    if (_isStaff) {
        location = document.getElementById('ddlNewUserLocation').value;
        if (location == '-1') {
            result.textContent = "Tutti i campi sono obbligatori";
            result.classList.remove("d-none");
            return;
        }
    }
    if (!isValidEmail(email)) {
        result.textContent = "L'email fornita non risulta valida";
        result.classList.remove("d-none");
        return;
    }
    const spinner = document.getElementById("spinnerNewUser");
    const btn = document.getElementById("btnSaveUser");
    spinner.classList.remove("d-none");
    btn.disabled = true;
    let params = { "name": name, "surname": surname, "email": email, "password": password, "role": parseInt(role) };
    if (_isStaff) params["location"] = parseInt(location);
    try {
        const response = await fetch("api/user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(params)
        });
        const data = await response.json();
        if (data.result) {
            await init();
            btn.disabled = false;
            spinner.classList.add("d-none");
            $("#modalAddUser").modal("hide");
        } else {
            result.innerText = "Si sono verificati degli errori durante il salvataggio";
            btn.disabled = false;
            spinner.classList.remove("d-none");
            result.classList.remove("d-none");
        }
    } catch (error) {
        console.error("Error adding user:", error);
        result.textContent = "Si è verificato un errore durante il salvataggio.";
        result.classList.remove("d-none");
    } finally {
        spinner.classList.add("d-none");
        btn.disabled = false;
    }
}

async function handleStaffLocation() {
    if (parseInt(document.getElementById('ddlNewUserRole').value) === 500) {
        const btn = document.getElementById("btnSaveUser");
        btn.disabled = true;
        _isStaff = true;
        await loadLocations();
        btn.disabled = false;
        document.getElementById('userLocationSection').classList.remove('d-none');
    } else document.getElementById('userLocationSection').classList.add('d-none');
}

async function disableUser() {
    const userId = document.getElementById("hUserId").value;
    confirm('the user with id = ' + userId + ', is going to disable');
}