# Wedding RSVP Website

A beautiful, simple wedding RSVP website that displays your wedding poster and collects RSVP responses.

## Features

- **Poster Display**: Shows your wedding poster at the top of the page
- **RSVP Form**: Collects attendance (Yes/No), number of guests, email address, and optional notes
- **Google Forms Integration**: Submits responses directly to your Google Form
- **Responsive Design**: Works beautifully on desktop, tablet, and mobile devices
- **Modern UI**: Elegant design with smooth animations

## Setup Instructions

### 1. Add Your Poster Image

1. Place your wedding poster image in the same folder as `index.html`
2. Name it `poster.jpg` (or update the filename in `index.html` line 13)
3. Supported formats: JPG, PNG, GIF, WebP

### 2. Set Up Google Form

1. Go to [Google Forms](https://forms.google.com)
2. Create a new form with the following fields:
   - **Attendance** (Short answer or Multiple choice: Yes/No)
   - **Number of Guests** (Short answer or Dropdown)
   - **Email Address** (Short answer)
   - **Additional Notes** (Paragraph text) - Optional

3. Get your form URL:
   - Click the "Send" button
   - Copy the form link
   - The URL will look like: `https://docs.google.com/forms/d/e/FORM_ID/viewform`

4. Get Entry IDs for each field:
   - Open your Google Form in edit mode
   - Right-click on a field and select "Inspect" (or press F12)
   - Look for `name="entry.XXXXXXXXX"` in the HTML
   - Alternatively, submit a test response and check the form's source code
   - Or use this method:
     - View the form's source code (Ctrl+U or Cmd+Option+U)
     - Search for `entry.` to find the entry IDs

### 3. Configure the JavaScript

1. Open `script.js`
2. Replace `YOUR_FORM_ID` in the `GOOGLE_FORM_URL` with your actual Google Form ID
   - Example: If your form URL is `https://docs.google.com/forms/d/e/1ABC123XYZ/viewform`
   - Your form ID is `1ABC123XYZ`
   - The URL should be: `https://docs.google.com/forms/d/e/1ABC123XYZ/formResponse`

3. Replace the entry IDs in `FORM_ENTRY_IDS` object with your actual entry IDs:
   ```javascript
   const FORM_ENTRY_IDS = {
       attendance: 'entry.123456789',  // Your attendance field entry ID
       guests: 'entry.987654321',      // Your guests field entry ID
       email: 'entry.456789123',       // Your email field entry ID
       notes: 'entry.789123456'        // Your notes field entry ID
   };
   ```

### 4. Test Your Setup

1. Open `index.html` in a web browser
2. Fill out the form and submit
3. Check your Google Form responses to verify the submission worked

## Alternative: Using Formspree or Other Services

If you prefer not to use Google Forms, you can modify `script.js` to use other services:

### Formspree
```javascript
const FORMPREE_URL = 'https://formspree.io/f/YOUR_FORM_ID';

// In the submit handler:
const response = await fetch(FORMPREE_URL, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        attendance: attendance === 'yes' ? 'Yes' : 'No',
        guests: guests,
        email: email,
        notes: notes
    })
});
```

### EmailJS
You can also use EmailJS to send responses directly to your email.

## Customization

### Change Colors
Edit `styles.css` to customize the color scheme. The main colors are defined in:
- Background gradient: `background: linear-gradient(...)`
- Button colors: `.submit-btn` background
- Accent colors: `#c3cfe2` and `#8fa5d3`

### Change Fonts
Modify the `font-family` in `styles.css` body selector to use different fonts.

### Add More Fields
1. Add HTML form fields in `index.html`
2. Add corresponding entry IDs in `script.js`
3. Style the new fields in `styles.css`

## Deployment

### Option 1: GitHub Pages
1. Create a GitHub repository
2. Upload all files
3. Enable GitHub Pages in repository settings
4. Share the GitHub Pages URL

### Option 2: Netlify
1. Go to [Netlify](https://netlify.com)
2. Drag and drop your folder
3. Get your live URL instantly

### Option 3: Any Web Hosting
Upload all files to any web hosting service (hosting provider, AWS S3, etc.)

## Browser Support

Works on all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Troubleshooting

**Form submissions not working?**
- Check that your Google Form URL and entry IDs are correct
- Make sure your Google Form is set to accept responses
- Check browser console for errors (F12)

**Poster not showing?**
- Verify the image filename matches what's in `index.html`
- Check that the image file is in the same folder as `index.html`
- Try using an absolute path or hosting the image online

**Styling issues?**
- Clear your browser cache
- Check that `styles.css` is properly linked in `index.html`

## License

Free to use for your wedding! 🎉
