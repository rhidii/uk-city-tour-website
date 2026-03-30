// I used DOMContentLoaded so the JavaScript only runs after the whole HTML page has loaded properly
document.addEventListener("DOMContentLoaded", function () {

    // this selects all the dropdown menus in the nav
    const navDetails = document.querySelectorAll("nav details");

    // this selects all the actual links inside the dropdown menus
    const dropdownLinks = document.querySelectorAll("nav .dropdown a");

    // this part makes sure only one dropdown can stay open at a time
    navDetails.forEach((target) => {
        target.addEventListener("toggle", () => {
            if (target.open) {
                navDetails.forEach((other) => {
                    if (other !== target) {
                        other.open = false;
                    }
                });
            }
        });
    });

    // this is for when someone clicks a dropdown link
    dropdownLinks.forEach((link) => {
        link.addEventListener("click", function (event) {

            // I stored the href so I could check whether it's linking to a section on the same page
            const href = link.getAttribute("href");

            // if the link starts with #, that means it's an anchor link to a section on the same page
            if (href && href.startsWith("#")) {

                // I prevented the default jump because before it was making the page look weird in responsive mode
                event.preventDefault();

                // this closes all dropdowns first so the layout settles before scrolling
                navDetails.forEach((detail) => {
                    detail.open = false;
                });

                // this finds the section that matches the anchor link
                const targetSection = document.querySelector(href);

                // if the section exists, scroll to it smoothly after a tiny delay
                if (targetSection) {
                    setTimeout(() => {
                        targetSection.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });
                    }, 100);
                }

            } else {

                // if it's a normal page link, I still close all dropdowns so the menu doesn't stay open
                navDetails.forEach((detail) => {
                    detail.open = false;
                });
            }
        });
    });

    // this gets the registration form if the page has one
    const registerForm = document.getElementById("registerForm");

    // I added this check so the form code only runs on the register page and doesn't break other pages
    if (registerForm) {
        registerForm.addEventListener("submit", function (event) {

            // I prevented the form from submitting straight away because I wanted to validate the input first
            event.preventDefault();

            // these variables store each input field so I can check the values
            const fullName = document.getElementById("fullName");
            const email = document.getElementById("email");
            const phone = document.getElementById("phone");
            const city = document.getElementById("city");
            const eventType = document.getElementById("eventType");
            const terms = document.getElementById("terms");
            const successMessage = document.getElementById("successMessage");

            // I used this boolean to keep track of whether the whole form is valid or not
            let isValid = true;

            // this clears old error messages every time the user tries to submit again
            document.querySelectorAll(".error-message").forEach((message) => {
                message.textContent = "";
            });

            // this clears the old success message as well
            successMessage.textContent = "";

            // checks if the full name box is empty
            if (fullName && fullName.value.trim() === "") {
                showError(fullName, "Please enter your full name.");
                isValid = false;
            }

            // checks if the email box is empty
            if (email && email.value.trim() === "") {
                showError(email, "Please enter your email address.");
                isValid = false;

            // if it's not empty, it checks whether the email format is valid
            } else if (email && !isValidEmail(email.value.trim())) {
                showError(email, "Please enter a valid email address.");
                isValid = false;
            }

            // checks if the phone number is empty
            if (phone && phone.value.trim() === "") {
                showError(phone, "Please enter your phone number.");
                isValid = false;

            // this checks that the phone number only contains numbers, spaces or +
            } else if (phone && !/^[0-9+\s]+$/.test(phone.value.trim())) {
                showError(phone, "Phone number should only contain numbers, spaces or +.");
                isValid = false;
            }

            // checks that the user has selected a city
            if (city && city.value === "") {
                showError(city, "Please select a preferred city.");
                isValid = false;
            }

            // checks that the user has selected what they are interested in
            if (eventType && eventType.value === "") {
                showError(eventType, "Please select what you are interested in.");
                isValid = false;
            }

            // checks if the user agreed to the terms
            if (terms && !terms.checked) {
                const checkboxError = document.querySelector(".checkbox-error");
                if (checkboxError) {
                    checkboxError.textContent = "Please accept the terms and conditions.";
                }
                isValid = false;
            }

            // if everything is valid, show success message and clear the form
            if (isValid) {
                successMessage.textContent = "Registration submitted successfully.";
                registerForm.reset();

                // this removes focus from the last clicked input so it doesn't stay highlighted after reset
                document.activeElement.blur();
            }
        });
    }
});

// I made this function so I didn't have to repeat the same error displaying code for every field
function showError(input, message) {

    // this finds the parent form group of the input
    const formGroup = input.parentElement;

    // then it looks for the small error message element inside that group
    const errorMessage = formGroup.querySelector(".error-message");

    // if the error area exists, it displays the correct message
    if (errorMessage) {
        errorMessage.textContent = message;
    }
}

// this function checks whether the email follows a basic valid email format
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}