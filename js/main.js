/* Spice & Soul — vanilla JavaScript, shared by all pages. */
'use strict';

// Keep local preferences and demo data optional: private browsing can block storage.
const storage = {
  get(key) { try { return localStorage.getItem(key); } catch (_) { return null; } },
  set(key, value) { try { localStorage.setItem(key, value); return true; } catch (_) { return false; } }
};

// Theme toggle: saved across all four pages.
const themeToggle = document.querySelector('.theme-toggle');
function updateThemeButton() {
  if (!themeToggle) return;
  const dark = document.documentElement.dataset.theme !== 'light';
  themeToggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
  themeToggle.setAttribute('title', dark ? 'Switch to light mode' : 'Switch to dark mode');
  themeToggle.innerHTML = dark
    ? '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/></svg>'
    : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.2 15.5A8.6 8.6 0 0 1 8.5 3.8 8.7 8.7 0 1 0 20.2 15.5Z"/></svg>';
}
updateThemeButton();
themeToggle?.addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
  document.documentElement.dataset.theme = next;
  storage.set('spice-theme', next);
  updateThemeButton();
});

// Mobile menu: toggle, close on a link click, Escape, or when resizing to desktop.
const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
function closeMenu() {
  siteNav?.classList.remove('is-open');
  menuToggle?.setAttribute('aria-expanded', 'false');
  menuToggle?.setAttribute('aria-label', 'Open navigation menu');
}
menuToggle?.addEventListener('click', () => {
  const open = siteNav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
});
siteNav?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
window.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
window.addEventListener('resize', () => { if (window.innerWidth > 700) closeMenu(); });

// Switch to bundled SVGs if the optional Unsplash photos fail to load.
document.querySelectorAll('img[data-fallback]').forEach(img => {
  img.addEventListener('error', () => {
    if (!img.dataset.fallback || img.dataset.usingFallback) return;
    img.dataset.usingFallback = 'true';
    img.src = img.dataset.fallback;
  });
  if (img.complete && img.naturalWidth === 0) img.dispatchEvent(new Event('error'));
});

// Year and back-to-top.
document.querySelectorAll('[data-year]').forEach(el => { el.textContent = String(new Date().getFullYear()); });
const backTop = document.querySelector('.back-to-top');
window.addEventListener('scroll', () => backTop?.classList.toggle('is-visible', window.scrollY > 400), { passive: true });
backTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Menu category filters; the HTML table remains complete when JavaScript is off.
const filterButtons = document.querySelectorAll('[data-filter]');
const menuRows = document.querySelectorAll('.menu-table tbody tr[data-category]');
filterButtons.forEach(button => button.addEventListener('click', () => {
  const selected = button.dataset.filter;
  filterButtons.forEach(btn => btn.setAttribute('aria-pressed', String(btn === button)));
  menuRows.forEach(row => { row.hidden = selected !== 'All' && row.dataset.category !== selected; });
}));

// Native <dialog> lightbox with accessible controls, Escape, and arrow keys.
const galleryCards = [...document.querySelectorAll('.gallery-card')];
const lightbox = document.querySelector('#gallery-lightbox');
const lightboxImage = document.querySelector('#lightbox-image');
const lightboxCaption = document.querySelector('#lightbox-caption');
let activeImage = 0;
function renderLightbox(index) {
  if (!galleryCards.length || !lightboxImage) return;
  activeImage = (index + galleryCards.length) % galleryCards.length;
  const original = galleryCards[activeImage].querySelector('img');
  lightboxImage.src = original.currentSrc || original.src;
  lightboxImage.alt = original.alt;
  lightboxCaption.textContent = original.alt;
}
galleryCards.forEach((card, index) => card.addEventListener('click', () => {
  renderLightbox(index);
  if (lightbox?.showModal) lightbox.showModal();
}));
lightbox?.querySelector('[data-lightbox-close]')?.addEventListener('click', () => lightbox.close());
lightbox?.querySelector('[data-lightbox-prev]')?.addEventListener('click', () => renderLightbox(activeImage - 1));
lightbox?.querySelector('[data-lightbox-next]')?.addEventListener('click', () => renderLightbox(activeImage + 1));
lightbox?.addEventListener('click', event => { if (event.target === lightbox) lightbox.close(); });
lightbox?.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft') { event.preventDefault(); renderLightbox(activeImage - 1); }
  if (event.key === 'ArrowRight') { event.preventDefault(); renderLightbox(activeImage + 1); }
});

