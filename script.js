// ===== MOBILE MENU + RAIN + LIGHTNING =====
document.addEventListener('DOMContentLoaded', () => {

  // ===== MOBILE MENU TOGGLE =====
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  // Close menu when clicking a link
  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu) navMenu.classList.remove('active');
    });
  });

  // ===== RAIN EFFECT =====
  const rain = document.getElementById('rain');
  if (rain) {
    const dropsCount = 80;
    for (let i = 0; i < dropsCount; i++) {
      const drop = document.createElement('div');
      drop.className = 'raindrop';
      drop.style.left = Math.random() * 100 + '%';
      drop.style.animationDuration = (0.5 + Math.random() * 0.7) + 's';
      drop.style.animationDelay = Math.random() * 2 + 's';
      drop.style.height = (10 + Math.random() * 20) + 'px';
      drop.style.opacity = 0.3 + Math.random() * 0.5;
      rain.appendChild(drop);
    }
  }

  // ===== LIGHTNING FLASH =====
  const lightning = document.getElementById('lightning');
  if (lightning) {
    setInterval(() => {
      if (Math.random() < 0.3) {
        lightning.classList.add('flash');
        setTimeout(() => lightning.classList.remove('flash'), 500);
      }
    }, 8000);
  }

  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ===== SCROLL ANIMATION (fade in elements on scroll) =====
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe feature cards, spec items
  document.querySelectorAll('.feature-card, .spec-item, .gallery-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

});
