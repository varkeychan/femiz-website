
// ── SCROLL REVEAL ──
document.querySelectorAll('.rev').forEach(r=>new IntersectionObserver(e=>{e.forEach(x=>{if(x.isIntersecting)x.target.classList.add('v')})},{threshold:.08}).observe(r));

// ── TABS ──
function sw(id,btn){document.querySelectorAll('.sp').forEach(p=>p.classList.remove('active'));document.querySelectorAll('.tb').forEach(t=>t.classList.remove('active'));document.getElementById(id).classList.add('active');btn.classList.add('active')}

// ── FAQ ──
function tf(btn){const fi=btn.parentElement,o=fi.classList.contains('open');document.querySelectorAll('.fi').forEach(i=>i.classList.remove('open'));if(!o)fi.classList.add('open')}

// ── HERO CAROUSEL ──
const TOTAL = 5;
let cur = 2; // center index (0-based order in DOM)
let autoTimer;

const slides = Array.from(document.querySelectorAll('.h-slide'));
const dots   = Array.from(document.querySelectorAll('.h-dot'));

function getClass(i) {
  const diff = ((i - cur) % TOTAL + TOTAL) % TOTAL;
  if (diff === 0) return 'center';
  if (diff === 1) return 'right';
  if (diff === TOTAL - 1) return 'left';
  if (diff === 2) return 'far-right';
  return 'far-left';
}

function render() {
  slides.forEach((s, i) => {
    s.className = 'h-slide ' + getClass(i);
  });
  dots.forEach((d, i) => {
    d.classList.toggle('active', i === cur);
  });
}

function goTo(idx) {
  cur = idx;
  render();
  resetAuto();
}

function next() { cur = (cur + 1) % TOTAL; render(); }
function prev() { cur = (cur - 1 + TOTAL) % TOTAL; render(); }

function resetAuto() {
  clearInterval(autoTimer);
  autoTimer = setInterval(next, 3200);
}

// click side cards to advance
slides.forEach((s, i) => {
  s.addEventListener('click', () => {
    const cl = s.className;
    if (cl.includes('right') || cl.includes('far-right')) next();
    else if (cl.includes('left') || cl.includes('far-left')) prev();
  });
});

// touch swipe
let tx = 0;
const car = document.getElementById('heroCarousel');
car.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, {passive:true});
car.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - tx;
  if (Math.abs(dx) > 40) { dx < 0 ? next() : prev(); resetAuto(); }
}, {passive:true});

// init
render();
resetAuto();
