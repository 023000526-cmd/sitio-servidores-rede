document.body.classList.add("js");

const topbar = document.querySelector(".topbar");
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector("#site-nav");

if (topbar && navToggle && siteNav) {
  const closeNav = () => {
    topbar.classList.remove("nav-open");
    navToggle.setAttribute("aria-expanded", "false");
  };

  navToggle.addEventListener("click", () => {
    const isOpen = topbar.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeNav);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 860) {
      closeNav();
    }
  });
}

document.querySelectorAll("[data-carousel]").forEach((carousel) => {
  const track = carousel.querySelector(".carousel-track");
  const slides = Array.from(track.children);
  const prevBtn = carousel.querySelector(".prev");
  const nextBtn = carousel.querySelector(".next");
  const dotsContainer = carousel.querySelector(".carousel-dots");

  let index = 0;
  let autoPlay = null;

  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.setAttribute("aria-label", `Ir a diapositiva ${i + 1}`);
    if (i === 0) {
      dot.classList.add("active");
    }
    dot.addEventListener("click", () => {
      index = i;
      updateCarousel();
      restartAutoPlay();
    });
    dotsContainer.appendChild(dot);
  });

  const dots = Array.from(dotsContainer.children);

  function updateCarousel() {
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle("active", i === index));
  }

  function goNext() {
    index = (index + 1) % slides.length;
    updateCarousel();
  }

  function goPrev() {
    index = (index - 1 + slides.length) % slides.length;
    updateCarousel();
  }

  function restartAutoPlay() {
    clearInterval(autoPlay);
    autoPlay = setInterval(goNext, 5500);
  }

  nextBtn.addEventListener("click", () => {
    goNext();
    restartAutoPlay();
  });

  prevBtn.addEventListener("click", () => {
    goPrev();
    restartAutoPlay();
  });

  carousel.addEventListener("mouseenter", () => clearInterval(autoPlay));
  carousel.addEventListener("mouseleave", restartAutoPlay);

  restartAutoPlay();
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
      }
    });
  },
  { threshold: 0.18 }
);

document.querySelectorAll(".reveal").forEach((section) => {
  revealObserver.observe(section);
});
