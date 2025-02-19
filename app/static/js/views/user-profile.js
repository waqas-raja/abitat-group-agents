document.addEventListener("DOMContentLoaded", loadData);

async function loadData() {
    const response = await fetch("/api/user/");
    const data = await response.json();
    document.getElementById("txtName").value = data.payload.name;
    document.getElementById("txtSurname").value = data.payload.surname;
    document.getElementById("txtEmail").value = data.payload.email;
}

function togglePassword(e) {
    e.classList.toggle("bi-eye");
    e.classList.toggle("bi-eye-slash");
    const type = e.previousElementSibling.type === "password" ? "text" : "password";
    e.previousElementSibling.type = type;
}


function showResult(spanId, message, isSuccess) {
    const resultSpan = document.getElementById(spanId);
    resultSpan.textContent = message;
    resultSpan.className = isSuccess ? 'text-success' : 'text-danger';
}

async function updatePersonalData() {
    const name = document.getElementById('txtName').value.trim();
    const surname = document.getElementById('txtSurname').value.trim();
    const email = document.getElementById('txtEmail').value.trim();
    if (!name || !surname || !email) {
        showResult('resultPersonalData', 'Si prega di compilare tutti i campi.', false);
        return;
    }
    if (!isValidEmail(email)) {
        showResult('resultPersonalData', 'L\'indirizzo email inserito non risulta valido.', false);
        return;
    }
    const btn = document.getElementById('btnUpdatePersonalData');
    const spinner = document.getElementById('spinnerPersonalData');
    spinner.classList.remove('d-none');
    btn.disabled = true;
    try {
        const response = await fetch(
            "/api/user/",
            {
                method: "PATCH",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ name: name, surname: surname, email: email })
            }
        );
        const data = await response.json();
        if(data.result) showResult('resultPersonalData', 'Dati personali salvati con successo', true);
        else showResult('resultPersonalData', 'Si sono verificati degli errori durante il salvataggio', false);
        spinner.classList.add('d-none');
        btn.disabled = false;
    } catch (error) {
        spinner.classList.add('d-none');
        btn.disabled = false;
        showResult('resultPersonalData', 'Si sono verificati degli errori durante la chiamata.', false);
        console.error("Errore durante la chiamata:", error);
    }
}

async function updatePassword() {
    const oldPsw = document.getElementById('txtOldPassword').value.trim();
    const newPsw = document.getElementById('txtNewPassword').value.trim();
    const confirmPsw = document.getElementById('txtConfirmPassword').value.trim();
    if (!oldPsw || !newPsw || !confirmPsw) {
        showResult('resultChangePsw', 'Si prega di compilare tutti i campi.', false);
        return;
    }
    if (newPsw !== confirmPsw) {
        showResult('resultChangePsw', 'La nuova password e la conferma password non coincidono.', false);
        return;
    }
    if (oldPsw === newPsw) {
        showResult('resultChangePsw', 'La nuova password e la vecchia coincidono.', false);
        return;
    }
    if (newPsw.length < 8) {
        showResult('resultChangePsw', 'La nuova password deve essere di almeno 8 caratteri.', false);
        return;
    }

    const spinner = document.getElementById('spinnerPassword');
    const btn = document.getElementById('btnUpdatePassword');
    spinner.classList.remove('d-none');
    btn.disabled = true;

    try {
        const response = await fetch(
            "/api/user/psw",
            {
                method: "PATCH",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ old_psw: oldPsw, new_psw: newPsw })
            }
        );
        const data = await response.json();
        if(data.result) {
            showResult('resultChangePsw', 'Nuova password salvata con successo', true);
            const txtOld = document.getElementById("txtOldPassword");
            const txtNew = document.getElementById("txtNewPassword");
            const txtCon = document.getElementById("txtConfirmPassword");
            txtOld.value = "";
            txtNew.value = "";
            txtCon.value = "";
            txtOld.type = "password";
            txtNew.type = "password";
            txtCon.type = "password";
            if (txtOld.nextElementSibling.classList.contains('bi-eye')) {
                txtOld.nextElementSibling.classList.remove('bi-eye');
                txtOld.nextElementSibling.classList.add('bi-eye-slash');
            }
            if (txtNew.nextElementSibling.classList.contains('bi-eye')) {
                txtNew.nextElementSibling.classList.remove('bi-eye');
                txtNew.nextElementSibling.classList.add('bi-eye-slash');
            }
            if (txtCon.nextElementSibling.classList.contains('bi-eye')) {
                txtCon.nextElementSibling.classList.remove('bi-eye');
                txtCon.nextElementSibling.classList.add('bi-eye-slash');
            }
        } else {
            if(data.error) showResult('resultChangePsw', 'La vecchia password non risulta corretta', false);
            else showResult('resultChangePsw', 'Si sono verificati degli errori durante il salvataggio', false);
        }
        spinner.classList.add('d-none');
        btn.disabled = false;
    } catch (error) {
        spinner.classList.add('d-none');
        btn.disabled = false;
        showResult('resultChangePsw', 'Si sono verificati degli errori durante la chiamata.', false);
        console.error("Errore durante la chiamata:", error);
    }
}
