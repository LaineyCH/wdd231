const cards = document.querySelector('#photo-cards');

let photos = []

async function getPhotoData() {
    try {
        const response = await fetch('./data/photos.json');
        if (!response.ok) {
            throw new Error('Could not fetch photo data');
        }
        photos = await response.json();

        displayPhotoCards()
    } catch (error) {
        console.error("Encountered error during fetch:", error);
    }
}

getPhotoData();

function displayPhotoCards() {
    cards.innerHTML = '';

    // randomly shuffle the list of photos
    const shuffledPhotos = photos.sort(() => 0.5 - Math.random());
    // select the first 6 photos
    //const selectedPhotos = shuffledPhotos.slice(0, 3);

    shuffledPhotos.forEach((photo, index) => {
        // create html elements
        const card = document.createElement('section');
        const figure = document.createElement('figure');
        const image = document.createElement('img');
        const caption = document.createElement('figcaption');

        // set content / attributes
        card.setAttribute('class', 'card');
        image.setAttribute('src', `images/${photo.imageurl}`);
        image.setAttribute('alt', `Photo of ${photo.name}`);
        // Only add lazy loading for images after the first one
        if (index !== 0) {
            image.setAttribute('loading', 'lazy');
        }
        image.setAttribute('width', '500');
        image.setAttribute('height', '500');
        caption.textContent = photo.caption;

        // add image and caption to figure
        figure.appendChild(image);
        figure.appendChild(caption);

        // add figure to card
        card.appendChild(figure);

        // add card to cards element in html
        cards.appendChild(card);
    })
}