// Navigation Toggle for Mobile
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

// Booking Form Submission
const bookingForm = document.getElementById('bookingForm');
const submitBtn = document.getElementById('submitBtn');
const formSuccess = document.getElementById('formSuccess');

if (bookingForm) {
  bookingForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending Request...';

    const payload = {
      name: document.getElementById('bName').value,
      phone: document.getElementById('bPhone').value,
      email: document.getElementById('bEmail').value,
      postcode: document.getElementById('bPostcode').value,
      serviceType: document.getElementById('bService').value,
      frequency: document.getElementById('bFrequency').value,
      message: document.getElementById('bMessage').value
    };

    try {
      const response = await fetch('/api/book-staff', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (data.success) {
        bookingForm.style.display = 'none';
        formSuccess.style.display = 'block';
      } else {
        alert('Error: ' + data.error);
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Request Staff';
      }
    } catch (err) {
      alert('Failed to connect. Please check your internet and try again.');
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Request Staff';
    }
  });
}