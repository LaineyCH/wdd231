// NAVIGATION

//select HTML elements and assign to constants
const hamButton = document.querySelector('#ham-button');
const navigation = document.querySelector('.nav-bar');
// select menu buttons
const homeButton = document.querySelector('a[href*="home"]');
const dirButton = document.querySelector('a[href*="directory"]');
const joinButton = document.querySelector('a[href*="join"]');
const discButton = document.querySelector('a[href*="discover"]');

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
    dirButton.classList.remove('active');
    joinButton.classList.remove('active');
    discButton.classList.remove('active');

    switch (activePhrase) {
        case "Al Reem Chamber of Commerce Home":
            homeButton.classList.add('active');
            break;
        case "Al Reem Chamber of Commerce Directory":
            dirButton.classList.add('active');
            break;
        case "Al Reem Chamber of Commerce Join":
            joinButton.classList.add('active');
            break;
        case "Al Reem Chamber of Commerce Discover":
            discButton.classList.add('active');
            break;
        default:
    }
}

// FOOTER
//get the current year
document.getElementById("currentyear").innerHTML = new Date().getFullYear();
//get the date the document was last modified
document.getElementById("lastmodified").innerHTML = new Date(document.lastModified);