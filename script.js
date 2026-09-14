// ===== MOBILE MENU + RAIN + LIGHTNING + DRIPS =====
document.addEventListener('DOMContentLoaded', () => {

  // ===== MOBILE MENU =====
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu) navMenu.classList.remove('active');
    });
  });

  // ===== RAIN EFFECT (SLOW & ATMOSPHERIC) =====
  const rain = document.getElementById('rain');
  if (rain) {
    const dropsCount = 50;
    for (let i = 0; i < dropsCount; i++) {
      const drop = document.createElement('div');
      drop.className = 'raindrop';
      drop.style.left = Math.random() * 100 + '%';
      drop.style.animationDuration = (2 + Math.random() * 2) + 's';
      drop.style.animationDelay = Math.random() * 5 + 's';
      drop.style.height = (20 + Math.random() * 30) + 'px';
      drop.style.opacity = 0.15 + Math.random() * 0.35;
      rain.appendChild(drop);
    }
  }

  // ===== LIGHTNING (RARE & SUBTLE) =====
  const lightning = document.getElementById('lightning');
  if (lightning) {
    setInterval(() => {
      if (Math.random() < 0.15) {
        lightning.classList.add('flash');
        setTimeout(() => lightning.classList.remove('flash'), 800);
      }
    }, 12000);
  }

  // ===== DRIPS ON PRODUCT IMAGE (DYNAMIC) =====
  const productDrips = document.querySelector('.product-drips');
  if (productDrips) {
    // Створити 8 крапель на фото
    const dropsData = [
      { left: 8, delay: 0, height: 30 },
      { left: 18, delay: 0.8, height: 25 },
      { left: 30, delay: 1.6, height: 40 },
      { left: 42, delay: 0.4, height: 28 },
      { left: 55, delay: 2.0, height: 35 },
      { left: 68, delay: 1.2, height: 22 },
      { left: 80, delay: 0.6, height: 32 },
      { left: 92, delay: 1.8, height: 26 }
    ];

    dropsData.forEach(data => {
      const drop = document.createElement('span');
      drop.className = 'product-drop';
      drop.style.left = data.left + '%';
      drop.style.animationDelay = data.delay + 's';
      drop.style.height = data.height + 'px';
      productDrips.appendChild(drop);
    });
  }

  // ===== DRIPS ON TEXT (EVERY HEADING) =====
  const titles = document.querySelectorAll('.hero-title, .section-title, .cta h2');
  titles.forEach(title => {
    const dripCount = 6;
    for (let i = 0; i < dripCount; i++) {
      const drip = document.createElement('span');
      drip.className = 'text-drip';
      drip.style.left = (10 + (i * 15)) + '%';
      drip.style.animationDelay = (i * 0.4) + 's';
      drip.style.height = (12 + Math.random() * 18) + 'px';
      title.appendChild(drip);
    }
  });

  // ===== SCROLL ANIMATION =====
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

  document.querySelectorAll('.feature-card, .spec-item, .gallery-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
  });

});
