/* Functions List

1. Getting current Date and populating respective div 
2. Getting current Month and populating respective div
3. Update Months: Previous Month and Next Month functionality.
4. 
*/

// Global variables to track state
// Global variables to track state
let currentDate = new Date();
let selectedDate = new Date();
let currentWeekStart = getWeekStart(currentDate);

// DOM Elements
const currentDateElement = document.getElementById('currentDate');
const currentMonthElement = document.getElementById('current-month');
const prevMonthElement = document.getElementById('prev-month');
const nextMonthElement = document.getElementById('next-month');
const prevWeekElement = document.getElementById('previous-week');
const nextWeekElement = document.getElementById('next-week');
const dayElements = Array.from({ length: 7 }, (_, i) => document.getElementById(`day${i + 1}`));

// Helper function to get Monday of current week
function getWeekStart(date) {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is Sunday
    return new Date(date.setDate(diff));
}

// Update the display of current date
function updateCurrentDateDisplay() {
    currentDateElement.textContent = selectedDate.toLocaleDateString('en-us', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });
}

// Update the display of current month
function updateCurrentMonthDisplay() {
    currentMonthElement.textContent = currentDate.toLocaleDateString('en-us', {
        month: 'long',
        year: 'numeric'
    });
}

// Update the week display
function updateWeekDisplay() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    dayElements.forEach((dayElement, index) => {
        const date = new Date(currentWeekStart);
        date.setDate(currentWeekStart.getDate() + index);
        dayElement.textContent = date.getDate();
        dayElement.value = date.getDate().toString().padStart(2, '0'); // Pad single digits with leading zero

        // Add data attribute to store full date information
        dayElement.setAttribute('data-full-date', date.toISOString());


        // Check if date is in the past
        if (date < today) {
            dayElement.disabled = true;
            dayElement.style.textDecoration = 'line-through';
            dayElement.style.opacity = '0.5';
        } else {
            dayElement.disabled = false;
            dayElement.style.textDecoration = 'none';
            dayElement.style.opacity = '1';
        }

        // Highlight selected date
        if (date.toDateString() === selectedDate.toDateString()) {
            dayElement.style.backgroundColor = '#fff';
            dayElement.classList.add('text-black');

        } else {
            dayElement.style.backgroundColor = '#121414';
            dayElement.classList.remove('text-black'); // Ensure previously selected day reverts
        }
    });
}

// Month navigation handlers
prevMonthElement.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    currentWeekStart = getWeekStart(currentDate);
    updateCurrentMonthDisplay();
    updateWeekDisplay();
});

nextMonthElement.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    currentWeekStart = getWeekStart(currentDate);
    updateCurrentMonthDisplay();
    updateWeekDisplay();
});

// Week navigation handlers
prevWeekElement.addEventListener('click', () => {
    currentWeekStart.setDate(currentWeekStart.getDate() - 7);
    currentDate = new Date(currentWeekStart);
    updateCurrentMonthDisplay();
    updateWeekDisplay();
});

nextWeekElement.addEventListener('click', () => {
    currentWeekStart.setDate(currentWeekStart.getDate() + 7);
    currentDate = new Date(currentWeekStart);
    updateCurrentMonthDisplay();
    updateWeekDisplay();
});

// Date selection handlers
dayElements.forEach((dayElement) => {
    dayElement.addEventListener('click', () => {
        if (!dayElement.disabled) {
            const selectedDay = new Date(dayElement.getAttribute('data-full-date'));
            selectedDate = selectedDay;
            currentDate = new Date(selectedDay);

            updateCurrentDateDisplay();
            updateWeekDisplay();
        }
    });
});

// Initial render
updateCurrentDateDisplay();
updateCurrentMonthDisplay();
updateWeekDisplay();






// -------------Timeslots-----------------

// 2. Populating the Timeslots dynamically.

const timeSlotsDiv = document.getElementById("timeSlots");
const headings = ["Morning", "Afternoon", "Evening"]
const morningTitle = headings[0]
const afternoonTitle = headings[1]
const eveningTitle = headings[2]

const morningSlots = [
    "4:00–4:30 am",
    "4:30–5:00 am",
    "5:00–5:30 am",
    "5:30–6:00 am",
    "6:00–6:30 am",
    "6:30–7:00 am",
    "7:00–7:30 am",
    "7:30–8:00 am",
    "8:00–8:30 am",
    "8:30–9:00 am",
    "9:00–9:30 am",
    "9:30–10:00 am",
    "10:00–10:30 am",
    "10:30–11:00 am",
    "11:00–11:30 am",
    "11:30–12:00 pm"

];

