let data = {};
let _fileUploader = null;

document.addEventListener("DOMContentLoaded", async () => {
    await loadData();
    drowPage(data);
    initFileUpload();
});

async function loadData() {
    data = {
        generalColor: "#f07f3c",
        users: [
            { id: 1, name: "Utente 1", color: "#AECBFA" },
            { id: 2, name: "Utente 2", color: "#A9DFBF" },
            { id: 3, name: "Utente 3", color: "#F9E79F" },
            { id: 4, name: "Utente 4", color: "#F5CBA7" },
            { id: 5, name: "Utente 5", color: "#D2B4DE" }
        ]
    };
}

function drowPage() {
    document.getElementById("btnRestore").classList.add("d-none");
    document.getElementById("btnSaveColors").classList.add("d-none");
    document.getElementById("resultColors").innerText = "";
    const generalColorInput = document.getElementById('colorGeneral');
    if (generalColorInput) generalColorInput.value = data.generalColor;
    const listOfUsers = document.getElementById("listOfUsers");
    if (!listOfUsers) return;
    listOfUsers.innerHTML = "";
    data.users.forEach(user => {
        const userDiv = document.createElement("div");
        userDiv.className = "d-flex align-items-center mb-3";
        const colorInput = document.createElement("input");
        colorInput.type = "color";
        colorInput.id = `color-${user.id}`;
        colorInput.name = "color";
        colorInput.className = "me-2";
        colorInput.value = user.color;
        colorInput.onchange = () => {
            document.getElementById("btnRestore").classList.remove("d-none");
            document.getElementById("btnSaveColors").classList.remove("d-none");
        }
        const label = document.createElement("label");
        label.htmlFor = `color-${user.id}`;
        label.textContent = user.name;
        userDiv.appendChild(colorInput);
        userDiv.appendChild(label);
        listOfUsers.appendChild(userDiv);
    });
}

async function saveColors() {
    const btn = document.getElementById("btnSaveColors");
    const spinner = document.getElementById("spinnerColors");
    const result = document.getElementById("resultColors");
    const generalColor = document.getElementById("colorGeneral").value;
    const users = Array.from(document.querySelectorAll("#listOfUsers input[type='color']")).map(input => {
        return { id: parseInt(input.id.replace("color-", "")), color: input.value };
    });
    try {
        spinner.classList.remove("d-none");
        btn.disabled = true;
        result.textContent = "";
        const response = await fetch(
            "api/settings",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ generalColor: generalColor, users: users })
            }
        );
        const data = await response.json();
        result.textContent = "Nuovi colori salvati con successo!";
        result.className = "text-success";
        loadList(data.payload);
    } catch (error) {
        result.textContent = "Si sono verificati degli errori durante il salvataggio.";
        result.className = "text-danger";
        console.error("Errore durante il salvataggio:", error);
    } finally {
        spinner.classList.add("d-none");
        btn.disabled = false;
    }
}


function initFileUpload() {
    const result = document.getElementById('resultImport');
    let selectedFile = null;
    new DevExpress.ui.dxFileUploader(document.getElementById('file-uploader'), {
        multiple: false,
        accept: '.xlsx',
        uploadMode: 'useButtons',
        onValueChanged: function (e) {
            if (e.value.length > 0) {
                selectedFile = e.value[0];
                result.classList.remove('text-danger', 'text-success');
                result.textContent = `File selezionato: ${selectedFile.name}`;
            }
        },
    });
    const uploadButton = document.querySelector('.dx-fileuploader-upload-button');
    uploadButton.addEventListener('click', async () => {
        if (!selectedFile) {
            result.classList.add('text-danger');
            result.textContent = "Nessun file selezionato.";
            return;
        }
        const formData = new FormData();
        formData.append('file', selectedFile);
        try {
            const response = await fetch(
                "sys/import",
                {
                    method: "POST",
                    body: formData,
            });
            const data = await response.json();
            result.classList.remove('text-danger');
            result.classList.add('text-success');
            result.textContent = `File caricato con successo: ${data.fileName}. Ora è in corso la procedura di import.`;
            if (!response.ok) throw new Error("Errore durante l'upload del file.");
        } catch (error) {
            result.classList.remove('text-success');
            result.classList.add('text-danger');
            result.textContent = `Errore durante il caricamento: ${error.message}`;
        }
    });
}