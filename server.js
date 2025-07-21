require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');
const multer = require('multer');

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname)); // Serve index.html and other static files

// File upload configuration
const upload = multer({ dest: 'uploads/' });

// Email transporter using environment variables
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT, 10),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Serve the main form page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle form submission
app.post('/submit', upload.single('aadhaarUpload'), async (req, res) => {
  try {
    const formData = req.body;
    const uploadedFile = req.file;

    // Build HTML table from form data
    const formFields = Object.entries(formData)
      .map(([key, value]) => `
        <tr>
          <td style="padding:8px; border:1px solid #ccc;"><strong>${key}</strong></td>
          <td style="padding:8px; border:1px solid #ccc;">${value}</td>
        </tr>`)
      .join('');

    // Add file info if available
    const fileRow = uploadedFile
      ? `<tr>
          <td style="padding:8px; border:1px solid #ccc;"><strong>Aadhaar Upload</strong></td>
          <td style="padding:8px; border:1px solid #ccc;">${uploadedFile.originalname}</td>
        </tr>`
      : '';

    const htmlBody = `
      <h2>📄 Mobile Connection Form Submission</h2>
      <table style="border-collapse: collapse;">
        ${formFields}
        ${fileRow}
      </table>
    `;

    // Send email
    await transporter.sendMail({
      from: `"Mobile Connection" <${process.env.SMTP_USER}>`,
      to: process.env.RECEIVER_EMAIL,
      subject: '📩 New Mobile Connection Form Submission',
      html: htmlBody,
      // Uncomment if you want to attach the uploaded file:
      // attachments: uploadedFile ? [{ filename: uploadedFile.originalname, path: uploadedFile.path }] : [],
    });

    console.log('✅ Email sent successfully');
    res.status(200).json({ message: 'Form submitted and email sent!' });

  } catch (error) {
    console.error('❌ Email sending failed:', error);
    res.status(500).json({ message: 'Failed to send email.', error: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