const afternoonSlots = [
    "12:00–12:30 pm",
    "12:30–1:00 pm",
    "1:00–1:30 pm",
    "1:30–2:00 pm",
    "2:00–2:30 pm",
    "2:30–3:00 pm",
    "3:00–3:30 pm",
    "3:30–4:00 pm",
    "4:00–4:30 pm",
    "4:30–5:00 pm",
    "5:00–5:30 pm",
    "5:30–6:00 pm"
];

const eveningSlots = [
    "6:00–6:30 pm",
    "6:30–7:00 pm",
    "7:00–7:30 pm",
    "7:30–8:00 pm",
    "8:00–8:30 pm",
    "8:30–9:00 pm",
    "9:00–9:30 pm",
    "9:30–10:00 pm",
    "10:00–10:30 pm",
    "10:30–11:00 pm",
    "11:00–11:30 pm",
    "11:30–12:00 am"
];
let selectedButton = null;
let selectedTime = selectedButton; // Track the currently selected button



function updateSelectedTime(time) {
    selectedTime = time;
    console.log("Selected Time:", selectedTime); // Optional: Debugging
}

function populateTimeSlots(headings, slots, divName) {
    const div = document.createElement("div");
    div.classList.add(divName, 'cursor-pointer');
    const p = document.createElement("p");
    div.appendChild(p);

    p.textContent = headings;

    slots.forEach(slot => {
        const button = document.createElement("div");


        let fulltime = slot;
        let shortest = slot.split("–")[0];
        let shorter = slot.split(" ")[1];

        let shorttime = null

        if(fulltime === '11:30–12:00 pm'){
            shorttime = '11:30 am';
        }else if(fulltime === '11:30–12:00 am'){
            shorttime = '11:30 pm'
        }else{
            shorttime = shortest + " " + shorter;
        }




        if (window.innerWidth < 321) { // Adjust the breakpoint as needed
            p.classList.add("text-center", "mb-3", "p-2", "w-20", "text-[14px]")
            button.textContent = shorttime;
            button.classList.add("border", "border-white-800", "border-1", "text-center", "text-[8px]", "mb-[10px]", "p-[5px]", "w-[100%]", "hover:bg-white", "hover:text-black");
        } else if (window.innerWidth < 396) {
            p.classList.add("text-center", "mb-3", "p-2", "w-20", "text-[14px]")
            button.textContent = shorttime;
            button.classList.add("border", "border-white-800", "border-1", "text-center", "text-[12px]", "mb-[10px]", "p-[5px]", "w-[100%]", "hover:bg-white", "hover:text-black");
        } else if (window.innerWidth < 496) {
            p.classList.add("text-center", "mb-3", "p-2", "w-20", "text-[14px]")
            button.textContent = shorttime;
            button.classList.add("border", "border-white-800", "border-1", "text-center", "text-[12px]", "mb-[10px]", "p-[5px]", "w-[100%]", "hover:bg-white", "hover:text-black");
        } else if (window.innerWidth < 620) {
            p.classList.add("text-center", "mb-3", "p-2", "w-20", "text-[14px]")
            button.textContent = shorttime;
            button.classList.add("border", "border-white-800", "border-1", "text-center", "text-[12px]", "mb-[10px]", "p-[5px]", "w-[100%]", "hover:bg-white", "hover:text-black");
        } else if (window.innerWidth < 767) {
            p.classList.add("text-center", "mb-3", "p-2", "w-20", "text-[16px]")
            button.textContent = shorttime;
            button.classList.add("border", "border-white-800", "border-1", "text-center", "text-[16px]", "mb-[10px]", "p-[5px]", "w-[100%]", "hover:bg-white", "hover:text-black");
        }
        else {
            p.classList.add("text-center", "mx-3", "p-2", "w-40")
            button.textContent = fulltime;
            button.classList.add("border", "border-white-800", "border-1", "text-center", "text-[16px]", "mb-[10px]", "p-[5px]", "w-[100%]", "hover:bg-white", "hover:text-black");

        }


        button.addEventListener("click", () => {
            // Reset styles for previously selected button
            if (selectedButton) {
                selectedButton.classList.remove('bg-white', 'text-black');
            }

            // Update the selected button
            selectedButton = button;

            // Apply styles to the new selection
            button.classList.add('bg-white', 'text-black');

            // Update the selected time
            updateSelectedTime(button.textContent);
        });
        div.appendChild(button);
    });
    timeSlotsDiv.appendChild(div);
}

populateTimeSlots(morningTitle, morningSlots, "morning");
populateTimeSlots(afternoonTitle, afternoonSlots, "afternoon");
populateTimeSlots(eveningTitle, eveningSlots, "evening");

function disableOtherButtons(selectedButton) {
    const allButtons = document.querySelectorAll("#timeSlots div");

    allButtons.forEach(button => {
        if (button !== selectedButton) {
            button.disabled = true;

        }
    });
}
