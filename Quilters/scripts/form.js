document.addEventListener("DOMContentLoaded", () => {
    const selectedWorkshop = JSON.parse(localStorage.getItem("selectedWorkshop"));
    if (selectedWorkshop) {
        document.getElementById("workshop-name").value = selectedWorkshop.name;
        document.getElementById("workshop-date").value = selectedWorkshop.date;
        document.getElementById("workshop-time").value = selectedWorkshop.time;
        document.getElementById("workshop-location").value = selectedWorkshop.location;
    }
});
