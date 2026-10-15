import { api } from '../core/api-client.js';
const isProduct = location.pathname.startsWith('/products/');
const slug = location.pathname.split('/').filter(Boolean).pop();
const title = document.querySelector('[data-detail-title]'); const body = document.querySelector('[data-detail-body]'); const crumb = document.querySelector('[data-detail-crumb]');
api(`/${isProduct ? 'products' : 'news'}/${slug}`).then(item => { title.textContent = item.name || item.title; body.textContent = item.description || item.body || item.excerpt; crumb.textContent = isProduct ? 'Produtos' : 'Notícias'; }).catch(() => { title.textContent = 'Conteúdo indisponível'; body.textContent = 'Não foi possível encontrar o conteúdo pedido.'; });
