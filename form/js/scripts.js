// http://localhost:63342/wdd231/form/thanks.html?first=Elaine&last=Henson&phone=764-837-3456&email=elaine%40henson.me.uk&ordinance=Baptism&fecha=2024-11-06&location=Payson

const currentUrl = window.location.href;

const everything = currentUrl.split('?')

let formData = everything[1].split('&');

function show(keyword) {
    formData.forEach((item) => {
        if (item.startsWith(keyword)) {
            result = item.split("=")[1].replace("%40", "@");
        }
    })
    return result;
}

const showInfo = document.querySelector('#results');
showInfo.innerHTML = `
<p>Appointment for ${show("first")} ${show("last")}</p>
<p>Proxy ${show("ordinance")} on ${show("fecha")} in the ${show("location")} Temple</p>
<p>Your phone: ${show("phone")}</p>
<p>Your email: <a href="mailto:${show("email")}?subject=My%20${show("location")}%20Temple%20appointment%20on%20${show("fecha")}">${show("email")}</a></p>
`