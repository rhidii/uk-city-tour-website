document.addEventListener("DOMContentLoaded", function () {
    const navDetails = document.querySelectorAll("nav details");
    const dropdownLinks = document.querySelectorAll("nav .dropdown a");

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

    dropdownLinks.forEach((link) => {
        link.addEventListener("click", function (event) {
            const href = link.getAttribute("href");

            if (href && href.startsWith("#")) {
                event.preventDefault();

                navDetails.forEach((detail) => {
                    detail.open = false;
                });

                const targetSection = document.querySelector(href);

                if (targetSection) {
                    setTimeout(() => {
                        targetSection.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });
                    }, 100);
                }
            } else {
                navDetails.forEach((detail) => {
                    detail.open = false;
                });
            }
        });
    });

    const registerForm = document.getElementById("registerForm");

    if (registerForm) {
        registerForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const fullName = document.getElementById("fullName");
            const email = document.getElementById("email");
            const phone = document.getElementById("phone");
            const city = document.getElementById("city");
            const eventType = document.getElementById("eventType");
            const terms = document.getElementById("terms");
            const successMessage = document.getElementById("successMessage");

            let isValid = true;

            document.querySelectorAll(".error-message").forEach((message) => {
                message.textContent = "";
            });

            successMessage.textContent = "";

            if (fullName && fullName.value.trim() === "") {
                showError(fullName, "Please enter your full name.");
                isValid = false;
            }

            if (email && email.value.trim() === "") {
                showError(email, "Please enter your email address.");
                isValid = false;
            } else if (email && !isValidEmail(email.value.trim())) {
                showError(email, "Please enter a valid email address.");
                isValid = false;
            }

            if (phone && phone.value.trim() === "") {
                showError(phone, "Please enter your phone number.");
                isValid = false;
            } else if (phone && !/^[0-9+\s]+$/.test(phone.value.trim())) {
                showError(phone, "Phone number should only contain numbers, spaces or +.");
                isValid = false;
            }

            if (city && city.value === "") {
                showError(city, "Please select a preferred city.");
                isValid = false;
            }

            if (eventType && eventType.value === "") {
                showError(eventType, "Please select what you are interested in.");
                isValid = false;
            }

            if (terms && !terms.checked) {
                const checkboxError = document.querySelector(".checkbox-error");
                if (checkboxError) {
                    checkboxError.textContent = "Please accept the terms and conditions.";
                }
                isValid = false;
            }

            if (isValid) {
                successMessage.textContent = "Registration submitted successfully.";
                registerForm.reset();
                document.activeElement.blur();
            }
        });
    }
});

function showError(input, message) {
    const formGroup = input.parentElement;
    const errorMessage = formGroup.querySelector(".error-message");
    if (errorMessage) {
        errorMessage.textContent = message;
    }
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}