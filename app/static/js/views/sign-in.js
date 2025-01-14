document.addEventListener("DOMContentLoaded", () => {
    enterToClick("#txtLoginEmail, #txtLoginPsw", "btnLogin");
    enterToClick("#txtRecoveryEmail", "btnRecovery");
});

function showForgotPassword() {
    document.getElementById('login-card').classList.add('d-none');
    document.getElementById('forgot-password-card').classList.remove('d-none');
    document.getElementById('txtRecoveryEmail').focus();
}

function showLogin() {
    document.getElementById('forgot-password-card').classList.add('d-none');
    document.getElementById('login-card').classList.remove('d-none');
    document.getElementById('txtLoginEmail').focus();
}

function togglePassword() {
    const txt = document.getElementById('txtLoginPsw');
    const icon = document.querySelector("#togglePassword > i");
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

async function signIn() {
    const email = document.getElementById('txtLoginEmail').value.trim();
    const psw = document.getElementById('txtLoginPsw').value.trim();
    const ip = await get_user_ip();
    const os = get_user_os();
    const mobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ? 1 : 0;
    const msg = document.getElementById('spLoginResult');
    msg.textContent = '';
    if (!email || !psw) {
        msg.textContent = 'Tutti i campi sono obbligatori.';
        msg.classList.add('text-danger');
        return;
    }
    if (!isValidEmail(email)) {
        msg.textContent = 'Inserisci un indirizzo email valido.';
        msg.classList.add('text-danger');
        return;
    }
    try {
        const response = await fetch('/api/sign-in', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "email": email,
                "psw": psw,
                "ip": ip,
                "mobile": mobile,
                "os": os
            })
        });
        if (!response.ok) {
            const error = await response.json();
            msg.textContent = error.message || 'Credenziali non valide.';
            msg.classList.add('text-danger');
            return;
        }
        const data = await response.json();
        localStorage.setItem("uname", data.name);
        localStorage.setItem("urole", data.role);
        window.location.href = '/dashboard';
    } catch (error) {
        msg.textContent = 'Si è verificato un errore. Riprova più tardi.';
        msg.classList.add('text-danger');
        console.error('Errore durante il login:', error);
    }
}

async function recoverPassword() {
    const email = document.getElementById('txtRecoveryEmail').value.trim();
    const msg = document.getElementById('spRecoveryResult');
    msg.textContent = '';
    if (!email) {
        msg.textContent = 'Il campo email è obbligatorio.';
        msg.classList.add('text-danger');
        return;
    }
    if (!isValidEmail(email)) {
        msg.textContent = 'Inserisci un indirizzo email valido.';
        msg.classList.add('text-danger');
        return;
    }
    try {
        const response = await fetch('/api/reset-psw', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ email: email }),
        });
        if (!response.ok) {
            const error = await response.json();
            msg.textContent = error.message || 'Recupero password fallito.';
            msg.classList.add('text-danger');
            return;
        }
        const data = await response.json();

        //TODO

        msg.textContent = 'Email di recupero inviata con successo! Controlla la tua casella di posta.';
        msg.classList.remove('text-danger');
        msg.classList.add('text-success');
    } catch (error) {
        msg.textContent = 'Si è verificato un errore. Riprova più tardi.';
        msg.classList.add('text-danger');
        console.error('Errore durante il recupero password:', error);
    }
}