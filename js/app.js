const body = document.body;
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const mobileMenuLinks = document.querySelectorAll(".mobile-menu a");

function setMenu(open) {
  body.classList.toggle("menu-open", open);
  menuToggle?.setAttribute("aria-expanded", open ? "true" : "false");
  menuToggle?.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  mobileMenu?.setAttribute("aria-hidden", open ? "false" : "true");
}

menuToggle?.addEventListener("click", () => {
  setMenu(!body.classList.contains("menu-open"));
});

mobileMenuLinks.forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenu(false);
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

document.querySelectorAll(".reveal").forEach((item) => revealObserver.observe(item));

const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".service-panel");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const id = tab.dataset.tab;
    tabs.forEach((item) => {
      item.classList.toggle("active", item === tab);
      item.setAttribute("aria-selected", item === tab ? "true" : "false");
    });
    panels.forEach((panel) => panel.classList.toggle("active", panel.id === id));
  });
});

document.querySelectorAll(".faq-item button").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    const isOpen = item.classList.contains("open");
    document.querySelectorAll(".faq-item").forEach((faq) => faq.classList.remove("open"));
    if (!isOpen) item.classList.add("open");
  });
});

const totalSlides = 5;
let currentSlide = 2;
let autoTimer;
const slides = Array.from(document.querySelectorAll(".hero-slide"));
const dots = Array.from(document.querySelectorAll(".hero-dot"));
const carousel = document.getElementById("heroCarousel");
const heroVisual = document.querySelector(".hero-carousel-wrap");

function slideClass(index) {
  const diff = ((index - currentSlide) % totalSlides + totalSlides) % totalSlides;
  if (diff === 0) return "center";
  if (diff === 1) return "right";
  if (diff === totalSlides - 1) return "left";
  if (diff === 2) return "far-right";
  return "far-left";
}

function renderCarousel() {
  slides.forEach((slide, index) => {
    slide.className = `hero-slide ${slideClass(index)}`;
  });
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentSlide);
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  renderCarousel();
}

function previousSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  renderCarousel();
}

function goToSlide(index) {
  currentSlide = index;
  renderCarousel();
  resetAuto();
}

function resetAuto() {
  window.clearInterval(autoTimer);
  autoTimer = window.setInterval(nextSlide, 3600);
}

slides.forEach((slide) => {
  slide.addEventListener("click", () => {
    if (slide.classList.contains("right")) nextSlide();
    if (slide.classList.contains("left")) previousSlide();
    resetAuto();
  });
});

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => goToSlide(index));
});

let touchStartX = 0;
carousel.addEventListener("touchstart", (event) => {
  touchStartX = event.touches[0].clientX;
}, { passive: true });

carousel.addEventListener("touchend", (event) => {
  const delta = event.changedTouches[0].clientX - touchStartX;
  if (Math.abs(delta) > 40) {
    delta < 0 ? nextSlide() : previousSlide();
    resetAuto();
  }
}, { passive: true });

renderCarousel();
resetAuto();

let ticking = false;

function updateHeroMotion() {
  const y = window.scrollY;
  const offset = Math.min(34, y * 0.045);
  heroVisual?.style.setProperty("--hero-parallax", `${offset}px`);
  ticking = false;
}

window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(updateHeroMotion);
    ticking = true;
  }
}, { passive: true });
