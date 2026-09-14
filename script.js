// ===== ADVANCED REALISTIC RAIN + DRIPS + MOUSE =====
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

  // ===== CURSOR GLOW =====
  const cursorGlow = document.createElement('div');
  cursorGlow.className = 'cursor-glow';
  document.body.appendChild(cursorGlow);

  const mouse = { x: -9999, y: -9999, active: false };

  document.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
  });

  document.addEventListener('mouseleave', () => {
    mouse.x = -9999;
    mouse.y = -9999;
    mouse.active = false;
  });

  // ==========================================
  // ===== REALISTIC RAIN (3 LAYERS) =====
  // ==========================================
  const rain = document.getElementById('rain');
  const raindrops = [];

  if (rain) {

    // ===== LAYER 1: BACKGROUND — thin falling lines =====
    for (let i = 0; i < 50; i++) {
      const drop = document.createElement('div');
      drop.className = 'raindrop raindrop-bg';
      drop.style.left = Math.random() * 100 + '%';
      drop.style.animationDuration = (0.8 + Math.random() * 1.2) + 's';
      drop.style.animationDelay = Math.random() * 4 + 's';
      drop.style.height = (30 + Math.random() * 50) + 'px';
      drop.style.opacity = 0.2 + Math.random() * 0.3;
      drop.dataset.layer = 'bg';
      drop.dataset.ox = 0;
      drop.dataset.oy = 0;
      rain.appendChild(drop);
      raindrops.push(drop);
    }

    // ===== LAYER 2: MIDDLE — medium drops =====
    for (let i = 0; i < 30; i++) {
      const drop = document.createElement('div');
      drop.className = 'raindrop raindrop-mid';
      drop.style.left = Math.random() * 100 + '%';
      drop.style.animationDuration = (1.5 + Math.random() * 1.5) + 's';
      drop.style.animationDelay = Math.random() * 5 + 's';
      drop.style.height = (20 + Math.random() * 30) + 'px';
      drop.style.opacity = 0.3 + Math.random() * 0.3;
      drop.dataset.layer = 'mid';
      drop.dataset.ox = 0;
      drop.dataset.oy = 0;
      rain.appendChild(drop);
      raindrops.push(drop);
    }

    // ===== LAYER 3: FOREGROUND — big round drops on "glass" =====
    for (let i = 0; i < 25; i++) {
      const drop = document.createElement('div');
      drop.className = 'raindrop-glassy';
      drop.style.left = Math.random() * 100 + '%';
      drop.style.top = Math.random() * 100 + '%';
      drop.style.width = (6 + Math.random() * 14) + 'px';
      drop.style.height = (6 + Math.random() * 14) + 'px';
      drop.style.animationDelay = Math.random() * 8 + 's';
      drop.style.animationDuration = (8 + Math.random() * 6) + 's';
      drop.dataset.ox = 0;
      drop.dataset.oy = 0;
      rain.appendChild(drop);
      raindrops.push(drop);
    }
  }

  // ===== RAIN PHYSICS (MOUSE REPULSION) =====
  function animateRain() {
    raindrops.forEach(drop => {
      const rect = drop.getBoundingClientRect();
      const dropX = rect.left + rect.width / 2;
      const dropY = rect.top + rect.height / 2;
      const dx = dropX - mouse.x;
      const dy = dropY - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const radius = drop.classList.contains('raindrop-glassy') ? 220 : 150;

      let targetX = 0, targetY = 0;

      if (mouse.active && dist < radius) {
        const force = (radius - dist) / radius;
        const angle = Math.atan2(dy, dx);
        targetX = Math.cos(angle) * force * 70;
        targetY = Math.sin(angle) * force * 70;
      }

      const ox = parseFloat(drop.dataset.ox);
      const oy = parseFloat(drop.dataset.oy);
      const nx = ox + (targetX - ox) * 0.12;
      const ny = oy + (targetY - oy) * 0.12;

      drop.dataset.ox = nx;
      drop.dataset.oy = ny;

      // For glassy drops — already positioned with top, only offset
      if (drop.classList.contains('raindrop-glassy')) {
        drop.style.transform = `translate(${nx}px, ${ny}px)`;
      } else {
        drop.style.transform = `translateX(${nx}px)`;
      }
    });
    requestAnimationFrame(animateRain);
  }
  requestAnimationFrame(animateRain);

  // ===== LIGHTNING =====
  const lightning = document.getElementById('lightning');
  if (lightning) {
    setInterval(() => {
      if (Math.random() < 0.18) {
        lightning.classList.add('flash');
        setTimeout(() => lightning.classList.remove('flash'), 800);
      }
    }, 10000);
  }

  // ===== PRODUCT DRIPS =====
  const productDrips = document.querySelector('.product-drips');
  if (productDrips) {
    for (let i = 0; i < 10; i++) {
      const drop = document.createElement('span');
      drop.className = 'product-drop';
      drop.style.left = (5 + i * 9) + '%';
      drop.style.animationDelay = (i * 0.4) + 's';
      drop.style.animationDuration = (3 + Math.random() * 2) + 's';
      drop.style.height = (30 + Math.random() * 40) + 'px';
      productDrips.appendChild(drop);
    }
  }

  // ===== TEXT DRIPS =====
  const titles = document.querySelectorAll('.hero-title, .section-title, .cta h2');
  titles.forEach(title => {
    for (let i = 0; i < 10; i++) {
      const drip = document.createElement('span');
      drip.className = 'text-drip';
      drip.style.left = (5 + i * 10) + '%';
      drip.style.animationDelay = (i * 0.5) + 's';
      drip.style.animationDuration = (4 + Math.random() * 2) + 's';
      drip.style.height = (25 + Math.random() * 35) + 'px';
      title.appendChild(drip);
    }
  });

  // ===== SCROLL ANIMATION =====
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.feature-card, .spec-item, .gallery-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
  });

});
