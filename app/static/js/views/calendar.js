document.addEventListener("DOMContentLoaded", async () => {
    const events = await loadEvents();
    setSchedulerHeight();
    loadCalendar(events);
});

window.addEventListener("resize", setSchedulerHeight);

async function loadEvents() {
    return [
        {
            text: "Riunione con il team",
            startDate: new Date(2024, 11, 20, 9, 0),
            endDate: new Date(2024, 11, 20, 10, 0)
        },
        {
            text: "Pranzo con cliente",
            startDate: new Date(2024, 11, 20, 13, 0),
            endDate: new Date(2024, 11, 20, 14, 0)
        }
    ];
}

function loadCalendar(events) {
    new DevExpress.ui.dxScheduler(document.getElementById("scheduler"), {
        dataSource: events,
        views: ["day", "week", "month"],
        currentView: "week",
        currentDate: new Date(), // Data iniziale
        startDayHour: 8, // Inizio della giornata lavorativa
        endDayHour: 18, // Fine della giornata lavorativa
        editing: {allowAdding: false, allowUpdating: true, allowDeleting: true},
        onAppointmentRendered: function (e) {
            if (e.appointmentData.text === "Meeting with Team") {
                e.appointmentElement.style.backgroundColor = "#f07f3c"; // Arancione
            } else {
                e.appointmentElement.style.backgroundColor = "#005ca9"; // Blu
            }
            e.appointmentElement.style.color = "#ffffff";
        }
    });
}

function setSchedulerHeight() {
    const schedulerElement = document.getElementById("scheduler");
    const headerHeight = 200;
    const viewportHeight = window.innerHeight;
    const schedulerHeight = viewportHeight - headerHeight;
    schedulerElement.style.height = `${schedulerHeight}px`;
}