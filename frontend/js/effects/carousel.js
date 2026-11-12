// Carrossel: autoplay, setas, bolinhas, swipe e teclado.
export function initCarousels() {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('[data-carousel]').forEach((root) => {
    const slides = [...root.querySelectorAll('.carousel__slide')];
    const dotsBox = root.parentElement.querySelector('[data-carousel-dots]');
    if (slides.length < 2) return;
    let index = 0, timer = null;

    const dots = slides.map((_, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', `Ir para o slide ${i + 1}`);
      b.addEventListener('click', () => { go(i); restart(); });
      dotsBox?.appendChild(b);
      return b;
    });

    function go(i) {
      index = (i + slides.length) % slides.length;
      slides.forEach((s, n) => { s.classList.toggle('is-active', n === index); s.setAttribute('aria-hidden', String(n !== index)); });
      dots.forEach((d, n) => { d.classList.toggle('is-active', n === index); d.setAttribute('aria-current', String(n === index)); });
    }
    const next = () => go(index + 1);
    const prev = () => go(index - 1);
    const stop = () => { clearInterval(timer); timer = null; };
    const start = () => { if (!reduce && !timer) timer = setInterval(next, 5000); };
    const restart = () => { stop(); start(); };

    root.querySelector('.carousel__btn--next')?.addEventListener('click', () => { next(); restart(); });
    root.querySelector('.carousel__btn--prev')?.addEventListener('click', () => { prev(); restart(); });
    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', start);
    root.addEventListener('focusin', stop);
    root.addEventListener('focusout', start);
    root.tabIndex = 0;
    root.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { next(); restart(); }
      if (e.key === 'ArrowLeft') { prev(); restart(); }
    });

    let x0 = null;
    root.addEventListener('pointerdown', (e) => { x0 = e.clientX; });
    root.addEventListener('pointerup', (e) => {
      if (x0 === null) return;
      const dx = e.clientX - x0; x0 = null;
      if (Math.abs(dx) > 40) { dx < 0 ? next() : prev(); restart(); }
    });
    document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));

    go(0);
    start();
  });
}
