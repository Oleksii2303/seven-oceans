// ===== MOBILE MENU + RAIN + LIGHTNING + DRIPS + MOUSE INTERACTION =====
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

  // ===== CREATE CURSOR GLOW =====
  const cursorGlow = document.createElement('div');
  cursorGlow.className = 'cursor-glow';
  document.body.appendChild(cursorGlow);

  // ===== MOUSE POSITION TRACKING =====
  const mouse = { x: -1000, y: -1000 };
  let mouseActive = false;

  document.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouseActive = true;
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
  });

  document.addEventListener('mouseleave', () => {
    mouse.x = -1000;
    mouse.y = -1000;
    mouseActive = false;
  });

  // ===== RAIN EFFECT (INTERACTIVE) =====
  const rain = document.getElementById('rain');
  const raindrops = [];

  if (rain) {
    const dropsCount = 60;
    for (let i = 0; i < dropsCount; i++) {
      const drop = document.createElement('div');
      drop.className = 'raindrop';
      drop.style.left = Math.random() * 100 + '%';
      drop.style.animationDuration = (2.5 + Math.random() * 2.5) + 's';
      drop.style.animationDelay = Math.random() * 5 + 's';
      drop.style.height = (20 + Math.random() * 30) + 'px';
      drop.style.opacity = 0.15 + Math.random() * 0.35;

      // Store speed multiplier for physics
      drop.dataset.speed = 0.5 + Math.random() * 0.5;
      drop.dataset.offsetX = 0;
      drop.dataset.offsetY = 0;

      rain.appendChild(drop);
      raindrops.push(drop);
    }
  }

  // ===== RAIN PHYSICS (MOUSE REPULSION) =====
  let lastTime = performance.now();

  function animateRain(currentTime) {
    const deltaTime = Math.min((currentTime - lastTime) / 16, 3);
    lastTime = currentTime;

    raindrops.forEach(drop => {
      const rect = drop.getBoundingClientRect();
      const dropX = rect.left + rect.width / 2;
      const dropY = rect.top + rect.height / 2;

      // Distance from mouse
      const dx = dropX - mouse.x;
      const dy = dropY - mouse.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Repulsion radius
      const repulsionRadius = 150;

      if (distance < repulsionRadius && mouseActive) {
        // Push drop away from cursor
        const force = (repulsionRadius - distance) / repulsionRadius;
        const angle = Math.atan2(dy, dx);

        // Target offset
        const targetOffsetX = Math.cos(angle) * force * 60;
        const targetOffsetY = Math.sin(angle) * force * 60;

        // Smooth transition
        const currentOffsetX = parseFloat(drop.dataset.offsetX) || 0;
        const currentOffsetY = parseFloat(drop.dataset.offsetY) || 0;

        const newOffsetX = currentOffsetX + (targetOffsetX - currentOffsetX) * 0.15;
        const newOffsetY = currentOffsetY + (targetOffsetY - currentOffsetY) * 0.15;

        drop.dataset.offsetX = newOffsetX;
        drop.dataset.offsetY = newOffsetY;

        drop.style.transform = `translate(${newOffsetX}px, ${newOffsetY}px)`;
        drop.classList.add('pushed');
      } else {
        // Return to normal
        const currentOffsetX = parseFloat(drop.dataset.offsetX) || 0;
        const currentOffsetY = parseFloat(drop.dataset.offsetY) || 0;

        const newOffsetX = currentOffsetX * 0.9;
        const newOffsetY = currentOffsetY * 0.9;

        drop.dataset.offsetX = newOffsetX;
        drop.dataset.offsetY = newOffsetY;

        if (Math.abs(newOffsetX) > 0.1 || Math.abs(newOffsetY) > 0.1) {
          drop.style.transform = `translate(${newOffsetX}px, ${newOffsetY}px)`;
        } else {
          drop.style.transform = '';
        }
        drop.classList.remove('pushed');
      }
    });

    requestAnimationFrame(animateRain);
  }

  requestAnimationFrame(animateRain);

  // ===== LIGHTNING =====
  const lightning = document.getElementById('lightning');
  if (lightning) {
    setInterval(() => {
      if (Math.random() < 0.15) {
        lightning.classList.add('flash');
        setTimeout(() => lightning.classList.remove('flash'), 800);
      }
    }, 12000);
  }

  // ===== PRODUCT DRIPS (DYNAMIC) =====
  const productDrips = document.querySelector('.product-drips');
  if (productDrips) {
    const dropsData = [
      { left: 8, delay: 0, height: 40 },
      { left: 18, delay: 0.8, height: 55 },
      { left: 30, delay: 1.6, height: 70 },
      { left: 42, delay: 0.4, height: 50 },
      { left: 55, delay: 2.0, height: 65 },
      { left: 68, delay: 1.2, height: 45 },
      { left: 80, delay: 0.6, height: 60 },
      { left: 92, delay: 1.8, height: 48 }
    ];

    dropsData.forEach(data => {
      const drop = document.createElement('span');
      drop.className = 'product-drop';
      drop.style.left = data.left + '%';
      drop.style.animationDelay = data.delay + 's';
      drop.style.animationDuration = (3 + Math.random() * 2) + 's';
      drop.style.height = data.height + 'px';
      productDrips.appendChild(drop);
    });
  }

  // ===== TEXT DRIPS (EVERY HEADING) =====
  const titles = document.querySelectorAll('.hero-title, .section-title, .cta h2');
  titles.forEach(title => {
    const dripCount = 8;
    for (let i = 0; i < dripCount; i++) {
      const drip = document.createElement('span');
      drip.className = 'text-drip';
      drip.style.left = (5 + (i * 12)) + '%';
      drip.style.animationDelay = (i * 0.6) + 's';
      drip.style.animationDuration = (4 + Math.random() * 2) + 's';
      drip.style.height = (20 + Math.random() * 30) + 'px';
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
