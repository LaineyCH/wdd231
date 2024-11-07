//select HTML elements and assign to constants
const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('nav');
// select menu buttons
const homeButton = document.querySelector('#home-button');
const chamButton = document.querySelector('#cham-button');
const gitButton = document.querySelector('#git-button');
const linkButton = document.querySelector('#link-button');

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
    chamButton.classList.remove('active');
    gitButton.classList.remove('active');
    linkButton.classList.remove('active');

    switch (activePhrase) {
        case "WDD231 Home Page":
            homeButton.classList.add('active');
            break;
        case "Chamber of Commerce":
            chamButton.classList.add('active');
            break;
        case "git":
            gitButton.classList.add('active');
            break;
        case "link":
            linkButton.classList.add('active');
            break;
        default:
    }
}