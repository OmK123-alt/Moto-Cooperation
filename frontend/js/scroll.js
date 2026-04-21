// =============================================
// SCROLL — REVEAL ANIMATIONS + ACTIVE NAV
// =============================================

// Intersection Observer for .reveal elements
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Active nav link highlighting
const sections   = document.querySelectorAll('section[id]');
const navLinks   = document.querySelectorAll('.nav-links a');
const navbar     = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  // Scrolled class on navbar
  navbar.classList.toggle('scrolled', window.scrollY > 40);

  // Active link
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) {
      current = sec.id;
    }
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
});
