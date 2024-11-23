// get the date and time on form page load and send it to the html timestamp
document.addEventListener("DOMContentLoaded", () => {
    const timestampInput = document.getElementById("timestamp");
    const currentDateTime = new Date();
    // Format the timestamp as an ISO string (e.g., "2024-11-16T15:30:45.123Z")
    timestampInput.value = currentDateTime.toISOString();
});