const express = require('express');
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');
const app = express();
const PORT = 3000;

// Initialize SendGrid API key
sgMail.setApiKey('');

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// POST endpoint to handle form submission
app.post('/send-email', (req, res) => {
    const { name, email, phone, carModel, rentalDates, message } = req.body;

    const msg = {
        to: 'm.rohaanamir2003@gmail.com', // Replace with your email
        from: 'info@carrental.com',   // Replace with your SendGrid verified email
        subject: 'Car Rental Inquiry',
        text: `
            Name: ${name}
            Email: ${email}
            Phone: ${phone}
            Car Model: ${carModel}
            Rental Dates: ${rentalDates}
            Message: ${message}
        `,
    };

    sgMail.send(msg)
        .then(() => {
            console.log('Email sent');
            res.status(200).json({ message: 'Email sent successfully' });
        })
        .catch((error) => {
            console.error('Error sending email:', error);
            res.status(500).json({ error: 'Error sending email' });
        });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});