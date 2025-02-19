// In scripts.js
/**
 * Calculates the estimated investment returns based on user input.
 */
function calculateReturns() {
    const amountInput = document.getElementById('investment_amount');
    const rateInput = document.getElementById('interest_rate');
    const yearsInput = document.getElementById('years');
    const returnsOutput = document.getElementById('calculated_returns');

    // Get values and parse them as numbers
    let amount = parseFloat(amountInput.value);
    let rate = parseFloat(rateInput.value) / 100;
    let years = parseInt(yearsInput.value);

    // Input validation
    let isValid = true; // Flag to track overall validation status

    if (isNaN(amount) || amount <= 0) {
        returnsOutput.innerText = "Please enter a valid positive investment amount.";
        amountInput.classList.add('error'); // Highlight the input field
        isValid = false;
    } else {
        amountInput.classList.remove('error'); // Remove highlight if valid
    }

    if (isNaN(rate) || rate < 0) {
        returnsOutput.innerText = "Please enter a valid positive interest rate.";
        rateInput.classList.add('error');
        isValid = false;
    } else {
        rateInput.classList.remove('error');
    }

    if (isNaN(years) || years <= 0) {
        returnsOutput.innerText = "Please enter a valid number of years.";
        yearsInput.classList.add('error');
        isValid = false;
    } else {
        yearsInput.classList.remove('error');
    }

    if (!isValid) {
        return; // Stop calculation if any input is invalid
    }

    // Calculation
    const returns = amount * Math.pow((1 + rate), years);

    // Display the result
    returnsOutput.innerText = `After ${years} years, your investment of $${amount.toFixed(2)} will be worth approximately $${returns.toFixed(2)}.`;
}

/**
 * Displays name suggestions based on user input in the contact form.
 *
 * @param {string} inputValue - The current value of the name input field.
 */
function showSuggestions(inputValue) {
    const suggestionsDiv = document.getElementById("suggestions");
    suggestionsDiv.innerHTML = ""; // Clear previous suggestions

    // Example Data (replace with API or database call)
    const names = ["John Doe", "Jane Smith", "Peter Jones", "Alice Brown"];
    const filteredNames = names.filter(name => name.toLowerCase().startsWith(inputValue.toLowerCase()));

    if (inputValue && filteredNames.length > 0) {
        filteredNames.forEach(name => {
            const suggestion = document.createElement("p");
            suggestion.textContent = name;
            suggestion.addEventListener("click", () => {
                document.getElementById("name").value = name;
                suggestionsDiv.innerHTML = ""; // Clear suggestions after selection
            });
            suggestionsDiv.appendChild(suggestion);
        });
    }
}

/**
 * Handles the submission of the contact form using AJAX.
 */
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form').querySelector('form'); // Added .querySelector('form')
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            const formData = new FormData(contactForm);

            fetch('process_contact.php', {  // Replace with your actual PHP script
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => {
                // Handle success (e.g., display a success message)
                document.getElementById('contact-success-message').style.display = 'block';
                contactForm.reset(); // Clear the form
            })
            .catch(error => {
                // Handle error (e.g., display an error message)
                console.error('There was a problem with the fetch operation:', error);
                alert('There was an error submitting the form. Please try again.'); // Simple alert for now
            });
        });
    }
});
