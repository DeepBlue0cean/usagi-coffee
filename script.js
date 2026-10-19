const slides = [...document.querySelectorAll('.slide')];
const title = document.getElementById('heroTitle');
const dots = document.getElementById('dots');
let cur = 0, timer;

slides.forEach((_, i) => {
  const b = document.createElement('button');
  b.setAttribute('aria-label', 'Slide ' + (i + 1));
  b.onclick = () => { go(i); restart(); };
  dots.appendChild(b);
});

function go(n) {
  cur = (n + slides.length) % slides.length;
  slides.forEach((s, i) => s.classList.toggle('active', i === cur));
  [...dots.children].forEach((d, i) => d.classList.toggle('on', i === cur));
  title.classList.add('swap');
  setTimeout(() => {
    title.textContent = slides[cur].dataset.title;
    title.classList.remove('swap');
  }, 350);
}
function restart() { clearInterval(timer); timer = setInterval(() => go(cur + 1), 5500); }
document.querySelector('.prev').onclick = () => { go(cur - 1); restart(); };
document.querySelector('.next').onclick = () => { go(cur + 1); restart(); };
go(0); restart();

const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), { threshold: .15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

const nav = document.getElementById('nav');
const bar = document.getElementById('progress');
const par = document.getElementById('parallax');
function onScroll() {
  const y = scrollY, h = document.documentElement.scrollHeight - innerHeight;
  nav.classList.toggle('solid', y > 60);
  bar.style.width = (y / h * 100) + '%';
  const r = par.parentElement.getBoundingClientRect();
  if (r.bottom > 0 && r.top < innerHeight) par.style.transform = `translateY(${-r.top * .15}px)`;
}
addEventListener('scroll', onScroll, { passive: true });
onScroll();
