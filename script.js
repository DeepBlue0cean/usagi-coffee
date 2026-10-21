const slides = [...document.querySelectorAll('.slide')];
const title = document.getElementById('heroTitle');
const nav = document.getElementById('nav');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let currentSlide = 0;
let timer;

function updateHeader() {
  nav.classList.toggle('solid', window.scrollY > 24);
}

function showSlide(index) {
  currentSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, i) => {
    const active = i === currentSlide;
    slide.classList.toggle('active', active);
    slide.setAttribute('aria-hidden', String(!active));
  });
  title.textContent = slides[currentSlide].dataset.title;
}

function startAutoplay() {
  window.clearInterval(timer);
  if (!reducedMotion.matches) {
    timer = window.setInterval(() => showSlide(currentSlide + 1), 6000);
  }
}

document.querySelector('.prev').addEventListener('click', () => {
  showSlide(currentSlide - 1);
  startAutoplay();
});

document.querySelector('.next').addEventListener('click', () => {
  showSlide(currentSlide + 1);
  startAutoplay();
});

nav.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', () => {
    const target = document.querySelector(link.hash);
    if (target) target.focus({ preventScroll: true });
  });
});

reducedMotion.addEventListener('change', startAutoplay);
document.addEventListener('visibilitychange', () => {
  if (document.hidden) window.clearInterval(timer);
  else startAutoplay();
});
window.addEventListener('scroll', updateHeader, { passive: true });

showSlide(0);
startAutoplay();
updateHeader();
