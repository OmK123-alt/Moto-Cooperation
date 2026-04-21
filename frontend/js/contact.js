// =============================================
// CONTACT FORM HANDLER
// Replace with a real backend / EmailJS / Formspree
// =============================================

function handleSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('submitBtn');

  // Simulate send
  btn.textContent = 'SENDING...';
  btn.style.background = 'var(--gray)';
  btn.disabled = true;

  setTimeout(() => {
    btn.textContent = '✓ MESSAGE SENT — WE\'LL BE IN TOUCH!';
    btn.style.background = '#1a6b2a';
    e.target.reset();

    setTimeout(() => {
      btn.textContent = 'SEND MESSAGE →';
      btn.style.background = '';
      btn.disabled = false;
    }, 5000);
  }, 1200);

  // -----------------------------------------------
  // TO CONNECT TO EMAILJS (free), uncomment below:
  // -----------------------------------------------
  // emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', e.target)
  //   .then(() => { ... }, (err) => { ... });
  //
  // TO USE FORMSPREE, set form action to:
  // <form action="https://formspree.io/f/YOUR_ID" method="POST">
}
