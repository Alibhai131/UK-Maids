// FAQ Toggle
document.querySelectorAll('.faq-q').forEach(button => {
  button.addEventListener('click', () => {
    const faqItem = button.parentElement;
    faqItem.classList.toggle('active');
  });
});

// Navigation Toggle for Mobile
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

// Tab Switcher between Candidate and Sponsor Forms
const btnTabCandidate = document.getElementById('btnTabCandidate');
const btnTabSponsor = document.getElementById('btnTabSponsor');
const candidateFormBox = document.getElementById('candidateFormBox');
const sponsorFormBox = document.getElementById('sponsorFormBox');

if (btnTabCandidate && btnTabSponsor) {
  btnTabCandidate.addEventListener('click', () => {
    btnTabCandidate.classList.add('active');
    btnTabSponsor.classList.remove('active');
    candidateFormBox.style.display = 'block';
    sponsorFormBox.style.display = 'none';
  });

  btnTabSponsor.addEventListener('click', () => {
    btnTabSponsor.classList.add('active');
    btnTabCandidate.classList.remove('active');
    sponsorFormBox.style.display = 'block';
    candidateFormBox.style.display = 'none';
  });
}

// Candidate Form Submission
const candidateForm = document.getElementById('candidateForm');
const cSubmitBtn = document.getElementById('cSubmitBtn');
const cSuccess = document.getElementById('cSuccess');
const cRefId = document.getElementById('cRefId');

if (candidateForm) {
  candidateForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    cSubmitBtn.disabled = true;
    cSubmitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';

    const selectedSkills = Array.from(document.querySelectorAll('input[name="skills"]:checked')).map(cb => cb.value);

    const payload = {
      fullName: document.getElementById('cName').value,
      phone: document.getElementById('cPhone').value,
      whatsapp: document.getElementById('cWhatsapp').value,
      city: document.getElementById('cCity').value,
      age: document.getElementById('cAge').value,
      experience: document.getElementById('cExperience').value,
      englishLevel: document.getElementById('cEnglish').value,
      passportReady: document.getElementById('cPassport').value.includes('Yes'),
      skills: selectedSkills,
      message: document.getElementById('cMessage').value
    };

    try {
      const response = await fetch('/api/register-candidate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (data.success) {
        candidateForm.style.display = 'none';
        cRefId.textContent = data.referenceId;
        cSuccess.style.display = 'block';
      } else {
        alert('Error: ' + data.error);
        cSubmitBtn.disabled = false;
        cSubmitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Submit Application';
      }
    } catch (err) {
      alert('Failed to connect to server. Please try again.');
      cSubmitBtn.disabled = false;
      cSubmitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Submit Application';
    }
  });
}

// UK Sponsor Form Submission
const sponsorForm = document.getElementById('sponsorForm');
const sSubmitBtn = document.getElementById('sSubmitBtn');
const sSuccess = document.getElementById('sSuccess');

if (sponsorForm) {
  sponsorForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    sSubmitBtn.disabled = true;
    sSubmitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';

    const payload = {
      employerName: document.getElementById('sName').value,
      phone: document.getElementById('sPhone').value,
      email: document.getElementById('sEmail').value,
      ukLocation: document.getElementById('sLocation').value,
      serviceNeeded: document.getElementById('sService').value,
      liveInOption: document.getElementById('sLiveIn').value,
      message: document.getElementById('sMessage').value
    };

    try {
      const response = await fetch('/api/sponsor-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (data.success) {
        sponsorForm.style.display = 'none';
        sSuccess.style.display = 'block';
      } else {
        alert('Error: ' + data.error);
        sSubmitBtn.disabled = false;
      }
    } catch (err) {
      alert('Failed to connect. Please try again.');
      sSubmitBtn.disabled = false;
    }
  });
}