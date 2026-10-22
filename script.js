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

  // Vùng cắt theo % của journal.png (rộng 838 × cao 2000 khi quy đổi): [hàng, x0, x1, y0, y1, loại, hướng, trễ ms]
  const rows = [0, 330, 630, 930, 1230, 1530, 1735, 2000];
  const regions = [
    [0, 0, 40.1, 'text'], [0, 40.1, 100, 'photo', 'from-right', 160],
    [1, 0, 50, 'text'], [1, 50, 100, 'photo', 'from-right', 160],
    [2, 50, 100, 'text'], [2, 0, 50, 'photo', 'from-left', 160],
    [3, 0, 50, 'text'], [3, 50, 100, 'photo', 'from-right', 160],
    [4, 50, 100, 'text'], [4, 0, 50, 'photo', 'from-left', 160],
    [5, 0, 100, 'text'],
    [6, 0, 25.7, 'photo', 'from-below', 0], [6, 25.7, 49.2, 'photo', 'from-below', 130],
    [6, 49.2, 73, 'photo', 'from-below', 260], [6, 73, 100, 'photo', 'from-below', 390]
  ];
  const overlap = 0.08;
  const bandPanels = rows.slice(0, -1).map(() => []);

  regions.forEach(([band, x0, x1, kind, direction, delay = 0]) => {
    const y0 = rows[band] / 20;
    const y1 = rows[band + 1] / 20;
    const panel = journalImage.cloneNode();
    panel.alt = '';
    panel.removeAttribute('loading');
    panel.className = `journal-panel ${kind === 'text' ? 'is-text' : direction}`;
    panel.style.setProperty('--cut-top', `${Math.max(y0 - overlap, 0)}%`);
    panel.style.setProperty('--cut-bottom', `${Math.max(100 - y1 - overlap, 0)}%`);
    panel.style.setProperty('--cut-left', `${Math.max(x0 - overlap, 0)}%`);
    panel.style.setProperty('--cut-right', `${Math.max(100 - x1 - overlap, 0)}%`);
    panel.style.setProperty('--ox', `${(x0 + x1) / 2}%`);
    panel.style.setProperty('--oy', `${(y0 + y1) / 2}%`);
    panel.style.setProperty('--delay', `${kind === 'text' ? 0 : delay}ms`);
    bandPanels[band].push(panel);
    journalPanels.append(panel);
  });
  journal.append(journalPanels);
  journal.classList.add('reveal-ready');

  // Điểm kích hoạt trong suốt cho từng hàng, để hàng nào cuộn tới thì hàng đó mới chuyển động
  const bandObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      bandPanels[Number(entry.target.dataset.band)].forEach(panel => panel.classList.add('is-in'));
      bandObserver.unobserve(entry.target);
    });
  }, { threshold: 0.35, rootMargin: '0px 0px -8% 0px' });

  rows.slice(0, -1).forEach((start, band) => {
    const trigger = document.createElement('div');
    trigger.dataset.band = band;
    trigger.setAttribute('aria-hidden', 'true');
    trigger.style.cssText = `position:absolute;left:0;width:1px;top:${start / 20}%;height:${(rows[band + 1] - start) / 20}%;pointer-events:none`;
    journal.append(trigger);
    bandObserver.observe(trigger);
  });
} else {
  journal.classList.add('is-visible');
}

showSlide(0);
startAutoplay();
updateHeader();
