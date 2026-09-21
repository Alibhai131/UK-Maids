const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static files from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Store booking inquiries
let clientInquiries = [];

// API to handle Booking Form
app.post('/api/book-staff', (req, res) => {
  const { name, phone, email, postcode, serviceType, frequency, message } = req.body;

  if (!name || !phone || !postcode || !serviceType) {
    return res.status(400).json({ success: false, error: 'Name, Phone, Postcode, and Service Type are required.' });
  }

  const inquiry = {
    id: 'REQ-' + Date.now(),
    name,
    phone,
    email: email || 'Not provided',
    postcode,
    serviceType,
    frequency: frequency || 'Not specified',
    message: message || '',
    dateSubmitted: new Date().toISOString()
  };

  clientInquiries.push(inquiry);
  console.log('New Staff Request:', inquiry);

  res.json({ success: true, message: 'Request received successfully!', referenceId: inquiry.id });
});

// Admin API to view leads
app.get('/api/admin/leads', (req, res) => {
  res.json(clientInquiries);
});

// Serve index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Dania's Maids UK (Local) running on http://localhost:${PORT}`);
});

module.exports = app;