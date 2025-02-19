// Function to calculate investment returns
function calculateReturns() {
    const amountInput = document.getElementById('investment_amount');
    const rateInput = document.getElementById('interest_rate');
    const yearsInput = document.getElementById('years');
    const returnsOutput = document.getElementById('calculated_returns');

    const amount = parseFloat(amountInput.value);
    const rate = parseFloat(rateInput.value) / 100;
    const years = parseInt(yearsInput.value);

    // Input validation
    if (isNaN(amount) || amount <= 0) {
        returnsOutput.innerText = "Please enter a valid positive investment amount.";
        return;
    }
    if (isNaN(rate) || rate < 0) {
        returnsOutput.innerText = "Please enter a valid positive interest rate.";
        return;
    }
    if (isNaN(years) || years <= 0) {
        returnsOutput.innerText = "Please enter a valid number of years.";
        return;
    }

    // Calculate returns
    const returns = amount * Math.pow((1 + rate), years);
    returnsOutput.innerText = `After ${years} years, your investment of $${amount.toFixed(2)} will be worth approximately $${returns.toFixed(2)}.`;
}

// Function to show suggestions based on user input
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

// Optional: AJAX for Contact Form Submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form').querySelector('form'); // Added .querySelector('form')
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission
            const formData = new FormData(contactForm);
            fetch('process_contact.php', { // Replace with your actual PHP script
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
