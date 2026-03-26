/* ============================================================
   INKCRAFT STUDIOS — MAIN JAVASCRIPT
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Navbar scroll effect ───────────────────────────────── */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const isLightPage = document.body.classList.contains('light-page');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
        navbar.classList.remove('light-nav');
      } else {
        navbar.classList.remove('scrolled');
        if (isLightPage) navbar.classList.add('light-nav');
      }
    });
    if (isLightPage && window.scrollY <= 60) {
      navbar.classList.add('light-nav');
    }
  }

  /* ── Mobile menu ────────────────────────────────────────── */
  const hamburger   = document.querySelector('.hamburger');
  const mobileMenu  = document.querySelector('.mobile-menu');
  const mobileClose = document.querySelector('.mobile-close');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => mobileMenu.classList.add('open'));
  }
  if (mobileClose && mobileMenu) {
    mobileClose.addEventListener('click', () => mobileMenu.classList.remove('open'));
  }
  // Close on link click
  document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenu) mobileMenu.classList.remove('open');
    });
  });

  /* ── Scroll reveal ──────────────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal, .why-feature');
  if (revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, i * 80);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => observer.observe(el));
  }

  /* ── Animated counter (stats bar) ──────────────────────── */
  const stats = document.querySelectorAll('.stat-number[data-count]');
  if (stats.length) {
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          countObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    stats.forEach(el => countObserver.observe(el));
  }

  function animateCounter(el) {
    const target   = parseInt(el.dataset.count, 10);
    const suffix   = el.dataset.suffix || '';
    const duration = 1800;
    const step     = 16;
    const increment = target / (duration / step);
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current).toLocaleString() + suffix;
    }, step);
  }

  /* ── Smooth anchor scroll ───────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── Contact form handling ──────────────────────────────── */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = this.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'Sending…';
      btn.disabled = true;

      // Simulate a network delay then show confirmation
      setTimeout(() => {
        btn.textContent = '✓ Message Sent!';
        btn.style.background = '#4a7c59';
        setTimeout(() => {
          btn.textContent = originalText;
          btn.disabled = false;
          btn.style.background = '';
          contactForm.reset();
        }, 3000);
      }, 1400);
    });
  }

  /* ── Highlight active nav link ──────────────────────────── */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath) {
      link.style.color = 'var(--gold)';
    }
  });

  /* ── Subtle parallax on hero ────────────────────────────── */
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      heroBg.style.transform = `translateY(${y * 0.3}px)`;
    }, { passive: true });
  }

  /* ── FAQ accordion (if present) ────────────────────────── */
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item   = btn.parentElement;
      const answer = item.querySelector('.faq-answer');
      const isOpen = item.classList.contains('open');
      // close all
      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-answer').style.maxHeight = '0';
      });
      // open current if it was closed
      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

});
