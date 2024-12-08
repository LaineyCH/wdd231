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

// get the date and time on form page load and send it to the html timestamp
document.addEventListener("DOMContentLoaded", () => {
    const timestampInput = document.getElementById("timestamp");
    const currentDateTime = new Date();
    // Format the timestamp as an ISO string (e.g., "2024-11-16T15:30:45.123Z")
    timestampInput.value = currentDateTime.toISOString();
});