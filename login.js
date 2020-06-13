function validateForm() {
    var userName = document.forms["login-form"]["userName"].value;
    var password = document.forms["login-form"]["password"].value;
    if ((userName === "admin") && (password === "1234")) {
        console.log("success")

    } else { alert("You're not the admin of this page") }
}

const form = document.getElementById('login-form');

form.addEventListener('submit', validateForm);