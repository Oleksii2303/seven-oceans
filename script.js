// ===== MAIN SCRIPT — NO RAIN =====

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

  document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
  });

  document.addEventListener('mouseleave', () => {
    cursorGlow.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    cursorGlow.style.opacity = '1';
  });

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

// ===== AUTO-INJECT TRACK ORDER FLOATING BUTTON =====
(function() {
  if (window.location.pathname.includes('track.html')) return;
  if (document.querySelector('.track-fab')) return;

  const fab = document.createElement('a');
  fab.className = 'track-fab';
  fab.href = 'track.html';
  fab.setAttribute('aria-label', 'Track your order');
  fab.innerHTML = `
    <span class="track-fab-icon">📦</span>
    <span class="track-fab-text">Track Order</span>
    <span class="track-fab-dot"></span>
  `;

  document.body.appendChild(fab);
})();

// ===== AUTO-INJECT NAVBAR TRACK LINK =====
(function() {
  if (window.location.pathname.includes('track.html')) return;

  const navMenu = document.getElementById('navMenu');
  if (!navMenu) return;
  if (navMenu.querySelector('.nav-track-link')) return;

  const menuItems = navMenu.querySelectorAll('li');
  let insertAfter = null;

  menuItems.forEach(li => {
    const link = li.querySelector('a');
    if (link && link.textContent.trim() === 'About') {
      insertAfter = li;
    }
  });

  const trackLi = document.createElement('li');
  const trackLink = document.createElement('a');
  trackLink.href = 'track.html';
  trackLink.className = 'nav-track-link';
  trackLink.innerHTML = '📦 Track Order';
  trackLi.appendChild(trackLink);

  if (insertAfter && insertAfter.nextSibling) {
    navMenu.insertBefore(trackLi, insertAfter.nextSibling);
  } else if (insertAfter) {
    navMenu.appendChild(trackLi);
  } else {
    const orderNow = navMenu.querySelector('.btn-nav');
    if (orderNow && orderNow.parentNode) {
      navMenu.insertBefore(trackLi, orderNow.parentNode);
    } else {
      navMenu.appendChild(trackLi);
    }
  }
})();
