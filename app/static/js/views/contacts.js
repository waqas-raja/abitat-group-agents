document.addEventListener("DOMContentLoaded", init);

async function init() {
    try {
        const response = await fetch("/api/contacts");
        const data = await response.json();
        if (data.payload === undefined) throw new Error("Data payload is undefined");
        loadList(data.payload);
    } catch (error) { console.error("Errore durante la chiamata:", error); }
}

function loadList(data) {
    const hasData = data && data.length > 0;
    new DevExpress.ui.dxDataGrid(document.getElementById("listOfContacts"), {
        dataSource: data,
        columnAutoWidth: true,
        showBorders: true,
        rowAlternationEnabled: false,
        grouping: { autoExpandAll: false },
        groupPanel: { visible: hasData, emptyPanelText: "Trascina qui le colonne per raggruppare" },
        filterRow: { visible: hasData, applyFilter: "auto" },
        headerFilter: { visible: hasData },
        export: { enabled: true, allowExportSelectedData: true, formats: ['xlsx'] },
        columns: [
            { dataField: "full_name", caption: "Cognome Nome", allowFiltering: true },
            { dataField: "last_date", caption: "Ultima Chiamata", allowFiltering: true, dataType: "date" },
            { dataField: "last_closed", caption: "Ultima Chiusura", allowFiltering: true },
            { dataField: "extraction", caption: "Estrazione", allowFiltering: true },
            { dataField: "derivation", caption: "Derivazione", allowFiltering: true },
            { dataField: "list_name", caption: "Nome Lista", allowFiltering: true },
            { dataField: "agent_name", caption: "Operatore", allowFiltering: true },
            { dataField: "phone1", caption: "Telefono", allowFiltering: true },
            { dataField: "email", caption: "Email", allowFiltering: true }
        ],
        paging: { pageSize: 10 },
        pager: { showPageSizeSelector: true, allowedPageSizes: [5, 10, 20], showInfo: true },
        toolbar: {
            items: [
                "groupPanel",
                "searchPanel",
                "exportButton",
                {
                    location: "after",
                    widget: "dxButton",
                    options: {
                        icon: "add",
                        text: "Aggiungi Contatto",
                        onClick: function () {
                            const modalElement = document.getElementById("modalAddContact");
                            const modal = new bootstrap.Modal(modalElement);
                            modal.show();
                        },
                        elementAttr: { class: "btn-orange" }
                    }
                }
            ]
        },
        onRowClick: function (e) {
            if (e.event.target.classList.contains("dx-datagrid-group-closed") ||
                e.event.target.classList.contains("dx-datagrid-group-opened")) {
                return; // Non eseguire l'azione per il click sulla freccia
            }
            if (e.rowType === "data") { window.location = `/contact/${e.data.id}`; }
        },
        onExporting: function (e) {
            if (e.format === 'xlsx') {
                const workbook = new ExcelJS.Workbook();
                const worksheet = workbook.addWorksheet("Leeds");
                DevExpress.excelExporter.exportDataGrid({
                    worksheet: worksheet,
                    component: e.component,
                }).then(function () {
                    workbook.xlsx.writeBuffer().then(function (buffer) {
                        saveAs(new Blob([buffer], { type: "application/octet-stream" }), "glprestiti-leeds.xlsx");
                    });
                });
            }
        }
    });
}

async function addContact() {
    const name = document.getElementById("txtNewContactName").value.trim();
    const surname = document.getElementById("txtNewContactSurname").value.trim();
    const email = document.getElementById("txtNewContactEmail").value.trim();
    const phone = document.getElementById("txtNewContactPhone").value.trim();
    const result = document.getElementById("spNewContactResult");
    result.textContent = "";
    result.classList.add("d-none");
    if (name === "" || surname === "") {
        result.textContent = "Nome e cognome sono obbligatori";
        result.classList.remove("d-none");
        return;
    }
    if (phone === "" && email === "") {
        result.textContent = "Inserire almeno un contatto";
        result.classList.remove("d-none");
        return;
    }
    if (email !== "" && !isValidEmail(email)) {
        result.textContent = "L'email fornita non risulta valida";
        result.classList.remove("d-none");
        return;
    }
    const spinner = document.getElementById("spinnerNewContact");
    const btn = document.getElementById("btnSaveContact");
    spinner.classList.remove("d-none");
    btn.disabled = true;
    try {
        const response = await fetch(
            "/api/contact",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: name, surname: surname, email: email, phone: phone })
            });
        const data = await response.json();
        if (data.result && data.id !== undefined) window.location = `/contact/${data.id}`;
        else {
            result.textContent = "Errore durante l'aggiunta del contatto";
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

function validatePhoneInput(txt) { txt.value = txt.value.replace(/[^0-9 ]/g, ''); }