document.addEventListener("DOMContentLoaded", init);

async function init() {
    try {
        const response = await fetch("/api/users");
        const data = await response.json();
        if(data.payload === undefined) throw new Error("Data payload is undefined");
        loadList(data.payload);
    } catch (error) { console.error("Errore durante la chiamata:", error); }
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
        onRowClick: function(e) {
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
    if (!name || !surname || !email || !password || !role) {
        result.textContent = "Tutti i campi sono obbligatori";
        result.classList.remove("d-none");
        return;
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
    try {
        const response = await fetch(
            "api/user",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: name, surname: surname, email: email, password: password, role: role })
        });
        const data = await response.json();
        init();
        const modal = new bootstrap.Modal(document.getElementById("modalAddUser"));
        modal.hide();
    } catch (error) {
        console.error("Error adding user:", error);
        result.textContent = "Si è verificato un errore durante il salvataggio.";
        result.classList.remove("d-none");
    } finally {
        spinner.classList.add("d-none");
        btn.disabled = false;
    }
}

async function disableUser() {
    const userId = document.getElementById("hUserId").value;
    confirm('the user with id = '+ userId + ', is going to disable');
}