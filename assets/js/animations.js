'use strict';

// ============================================
// FRAMER-STYLE 3D ANIMATIONS & INTERACTIONS
// ============================================

// --- Intersection Observer for scroll reveals ---
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, idx) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('revealed');
      }, entry.target.dataset.delay || 0);
      revealObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all animatable elements
function initScrollAnimations() {
  const animatables = document.querySelectorAll(
    '.service-item, .skills-item, .timeline-item, .project-item, .testimonials-item, .blog-post-item, .contact-item, .social-item'
  );
  animatables.forEach((el, i) => {
    el.classList.add('anim-hidden');
    el.dataset.delay = (i % 4) * 80;
    revealObserver.observe(el);
  });
}

// --- 3D Tilt Effect on Cards ---
function init3DTilt() {
  const tiltCards = document.querySelectorAll(
    '.service-item, .content-card, .project-item a, .skills-list'
  );

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotX = ((y - cy) / cy) * -8;
      const rotY = ((x - cx) / cx) * 8;
      card.style.transform = `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.03,1.03,1.03)`;
      card.style.transition = 'transform 0.1s ease';

      // Shimmer highlight
      const pct = (x / rect.width) * 100;
      card.style.setProperty('--shimmer-x', `${pct}%`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s cubic-bezier(0.23,1,0.32,1)';
    });
  });
}

// --- Magnetic button effect ---
function initMagneticButtons() {
  const btns = document.querySelectorAll('.navbar-link, .form-btn, .filter-list button');
  btns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
      btn.style.transition = 'transform 0.1s ease';
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
      btn.style.transition = 'transform 0.5s cubic-bezier(0.23,1,0.32,1)';
    });
  });
}

// --- Animated skill bars on scroll ---
function initSkillBars() {
  const skillFills = document.querySelectorAll('.skill-progress-fill');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const targetWidth = fill.style.width;
        fill.style.width = '0%';
        requestAnimationFrame(() => {
          setTimeout(() => {
            fill.style.transition = 'width 1.4s cubic-bezier(0.25,1,0.5,1)';
            fill.style.width = targetWidth;
          }, 200);
        });
        skillObserver.unobserve(fill);
      }
    });
  }, { threshold: 0.3 });
  skillFills.forEach(f => skillObserver.observe(f));
}

// --- Floating particles background ---
function initParticles() {
  const canvas = document.createElement('canvas');
  canvas.id = 'particles-bg';
  canvas.style.cssText = `
    position: fixed; top: 0; left: 0;
    width: 100%; height: 100%;
    pointer-events: none; z-index: 0;
    opacity: 0.3;
  `;
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');
  let W = canvas.width = window.innerWidth;
  let H = canvas.height = window.innerHeight;

  const particles = Array.from({ length: 40 }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    r: Math.random() * 2 + 0.5,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    alpha: Math.random() * 0.5 + 0.2
  }));

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(45,100%,72%,${p.alpha})`;
      ctx.fill();
    });
    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.strokeStyle = `hsla(45,100%,72%,${0.08 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();

  window.addEventListener('resize', () => {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  });
}

// --- Smooth cursor ---
function initCustomCursor() {
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  const cursorDot = document.createElement('div');
  cursorDot.className = 'cursor-dot';
  document.body.append(cursor, cursorDot);

  let mx = 0, my = 0, cx = 0, cy = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursorDot.style.left = mx + 'px';
    cursorDot.style.top = my + 'px';
  });

  function animateCursor() {
    cx += (mx - cx) * 0.12;
    cy += (my - cy) * 0.12;
    cursor.style.left = cx + 'px';
    cursor.style.top = cy + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  const hoverEls = document.querySelectorAll('a, button, .project-item, .service-item, .content-card');
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
}

// --- Typewriter effect for title ---
function initTypewriter() {
  const titleEl = document.querySelector('.title');
  if (!titleEl) return;
  const titles = ['Full Stack Web Developer', 'WordPress Specialist', 'UI/UX Designer', 'Data Analyst', 'Software Engineer'];
  let tIdx = 0, cIdx = 0, deleting = false;

  function type() {
    const current = titles[tIdx];
    if (!deleting) {
      titleEl.textContent = current.slice(0, ++cIdx);
      if (cIdx === current.length) { deleting = true; setTimeout(type, 2000); return; }
    } else {
      titleEl.textContent = current.slice(0, --cIdx);
      if (cIdx === 0) { deleting = false; tIdx = (tIdx + 1) % titles.length; }
    }
    setTimeout(type, deleting ? 50 : 100);
  }
  type();
}

// --- 3D spinning avatar ---
function init3DAvatar() {
  const avatarBox = document.querySelector('.avatar-box');
  if (!avatarBox) return;
  avatarBox.addEventListener('mousemove', (e) => {
    const rect = avatarBox.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    avatarBox.style.transform = `perspective(300px) rotateY(${x * 25}deg) rotateX(${-y * 25}deg) scale(1.05)`;
    avatarBox.style.transition = 'transform 0.1s ease';
  });
  avatarBox.addEventListener('mouseleave', () => {
    avatarBox.style.transform = '';
    avatarBox.style.transition = 'transform 0.6s cubic-bezier(0.23,1,0.32,1)';
  });
}

// --- Page transition animation ---
function initPageTransitions() {
  const navLinks = document.querySelectorAll('[data-nav-link]');
  const pages = document.querySelectorAll('[data-page]');

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      pages.forEach(page => {
        if (page.classList.contains('active')) {
          page.style.animation = 'pageOut 0.3s ease forwards';
          setTimeout(() => {
            page.style.animation = '';
          }, 300);
        }
      });
      setTimeout(() => {
        const activePage = document.querySelector('[data-page].active');
        if (activePage) {
          activePage.style.animation = 'pageIn 0.4s cubic-bezier(0.23,1,0.32,1) forwards';
          initScrollAnimations();
          init3DTilt();
        }
      }, 50);
    });
  });
}

// --- Glitch effect on name hover ---
function initGlitch() {
  const name = document.querySelector('.name');
  if (!name) return;
  name.setAttribute('data-text', name.textContent);
}

// --- Stagger animate sidebar info on load ---
function initLoadAnimations() {
  const els = [
    '.avatar-box',
    '.name',
    '.title',
    '.info_more-btn',
    '.sidebar-info_more',
    '.navbar',
  ];
  els.forEach((sel, i) => {
    const el = document.querySelector(sel);
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    setTimeout(() => {
      el.style.transition = 'opacity 0.7s ease, transform 0.7s cubic-bezier(0.23,1,0.32,1)';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 200 + i * 120);
  });
}

// --- Init all ---
document.addEventListener('DOMContentLoaded', () => {
  initLoadAnimations();
  initParticles();
  initCustomCursor();
  initTypewriter();
  init3DAvatar();
  initScrollAnimations();
  init3DTilt();
  initMagneticButtons();
  initSkillBars();
  initPageTransitions();
  initGlitch();
});
