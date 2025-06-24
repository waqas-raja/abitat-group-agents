document.addEventListener("DOMContentLoaded", () => {
    enterToClick("#txtNewPsw, #txtConfirmPsw", "btnRestorePsw");
});

function checkBtnEnables() {
    const newPsw = document.getElementById('txtNewPsw').value.trim();
    const confPsw = document.getElementById('txtConfirmPsw').value.trim();
    if (newPsw !== '' && confPsw !== '') document.getElementById('btnPswRecovery').classList.remove('btn-disabled');
    else document.getElementById('btnPswRecovery').classList.add('btn-disabled');
}

function togglePassword(isConfirm) {
    const txt = document.getElementById(isConfirm ? "txtConfirmPsw" : "txtNewPsw");
    const toggleId = isConfirm ? "toggleConfirmPassword" : "toggleNewPassword";
    const icon = document.querySelector(`#${toggleId} > i`);
    if (txt.type === 'password') {
        txt.type = 'text';
        icon.classList.remove('bi-eye');
        icon.classList.add('bi-eye-slash');
    } else {
        txt.type = 'password';
        icon.classList.remove('bi-eye-slash');
        icon.classList.add('bi-eye');
    }
}

async function pswRecovery() {
    const urlParams = new URLSearchParams(window.location.search);
    const usr_id = urlParams.get('usr');
    const ip = await get_user_ip();
    const pswNew = document.getElementById('txtNewPsw').value.trim();
    const pswConfirm = document.getElementById('txtConfirmPsw').value.trim();
    const msg = document.getElementById('spPswRecoveryResult');
    msg.textContent = '';
    if (!pswNew || !pswConfirm) {
        msg.textContent = it ? 'Entrambi i campi sono obbligatori.' : "Both fields are required";
        msg.classList.add('text-danger');
        return;
    }
    if (pswNew !== pswConfirm) {
        msg.textContent = it ? 'Le password non risultano uguali.' : 'Passwords do not match.';
        msg.classList.add('text-danger');
        return;
    }
    try {
        const response = await fetch('/api/psw-recovery-change', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                ip:ip,
                user:usr_id,
                psw:pswNew,
                confirm:pswConfirm,
            })
        });
        if (!response.ok) {
            const error = await response.json();
            msg.textContent = error.message || (it ? 'Credenziali non valide.' : "Invalid credentials");
            msg.classList.add('text-danger');
            return;
        }
        const data = await response.json();
        if(!data.result) {
            msg.textContent = it ? 'Si sono verificati degli errori durante il salvataggio.' : "An error occurred while saving";
            msg.classList.add('text-danger');
            return;
        }
        window.location.href = '/';
    } catch (error) {
        msg.textContent = it ? 'Si è verificato un errore. Riprova più tardi.' : "An error occurred. Please try again later";
        msg.classList.add('text-danger');
        console.error('Errore durante il login:', error);
    }
}