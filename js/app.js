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

/* ─────────────────────────────────────────────
   INSTAGRAM LIVE FEED  —  powered by Behold.so
   Feed ID: ToANM6Ac2feYmQh9gjUf
   Auto-updates every time @_femiz._ posts.
───────────────────────────────────────────── */

const BEHOLD_FEED_ID = "ToANM6Ac2feYmQh9gjUf";
const BEHOLD_API     = `https://feeds.behold.so/${BEHOLD_FEED_ID}`;
const INSTA_GRID     = document.getElementById("instaGrid");
const INSTA_PROFILE  = "https://www.instagram.com/_femiz._";

// ── SNAPSHOT: your 6 most recent posts (auto-replaced by live API when online)
// Update this array manually if you want a specific local fallback set.
const INSTA_SNAPSHOT = [
  {
    permalink:   "https://www.instagram.com/p/DX_r7AYmySj/",
    mediaType:   "IMAGE",
    imgSrc:      "https://behold.pictures/IWZ1folSX7djGN1ImGot5UiBWxQ2/ToANM6Ac2feYmQh9gjUf/17944965879176854/small.jpg",
    caption:     "Soft glam, golden whispers ✨💅"
  },
  {
    permalink:   "https://www.instagram.com/p/DX9X1DXvb0_/",
    mediaType:   "IMAGE",
    imgSrc:      "https://behold.pictures/IWZ1folSX7djGN1ImGot5UiBWxQ2/ToANM6Ac2feYmQh9gjUf/18115568857768695/small.jpg",
    caption:     "Glossed to perfection, dipped in deep wine dreams 🍷✨"
  },
  {
    permalink:   "https://www.instagram.com/p/DX1th1ADzIY/",
    mediaType:   "CAROUSEL_ALBUM",
    imgSrc:      "https://behold.pictures/IWZ1folSX7djGN1ImGot5UiBWxQ2/ToANM6Ac2feYmQh9gjUf/17934694614248459/small.jpg",
    caption:     "Pink cat-eye nails that shift with every move ✨💗"
  },
  {
    permalink:   "https://www.instagram.com/reel/DX1alhWINPB/",
    mediaType:   "VIDEO",
    imgSrc:      "https://behold.pictures/IWZ1folSX7djGN1ImGot5UiBWxQ2/ToANM6Ac2feYmQh9gjUf/17989435397969159/small.jpg",
    caption:     "Femiz 💅"
  },
  {
    permalink:   "https://www.instagram.com/p/DXzkb6njwJJ/",
    mediaType:   "CAROUSEL_ALBUM",
    imgSrc:      "https://behold.pictures/IWZ1folSX7djGN1ImGot5UiBWxQ2/ToANM6Ac2feYmQh9gjUf/17925953739297454/small.jpg",
    caption:     "These nails don't walk… they moonwalk ✨🕺🏽"
  },
  {
    permalink:   "https://www.instagram.com/p/DXydRTtABxW/",
    mediaType:   "IMAGE",
    imgSrc:      "https://behold.pictures/IWZ1folSX7djGN1ImGot5UiBWxQ2/ToANM6Ac2feYmQh9gjUf/17986580390806323/small.jpg",
    caption:     "Glam in every detail ✨ Golden-tipped beauties 💅🏼"
  }
];

// SVG badges
const PLAY_ICON     = `<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="white"/></svg>`;
const CAROUSEL_ICON = `<svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1" fill="white"/><rect x="14" y="3" width="7" height="7" rx="1" fill="white"/><rect x="3" y="14" width="7" height="7" rx="1" fill="white"/><rect x="14" y="14" width="7" height="7" rx="1" fill="white"/></svg>`;

function buildPostTile(post, idx) {
  const imgSrc     = post.imgSrc || post.sizes?.small?.mediaUrl || post.mediaUrl;
  const caption    = (post.caption || post.prunedCaption || "").split("\n")[0];
  const isVideo    = post.mediaType === "VIDEO";
  const isCarousel = post.mediaType === "CAROUSEL_ALBUM";

  const a = document.createElement("a");
  a.className = "insta-post";
  a.href      = post.permalink;
  a.target    = "_blank";
  a.rel       = "noreferrer noopener";
  a.setAttribute("aria-label", caption || "Femiz nail design on Instagram");
  a.style.opacity   = "0";
  a.style.transform = "translateY(14px)";
  a.style.transition = `opacity 500ms ease ${idx * 75}ms, transform 500ms cubic-bezier(0.16,1,0.3,1) ${idx * 75}ms`;

  if (imgSrc) {
    const img    = document.createElement("img");
    img.src      = imgSrc;
    img.alt      = caption || "Femiz nail design";
    img.loading  = "lazy";
    img.decoding = "async";
    a.appendChild(img);
  }

  if (caption) {
    const ov  = document.createElement("div");
    ov.className = "insta-post-overlay";
    const cp  = document.createElement("p");
    cp.className   = "insta-post-caption";
    cp.textContent = caption;
    ov.appendChild(cp);
    a.appendChild(ov);
  }

  if (isVideo || isCarousel) {
    const badge = document.createElement("div");
    badge.className = "insta-post-badge";
    badge.innerHTML = isVideo ? PLAY_ICON : CAROUSEL_ICON;
    a.appendChild(badge);
  }

  return a;
}

function renderTiles(posts) {
  if (!INSTA_GRID) return;
  INSTA_GRID.innerHTML = "";
  posts.slice(0, 6).forEach((post, i) => {
    const tile = buildPostTile(post, i);
    INSTA_GRID.appendChild(tile);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      tile.style.opacity   = "1";
      tile.style.transform = "translateY(0)";
    }));
  });
}

async function fetchInstagram() {
  if (!INSTA_GRID) return;

  // ── Step 1: show snapshot immediately (works offline / file://)
  renderTiles(INSTA_SNAPSHOT);

  // ── Step 2: silently try live API and refresh if newer posts exist
  try {
    const res = await fetch(BEHOLD_API);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const livePosts = await res.json();

    // map live API shape to our tile shape
    const mapped = livePosts
      .filter(p => p.sizes?.small?.mediaUrl || p.mediaUrl)
      .map(p => ({
        permalink: p.permalink,
        mediaType: p.mediaType,
        imgSrc:    p.sizes?.small?.mediaUrl || p.mediaUrl,
        caption:   p.prunedCaption || p.caption || ""
      }));

    if (mapped.length) renderTiles(mapped);

  } catch (err) {
    // snapshot already showing — nothing to do
    console.info("Femiz: using Instagram snapshot (live fetch unavailable locally).");
  }
}

fetchInstagram();
