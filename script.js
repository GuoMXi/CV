const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const lightbox = document.querySelector("[data-lightbox-panel]");
const lightboxImage = document.querySelector("[data-lightbox-image]");
const lightboxClose = document.querySelector("[data-lightbox-close]");

const syncHeader = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 18);
};

window.addEventListener("scroll", syncHeader, { passive: true });
syncHeader();

if (nav && navToggle && header) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    header.classList.toggle("is-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      header.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const closeLightbox = () => {
  if (!lightbox || !lightboxImage) return;
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
  document.body.classList.remove("lightbox-open");
};

document.querySelectorAll("[data-lightbox]").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    if (!lightbox || !lightboxImage) return;
    lightboxImage.src = trigger.getAttribute("data-lightbox") || "";
    lightboxImage.alt = trigger.querySelector("img")?.alt || "反馈截图";
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");
  });
});

lightboxClose?.addEventListener("click", closeLightbox);

lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeLightbox();
  }
});

const feedbackViewer = document.querySelector("[data-feedback-viewer]");

if (feedbackViewer) {
  const slides = Array.from(feedbackViewer.querySelectorAll(".feedback-slide"));
  const prev = feedbackViewer.querySelector("[data-feedback-prev]");
  const next = feedbackViewer.querySelector("[data-feedback-next]");
  const status = feedbackViewer.querySelector("[data-feedback-status]");
  let activeIndex = 0;

  const setFeedbackSlide = (index) => {
    activeIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === activeIndex;
      slide.classList.toggle("is-active", isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
    });
    if (status) {
      status.textContent = `${activeIndex + 1} / ${slides.length}`;
    }
  };

  prev?.addEventListener("click", () => {
    setFeedbackSlide(activeIndex - 1);
  });

  next?.addEventListener("click", () => {
    setFeedbackSlide(activeIndex + 1);
  });

  setFeedbackSlide(0);
}
