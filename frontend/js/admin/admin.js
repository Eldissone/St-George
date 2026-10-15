import { api } from '../core/api-client.js';
// Links antigos continuam funcionais no servidor, mas a interface navega sempre
// para a URL canónica sem extensão.
document.querySelectorAll('a[href$=".html"]').forEach(link => {
  link.href = link.getAttribute('href').replace(/\.html$/, '');
});
document.querySelector('#login-form')?.addEventListener('submit', async event => {
  event.preventDefault(); const status = document.querySelector('#login-status'); status.textContent = 'A validar…';
  try { await api('/auth/session', { method: 'POST', body: JSON.stringify(Object.fromEntries(new FormData(event.currentTarget))) }); location.assign('/admin'); }
  catch (error) { status.textContent = error.message; }
});
document.querySelector('[data-logout]')?.addEventListener('click', async () => { try { await api('/auth/session', { method: 'DELETE' }); } finally { location.assign('/admin/login'); } });
document.querySelector('#new-product-form')?.addEventListener('submit', async event => {
  event.preventDefault(); const status = document.querySelector('#admin-status'); status.textContent = 'A guardar…';
  try { await api('/products', { method: 'POST', body: JSON.stringify(Object.fromEntries(new FormData(event.currentTarget))) }); status.textContent = 'Produto criado com sucesso.'; event.currentTarget.reset(); }
  catch (error) { status.textContent = error.message; }
});
