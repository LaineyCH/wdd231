// JOIN FORM RESULTS

// thankyou.html?first-name=Elaine&last-name=Henson&org-title=Director&email=elaine%40henson.me.uk&phone=764-837-3456
// &org-name=Capital+quilters&membership=np&description=Guild+++&timestamp=2024-11-24T11%3A19%3A32.060Z

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

// Format the timestamp into a human-readable format
function formatTimestamp(timestamp) {
    try {
        const date = new Date(timestamp);
        return new Intl.DateTimeFormat('en-US', {
            dateStyle: 'long',
            timeStyle: 'short',
        }).format(date);
    } catch (error) {
        console.error('Invalid timestamp:', error);
        return 'Invalid date';
    }
}

const showInfo = document.querySelector('#results');
showInfo.innerHTML = `
<h2>Thank you for your application</h2>
<table>
<tr>
    <td>Application for:</td>
    <td>${show("first-name")} ${show("last-name")}</td>
</tr>
<tr>
    <td>Your mobile number:</td>
    <td>${show("phone")}</td>
</tr>
<tr>
    <td>Your email address:</td>
    <td><a href="mailto:${show("email")}?subject=Al%20Reem%20Chamber%20of%20Commerce,%20${show("membership")}%20Membership%20Application%20for%20${show("org-name")}">${show("email")}</a></td>
</tr>
<tr>
    <td>Your business / organisation's name:</td>
    <td>${show("org-name")}</td>
</tr>
<tr>
    <td>Membership level selected:</td>
    <td>${show("membership")}</td>
</tr>
<tr>
    <td>Date & Time:</td>
    <td>${formatTimestamp(show('timestamp'))}</td>
</tr>
</table>
`