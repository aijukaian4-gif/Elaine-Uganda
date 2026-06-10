const body = document.body;
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const themeToggle = document.getElementById('themeToggle');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => siteNav.classList.toggle('open'));
}

const applyTheme = (mode) => {
  if (mode === 'dark') {
    body.classList.add('dark-mode');
  } else {
    body.classList.remove('dark-mode');
  }
};

const savedTheme = localStorage.getItem('ets-theme');
if (savedTheme) applyTheme(savedTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const dark = body.classList.toggle('dark-mode');
    localStorage.setItem('ets-theme', dark ? 'dark' : 'light');
  });
}

const slides = Array.from(document.querySelectorAll('.slide'));
const dots = Array.from(document.querySelectorAll('.dot'));
let slideIndex = 0;

function showSlide(index) {
  if (!slides.length) return;
  slideIndex = (index + slides.length) % slides.length;
  slides.forEach((slide, i) => slide.classList.toggle('active', i === slideIndex));
  dots.forEach((dot, i) => dot.classList.toggle('active', i === slideIndex));
}

document.querySelector('.next')?.addEventListener('click', () => showSlide(slideIndex + 1));
document.querySelector('.prev')?.addEventListener('click', () => showSlide(slideIndex - 1));
dots.forEach((dot, i) => dot.addEventListener('click', () => showSlide(i)));
if (slides.length) setInterval(() => showSlide(slideIndex + 1), 4500);

const revealItems = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.15 });
revealItems.forEach((item) => revealObserver.observe(item));

const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = Number(el.dataset.target || 0);
    let current = 0;
    const increment = Math.max(1, Math.ceil(target / 60));
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        el.textContent = target;
        clearInterval(timer);
      } else {
        el.textContent = current;
      }
    }, 24);
    observer.unobserve(el);
  });
}, { threshold: 0.6 });
counters.forEach((counter) => counterObserver.observe(counter));

const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    portfolioItems.forEach((item) => {
      const match = filter === 'all' || item.dataset.category === filter;
      item.style.display = match ? 'block' : 'none';
    });
  });
});

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
if (contactForm && formMessage) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    formMessage.textContent = 'Form validated successfully. Connect this form to Formspree, Basin, or your preferred backend to enable real submissions.';
    formMessage.style.color = '#0D1B4B';
    contactForm.reset();
  });
}
(function () {
      const slides = document.querySelectorAll('.slide-item');
      const dotsWrap = document.getElementById('slideDots');
      const counter = slides.length;
      let current = 0, timer;

      // Build dots
      slides.forEach(function (_, i) {
        const dot = document.createElement('button');
        dot.className = 'sdot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
        dot.addEventListener('click', function () { goTo(i); });
        dotsWrap.appendChild(dot);
      });

      function goTo(n) {
        slides[current].classList.remove('active');
        dotsWrap.children[current].classList.remove('active');
        current = (n + counter) % counter;
        slides[current].classList.add('active');
        dotsWrap.children[current].classList.add('active');
        resetTimer();
      }

      function resetTimer() {
        clearInterval(timer);
        timer = setInterval(function () { goTo(current + 1); }, 4500);
      }

      document.getElementById('slideNext').addEventListener('click', function () { goTo(current + 1); });
      document.getElementById('slidePrev').addEventListener('click', function () { goTo(current - 1); });
      resetTimer();
    })();