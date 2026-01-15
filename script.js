const SUBMITTED_KEY = 'rsvp_submitted';
const ATTENDANCE_KEY = 'rsvp_attendance';

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('rsvp-form');
    const rsvpContainer = document.getElementById('rsvp-container');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');
    const submittedMessage = document.getElementById('submitted-message');
    const editResponseContainer = document.getElementById('edit-response-container');
    const editResponseBtn = document.getElementById('edit-response-btn');
    const calendarSection = document.getElementById('calendar-section');
    const addToCalendar = document.getElementById('add-to-calendar');
    const googleCalendarLink = document.getElementById('google-calendar-link');
    const submitBtn = form.querySelector('.submit-btn');
    const iframe = document.querySelector('iframe[name="hidden_iframe"]');
    let pendingSubmit = false;

    const showSubmittedState = () => {
        form.classList.add('hidden');
        submittedMessage.classList.remove('hidden');
        editResponseContainer.classList.remove('hidden');
        if (rsvpContainer) {
            rsvpContainer.classList.add('submitted-state');
        }
        const attendance = localStorage.getItem(ATTENDANCE_KEY);
        if (!calendarSection) {
            return;
        }
        if (attendance === 'yes') {
            updateCalendarLinks();
            calendarSection.classList.remove('hidden');
        } else {
            calendarSection.classList.add('hidden');
        }
    };

    const showFormState = () => {
        submittedMessage.classList.add('hidden');
        form.classList.remove('hidden');
        if (rsvpContainer) {
            rsvpContainer.classList.remove('submitted-state');
        }
        if (calendarSection) {
            calendarSection.classList.add('hidden');
        }
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>Submit RSVP</span>';
    };

    const updateCalendarLinks = () => {
        if (!addToCalendar || !googleCalendarLink) {
            return;
        }
        const title = 'Yue & Yiwei Wedding';
        const description = 'Wedding reception. Parking: Guests may park in the Boulder Ridge Golf Club public parking lot. Golf club shuttle carts will be available to transport guests from the parking area to the reception venue.';
        const location = '1000 Old Quarry Rd, San Jose, CA 95123';
        const mapsUrl = 'https://maps.google.com/?q=1000+Old+Quarry+Rd,+San+Jose,+CA+95123';

        // Event time: Feb 7, 2026 4:00 PM - 8:00 PM PST (UTC-8)
        const startUtc = '20260208T000000Z';
        const endUtc = '20260208T040000Z';

        const icsLines = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'PRODID:-//Wedding RSVP//EN',
            'BEGIN:VEVENT',
            `UID:${Date.now()}@wedding-rsvp`,
            `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
            `DTSTART:${startUtc}`,
            `DTEND:${endUtc}`,
            `SUMMARY:${title}`,
            `DESCRIPTION:${description} Map: ${mapsUrl}`,
            `LOCATION:${location}`,
            'END:VEVENT',
            'END:VCALENDAR'
        ];

        const icsContent = icsLines.join('\r\n');
        const icsBlob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
        const icsUrl = URL.createObjectURL(icsBlob);

        addToCalendar.setAttribute('href', icsUrl);

        const googleUrl = new URL('https://calendar.google.com/calendar/render');
        googleUrl.searchParams.set('action', 'TEMPLATE');
        googleUrl.searchParams.set('text', title);
        googleUrl.searchParams.set('dates', `${startUtc}/${endUtc}`);
        googleUrl.searchParams.set('details', `${description} Map: ${mapsUrl}`);
        googleUrl.searchParams.set('location', location);
        googleCalendarLink.setAttribute('href', googleUrl.toString());
    };

    if (localStorage.getItem(SUBMITTED_KEY) === 'true') {
        showSubmittedState();
    }

    if (editResponseBtn) {
        editResponseBtn.addEventListener('click', () => {
            localStorage.removeItem(SUBMITTED_KEY);
            localStorage.removeItem(ATTENDANCE_KEY);
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
            const attendanceInput = form.querySelector('input[name="entry.877086558"]:checked');
            const attendanceValue = attendanceInput ? attendanceInput.value : '';
            localStorage.setItem(
                ATTENDANCE_KEY,
                attendanceValue.startsWith('Yes') ? 'yes' : 'no'
            );
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
