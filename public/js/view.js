// Form Validation

function validateForm(event) {
    event.preventDefault();
    let isValid = true;

    const Name = document.getElementById("inputFirstName").value.trim();
    const firstNameMsg = document.getElementById("firstNameMsg");
    if (Name === "") {
        firstNameMsg.innerHTML = "Name cannot be empty.";
        isValid = false;
    } else {
        firstNameMsg.innerHTML = "";
    }

    const Email = document.getElementById("inputEmail").value.trim();
    const surNameMsg = document.getElementById("emailMsg");
    if (Email === "") {
        emailMsg.innerHTML = "Email must follow format xxxx@xxxx.com.";
        isValid = false;
    } else {
        emailMsg.innerHTML = "";
    }

    const mobile = document.getElementById("inputMobile").value.trim();
    const mobileMsg = document.getElementById("mobileMsg");
    if (mobile.length !== 10 || !/^\d{10}$/.test(mobile)) {
        mobileMsg.innerHTML = "Mobile number must be exactly 10 digits.";
        isValid = false;
    } else {
        mobileMsg.innerHTML = "";
    }

    const birthdate = document.getElementById("inputBirthdate").value;
    const birthDateMsg = document.getElementById("birthDateMsg");
    if (!birthdate) {
        birthDateMsg.innerHTML = "Birth date is required.";
        isValid = false;
    } else {
        birthDateMsg.innerHTML = "";
    }

    const city = document.getElementById("inputCity").value.trim();
    const cityMsg = document.getElementById("cityMsg");
    if (city === "") {
        cityMsg.innerHTML = "City cannot be empty.";
        isValid = false;
    } else {
        cityMsg.innerHTML = "";
    }

    const state = document.getElementById("inputState").value;
    const stateMsg = document.getElementById("stateMsg");
    if (state === "Choose...") {
        stateMsg.innerHTML = "Please select a state.";
        isValid = false;
    } else {
        stateMsg.innerHTML = "";
    }

    const postcode = document.getElementById("inputZip").value.trim();
    const postcodeMsg = document.getElementById("postcodeMsg");
    if (!/^\d{4}$/.test(postcode)) {
        postcodeMsg.innerHTML = "Postcode must be exactly 4 digits.";
        isValid = false;
    } else {
        postcodeMsg.innerHTML = "";
    }

    const message = document.getElementById("inputMessage").value.trim();
    const messageMsg = document.getElementById("messageMsg");
    if (message === "") {
        messageMsg.innerHTML = "Message cannot be empty.";
        isValid = false;
    } else {
        messageMsg.innerHTML = "";
    }

    if (isValid) {
        // Post Form Data to Console
        console.log("Form Data:");
        console.log("Name: " + Name);
        console.log("Email: " + Email);
        console.log("Number: " + mobile);
        console.log("Birthdate: " + birthdate);
        console.log("City: " + city);
        console.log("State: " + state);
        console.log("Postcode: " + postcode);
        console.log("Message: " + message);
    }
}

// Post Form Data to Object and Send to Server
document.getElementById('contactform').addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = {
        Name: document.getElementById("inputFirstName").value.trim(),
        Email: document.getElementById("inputEmail").value.trim(),
        Number: document.getElementById("inputMobile").value.trim(),
        Birthdate: document.getElementById("inputBirthdate").value,
        City: document.getElementById("inputCity").value.trim(),
        State: document.getElementById("inputState").value,
        Postcode: document.getElementById("inputZip").value.trim(),
        Message: document.getElementById("inputMessage").value.trim()
    };

    const response = await fetch('/submit-form', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    const result = await response.json();
    alert(result.message);
});