// NAVIGATION

//select HTML elements and assign to constants
const hamButton = document.querySelector('#ham-button');
const navigation = document.querySelector('.nav-bar');
// select menu buttons
const homeButton = document.querySelector('a[href*="index"]');
const wsButton = document.querySelector('a[href*="workshops"]');
const resButton = document.querySelector('a[href*="resources"]');

//create event listener for the hamburger menu button
//toggle the open class on/off for the nav menu and button, when the button is clicked
hamButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    hamButton.classList.toggle('open');
});

document.addEventListener('DOMContentLoaded', function () {
    pageTitle = document.querySelector('title').innerText;
    changeActiveNav(pageTitle);
}, false);

function changeActiveNav(activePhrase) {
    // change active class on nav buttons
    homeButton.classList.remove('active');
    wsButton.classList.remove('active');
    resButton.classList.remove('active');

    switch (activePhrase) {
        case "Capital Quilters Home Page":
            homeButton.classList.add('active');
            break;
        case "Capital Quilters Workshops Page":
            dirButton.classList.add('active');
            break;
        case "Capital Quilters Resources Page":
            joinButton.classList.add('active');
            break;
        default:
    }
}

// FOOTER
//get the current year
document.getElementById("currentyear").innerHTML = new Date().getFullYear();
//get the date the document was last modified
document.getElementById("lastmodified").innerHTML = new Date(document.lastModified);