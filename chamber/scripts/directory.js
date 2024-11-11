const cards = document.querySelector('#cards');
const table = document.querySelector('#table-view');
let members = []

async function getMemberData() {
    try {
        const response = await fetch('./data/members.json');
        if (!response.ok) {
            throw new Error('Could not fetch member data');
        }
        members = await response.json();
        members.sort((a, b) => {
            if (a.companyname < b.companyname) {
                return -1;
            }
            if (a.companyname > b.companyname) {
                return 1;
            }
            return 0;
        });
        displayMemberCards()
    } catch (error) {
        console.error("Encountered error during fetch:", error);
    }
}

getMemberData();

function displayMemberCards() {
    cards.innerHTML = '';
    table.innerHTML = '';
    members.forEach((member) => {
        // create html elements
        const card = document.createElement('section');
        const companyName = document.createElement('h2');
        const ownerName = document.createElement('h3');
        const image = document.createElement('img');

        // set content / attributes
        companyName.textContent = `${member.companyname}`;
        ownerName.textContent = `${member.ownername}`;
        card.setAttribute('class', 'card');
        image.setAttribute('src', `./images/${member.img}`);
        image.setAttribute('alt', `${member.companyname} Business Logo`);
        image.setAttribute('loading', 'lazy');
        image.setAttribute('width', '500');
        image.setAttribute('height', '500');

        // add name and img to card
        card.appendChild(companyName);
        card.appendChild(ownerName);
        card.appendChild(image);

        // add card to cards element in html
        cards.appendChild(card);
    })
}

function displayMemberTable() {
    cards.innerHTML = '';
    table.innerHTML = '';
    members.forEach(member => {
        const tableRow = document.createElement('tr');
        const companyTd = document.createElement('td');
        const ownerTd  = document.createElement('td');
        const addressTd = document.createElement('td');
        const phoneTd = document.createElement('td');
        const urlTd = document.createElement('td');
        const url = document.createElement('a');
        companyTd.classList.add('bold');
        companyTd.textContent = member.companyname;
        ownerTd.textContent = member.ownername
        addressTd.textContent = `${member.address.number} ${member.address.street}, ${member.address.area}, ${member.address.city}`;
        phoneTd.textContent = member.phone;
        url.classList.add('url-table');
        url.href = `http://${member.url}`;
        url.textContent = member.url;
        url.target = '_blank';
        urlTd.appendChild(url);
        tableRow.appendChild(companyTd);
        tableRow.appendChild(ownerTd);
        tableRow.appendChild(addressTd);
        tableRow.appendChild(phoneTd);
        tableRow.appendChild(urlTd);
        table.appendChild(tableRow);
    });
}

// select display choice buttons
const gridButton = document.querySelector('#grid-button');
const tableButton = document.querySelector('#table-button');

// create event listeners for display choice
gridButton.addEventListener('click', () => {
    displayMemberCards();
});
tableButton.addEventListener('click', () => {
    displayMemberTable();
});
