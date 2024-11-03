document.addEventListener("DOMContentLoaded", () => {
    const forms = document.querySelectorAll("form");

    forms.forEach(form => {
        form.addEventListener("submit", event => {
            event.preventDefault();
            const isValid = validateForm(form);
            if (isValid) {
                alert("Form submitted successfully!");
                form.reset();
                clearErrors(form);
            }
        });
    });
});

function validateForm(form) {
    let isValid = true;
    clearErrors(form);

    form.querySelectorAll("input, select").forEach(input => {
        const { name, value, type } = input;

        // Check for empty required fields
        if (input.hasAttribute("required") && value.trim() === "") {
            showError(input, `${name} is required.`);
            isValid = false;
            return;
        }

        // Validate email format
        if (type === "email" && !validateEmail(value)) {
            showError(input, "Invalid email format.");
            isValid = false;
        }

        // Validate phone number format (e.g., 123-456-7890)
        if (name === "PhoneNum" && !validatePhone(value)) {
            showError(input, "Invalid phone number format. Use 123-456-7890.");
            isValid = false;
        }

        // Custom validation for date relationships in checkout form
        if (form.id === "checkoutForm") {
            const checkoutDate = form.querySelector("#checkoutDate").value;
            const dueDate = form.querySelector("#dueDate").value;

            if (checkoutDate && dueDate && new Date(dueDate) < new Date(checkoutDate)) {
                showError(form.querySelector("#dueDate"), "Due date must be after checkout date.");
                isValid = false;
            }
        }
    });

    return isValid;
}

function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
}

function validatePhone(phone) {
    const phonePattern = /^\d{3}-\d{3}-\d{4}$/;
    return phonePattern.test(phone);
}

function showError(input, message) {
    const error = document.createElement("span");
    error.className = "error-message";
    error.textContent = message;
    input.classList.add("error");
    input.parentNode.insertBefore(error, input.nextSibling);
}

function clearErrors(form) {
    form.querySelectorAll(".error-message").forEach(error => error.remove());
    form.querySelectorAll(".error").forEach(input => input.classList.remove("error"));
}
