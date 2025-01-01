/* 
    Functions here:
    1. Populating the dropdown using list in timezone.js
    2. Getting the currentSelectedTimezone from the dropdown.
    3. Getting the date, time and heading selection.
    4. An event listener to update selected time
*/ 



// Populate the dropdown
const timezoneSelect = document.getElementById('timezone');

timezones.forEach((timezone) => {
    const option = document.createElement('option');
    option.value = timezone.value;
    option.textContent = timezone.label;
    timezoneSelect.appendChild(option);

});


// Function to get the currently selected value
function getCurrentSelectedTimezone() {
    let timezonefield = document.getElementById('timezonefield');
    timezonefield = timezoneSelect.value;
    console.log(timezonefield)  
    return timezoneSelect.value;
}

// Example usage:
const currentSelection = getCurrentSelectedTimezone();

// Add an event listener to update the value when the selection changes
timezoneSelect.addEventListener('change', () => {
    const selectedTimezone = timezoneSelect.value;
    getCurrentSelectedTimezone();
});


 

        


document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent the form from refreshing the page

         
        //1. Capture Form data.
        const fullname = document.getElementById('fullname')
        const email = form.querySelector('input[type="email"]').value;
        const phoneInput = document.getElementById('phoneInput');
        const form_message = document.getElementById('message');
        const message = form_message.value
        const date = selectedDate.toLocaleDateString(('en-us'), { year: "numeric" , month:"2-digit", day: '2-digit',});

        const  name = fullname.value;
        const phone = phoneInput.value;

        const time = selectedTime;
        console.log("seleected time: "+time)
        
        
        const services = Array.from(form.querySelectorAll('input[type="checkbox"]:checked'))
            .map((checkbox) => checkbox.value);
        const currentSelection = getCurrentSelectedTimezone();
        const timezone = currentSelection;
        
        //2. Create a JSON object
        const formData = {
            name: name,
            email: email,
            phone: phone,
            timezone:timezone,
            date :date,
            time:time,
            services:services,
            description: message,
        };

        console.log('Form Data:', formData); // For debugging

        try {
            //3. Send data to the backend
            const response = await fetch('/submit-form', { // Update '/submit-form' with your backend endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Form submitted successfully!');
            } else {
                alert('Failed to submit the form. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while submitting the form.');
        }
    });
});

