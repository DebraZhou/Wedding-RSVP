const SUBMITTED_KEY = 'rsvp_submitted';

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('rsvp-form');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');
    const submittedMessage = document.getElementById('submitted-message');
    const rsvpTitle = document.getElementById('rsvp-title');
    const rsvpSubtitle = document.getElementById('rsvp-subtitle');
    const editResponseContainer = document.getElementById('edit-response-container');
    const editResponseBtn = document.getElementById('edit-response-btn');
    const submitBtn = form.querySelector('.submit-btn');
    const iframe = document.querySelector('iframe[name="hidden_iframe"]');
    let pendingSubmit = false;

    const showSubmittedState = () => {
        form.classList.add('hidden');
        submittedMessage.classList.remove('hidden');
        editResponseContainer.classList.remove('hidden');
        if (rsvpTitle) {
            rsvpTitle.classList.add('hidden');
        }
        if (rsvpSubtitle) {
            rsvpSubtitle.classList.add('hidden');
        }
    };

    const showFormState = () => {
        submittedMessage.classList.add('hidden');
        form.classList.remove('hidden');
        if (rsvpTitle) {
            rsvpTitle.classList.remove('hidden');
        }
        if (rsvpSubtitle) {
            rsvpSubtitle.classList.remove('hidden');
        }
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>Submit RSVP</span>';
    };

    if (localStorage.getItem(SUBMITTED_KEY) === 'true') {
        showSubmittedState();
    }

    if (editResponseBtn) {
        editResponseBtn.addEventListener('click', () => {
            localStorage.removeItem(SUBMITTED_KEY);
            showFormState();
            form.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    }

    if (iframe) {
        iframe.addEventListener('load', () => {
            if (!pendingSubmit) {
                return;
            }
            pendingSubmit = false;
            localStorage.setItem(SUBMITTED_KEY, 'true');
            form.reset();
            showSubmittedState();
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<span>Submit RSVP</span>';
            submittedMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
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
        pendingSubmit = true;
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
