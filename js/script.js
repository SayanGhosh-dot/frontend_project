/* ============================================================
   Frontend Project — Main Script
   ============================================================ */

(function () {
  "use strict";

  /* ----------------------------------------------------------
     1. Theme (dark / light) toggle with localStorage persistence
     ---------------------------------------------------------- */
  const themeToggleBtn = document.getElementById("themeToggle");
  const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector(".theme-icon") : null;

  function applyTheme(isDark) {
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
    if (themeIcon) {
      themeIcon.textContent = isDark ? "\u2600\uFE0F" : "\u263E"; // ☀️ or ☾
    }
  }

  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(savedTheme ? savedTheme === "dark" : prefersDark);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", function () {
      const currentlyDark = document.documentElement.getAttribute("data-theme") === "dark";
      const nextDark = !currentlyDark;
      applyTheme(nextDark);
      localStorage.setItem("theme", nextDark ? "dark" : "light");
    });
  }

  /* ----------------------------------------------------------
     2. Mobile navigation toggle
     ---------------------------------------------------------- */
  const navToggle = document.querySelector(".nav-toggle");
  const navList = document.querySelector(".nav-list");

  if (navToggle && navList) {
    navToggle.addEventListener("click", function () {
      const isOpen = navList.classList.toggle("open");
      navToggle.classList.toggle("open", isOpen);
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close nav when a link is clicked (on mobile)
    navList.querySelectorAll(".nav-link").forEach(function (link) {
      link.addEventListener("click", function () {
        navList.classList.remove("open");
        navToggle.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ----------------------------------------------------------
     3. Active nav link on scroll (Intersection Observer)
     ---------------------------------------------------------- */
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  if (sections.length && navLinks.length) {
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -55% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navLinks.forEach(function (link) {
            const href = link.getAttribute("href");
            link.classList.toggle("active", href === "#" + entry.target.id);
          });
        }
      });
    }, observerOptions);

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  /* ----------------------------------------------------------
     4. Animated counters in the About section
     ---------------------------------------------------------- */
  function animateCounter(el) {
    const target = parseInt(el.getAttribute("data-target"), 10);
    if (isNaN(target)) return;
    const duration = 1200; // ms
    const frameRate = 60;
    const totalFrames = Math.round((duration / 1000) * frameRate);
    let frame = 0;

    const timer = setInterval(function () {
      frame++;
      const progress = frame / totalFrames;
      // ease-out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * easedProgress);
      if (frame >= totalFrames) {
        el.textContent = target;
        clearInterval(timer);
      }
    }, 1000 / frameRate);
  }

  const statNumbers = document.querySelectorAll(".stat-number[data-target]");

  if (statNumbers.length) {
    const counterObserver = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    statNumbers.forEach(function (el) {
      counterObserver.observe(el);
    });
  }

  /* ----------------------------------------------------------
     5. Contact form validation and submission feedback
     ---------------------------------------------------------- */
  const contactForm = document.getElementById("contactForm");
  const formSuccess = document.getElementById("formSuccess");

  function showFieldError(input, message) {
    input.classList.add("invalid");
    const errorEl = input.parentElement.querySelector(".field-error");
    if (errorEl) errorEl.textContent = message;
  }

  function clearFieldError(input) {
    input.classList.remove("invalid");
    const errorEl = input.parentElement.querySelector(".field-error");
    if (errorEl) errorEl.textContent = "";
  }

  function validateEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  if (contactForm) {
    // Real-time validation on blur
    contactForm.querySelectorAll("input, textarea").forEach(function (field) {
      field.addEventListener("blur", function () {
        validateField(field);
      });
      field.addEventListener("input", function () {
        if (field.classList.contains("invalid")) {
          validateField(field);
        }
      });
    });

    function validateField(field) {
      const value = field.value.trim();
      if (!value) {
        showFieldError(field, "This field is required.");
        return false;
      }
      if (field.type === "email" && !validateEmail(value)) {
        showFieldError(field, "Please enter a valid email address.");
        return false;
      }
      clearFieldError(field);
      return true;
    }

    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (formSuccess) formSuccess.textContent = "";

      const fields = contactForm.querySelectorAll("input, textarea");
      let isValid = true;
      fields.forEach(function (field) {
        if (!validateField(field)) isValid = false;
      });

      if (!isValid) return;

      // Simulate async submission
      const submitBtn = contactForm.querySelector("[type='submit']");
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending…";

      setTimeout(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = "Send Message";
        contactForm.reset();
        if (formSuccess) {
          formSuccess.textContent = "✅ Message sent! We'll get back to you soon.";
          setTimeout(function () {
            formSuccess.textContent = "";
          }, 5000);
        }
      }, 1200);
    });
  }

  /* ----------------------------------------------------------
     6. Set current year in footer
     ---------------------------------------------------------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
