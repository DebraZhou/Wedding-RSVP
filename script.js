const SUBMITTED_KEY = 'rsvp_submitted';

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('rsvp-form');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');
    const submittedMessage = document.getElementById('submitted-message');
    const submitBtn = form.querySelector('.submit-btn');

    const showSubmittedState = () => {
        form.classList.add('hidden');
        submittedMessage.classList.remove('hidden');
    };

    if (localStorage.getItem(SUBMITTED_KEY) === 'true') {
        showSubmittedState();
    }

    // Handle form submission
    form.addEventListener('submit', function() {
        // Hide previous messages
        successMessage.classList.add('hidden');
        errorMessage.classList.add('hidden');

        // Disable submit button
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Submitting...</span>';

        // Let the browser submit to the hidden iframe, then show thank you
        localStorage.setItem(SUBMITTED_KEY, 'true');
        setTimeout(() => {
            form.reset();
            showSubmittedState();
            submittedMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 0);
    });

    // Smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
