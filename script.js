/**
 * Brew Blocks — Pure Coffee in Strict Flat Design
 * Interactive Behaviors:
 * 1. Mobile Full-Screen Navigation Menu Toggle & Accessibility
 * 2. Menu Category Filtering (All / Hot / Cold)
 * 3. Smooth Anchor Scrolling & Active Link Highlighting
 * 4. Contact / Order Form Validation & Flat Alert Feedback
 */

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // 1. Mobile Full-Screen Menu Toggle
  // --------------------------------------------------------------------------
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const closeMenuBtn = document.getElementById('close-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  function openMobileMenu() {
    if (!mobileNav || !hamburgerBtn) return;
    mobileNav.classList.add('open');
    mobileNav.setAttribute('aria-hidden', 'false');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  function closeMobileMenu() {
    if (!mobileNav || !hamburgerBtn) return;
    mobileNav.classList.remove('open');
    mobileNav.setAttribute('aria-hidden', 'true');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', openMobileMenu);
  }

  if (closeMenuBtn) {
    closeMenuBtn.addEventListener('click', closeMobileMenu);
  }

  // Close mobile menu when clicking any link
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // Close mobile menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav && mobileNav.classList.contains('open')) {
      closeMobileMenu();
      hamburgerBtn && hamburgerBtn.focus();
    }
  });

  // --------------------------------------------------------------------------
  // 2. Menu Category Switching (All / Hot / Cold)
  // --------------------------------------------------------------------------
  const categoryTabBtns = document.querySelectorAll('.tab-btn');
  const menuCards = document.querySelectorAll('.menu-card');

  categoryTabBtns.forEach(button => {
    button.addEventListener('click', () => {
      // Manage active category button state
      categoryTabBtns.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const selectedCategory = button.getAttribute('data-category-select');

      menuCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (selectedCategory === 'all' || cardCategory === selectedCategory) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // Card "Select" buttons quickly pre-populate the order dropdown
  const cardSelectBtns = document.querySelectorAll('.card-action');
  const orderSelect = document.getElementById('order-drink');
  const visitForm = document.getElementById('visit-form');

  cardSelectBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = btn.closest('.menu-card');
      if (card && orderSelect) {
        const drinkName = card.querySelector('.card-name')?.textContent.trim();
        // Match option in dropdown
        for (let i = 0; i < orderSelect.options.length; i++) {
          if (orderSelect.options[i].text.includes(drinkName)) {
            orderSelect.selectedIndex = i;
            break;
          }
        }
      }
    });
  });

  // --------------------------------------------------------------------------
  // 3. Smooth Navigation & Active Link Scroll Spy
  // --------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id], footer[id]');
  const desktopNavLinks = document.querySelectorAll('.desktop-nav .nav-link');

  function updateActiveNavLink() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        desktopNavLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });

  // --------------------------------------------------------------------------
  // 4. Contact & Order Form Handling
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const feedbackEl = document.getElementById('form-feedback');

  if (contactForm && feedbackEl) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('user-name');
      const emailInput = document.getElementById('user-email');
      const messageInput = document.getElementById('user-message');
      const selectedDrink = document.getElementById('order-drink')?.value || 'Coffee';

      // Simple validation
      if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
        feedbackEl.className = 'form-feedback error';
        feedbackEl.textContent = 'Please fill out all required fields with solid details.';
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value.trim())) {
        feedbackEl.className = 'form-feedback error';
        feedbackEl.textContent = 'Please provide a valid email address.';
        return;
      }

      // Successful Flat Notification
      feedbackEl.className = 'form-feedback success';
      feedbackEl.textContent = `Thanks, ${nameInput.value.trim()}! Your order request for "${selectedDrink}" has been received. We will email confirmation shortly.`;

      // Reset form fields
      contactForm.reset();

      // Smoothly hide notification after 7 seconds
      setTimeout(() => {
        feedbackEl.className = 'form-feedback';
        feedbackEl.textContent = '';
      }, 7000);
    });
  }
});
