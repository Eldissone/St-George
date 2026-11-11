// Efeitos de scroll: revelação suave, parallax, barra de progresso, header dinâmico e tilt nos cartões.
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const REVEAL = {
  '.section-head, .intro > *, .commerce > *, .cta .container > *, .page-hero .container > *': 'up',
  '.brand-card, .portfolio-item, .market-card, .content-card, .card, .product-card, .stat, .info-box': 'up',
  '.banner, .map-band, .rich-text, .side-nav': 'zoom'
};

function setupReveal() {
  if (reduce || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-visible');
      io.unobserve(e.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

  const tag = (root = document) => {
    Object.entries(REVEAL).forEach(([sel, type]) => {
      root.querySelectorAll(sel).forEach((el) => {
        if (el.dataset.reveal) return;
        el.dataset.reveal = type;
        const siblings = [...el.parentElement.children].filter((c) => c.dataset.reveal);
        el.style.setProperty('--delay', `${Math.min(siblings.indexOf(el), 6) * 80}ms`);
        io.observe(el);
      });
    });
  };
  tag();
  // Conteúdo carregado dinamicamente (produtos, notícias)
  new MutationObserver(() => tag()).observe(document.querySelector('main') || document.body, { childList: true, subtree: true });
}

function setupProgress() {
  const bar = document.createElement('div');
  bar.className = 'scroll-progress';
  document.body.prepend(bar);
  return (y) => {
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
  };
}

function setupParallax() {
  const hero = document.querySelector('.hero-img');
  if (!hero || reduce) return () => {};
  hero.classList.add('has-parallax');
  return (y) => { if (y < innerHeight * 1.2) hero.style.transform = `translateY(${y * 0.15}px) scale(1.08)`; };
}

function setupTilt() {
  if (reduce || !matchMedia('(hover:hover)').matches) return;
  document.addEventListener('pointermove', (ev) => {
    const card = ev.target.closest?.('.brand-card');
    if (!card) return;
    const r = card.getBoundingClientRect();
    const x = (ev.clientX - r.left) / r.width - 0.5;
    const y = (ev.clientY - r.top) / r.height - 0.5;
    card.style.setProperty('--ry', `${x * 8}deg`);
    card.style.setProperty('--rx', `${-y * 8}deg`);
  });
  document.addEventListener('pointerout', (ev) => {
    const card = ev.target.closest?.('.brand-card');
    if (card && !card.contains(ev.relatedTarget)) { card.style.removeProperty('--rx'); card.style.removeProperty('--ry'); }
  });
}

export function initScrollEffects() {
  setupReveal();
  setupTilt();
  const progress = setupProgress();
  const parallax = setupParallax();
  const header = () => document.querySelector('.site-header');
  let last = 0, ticking = false;
  const update = () => {
    const y = scrollY;
    progress(y);
    parallax(y);
    const h = header();
    if (h) {
      h.classList.toggle('is-scrolled', y > 20);
      h.classList.toggle('is-hidden', y > last && y > 300 && !document.querySelector('.nav.open'));
    }
    last = y; ticking = false;
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  update();
}
