const inchInput = document.querySelector('#inch');
const toCmButton = document.querySelector('#convert-to-cm');
const cmInput = document.querySelector('#cm');
const toInchButton = document.querySelector('#convert-to-inch');

toCmButton.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent the form from submitting
    let inches = inchInput.value;
    if (inches !== null) {
        let centimeters = inches * 2.54;
        cmInput.value = centimeters.toFixed(2);
    }
});

toInchButton.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent the form from submitting
    let centimeters = cmInput.value;
    if (centimeters !== null) {
        let inches = centimeters / 2.54;
        inchInput.value = inches.toFixed(2);
    }
});
