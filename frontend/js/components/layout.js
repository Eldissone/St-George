const links = [
  ['/', 'Início'], ['/about-us', 'A Empresa'],['/marcas', 'Marcas'], ['/products', 'Produtos'], ['/market', 'Distribuição'], ['/corporate-responsibility', 'Responsabilidade'], ['/blog', 'Notícias e Conteúdos'], ['/contact-us', 'Contactos']
];
export function mountLayout() {
  const page = document.body.dataset.page || '';
  const header = document.querySelector('[data-header]');
  const footer = document.querySelector('[data-footer]');
  if (header) header.innerHTML = `<header class="site-header">
  <a class="brand" href="/">ST. <span>GEORGE</span></a>
  <button class="nav-toggle" aria-label="Abrir menu" aria-expanded="false">☰</button>
  <nav class="nav" aria-label="Navegação principal">${links.map(([href, label]) => `<a href="${href}" class="${page === href ? 'active' : ''}">${label}</a>`).join('')}</nav>
    <div class="header-actions">
      <button class="lang" type="button">PT / EN</button>
      <a class="button" href="/contact-us">Fale connosco</a>
    </div>
  </header>`;
  const headerBrand = header?.querySelector('.brand');
  if (headerBrand) {
    headerBrand.classList.add('brand--logo');
    headerBrand.setAttribute('aria-label', 'St. George — início');
    headerBrand.innerHTML = '<img src="/assets/logos/St.-George-factory-logo-official.png" alt="St. George">';
  }
  if (footer) footer.innerHTML = `
  <footer class="site-footer">
    <div class="footer-bar">
      <a class="brand brand--logo" href="/" aria-label="St. George"><img src="/assets/logos/St.-George-factory-logo-official.png" alt="St. George"></a>
      <span>Qualidade que alimenta</span>
      <a href="/contact-us">Telefone e WhatsApp</a>
      <a href="mailto:geral@stgeorge.co.ao">Email comercial</a>
      <a href="/contact-us">Local</a>
    </div>
    <div class="footer-bottom">
      <span>© ${new Date().getFullYear()} St. George. Todos os direitos reservados.</span>
      <span><a href="/admin/login">Área reservada</a></span>
    </div>
  </footer>`;
  const chat = document.querySelector('.floating-chat');
  if (chat) chat.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 20.5l1.6-5.3A8.4 8.4 0 1 1 21 11.5z"/><path d="M8.5 10h7M8.5 13.5h4.5"/></svg>';
  const toggle = document.querySelector('.nav-toggle');
  toggle?.addEventListener('click', () => { const nav = document.querySelector('.nav'); const open = nav.classList.toggle('open'); toggle.setAttribute('aria-expanded', String(open)); });
  const top = document.querySelector('.back-top');
  window.addEventListener('scroll', () => top?.classList.toggle('visible', scrollY > 500), { passive: true });
  top?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}
