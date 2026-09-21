const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static files from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// In-memory data storage
let candidateRegistrations = [];
let sponsorInquiries = [];

// Candidate Registration API
app.post('/api/register-candidate', (req, res) => {
  const { fullName, phone, whatsapp, email, city, age, experience, englishLevel, passportReady, skills, message } = req.body;

  if (!fullName || !phone || !city) {
    return res.status(400).json({ success: false, error: 'Full Name, Phone Number, and City are required.' });
  }

  const candidate = {
    id: 'CAND-' + Date.now(),
    type: 'Candidate',
    fullName,
    phone,
    whatsapp: whatsapp || phone,
    email: email || 'N/A',
    city,
    age: age || 'Not specified',
    experience: experience || 'Not specified',
    englishLevel: englishLevel || 'Basic',
    passportReady: passportReady ? 'Yes' : 'No',
    skills: skills || [],
    message: message || '',
    createdAt: new Date().toISOString()
  };

  candidateRegistrations.push(candidate);
  console.log('New Candidate Registered:', candidate);

  res.json({ success: true, message: 'Registration received successfully!', referenceId: candidate.id });
});

// UK Sponsor/Employer Inquiry API
app.post('/api/sponsor-inquiry', (req, res) => {
  const { employerName, phone, email, ukLocation, serviceNeeded, liveInOption, message } = req.body;

  if (!employerName || !phone || !email) {
    return res.status(400).json({ success: false, error: 'Employer Name, Phone, and Email are required.' });
  }

  const inquiry = {
    id: 'SPON-' + Date.now(),
    type: 'Sponsor/Employer',
    employerName,
    phone,
    email,
    ukLocation,
    serviceNeeded,
    liveInOption,
    message: message || '',
    createdAt: new Date().toISOString()
  };

  sponsorInquiries.push(inquiry);
  console.log('New Sponsor Inquiry:', inquiry);

  res.json({ success: true, message: 'Inquiry submitted successfully!', referenceId: inquiry.id });
});

// Admin API to fetch records
app.get('/api/admin/submissions', (req, res) => {
  res.json({
    candidates: candidateRegistrations,
    sponsors: sponsorInquiries
  });
});

// Serve index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Dania Maids UK server running on http://localhost:${PORT}`);
});

module.exports = app;