// ---------- Nav ----------
const header = document.querySelector('.site-header');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

navToggle.addEventListener('click', () => {
  const open = navMenu.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});

navMenu.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ---------- Reveal on scroll ----------
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach((el) => revealObserver.observe(el));

// ---------- Typed role rotator ----------
// Os cargos vêm do i18n.js, no idioma ativo.
const typedEl = document.getElementById('roleTyped');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let roles = window.i18n.roles();
let roleIndex = 0;
let charIndex = 0;
let deleting = false;
let typeTimer = null;

function typeLoop() {
  const current = roles[roleIndex];

  if (!deleting) {
    charIndex++;
    typedEl.textContent = current.slice(0, charIndex);
    if (charIndex === current.length) {
      const isLast = roleIndex === roles.length - 1;
      deleting = !isLast;
      if (!isLast) typeTimer = setTimeout(typeLoop, 1600);
      return;
    }
  } else {
    charIndex--;
    typedEl.textContent = current.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      roleIndex++;
    }
  }

  typeTimer = setTimeout(typeLoop, deleting ? 35 : 65);
}

function startRoles() {
  clearTimeout(typeTimer);
  roles = window.i18n.roles();
  roleIndex = 0;
  charIndex = 0;
  deleting = false;

  if (prefersReducedMotion) {
    typedEl.textContent = roles[roles.length - 1];
  } else {
    typedEl.textContent = '';
    typeLoop();
  }
}

if (typedEl) {
  startRoles();
  document.addEventListener('languagechange', startRoles);
}

// ---------- Hero network canvas ----------
const canvas = document.getElementById('networkCanvas');

if (canvas && !prefersReducedMotion) {
  const ctx = canvas.getContext('2d');
  let width, height, nodes;
  const NODE_COUNT = 46;
  const LINK_DIST = 140;

  function resize() {
    const hero = canvas.parentElement;
    width = canvas.width = hero.clientWidth;
    height = canvas.height = hero.clientHeight;
  }

  function makeNodes() {
    nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
    }));
  }

  function step() {
    ctx.clearRect(0, 0, width, height);

    for (const n of nodes) {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > width) n.vx *= -1;
      if (n.y < 0 || n.y > height) n.vy *= -1;
    }

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < LINK_DIST) {
          ctx.strokeStyle = `rgba(52, 226, 155, ${0.16 * (1 - dist / LINK_DIST)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    for (const n of nodes) {
      ctx.fillStyle = 'rgba(34, 211, 238, 0.55)';
      ctx.beginPath();
      ctx.arc(n.x, n.y, 1.6, 0, Math.PI * 2);
      ctx.fill();
    }

    if (running) requestAnimationFrame(step);
  }

  let running = true;
  resize();
  makeNodes();
  requestAnimationFrame(step);

  window.addEventListener('resize', () => {
    resize();
    makeNodes();
  });

  document.addEventListener('visibilitychange', () => {
    running = !document.hidden;
    if (running) requestAnimationFrame(step);
  });
}

// ---------- Footer year ----------
document.getElementById('year').textContent = new Date().getFullYear();
