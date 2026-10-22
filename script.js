const slides = [...document.querySelectorAll('.slide')];
const title = document.getElementById('heroTitle');
const nav = document.getElementById('nav');
const hero = document.querySelector('.hero');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let currentSlide = 0;
let timer;
let productRevealTimer;

function updateHeader() {
  nav.classList.toggle('solid', window.scrollY > 24);
}

function restartHeroIntro() {
  window.clearTimeout(productRevealTimer);
  hero.classList.remove('intro-active', 'product-ready');
  void hero.offsetWidth;
  hero.classList.add('intro-active');

  if (reducedMotion.matches) {
    hero.classList.add('product-ready');
    return;
  }

  productRevealTimer = window.setTimeout(() => {
    hero.classList.add('product-ready');
  }, 1750);
}

function showSlide(index) {
  currentSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, i) => {
    const active = i === currentSlide;
    slide.classList.toggle('active', active);
    slide.setAttribute('aria-hidden', String(!active));
  });
  title.textContent = slides[currentSlide].dataset.title;
  hero.dataset.product = slides[currentSlide].dataset.product;
  if (hero.classList.contains('in-view')) restartHeroIntro();
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

reducedMotion.addEventListener('change', () => {
  startAutoplay();
  if (hero.classList.contains('in-view')) restartHeroIntro();
});
document.addEventListener('visibilitychange', () => {
  if (document.hidden) window.clearInterval(timer);
  else startAutoplay();
});
window.addEventListener('scroll', updateHeader, { passive: true });

hero.classList.add('motion-enabled');
if ('IntersectionObserver' in window) {
  const heroObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      hero.classList.toggle('in-view', entry.isIntersecting);
      if (entry.isIntersecting) {
        restartHeroIntro();
      } else {
        window.clearTimeout(productRevealTimer);
        hero.classList.remove('intro-active', 'product-ready');
      }
    });
  });
  heroObserver.observe(hero);
} else {
  hero.classList.add('in-view');
}

const journal = document.querySelector('.journal');
if ('IntersectionObserver' in window) {
  const journalImage = journal.querySelector('img');
  const journalPanels = document.createElement('div');
  journalPanels.className = 'journal-panels';
  journalPanels.setAttribute('aria-hidden', 'true');
  for (let i = 0; i < 5; i += 1) {
    const panel = journalImage.cloneNode();
    panel.alt = '';
    panel.removeAttribute('loading');
    panel.className = 'journal-panel';
    panel.style.setProperty('--panel-index', i);
    panel.style.setProperty('--panel-top', `${i * 20}%`);
    panel.style.setProperty('--panel-bottom', `${(4 - i) * 20}%`);
    journalPanels.append(panel);
  }
  journal.append(journalPanels);
  journal.classList.add('reveal-ready');
  const journalObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        journal.classList.add('is-visible');
        journalObserver.disconnect();
      }
    });
  }, { threshold: 0.1 });
  journalObserver.observe(journal);
} else {
  journal.classList.add('is-visible');
}

showSlide(0);
startAutoplay();
updateHeader();
