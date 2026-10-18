// Lumina Studio Interactive Features
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('nav-active');
      mobileToggle.classList.toggle('is-open');
    });
  }

  // Work Filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const workCards = document.querySelectorAll('.work-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      workCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'block';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            if (btn.getAttribute('data-filter') !== 'all' && category !== filterValue) {
              card.style.display = 'none';
            }
          }, 250);
        }
      });
    });
  });

  // Animated Numbers Counter
  const statNumbers = document.querySelectorAll('.stat-number');
  let hasAnimated = false;

  const runCounterAnimation = () => {
    statNumbers.forEach(stat => {
      const text = stat.innerText;
      const target = parseFloat(text);
      if (isNaN(target)) return;

      const suffix = text.replace(/[\d.]/g, '');
      let current = 0;
      const step = target / 40;

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          stat.innerText = target + suffix;
          clearInterval(timer);
        } else {
          stat.innerText = (target % 1 === 0 ? Math.floor(current) : current.toFixed(1)) + suffix;
        }
      }, 35);
    });
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        runCounterAnimation();
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.querySelector('.stats-grid');
  if (statsSection) {
    observer.observe(statsSection);
  }

  // Contact Form Submission Mock
  const contactForm = document.getElementById('contactForm');
  const toast = document.getElementById('toast');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerText;
      submitBtn.innerText = 'Sending...';
      submitBtn.disabled = true;

      setTimeout(() => {
        contactForm.reset();
        submitBtn.innerText = originalText;
        submitBtn.disabled = false;

        if (toast) {
          toast.classList.add('show');
          setTimeout(() => {
            toast.classList.remove('show');
          }, 3500);
        }
      }, 700);
    });
  }
});
