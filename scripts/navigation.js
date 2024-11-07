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