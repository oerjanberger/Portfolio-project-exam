const successMessageContainer = document.querySelector("#success-message-container");
const submitBtn = document.querySelector("#submit-message-btn");
const form = document.querySelector("#contact-form");
const userName = document.querySelector("#name");
const nameError = document.querySelector("#nameError");
const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");
const subject = document.querySelector("#subject");
const subjectError = document.querySelector("#subjectError");
const message = document.querySelector("#message");
const messageError = document.querySelector("#messageError");


function checkMessageForm(event) {
    event.preventDefault();

    if (checkLength(userName.value, 5)) {
        nameError.style.display = "none";
    } else {
        nameError.style.display = "block";
    }

    if (checkEmail(email.value) && checkLength(email.value, 5)) {
        emailError.style.display = "none";
    } else {
        emailError.style.display = "block";
    }

    if (checkLength(subject.value, 15)) {
        subjectError.style.display = "none";
    } else {
        subjectError.style.display = "block";
    }

    if (checkLength(message.value, 25)) {
        messageError.style.display = "none";
    } else {
        messageError.style.display = "block";
    }

    if (checkLength(userName.value, 5) && checkEmail(email.value) && checkLength(email.value, 5) && checkLength(subject.value, 15) && checkLength(message.value, 25)) {
        successMessageContainer.innerHTML = `
            <h2 class="successMessage">Your message has been sent. We will get back to you as soon as possible.
            </h2>`;
        form.reset();
    }
}

function resetPage() {
    if (userName || email || subject || message) {
        successMessageContainer.innerHTML = "";
    }
}

form.addEventListener("submit", checkMessageForm);
form.addEventListener("keyup", resetPage);

function checkLength(value, len) {
    if (value.trim().length > len) {
        return true;
    } else {
        return false;
    }
}

function checkEmail(email) {
    const regEx = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/;
    const patternMatches = regEx.test(email);
    return patternMatches;
}