// Reservation form: native constraints + clear custom messages beside each field.
const form = document.querySelector('#reservation-form');
if (form) {
  const dateInput = form.elements.namedItem('date');
  const message = document.querySelector('#form-message');
  const submitButton = form.querySelector('button[type=submit]');
  const fields = [...form.querySelectorAll('input:not([type=hidden]):not([name=bot-field]), select, textarea')];

  function localDate(offsetDays = 0) {
    const d = new Date();
    d.setHours(12, 0, 0, 0);
    d.setDate(d.getDate() + offsetDays);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  dateInput.min = localDate(0);
  dateInput.max = localDate(90);

  const errors = {
    'full-name': { valueMissing: 'Please enter your name.', tooShort: 'Use at least 2 characters.' },
    email: { valueMissing: 'Please enter your email.', typeMismatch: 'Enter a valid email address.' },
    phone: { valueMissing: 'Please enter your phone number.', patternMismatch: 'Enter a valid 10-digit Indian mobile number.' },
    guests: { valueMissing: 'Choose how many guests.', rangeUnderflow: 'At least 1 guest is required.', rangeOverflow: 'For 13+ guests, please contact the restaurant.' },
    date: { valueMissing: 'Choose your reservation date.', rangeUnderflow: 'Choose today or a future date.', rangeOverflow: 'Bookings are available up to 90 days ahead.' },
    time: { valueMissing: 'Please select a time.' },
    consent: { valueMissing: 'Please agree to be contacted.' }
  };

  function setError(field, text) {
    const id = field.type === 'radio' ? 'seating' : field.id;
    const spot = document.getElementById(`error-${id}`);
    if (spot) spot.textContent = text;
    if (field.type !== 'radio') field.setAttribute('aria-invalid', text ? 'true' : 'false');
  }

  function validateField(field) {
    if (field.type === 'radio') return true;
    let error = '';
    // Trim whitespace so a name made only of spaces is not accepted.
    if (field.type === 'text' && !field.value.trim()) error = 'Please enter your name.';
    else if (field.validity.valid === false) {
      const fieldErrors = errors[field.id] || {};
      const invalidKey = Object.keys(fieldErrors).find(key => field.validity[key]);
      error = fieldErrors[invalidKey] || field.validationMessage || 'Please check this field.';
    }
    // Prevent a same-day past time slot. Booking requests must be in the future.
    if (field.id === 'time' && !error && dateInput.value === localDate()) {
      const now = new Date();
      const [hour, minute] = field.value.split(':').map(Number);
      if (Number.isFinite(hour) && (hour * 60 + minute) <= now.getHours() * 60 + now.getMinutes()) {
        error = 'Choose a later time today, or another date.';
      }
    }
    setError(field, error);
    return !error;
  }

  fields.forEach(field => {
    const event = ['select-one', 'checkbox', 'radio', 'date'].includes(field.type) ? 'change' : 'input';
    field.addEventListener(event, () => {
      validateField(field);
      if (field.id === 'date') validateField(form.elements.namedItem('time'));
    });
    field.addEventListener('blur', () => { if (field.type !== 'radio') validateField(field); });
  });

  function showMessage(state, content) {
    message.dataset.state = state;
    message.textContent = content;
    message.focus({ preventScroll: true });
    message.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function isNetlifyHost() {
    // GitHub Pages and localhost are demo-only; Netlify detects this form at deploy time.
    return /(?:^|\.)netlify\.app$/i.test(location.hostname) || /(?:^|\.)netlify\.com$/i.test(location.hostname);
  }

  form.addEventListener('submit', async event => {
    event.preventDefault();
    message.removeAttribute('data-state');
    message.textContent = '';
    let firstInvalid = null;
    fields.forEach(field => { if (!validateField(field) && !firstInvalid) firstInvalid = field; });
    if (firstInvalid) { firstInvalid.focus(); return; }

    const payload = new FormData(form);
    submitButton.disabled = true;
    submitButton.textContent = 'Sending request…';

    if (isNetlifyHost()) {
      try {
        const response = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(payload).toString()
        });
        if (!response.ok) throw new Error(`Netlify form request failed: ${response.status}`);
        showMessage('success', '✓ Request received! This is not a confirmed reservation. The restaurant will need to contact you about availability.');
        form.reset();
      } catch (error) {
        console.error(error);
        showMessage('error', 'We could not send your request. Please retry or contact the restaurant directly.');
      }
    } else {
      // Explicit local demo behaviour; does NOT contact a restaurant or server.
      const demoData = Object.fromEntries(payload.entries());
      const existing = JSON.parse(storage.get('spice-demo-reservations') || '[]');
      existing.push({ ...demoData, submittedAt: new Date().toISOString() });
      if (storage.set('spice-demo-reservations', JSON.stringify(existing.slice(-25)))) {
        showMessage('success', '✓ Demo request saved in this browser! To receive real submissions, deploy this project on Netlify and enable form notifications.');
        form.reset();
      } else {
        showMessage('error', 'Demo storage is unavailable in this browser. Enable local storage or deploy to Netlify for submissions.');
      }
    }
    submitButton.disabled = false;
    submitButton.textContent = 'Request my table ↗';
  });
}
