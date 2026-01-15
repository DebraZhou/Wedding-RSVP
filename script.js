// Google Form Configuration
// Replace this URL with your actual Google Form formResponse URL
// For your form: open the form, click "Send", and copy the long link
// Then replace viewform with formResponse.
const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdv8Svkpzr2O2YP85Y1075BANA_Y97PV3JJUM5PRGaf2Jjf4g/viewform?usp=header';

// Map form field names to Google Form entry IDs
// You'll need to replace these with your actual Google Form entry IDs
// To find entry IDs: Submit a test response, then view the form's source code or use browser dev tools
const FORM_ENTRY_IDS = {
    attendance: 'entry.123456789',       // Can you attend?
    attendeeNames: 'entry.987654321',    // What are the names of people attending?
    attendeeCount: 'entry.456789123',    // How many are attending?
    email: 'entry.789123456'             // Email Address
};

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('rsvp-form');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');
    const submitBtn = form.querySelector('.submit-btn');

    // Handle form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Hide previous messages
        successMessage.classList.add('hidden');
        errorMessage.classList.add('hidden');
        
        // Disable submit button
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Submitting...</span>';

        // Get form data
        const formData = new FormData(form);
        const attendance = formData.get('attendance');
        const attendeeNames = formData.get('attendee_names');
        const attendeeCount = formData.get('attendee_count');
        const email = formData.get('email');

        // Prepare data for Google Form
        const googleFormData = new URLSearchParams();
        googleFormData.append(FORM_ENTRY_IDS.attendance, attendance === 'yes' ? 'Yes' : 'No');
        googleFormData.append(FORM_ENTRY_IDS.attendeeNames, attendeeNames);
        googleFormData.append(FORM_ENTRY_IDS.attendeeCount, attendeeCount);
        googleFormData.append(FORM_ENTRY_IDS.email, email);

        try {
            // Submit to Google Form
            const response = await fetch(GOOGLE_FORM_URL, {
                method: 'POST',
                mode: 'no-cors', // Google Forms doesn't allow CORS, so we use no-cors
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: googleFormData
            });

            // With no-cors mode, we can't check the response status
            // So we'll assume success and show the success message
            successMessage.classList.remove('hidden');
            form.reset();
            
            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
        } catch (error) {
            console.error('Error submitting form:', error);
            errorMessage.classList.remove('hidden');
            errorMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } finally {
            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<span>Submit RSVP</span>';
        }
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
