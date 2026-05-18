/* ============================================================
   IRONCLAD FITNESS — script.js
   Features: hamburger menu, back-to-top, animated counters,
             navbar scroll shadow, contact form handler
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  /* ── Hamburger Menu ──────────────────────────────────────── */
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");

  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("open");
      mobileMenu.classList.toggle("open");
    });
    // Close when a link is clicked
    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("open");
        mobileMenu.classList.remove("open");
      });
    });
  }

  /* ── Navbar shadow on scroll ─────────────────────────────── */
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    window.addEventListener("scroll", () => {
      navbar.classList.toggle("scrolled", window.scrollY > 40);
    });
  }

  /* ── Back to Top Button ──────────────────────────────────── */
  const btn = document.getElementById("backToTop");
  if (btn) {
    window.addEventListener("scroll", () => {
      btn.classList.toggle("visible", window.scrollY > 400);
    });
    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ── Animated Counters ───────────────────────────────────── */
  const counters = document.querySelectorAll("[data-count]");

  const animateCounter = (el) => {
    const target = parseInt(el.dataset.count, 10);
    const duration = 1800;
    const step = 16;
    const steps = duration / step;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current).toLocaleString();
    }, step);
  };

  if (counters.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !entry.target.dataset.animated) {
            entry.target.dataset.animated = "true";
            animateCounter(entry.target);
          }
        });
      },
      { threshold: 0.5 },
    );
    counters.forEach((c) => observer.observe(c));
  }

  /* ── Active nav link highlight ───────────────────────────── */
  const page = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a, .mobile-menu a").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === page || (page === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });

  /* ── Contact Form Handler ────────────────────────────────── */
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      contactForm.style.display = "none";
      const success = document.getElementById("formSuccess");
      if (success) success.style.display = "block";
    });
  }

  /* ── Fade-in on scroll (any .fade-in elements) ───────────── */
  const fadeEls = document.querySelectorAll(".fade-in");
  if (fadeEls.length) {
    const fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            fadeObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    fadeEls.forEach((el) => fadeObserver.observe(el));
  }
});
