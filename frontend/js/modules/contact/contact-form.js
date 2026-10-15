import { api } from '../../core/api-client.js';
const form = document.querySelector('#contact-form');
const status = document.querySelector('#form-status');
form?.addEventListener('submit', async event => {
  event.preventDefault(); status.textContent = 'A enviar…';
  try { await api('/contact', { method: 'POST', body: JSON.stringify(Object.fromEntries(new FormData(form))) }); form.reset(); status.textContent = 'Mensagem recebida. A nossa equipa responderá em breve.'; }
  catch (error) { status.textContent = error.message; }
});
