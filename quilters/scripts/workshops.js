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
            throw new Error('Could not fetch workshops data');
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
    allButton.classList.remove('active-filter');
    quiltButton.classList.remove('active-filter');
    bagButton.classList.remove('active-filter');
    dressButton.classList.remove('active-filter');
    decorButton.classList.remove('active-filter');

    switch (activePhrase) {
        case "all":
            allButton.classList.add('active-filter');
            break;
        case "quilt":
            quiltButton.classList.add('active-filter');
            break;
        case "bag":
            bagButton.classList.add('active-filter');
            break;
        case "dress":
            dressButton.classList.add('active-filter');
            break;
        case "decor":
            decorButton.classList.add('active-filter');
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
            return index < 5
                ? `<section class="workshop-card">
                    <h3>${workshop.name}</h3>
                    <p>${workshop.description}</p>
                    <p><strong>Date:</strong> ${workshop.date}</p>
                    <p><strong>Time:</strong> ${workshop.time}</p>
                    <p><strong>Location:</strong> ${workshop.location}</p>
                    <button onclick="joinWorkshop(${index})">Join Workshop</button>  
                    <div id="ws-img-box">
                        <img class="workshop-img" data-src="${workshop.imageSrc}" alt="${workshop.name}" width="${workshop.imgWidth}">
                    
                        <a class="workshop-link" href="${workshop.workshopUrl}" target="_blank">
                            <p>Pattern: ${workshop.designer}</p></a>        
                    </div>    
                </section>`
                : `<section class="workshop-card">
                    <h3>${workshop.name}</h3>
                    <p>${workshop.description}</p>
                    <p><strong>Date:</strong> ${workshop.date}</p>
                    <p><strong>Time:</strong> ${workshop.time}</p>
                    <p><strong>Location:</strong> ${workshop.location}</p>
                    <button onclick="joinWorkshop(${index})">Join Workshop</button>
                    <div id="ws-img-box">
                        <img class="workshop-img" data-src="${workshop.imageSrc}" alt="${workshop.name}" loading="lazy" width="${workshop.imgWidth}">
                        <a class="workshop-link" href="${workshop.workshopUrl}" target="_blank">
                            <p>Pattern: ${workshop.designer}</p></a>
                    </div>
                </section>`
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
    window.location.href = "workshop-form.html";
}
