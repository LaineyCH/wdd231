const workshops = [
    {
        name: "Zip It Up",
        date: "2024-12-10",
        time: "9:00 AM - 3:00 PM",
        location: "Linda's Red Room"
    },
    {
        name: "Japanese Box Pouch",
        date: "2024-12-12",
        time: "10:00 AM - 5:00 PM",
        location: "The Club"
    },
];

const workshopsContainer = document.getElementById("workshops-container");

workshops.forEach((workshop, index) => {
    const workshopDiv = document.createElement("div");
    workshopDiv.innerHTML = `
        <h2>${workshop.name}</h2>
        <p>Date: ${workshop.date}</p>
        <p>Time: ${workshop.time}</p>
        <p>Location: ${workshop.location}</p>
        <button onclick="joinWorkshop(${index})">Join Workshop</button>
    `;
    workshopsContainer.appendChild(workshopDiv);
});

function joinWorkshop(index) {
    // Save workshop details to localStorage
    localStorage.setItem("selectedWorkshop", JSON.stringify(workshops[index]));

    // Redirect to the form page
    window.location.href = "form.html";
}
