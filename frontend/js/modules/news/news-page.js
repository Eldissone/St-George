import { api } from '../../core/api-client.js';
const container = document.querySelector('#news-container');
function format(date) { return new Intl.DateTimeFormat('pt-AO', { dateStyle: 'long' }).format(new Date(date)); }
api('/news').then(items => { container.replaceChildren(...items.map(item => { const node = document.createElement('article'); node.className = 'card news-card'; node.innerHTML = `<time datetime="${item.publishedAt || ''}">${format(item.publishedAt || Date.now())}</time><h3>${item.title}</h3><p>${item.excerpt}</p><a class="arrow" href="/blog/${item.slug}" aria-label="Ler ${item.title}">→</a>`; return node; })); }).catch(() => { container.textContent = 'As notícias não estão disponíveis neste momento.'; });
