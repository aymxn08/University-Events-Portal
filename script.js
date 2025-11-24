const featuredEventDate = new Date("March 15, 2026 10:00:00").getTime();
const robowarsDate = new Date("April 22, 2026 14:00:00").getTime();
const sharktankDate = new Date("May 10, 2026 09:00:00").getTime();


function updateCountdown(targetDate, elementId) {
    const now = new Date().getTime();
    const distance = targetDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const countdownElement = document.getElementById(elementId);
    
    if (countdownElement) {
        if (distance < 0) {
            clearInterval(countdownElement.interval); 
            countdownElement.innerHTML = "Event has started!";
            countdownElement.style.color = "var(--success-color)";
        } else {
            countdownElement.innerHTML = 
                `<span>${days}</span> Days ` + 
                `<span>${hours}</span> Hrs ` + 
                `<span>${minutes}</span> Mins ` + 
                `<span>${seconds}</span> Secs`;
        }
    }
}

function startCountdown(targetDate, elementId) {
    updateCountdown(targetDate, elementId);
    
    const intervalId = setInterval(() => {
        updateCountdown(targetDate, elementId);
    }, 1000);

    const countdownElement = document.getElementById(elementId);
    if (countdownElement) {
        countdownElement.interval = intervalId;
    }
}


function validateRegistrationForm(event) {
    const name = document.getElementById('name').value.trim();
    const roll = document.getElementById('roll-number').value.trim();
    const email = document.getElementById('email').value.trim();
    const selectedEvent = document.getElementById('select-event').value;
    
    let isValid = true;
    let errorMessage = 'Registration failed due to the following errors:\n\n';

    if (name.length < 3) {
        errorMessage += ' - Name must be at least 3 characters long.\n';
        isValid = false;
    }

    if (!/^[A-Za-z0-9]{5,10}$/.test(roll)) {
        errorMessage += ' - Roll Number must be 5-10 alphanumeric characters.\n';
        isValid = false;
    }

    if (!/@.+\./.test(email)) {
        errorMessage += ' - Please enter a valid email address.\n';
        isValid = false;
    }

    if (selectedEvent === "") {
        errorMessage += ' - Please select an event.\n';
        isValid = false;
    }

    if (!isValid) {
        event.preventDefault(); 
        alert(errorMessage);
    } else {
        alert('Registration Successful! Thank you for registering for the ' + selectedEvent.toUpperCase() + ' event.');
        
        event.preventDefault(); 
        
        document.getElementById('registration-form').reset();
    }
}


document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('featured-countdown')) {
        startCountdown(featuredEventDate, 'featured-countdown');
    }

    if (document.getElementById('countdown-codesprint')) {
        startCountdown(featuredEventDate, 'countdown-codesprint');
        startCountdown(robowarsDate, 'countdown-robowars');
        startCountdown(sharktankDate, 'countdown-sharktank');
    }
    
    if (document.getElementById('details-countdown')) {
        startCountdown(featuredEventDate, 'details-countdown');
    }
});