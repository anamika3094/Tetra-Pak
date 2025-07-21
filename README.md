# Mobile Connection Form - Internship Project @ Tetra Pak
This project is a Node.js-based form submission system that collects user details (including Aadhaar upload) and sends them via email using Brevo SMTP (Sendinblue).

# Features
1. Sends form details to email via Brevo SMTP
2. Supports file uploads (e.g., Aadhaar)
3. Runs locally on http://localhost:3000
4. Environment variables secured with .env
5. Built for internship at Tetra Pak

# Steps to Run this Form
# 1. Prerequisites
Before starting, install the following:
✅ Node.js (v18+ recommended)
✅ Git
✅ Brevo (Sendinblue) account → Go to SMTP & API and enable SMTP, get your credentials

# 2. Project Setup
mkdir brevo-form-app
cd brevo-form-app
npm init -y
npm install express nodemailer dotenv cors multer

# 3. Project Structure
brevo-form-app/
│
├── .env
├── server.js
├── index.html
├── uploads/
└── package.json


# 4. Create .env file
Paste this inside .env:
PORT=3000
SMTP_HOST=smtp-relay.brevo.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=YOUR_BREVO_SMTP_USER
SMTP_PASS=YOUR_BREVO_SMTP_PASSWORD
RECEIVER_EMAIL=your-email@gmail.com

# 5. Run the App
node server.js
Go to: http://localhost:3000

