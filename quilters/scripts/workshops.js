// select project type buttons
const allButton = document.querySelector('#all-button');
const quiltButton = document.querySelector('#quilt-button');
const bagButton = document.querySelector('#bag-button');
const dressButton = document.querySelector('#dress-button');
const decorButton = document.querySelector('#decor-button');
// select page heading
const workshopsHeading = document.querySelector('#workshops-heading');
// select container for workshop cards
const workshopsContainer = document.getElementById("workshops-container");

let workshops = [];

async function getWorkshopsData() {
    try {
        console.log("loading workshops");
        const response = await fetch('./data/workshops.json');
        if (!response.ok) {
            throw new Error('Could not fetch photo data');
        }
        workshops = await response.json();

        generate_workshop_cards("all");
    } catch (error) {
        console.error("Encountered error during fetch:", error);
    }
}

getWorkshopsData();

let filteredWorkshops = [];

document.addEventListener('DOMContentLoaded', function () {
    generate_workshop_cards("all");
}, false);

function changeActive(activePhrase) {
    // change active class on nav buttons
    allButton.classList.remove('active');
    quiltButton.classList.remove('active');
    bagButton.classList.remove('active');
    dressButton.classList.remove('active');
    decorButton.classList.remove('active');

    switch (activePhrase) {
        case "all":
            allButton.classList.add('active');
            break;
        case "quilt":
            quiltButton.classList.add('active');
            break;
        case "bag":
            bagButton.classList.add('active');
            break;
        case "dress":
            dressButton.classList.add('active');
            break;
        case "decor":
            decorButton.classList.add('active');
            break;
        default:
    }
}

function generate_workshop_cards(filterPhrase) {
    switch (filterPhrase) {
        case "all":
            filteredWorkshops = workshops;
            workshopsHeading.textContent = "All Workshops";
            break;
        case "quilt":
            filteredWorkshops = workshops.filter((workshop) => workshop.type === "quilt");
            workshopsHeading.textContent = "Quilting Workshops";
            break;
        case "bag":
            filteredWorkshops = workshops.filter((workshop) => workshop.type === "bag");
            workshopsHeading.textContent = "Bag Workshops";
            break;
        case "dress":
            filteredWorkshops = workshops.filter((workshop) => workshop.type === "dress");
            workshopsHeading.textContent = "Dressmaking Workshops";
            break;
        case "decor":
            filteredWorkshops = workshops.filter((workshop) => workshop.type === "decor");
            workshopsHeading.textContent = "Decorative Workshops";
            break;
        default:
            filteredWorkshops = workshops;
            workshopsHeading.textContent = "All Workshops";
    }

    changeActive(filterPhrase);

    const htmlWorkshops = filteredWorkshops.map((workshop, index) => {
            return index < 2
                ? `<a class="workshop-link" href="${workshop.workshopUrl}" target="_blank">
                <div class="workshop-card">
                    <div class="workshop-info">
                        <h3>${workshop.name}</h3>
                        <p>${workshop.description}</p>
                        <p>Designer:<br>${workshop.designer}</p>
                    </div>
                    <img class="workshop-img" data-src="${workshop.imageSrc}" alt="${workshop.name}" width="${workshop.imgWidth}">
                    <p>Date: ${workshop.date}</p>
                    <p>Time: ${workshop.time}</p>
                    <p>Location: ${workshop.location}</p>
                    <button onclick="joinWorkshop(${index})">Join Workshop</button>                    
                </div>
            </a>`
                : `<a class="workshop-link" href="${workshop.workshopUrl}" target="_blank">
                <div class="workshop-card">
                    <div class="workshop-info">
                        <h3>${workshop.name}</h3>
                        <p>${workshop.description}</p>
                        <p>Designer:<br>${workshop.designer}</p>
                    </div>
                    <img class="workshop-img" data-src="${workshop.imageSrc}" alt="${workshop.name}" loading="lazy" width="${workshop.imgWidth}">
                    <p>Date: ${workshop.date}</p>
                    <p>Time: ${workshop.time}</p>
                    <p>Location: ${workshop.location}</p>
                    <button onclick="joinWorkshop(${index})">Join Workshop</button>
                </div>
            </a>`
        }
    );
    workshopsContainer.innerHTML = htmlWorkshops.join('');
    // remove the data-src attribute when the image has loaded
    [].forEach.call(document.querySelectorAll('img[data-src]'), function (img) {
        img.setAttribute('src', img.getAttribute('data-src'));
        img.onload = function () {
            img.removeAttribute('data-src');
        };
    });
}

// create event listeners for menu selections
allButton.addEventListener('click', () => {
    generate_workshop_cards("all");
});
quiltButton.addEventListener('click', () => {
    generate_workshop_cards("quilt");
});
bagButton.addEventListener('click', () => {
    generate_workshop_cards("bag");
});
dressButton.addEventListener('click', () => {
    generate_workshop_cards("dress");
});
decorButton.addEventListener('click', () => {
    generate_workshop_cards("decor");
});


function joinWorkshop(index) {
    // Save workshop details to localStorage
    const selectedWorkshop = workshops[index];
    console.log("Selected Workshop:", selectedWorkshop); // Debugging line
    localStorage.setItem("selectedWorkshop", JSON.stringify(selectedWorkshop));

    // Redirect to the form page
    window.location.href = "form.html";
}



// const workshops2 = [
//     {
//         name: "Zip It Up",
//         date: "2024-12-10",
//         time: "9:00 AM - 3:00 PM",
//         location: "Linda's Red Room"
//     },
//     {
//         name: "Japanese Box Pouch",
//         date: "2024-12-12",
//         time: "10:00 AM - 5:00 PM",
//         location: "The Club"
//     },
// ];

// workshops2.forEach((workshop, index) => {
//     const workshopDiv = document.createElement("div");
//     workshopDiv.innerHTML = `
//         <h2>${workshop.name}</h2>
//         <p>Date: ${workshop.date}</p>
//         <p>Time: ${workshop.time}</p>
//         <p>Location: ${workshop.location}</p>
//         <button onclick="joinWorkshop(${index})">Join Workshop</button>
//     `;
//     workshopsContainer.appendChild(workshopDiv);
// });

//---------------------------------------------------------------------------------------------