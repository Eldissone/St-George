const links = [
  ['/', 'Início'], ['/about-us', 'Sobre nós'], ['/products', 'Produtos'], ['/market', 'Mercado'], ['/corporate-responsibility', 'Responsabilidade'], ['/blog', 'Notícias'], ['/contact-us', 'Contactos'], ['/careers', 'Carreiras']
];
export function mountLayout() {
  const page = document.body.dataset.page || '';
  const header = document.querySelector('[data-header]');
  const footer = document.querySelector('[data-footer]');
  if (header) header.innerHTML = `<header class="site-header"><a class="brand" href="/">ST. <span>GEORGE</span></a><button class="nav-toggle" aria-label="Abrir menu" aria-expanded="false">☰</button><nav class="nav" aria-label="Navegação principal">${links.map(([href, label]) => `<a href="${href}" class="${page === href ? 'active' : ''}">${label}</a>`).join('')}</nav><div class="header-actions"><button class="lang" type="button">PT / EN</button><a class="button" href="/contact-us">Fale connosco</a></div></header>`;
  const headerBrand = header?.querySelector('.brand');
  if (headerBrand) {
    headerBrand.classList.add('brand--logo');
    headerBrand.setAttribute('aria-label', 'St. George — início');
    headerBrand.innerHTML = '<img src="/assets/logos/St.-George-factory-logo-official.png" alt="St. George">';
  }
  if (footer) footer.innerHTML = `<footer class="site-footer"><div class="footer-grid"><div><a class="brand" href="/">ST. <span>GEORGE</span></a><p style="margin-top:18px;max-width:310px">Uma empresa angolana orientada pela qualidade, confiança e criação de valor sustentável.</p></div><div><h3>Institucional</h3><ul><li><a href="/about-us">Sobre nós</a></li><li><a href="/market">Mercado</a></li><li><a href="/corporate-responsibility">Responsabilidade</a></li><li><a href="/careers">Carreiras</a></li></ul></div><div><h3>Contactos</h3><ul><li>Luanda, Angola</li><li><a href="mailto:geral@stgeorge.co.ao">geral@stgeorge.co.ao</a></li><li><a href="/contact-us">Enviar mensagem</a></li></ul></div></div><div class="footer-bottom"><span>© ${new Date().getFullYear()} St. George. Todos os direitos reservados.</span><span><a href="/admin/login">Área reservada</a></span></div></footer>`;
  const toggle = document.querySelector('.nav-toggle');
  toggle?.addEventListener('click', () => { const nav = document.querySelector('.nav'); const open = nav.classList.toggle('open'); toggle.setAttribute('aria-expanded', String(open)); });
  const top = document.querySelector('.back-top');
  window.addEventListener('scroll', () => top?.classList.toggle('visible', scrollY > 500), { passive: true });
  top?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}
