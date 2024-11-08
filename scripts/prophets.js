const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';
const cards = document.querySelector('#cards');
const allButton = document.querySelector('#all-button');
const utahButton = document.querySelector('#utah-button');
const notUsButton = document.querySelector('#not-us-button');
const oldButton = document.querySelector('#old-button');
const kidsButton = document.querySelector('#kids-button');
const servedButton = document.querySelector('#served-button');
let allProphets = [];
let filteredProphets = [];

async function getProphetData() {
    const response = await fetch(url);
    const data = await response.json();
    // console.table(data.prophets)
    allProphets = data.prophets;
    displayProphets("all")
}

getProphetData();

const displayProphets = (filterPhrase) => {
    // Clear the current content of the cards
    cards.innerHTML = "";
    // filter the prophets
    switch (filterPhrase) {
        case "all" :
            filteredProphets = allProphets;
            break;
        case "utah":
            filteredProphets = allProphets.filter((prophet) => prophet.birthplace === "Utah");
            break;
        case "notus":
            filteredProphets = allProphets.filter((prophet) => prophet.birthplace === "England");
            break;
        case "old":
            filteredProphets = allProphets.filter((prophet) => getAge(prophet.birthdate, prophet.death) >= 95);
            break;
        case "kids":
            filteredProphets = allProphets.filter((prophet) => prophet.numofchildren >= 10);
            break;
        case "served":
            filteredProphets = allProphets.filter((prophet) => prophet.length >= 15);
            break;
        default:
            filteredProphets = allProphets;
    }

    changeActive(filterPhrase);

    filteredProphets.forEach((prophet) => {
        // create html elements
        const card = document.createElement('section');
        const fullName = document.createElement('h2');
        const portrait = document.createElement('img');

        // determin prophet order suffix "st", "nd", "rd" or "th"
        let suffix = "th"
        if (prophet.order === 1) {
            suffix = "st"
        }
        if (prophet.order === 2) {
            suffix = "nd"
        }
        if (prophet.order === 3) {
            suffix = "rd"
        }

        // add content and attributes
        fullName.textContent = `${prophet.name} ${prophet.lastname}`;
        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname} - ${prophet.order}${suffix} President of the Church`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');

        // add name and img to card
        card.appendChild(fullName);
        card.appendChild(portrait);

        // add card to cards element in html
        cards.appendChild(card);
    })
}

function changeActive(activePhrase) {
    // change active class on nav buttons
    utahButton.classList.remove('active');
    notUsButton.classList.remove('active');
    oldButton.classList.remove('active');
    kidsButton.classList.remove('active');
    servedButton.classList.remove('active');

    switch (activePhrase) {
        case "all":
            allButton.classList.add('active');
            break;
        case "utah":
            utahButton.classList.add('active');
            break;
        case "notus":
            notUsButton.classList.add('active');
            break;
        case "old":
            oldButton.classList.add('active');
            break;
        case "kids":
            kidsButton.classList.add('active');
            break;
        case "served":
            servedButton.classList.add('active');
            break;
        default:
    }
}

// create event listeners for menu selections
allButton.addEventListener('click', () => {
    displayProphets( "all");
});
utahButton.addEventListener('click', () => {
    displayProphets("utah");
});
notUsButton.addEventListener('click', () => {
    displayProphets("notus");
});
oldButton.addEventListener('click', () => {
    displayProphets("old");
});
kidsButton.addEventListener('click', () => {
    displayProphets("kids");
});
servedButton.addEventListener('click', () => {
    displayProphets("served");
});

function getAge(birthdate, deathdate) {
    // Parse the birthdate and death date strings into Date objects
    const birth = new Date(birthdate);
    const death = new Date(deathdate);
    // Calculate the difference in years
    let age = death.getFullYear() - birth.getFullYear();
    // Adjust if the birthdate has not yet occurred in the death year
    if (
        death.getMonth() < birth.getMonth() ||
        (death.getMonth() === birth.getMonth() && death.getDate() < birth.getDate())
    ) {
        age--;
    }
    return age;
}