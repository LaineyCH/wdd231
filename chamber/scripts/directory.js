const cards = document.querySelector('#cards');

async function getMemberData() {
    try {
        const response = await fetch('./data/members.json');
        if (!response.ok) {
            throw new Error('Could not fetch member data');
        }
        const data = await response.json();
        displayMemberCards(data)
    } catch (error) {
        console.error("Encountered error during fetch:", error);
    }
}

getMemberData();

function displayMemberCards(members) {
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
