/* ==========================================================================
   LakshTech Solutions - global behaviour
   --------------------------------------------------------------------------
   Vanilla JavaScript. No frameworks, no dependencies.
   Modules
   01. Helpers
   02. Header state + scroll-to-top
   03. Mobile navigation drawer
   04. Scroll reveal
   05. Animated statistics counters
   06. Portfolio filtering
   07. FAQ accordion
   08. Contact form validation
   09. Footer year
   ========================================================================== */

(function () {
  'use strict';

  /* 01. HELPERS ======================================================== */
  const $ = (selector, scope) => (scope || document).querySelector(selector);
  const $$ = (selector, scope) => Array.prototype.slice.call((scope || document).querySelectorAll(selector));

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function on(element, event, handler, options) {
    if (element) element.addEventListener(event, handler, options);
  }

  /* 02. HEADER STATE + SCROLL TO TOP =================================== */
  function initScrollUI() {
    const header = $('.site-header');
    const toTop = $('.to-top');

    // Scroll state is derived from IntersectionObserver sentinels, so there is
    // no scroll listener running on every frame.
    function sentinel(offset) {
      const el = document.createElement('div');
      el.className = offset > 0 ? 'scroll-sentinel scroll-sentinel--deep' : 'scroll-sentinel';
      el.setAttribute('aria-hidden', 'true');
      el.style.top = offset + 'px';
      document.body.insertBefore(el, document.body.firstChild);
      return el;
    }

    if ('IntersectionObserver' in window) {
      if (header) {
        new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            header.classList.toggle('is-scrolled', !entry.isIntersecting);
          });
        }, { threshold: 0 }).observe(sentinel(0));
      }

      if (toTop) {
        new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            toTop.classList.toggle('is-visible', !entry.isIntersecting);
          });
        }, { threshold: 0 }).observe(sentinel(600));
      }
    }

    on(toTop, 'click', function () {
      const reduce = prefersReducedMotion.matches;
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
      const brand = $('.brand');
      if (brand) {
        brand.setAttribute('tabindex', '-1');
        brand.focus({ preventScroll: true });
        brand.removeAttribute('tabindex');
      }
    });
  }

  /* 03. MOBILE NAVIGATION DRAWER ======================================= */
  function initMobileNav() {
    const toggle = $('.nav-toggle');
    const drawer = $('.nav-drawer');
    const backdrop = $('.nav-backdrop');
    const closeBtn = $('.nav-drawer__close');
    if (!toggle || !drawer) return;

    let lastFocused = null;

    function focusableIn(container) {
      return $$('a[href], button:not([disabled]), input, select, textarea', container)
        .filter(function (el) { return el.offsetParent !== null; });
    }

    function openDrawer() {
      lastFocused = document.activeElement;
      drawer.classList.add('is-open');
      if (backdrop) backdrop.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.classList.add('is-locked');
      const first = focusableIn(drawer)[0];
      if (first) first.focus();
    }

    function closeDrawer() {
      drawer.classList.remove('is-open');
      if (backdrop) backdrop.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('is-locked');
      if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
    }

    on(toggle, 'click', function () {
      if (toggle.getAttribute('aria-expanded') === 'true') closeDrawer();
      else openDrawer();
    });

    on(closeBtn, 'click', closeDrawer);
    on(backdrop, 'click', closeDrawer);

    on(drawer, 'click', function (event) {
      if (event.target.closest('a')) closeDrawer();
    });

    on(document, 'keydown', function (event) {
      if (event.key === 'Escape' && drawer.classList.contains('is-open')) {
        closeDrawer();
        return;
      }

      if (event.key === 'Tab' && drawer.classList.contains('is-open')) {
        const items = focusableIn(drawer);
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    });

    // Reset drawer state if the viewport grows past the mobile breakpoint.
    const desktop = window.matchMedia('(min-width: 981px)');
    const syncOnResize = function (event) {
      if (event.matches && drawer.classList.contains('is-open')) closeDrawer();
    };
    if (typeof desktop.addEventListener === 'function') desktop.addEventListener('change', syncOnResize);
    else if (typeof desktop.addListener === 'function') desktop.addListener(syncOnResize);
  }

  /* 04. SCROLL REVEAL ================================================== */
  function initReveal() {
    const items = $$('.reveal');
    if (!items.length) return;

    if (!('IntersectionObserver' in window) || prefersReducedMotion.matches) {
      items.forEach(function (el) { el.classList.add('is-revealed'); });
      return;
    }

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    items.forEach(function (el) { observer.observe(el); });
  }

  /* 05. ANIMATED STATISTICS COUNTERS =================================== */
  function initCounters() {
    const counters = $$('[data-count-to]');
    if (!counters.length) return;

    function animate(el) {
      const target = parseFloat(el.getAttribute('data-count-to'));
      const decimals = parseInt(el.getAttribute('data-count-decimals') || '0', 10);
      const duration = 1500;

      if (prefersReducedMotion.matches || isNaN(target)) {
        el.textContent = target.toFixed(decimals);
        return;
      }

      const start = performance.now();

      function frame(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = target * eased;

        el.textContent = decimals > 0
          ? value.toFixed(decimals)
          : Math.round(value).toLocaleString('en-IN');

        if (progress < 1) window.requestAnimationFrame(frame);
      }

      window.requestAnimationFrame(frame);
    }

    if (!('IntersectionObserver' in window)) {
      counters.forEach(animate);
      return;
    }

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    counters.forEach(function (el) { observer.observe(el); });
  }

  /* 06. PORTFOLIO FILTERING ============================================ */
  function initPortfolioFilter() {
    const filters = $$('[data-filter]');
    const grid = $('#project-grid');
    if (!filters.length || !grid) return;

    const cards = $$('[data-category]', grid);
    const empty = $('#portfolio-empty');
    const status = $('#filter-status');
    const emptyBtn = $('#portfolio-empty-reset');

    function applyFilter(value) {
      let visible = 0;

      cards.forEach(function (card) {
        const categories = (card.getAttribute('data-category') || '').split(/\s+/);
        const match = value === 'all' || categories.indexOf(value) !== -1;
        card.classList.toggle('is-hidden', !match);
        card.setAttribute('aria-hidden', match ? 'false' : 'true');
        if (match) visible += 1;
      });

      filters.forEach(function (btn) {
        btn.setAttribute('aria-pressed', btn.getAttribute('data-filter') === value ? 'true' : 'false');
      });

      if (empty) empty.classList.toggle('is-visible', visible === 0);

      if (status) {
        status.textContent = visible === 0
          ? 'No projects match this category yet.'
          : 'Showing ' + visible + ' of ' + cards.length + ' sample projects.';
      }
    }

    filters.forEach(function (btn) {
      on(btn, 'click', function () {
        applyFilter(btn.getAttribute('data-filter'));
      });
    });

    on(emptyBtn, 'click', function () {
      applyFilter('all');
      const all = filters.filter(function (b) { return b.getAttribute('data-filter') === 'all'; })[0];
      if (all) all.focus();
    });

    applyFilter('all');
  }

  /* 07. FAQ ACCORDION ================================================== */
  function initAccordion() {
    $$('.accordion').forEach(function (accordion) {
      const triggers = $$('.accordion__trigger', accordion);

      triggers.forEach(function (trigger) {
        const panel = document.getElementById(trigger.getAttribute('aria-controls'));
        if (!panel) return;

        on(trigger, 'click', function () {
          const expanded = trigger.getAttribute('aria-expanded') === 'true';

          triggers.forEach(function (other) {
            other.setAttribute('aria-expanded', 'false');
            const otherPanel = document.getElementById(other.getAttribute('aria-controls'));
            if (otherPanel) otherPanel.classList.remove('is-open');
          });

          if (!expanded) {
            trigger.setAttribute('aria-expanded', 'true');
            panel.classList.add('is-open');
          }
        });
      });
    });
  }

  /* 08. CONTACT FORM VALIDATION ======================================== */
  function initContactForm() {
    const form = $('#contact-form');
    if (!form) return;

    const successBox = $('#form-success');
    const errorBox = $('#form-error');
    const submitBtn = $('#form-submit');
    const submitLabel = $('#form-submit-label');
    let attempted = false;

    const validators = {
      name: function (value) {
        if (!value.trim()) return 'Please enter your full name.';
        if (value.trim().length < 2) return 'Your name must be at least 2 characters.';
        return '';
      },
      email: function (value) {
        if (!value.trim()) return 'Please enter your email address.';
        if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(value.trim())) {
          return 'Enter a valid email address, for example name@company.com.';
        }
        return '';
      },
      phone: function (value) {
        if (!value.trim()) return ''; // optional
        const digits = value.replace(/\D/g, '');
        if (digits.length !== 10) {
          return 'Phone number must be exactly 10 digits.';
        }
        return '';
      },
      subject: function (value) {
        if (!value.trim()) return 'Please add a subject so we know what this is about.';
        return '';
      },
      message: function (value) {
        if (!value.trim()) return 'Please tell us about your project.';
        if (value.trim().length < 20) return 'Please add a little more detail (at least 20 characters).';
        return '';
      }
    };

    function fieldWrap(input) {
      return input.closest('.field');
    }

    function setError(input, message) {
      const wrap = fieldWrap(input);
      if (!wrap) return;
      const errorEl = $('.field__error', wrap);
      const inputId = input.getAttribute('id');

      if (message) {
        wrap.classList.add('has-error');
        input.setAttribute('aria-invalid', 'true');
        if (errorEl) {
          const span = errorEl.querySelector('span');
          if (span) span.textContent = message;
          errorEl.setAttribute('id', inputId + '-error');
          input.setAttribute('aria-describedby', inputId + '-error');
        }
      } else {
        wrap.classList.remove('has-error');
        input.setAttribute('aria-invalid', 'false');
        if (errorEl) {
          const span = errorEl.querySelector('span');
          if (span) span.textContent = '';
        }
        const describedBy = input.getAttribute('aria-describedby');
        if (describedBy && describedBy === inputId + '-error') {
          input.removeAttribute('aria-describedby');
        }
      }
    }

    function validateField(input) {
      const validator = validators[input.name];
      if (!validator) return true;
      const message = validator(input.value);
      setError(input, message);
      return !message;
    }

    const fields = $$('input[name], select[name], textarea[name]', form);

    fields.forEach(function (input) {
      on(input, 'blur', function () {
        if (attempted || input.value.trim() !== '') validateField(input);
      });

      on(input, 'input', function () {
        const wrap = fieldWrap(input);
        if (attempted && wrap && wrap.classList.contains('has-error')) validateField(input);
      });
    });

    on(form, 'submit', function (event) {
      event.preventDefault();
      attempted = true;

      let firstInvalid = null;
      let errorCount = 0;

      fields.forEach(function (input) {
        const valid = validateField(input);
        if (!valid) {
          errorCount += 1;
          if (!firstInvalid) firstInvalid = input;
        }
      });

      if (errorCount > 0) {
        if (successBox) successBox.classList.remove('is-visible');
        if (errorBox) {
          errorBox.classList.add('is-visible');
          errorBox.scrollIntoView({ behavior: prefersReducedMotion.matches ? 'auto' : 'smooth', block: 'center' });
        }
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      if (errorBox) errorBox.classList.remove('is-visible');

      if (submitBtn) {
        submitBtn.disabled = true;
        if (submitLabel) submitLabel.textContent = 'Validating…';
      }

      // Demo-only behaviour: the site has no backend, so nothing is transmitted.
      window.setTimeout(function () {
        if (submitBtn) {
          submitBtn.disabled = false;
          if (submitLabel) submitLabel.textContent = 'Send message';
        }

        if (successBox) {
          successBox.classList.add('is-visible');
          successBox.scrollIntoView({ behavior: prefersReducedMotion.matches ? 'auto' : 'smooth', block: 'center' });
        }

        form.reset();
        fields.forEach(function (input) { setError(input, ''); });
        attempted = false;
      }, 450);
    });
  }

  /* 09. SUBJECT PREFILL FROM THE URL =================================== */
  function initSubjectPrefill() {
    const input = $('#subject');
    if (!input) return;

    let requested = '';
    try {
      requested = new URLSearchParams(window.location.search).get('subject') || '';
    } catch (error) {
      requested = '';
    }

    requested = requested.replace(/\s+/g, ' ').trim().slice(0, 120);
    if (!requested) return;

    input.value = requested;

    const wrap = input.closest('.field');
    if (wrap) {
      const note = document.createElement('p');
      note.className = 'field__hint';
      note.textContent = 'Prefilled from the page you came from. Change it if you want to ask about something else.';
      const errorEl = $('.field__error', wrap);
      if (errorEl && errorEl.parentNode) errorEl.parentNode.insertBefore(note, errorEl);
    }
  }

  /* 10. HASH TARGET SCROLL ============================================= */
  function initHashScroll() {
    const hash = window.location.hash;
    if (!hash || hash.length < 2) return;

    let id = hash.slice(1);
    try { id = decodeURIComponent(id); } catch (error) { id = hash.slice(1); }

    const target = document.getElementById(id);
    if (!target) return;

    const jump = function () {
      const offset = 96;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: Math.max(top, 0), behavior: prefersReducedMotion.matches ? 'auto' : 'smooth' });
    };

    // Web fonts and images can shift the layout after the browser's first jump.
    window.addEventListener('load', function () { window.setTimeout(jump, 80); });
    window.setTimeout(jump, 450);
  }

  /* 11. FOOTER YEAR ==================================================== */
  function initFooterYear() {
    const year = $('#current-year');
    if (year) year.textContent = String(new Date().getFullYear());
  }

  /* BOOT ============================================================== */
  function init() {
    initScrollUI();
    initMobileNav();
    initReveal();
    initCounters();
    initPortfolioFilter();
    initAccordion();
    initContactForm();
    initSubjectPrefill();
    initHashScroll();
    initFooterYear();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
