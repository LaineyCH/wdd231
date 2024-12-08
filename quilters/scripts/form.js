document.addEventListener("DOMContentLoaded", () => {
    const selectedWorkshop = JSON.parse(localStorage.getItem("selectedWorkshop"));
    console.log("Loaded Workshop from LocalStorage:", selectedWorkshop); // Debugging line

    if (selectedWorkshop) {
        document.getElementById("workshop-name").value = selectedWorkshop.name;
        document.getElementById("workshop-date").value = selectedWorkshop.date;
        document.getElementById("workshop-time").value = selectedWorkshop.time;
        document.getElementById("workshop-location").value = selectedWorkshop.location;
    } else {
        console.error("No workshop data found in localStorage.");
    }
});
