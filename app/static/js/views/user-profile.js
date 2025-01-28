document.addEventListener("DOMContentLoaded", init);

async function init() {

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
    showResult('resultPersonalData', 'Funzione non ancora attiva.', false);
    return;
    try {

        // const response = await fetch(
        //     "api/user",
        //     {
        //         method: "PATCH",
        //         body: { name: name, surname: surname, email: email }
        //     }
        // );
        // const data = await response.json();
        // if(data.payload.done) showResult('resultPersonalData', 'Dati personali salvati con successo', true);
        // else showResult('resultPersonalData', 'Si sono verificati degli errori durante il salvataggio', false);
        // spinner.classList.add('d-none');
        // btn.disabled = false;
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
    if (newPsw.length < 8) {
        showResult('resultChangePsw', 'La nuova password deve essere di almeno 8 caratteri.', false);
        return;
    }

    const spinner = document.getElementById('spinnerPassword');
    const btn = document.getElementById('btnUpdatePassword');
    spinner.classList.remove('d-none');
    btn.disabled = true;
    showResult('resultPersonalData', 'Funzione non ancora attiva.', false);
    return;

    try {
        const response = await fetch(
            "api/user/psw",
            {
                method: "PATCH",
                body: { old_psw: oldPsw, new_psw: newPsw }
            }
        );
        const data = await response.json();
        if (data.payload.done) showResult('resultPersonalData', 'Nuova password salvata con successo', true);
        else {
            if (data.payload.err_old) showResult('resultPersonalData', 'La vecchia password non risulta corretta', false);
            else showResult('resultPersonalData', 'Si sono verificati degli errori durante il salvataggio', false);
        }
        spinner.classList.add('d-none');
        btn.disabled = false;
    } catch (error) {
        spinner.classList.add('d-none');
        btn.disabled = false;
        showResult('resultPersonalData', 'Si sono verificati degli errori durante la chiamata.', false);
        console.error("Errore durante la chiamata:", error);
    }
}
