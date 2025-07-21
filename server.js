const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/submit-form', async (req, res) => {
  const form = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const html = Object.entries(form)
    .map(([k, v]) => `<p><b>${k}</b>: ${v}</p>`)
    .join('');

  try {
    await transporter.sendMail({
      from: `"Mobile Form" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: `New Mobile Connection Submission`,
      html
    });
    res.status(200).send({ message: "Email sent successfully." });
  } catch (err) {
    console.error("Error sending mail:", err);
    res.status(500).send({ error: "Failed to send email." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
