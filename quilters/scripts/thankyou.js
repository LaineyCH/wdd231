const currentUrl = window.location.href;

const everything = currentUrl.split('?')

let formData = everything[1].split('&');


// show the correct value for the key=value pairing
function show(key) {
    let result = '';
    formData.forEach((item) => {
        if (item.startsWith(key)) {
            result = decodeURIComponent(item.split("=")[1])
                .replace(/\+\+/g, "")
                .replace(/\+/g, " ");
        }
    })

    return result;
}

// Format the timestamp into a human-readable date format
function formatTimestamp(timestamp) {
    try {
        const date = new Date(timestamp);
        return new Intl.DateTimeFormat('en-US', {
            dateStyle: 'long',
        }).format(date);
    } catch (error) {
        console.error('Invalid timestamp:', error);
        return 'Invalid date';
    }
}

const showInfo = document.querySelector('#results');
showInfo.innerHTML = `
    <h2>Thank you for registering for the ${show("workshop-name")} workshop!</h2>
    <table>
    <tr>
        <td>Registration for:</td>
        <td>${show("first-name")} ${show("last-name")}</td>
    </tr>
    <tr>
        <td>Your email address:</td>
        <td><a href="mailto:${show("user-email")}?subject=My%20Registration%20For%20the%20${show("workshop-name")}%20Workshop">${show("user-email")}</a></td>
    </tr>
    <tr>
        <td>Workshop name:</td>
        <td>${show("workshop-name")}</td>
    </tr>
    <tr>
        <td>Date & Time of workshop:</td>
        <td>${show("workshop-date")}, ${show("workshop-time")}</td>
    </tr>
    <tr>
        <td>Location of workshop:</td>
        <td>${show("workshop-location")}</td>
    </tr>
    <tr>
        <td>Date of registration:</td>
        <td>${formatTimestamp(show('timestamp'))}</td>
    </tr>
    </table>`


document.getElementById("print-button").addEventListener("click", function () {
    window.print();
});

