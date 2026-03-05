/* app.js — The Heikkila Files */

(function () {
  "use strict";

  /* ========================================
     MOBILE NAVIGATION
     ======================================== */
  const mobileBtn = document.querySelector(".mobile-menu-btn");
  const mobileNav = document.querySelector(".mobile-nav");

  if (mobileBtn && mobileNav) {
    mobileBtn.addEventListener("click", function () {
      const isOpen = mobileNav.classList.contains("active");
      mobileNav.classList.toggle("active");
      mobileNav.setAttribute("aria-hidden", isOpen ? "true" : "false");
      mobileBtn.setAttribute("aria-expanded", isOpen ? "false" : "true");

      // Animate icon
      if (!isOpen) {
        mobileBtn.innerHTML =
          '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>';
      } else {
        mobileBtn.innerHTML =
          '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>';
      }
    });

    // Close mobile nav when clicking a link
    var mobileLinks = mobileNav.querySelectorAll(".mobile-nav-link");
    mobileLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        mobileNav.classList.remove("active");
        mobileNav.setAttribute("aria-hidden", "true");
        mobileBtn.setAttribute("aria-expanded", "false");
        mobileBtn.innerHTML =
          '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>';
      });
    });
  }

  /* ========================================
     HEADER SCROLL BEHAVIOR
     ======================================== */
  var header = document.querySelector(".site-header");
  var lastScroll = 0;

  window.addEventListener(
    "scroll",
    function () {
      var currentScroll = window.scrollY;

      if (header) {
        if (currentScroll > 60) {
          header.classList.add("site-header--scrolled");
        } else {
          header.classList.remove("site-header--scrolled");
        }
      }

      lastScroll = currentScroll;
    },
    { passive: true }
  );

  /* ========================================
     SMOOTH SCROLL FOR NAV LINKS
     ======================================== */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      var targetId = this.getAttribute("href");
      if (targetId === "#") return;

      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  /* ========================================
     TYPEWRITER EFFECT (hero case number)
     ======================================== */
  var caseNumber = document.querySelector(".hero-case-number");
  if (caseNumber) {
    var text = caseNumber.textContent;
    caseNumber.textContent = "";
    caseNumber.style.visibility = "visible";

    var i = 0;
    function typeChar() {
      if (i < text.length) {
        caseNumber.textContent += text.charAt(i);
        i++;
        setTimeout(typeChar, 30 + Math.random() * 40);
      }
    }

    // Start after a short delay
    setTimeout(typeChar, 800);
  }

  /* ========================================
     ACTIVE NAV LINK HIGHLIGHTING
     ======================================== */
  var sections = document.querySelectorAll("section[id]");
  var navLinks = document.querySelectorAll(".nav-link");

  function updateActiveNav() {
    var scrollPos = window.scrollY + 200;

    sections.forEach(function (section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute("id");

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(function (link) {
          link.classList.remove("nav-link--active");
          if (link.getAttribute("href") === "#" + id) {
            link.classList.add("nav-link--active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", updateActiveNav, { passive: true });

  /* ========================================
     FORM SUBMISSION
     ======================================== */
  window.handleFormSubmit = function (e) {
    e.preventDefault();
    var modal = document.getElementById("successModal");
    if (modal) {
      modal.classList.add("active");
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }
    return false;
  };

  window.closeModal = function () {
    var modal = document.getElementById("successModal");
    if (modal) {
      modal.classList.remove("active");
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }
  };

  // Close modal on overlay click
  var modalOverlay = document.getElementById("successModal");
  if (modalOverlay) {
    modalOverlay.addEventListener("click", function (e) {
      if (e.target === modalOverlay) {
        window.closeModal();
      }
    });
  }

  // Close modal on Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      window.closeModal();
    }
  });
})();
