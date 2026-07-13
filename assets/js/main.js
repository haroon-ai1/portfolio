/* =====================================================================
   Portfolio — Muhammad Haroon
   Vanilla JS. No frameworks.
   ===================================================================== */

(function () {
  'use strict';

  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  const prefersReducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isCoarsePointer =
    window.matchMedia('(pointer: coarse)').matches;

  /* -----------------------------------------------------------
     0. Lenis smooth scroll (skipped when reduced motion)
     ----------------------------------------------------------- */
  let lenis = null;
  if (!prefersReducedMotion && typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  /* -----------------------------------------------------------
     0b. Typed.js — hero italic word (skipped when reduced motion)
     ----------------------------------------------------------- */
  if (!prefersReducedMotion && typeof Typed !== 'undefined' && $('#typed')) {
    new Typed('#typed', {
      strings: [
        'ML Engineer.',
        'AI Developer.',
        'CV Researcher.',
        'Deep Learning nerd.',
      ],
      typeSpeed: 55,
      backSpeed: 35,
      backDelay: 2200,
      loop: true,
      smartBackspace: true,
    });
  } else if ($('#typed')) {
    // Static fallback when reduced motion is preferred
    $('#typed').textContent = 'ML Engineer.';
  }

  /* -----------------------------------------------------------
     1. Mobile nav toggle
     ----------------------------------------------------------- */
  const navMenu   = $('#nav-menu');
  const navToggle = $('#nav-toggle');
  const navClose  = $('#nav-close');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => navMenu.classList.add('show-menu'));
  }
  if (navClose && navMenu) {
    navClose.addEventListener('click', () => navMenu.classList.remove('show-menu'));
  }

  // Close menu when a link is clicked
  $$('.nav__link').forEach((link) => {
    link.addEventListener('click', () => navMenu?.classList.remove('show-menu'));
  });

  /* -----------------------------------------------------------
     2. Sticky header + active link highlighting
     ----------------------------------------------------------- */
  const header   = $('#header');
  const scrollUp = $('#scroll-up');
  const sections = $$('section[id]');
  const navLinks = $$('.nav__link');

  const onScroll = () => {
    const y = window.scrollY;

    // Sticky header background
    if (header) {
      header.classList.toggle('scroll-header', y > 50);
    }

    // Scroll-up button visibility
    if (scrollUp) {
      scrollUp.classList.toggle('show-scroll', y > 350);
    }

    // Active-link highlight based on scroll position
    sections.forEach((sec) => {
      const rect = sec.getBoundingClientRect();
      const top  = rect.top + window.scrollY - 80;
      const bot  = top + rect.height;
      const id   = sec.getAttribute('id');
      const link = document.querySelector(`.nav__link[href="#${id}"]`);
      if (!link) return;

      if (y >= top && y < bot) {
        navLinks.forEach((l) => l.classList.remove('active-link'));
        link.classList.add('active-link');
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* -----------------------------------------------------------
     3. Work / project filters
     ----------------------------------------------------------- */
  const filterButtons = $$('.work__filter');
  const workCards     = $$('.work__card');

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => b.classList.remove('active-filter'));
      btn.classList.add('active-filter');

      const filter = btn.dataset.filter;
      workCards.forEach((card) => {
        const cats = (card.dataset.category || '').split(/\s+/);
        const show = filter === 'all' || cats.includes(filter);
        card.classList.toggle('is-hidden', !show);
      });
    });
  });

  /* -----------------------------------------------------------
     4. Service modals
     ----------------------------------------------------------- */
  const modalTriggers = $$('[data-modal-target]');
  const modals        = $$('.modal');

  const openModal  = (id) => document.getElementById(id)?.classList.add('show-modal');
  const closeModal = (m)  => m.classList.remove('show-modal');

  modalTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => openModal(trigger.dataset.modalTarget));
  });

  modals.forEach((modal) => {
    // Backdrop click closes
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal(modal);
    });
    // Close button inside
    modal.querySelector('.modal__close')?.addEventListener('click', () => closeModal(modal));
  });

  // Escape key closes any open modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modals.forEach((m) => {
        if (m.classList.contains('show-modal')) closeModal(m);
      });
    }
  });

  /* -----------------------------------------------------------
     5. Testimonials — Swiper 12
     ----------------------------------------------------------- */
  if (typeof Swiper !== 'undefined') {
    new Swiper('.testimonials__swiper', {
      loop: true,
      grabCursor: true,
      spaceBetween: 24,
      slidesPerView: 1,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        768: { slidesPerView: 2 },
      },
    });
  }

  /* -----------------------------------------------------------
     6. Contact form — EmailJS with mailto fallback
     ----------------------------------------------------------- */
  // TODO: replace these with real EmailJS credentials
  const EMAILJS_SERVICE_ID  = 'REPLACE_SERVICE_ID';
  const EMAILJS_TEMPLATE_ID = 'REPLACE_TEMPLATE_ID';
  const EMAILJS_PUBLIC_KEY  = 'REPLACE_PUBLIC_KEY';
  // TODO: replace with real email — used by mailto: fallback
  const FALLBACK_EMAIL      = 'REPLACE_WITH_YOUR_EMAIL';

  const emailjsConfigured =
    !EMAILJS_SERVICE_ID.includes('REPLACE_') &&
    !EMAILJS_TEMPLATE_ID.includes('REPLACE_') &&
    !EMAILJS_PUBLIC_KEY.includes('REPLACE_');

  if (emailjsConfigured && typeof emailjs !== 'undefined') {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  }

  const form   = $('#contact-form');
  const status = $('#contact-status');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name    = $('#contact-name').value.trim();
      const email   = $('#contact-email').value.trim();
      const message = $('#contact-message').value.trim();

      if (!name || !email || !message) {
        status.textContent = 'Please fill in every field.';
        return;
      }

      if (emailjsConfigured && typeof emailjs !== 'undefined') {
        status.textContent = 'Sending...';
        emailjs
          .sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form)
          .then(() => {
            status.textContent = 'Message sent — thanks, I\'ll reply soon.';
            form.reset();
          })
          .catch(() => {
            status.textContent = 'Something went wrong. Please email me directly.';
          });
      } else {
        // Mailto fallback so the form is useful day-one
        const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
        const body    = encodeURIComponent(
          `Name: ${name}\nEmail: ${email}\n\n${message}`
        );
        window.location.href =
          `mailto:${FALLBACK_EMAIL}?subject=${subject}&body=${body}`;
        status.textContent = 'Opening your email client...';
      }
    });
  }

  /* -----------------------------------------------------------
     7. ScrollReveal (skipped when reduced motion)
     ----------------------------------------------------------- */
  if (!prefersReducedMotion && typeof ScrollReveal !== 'undefined') {
    const sr = ScrollReveal({
      origin: 'bottom',
      distance: '50px',
      duration: 1400,
      delay: 150,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      reset: false,
    });

    sr.reveal('.home__content, .home__image');
    sr.reveal('.about__image, .about__content', { interval: 150 });
    sr.reveal('.work__card', { interval: 150 });
    sr.reveal('.services__card', { interval: 150 });
    sr.reveal('.skills__card', { interval: 150 });
    sr.reveal('.testimonials__swiper');
    sr.reveal('.contact__intro, .contact__info', { interval: 150 });
    sr.reveal('.footer__statement');
  }

  /* -----------------------------------------------------------
     8. Custom cursor (desktop only)
     ----------------------------------------------------------- */
  const cursor = $('#cursor');
  if (cursor && !isCoarsePointer && !prefersReducedMotion) {
    cursor.classList.add('is-active');

    document.addEventListener('mousemove', (e) => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    });

    $$('a, button, input, textarea, [data-modal-target]').forEach((el) => {
      el.addEventListener('mouseenter', () => cursor.classList.add('is-hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('is-hover'));
    });
  }

  /* -----------------------------------------------------------
     9. Smooth scroll for in-page anchors
     (routes through Lenis when it's active — otherwise native)
     ----------------------------------------------------------- */
  $$('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();

      if (lenis) {
        lenis.scrollTo(target, { offset: -60 });
      } else {
        const y = target.getBoundingClientRect().top + window.scrollY - 60;
        window.scrollTo({
          top: y,
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
        });
      }
    });
  });
})();
