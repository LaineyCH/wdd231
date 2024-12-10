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

//--------------------------------------------- CAMEL PUZZLE ------------------------------------------//

// add piece images to HTML
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('puzzle-container');
    for (let i = 1; i <= 28; i++) {
        const piece = document.createElement('div');
        piece.className = 'puzzle-piece';
        piece.style.backgroundImage = `url('images/piece${String(i).padStart(2, '0')}.webp')`;
        container.appendChild(piece);
    }
});

// bring exploded pieces together upon page load
document.addEventListener('DOMContentLoaded', () => {
    const pieces = document.querySelectorAll('.puzzle-piece');

    // Randomize initial directions for exploded pieces
    pieces.forEach((piece, index) => {
        const angle = (index / pieces.length) * Math.PI * 2; // Distribute pieces in a circular pattern
        piece.style.setProperty('--x', Math.cos(angle));
        piece.style.setProperty('--y', Math.sin(angle));
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const puzzle = document.getElementById('puzzle-container');
    const pieces = document.querySelectorAll('.puzzle-piece');

    // Function to trigger the explode animation
    function explode() {
        pieces.forEach(piece => {
            piece.classList.remove('reassemble'); // Reset any existing animations
            piece.classList.add('explode');
        });

        // Wait for the explode animation to complete, then start reassemble
        setTimeout(() => {
            pieces.forEach(piece => {
                piece.classList.remove('explode');
                piece.classList.add('reassemble');
            });
        }, 1000); // Match the duration of the explode animation
    }

    // Trigger on click
    puzzle.addEventListener('click', explode);

    // Trigger on hover
    puzzle.addEventListener('mouseover', explode);
});


