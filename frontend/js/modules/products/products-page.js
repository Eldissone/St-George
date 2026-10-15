import { api } from '../../core/api-client.js';
const container = document.querySelector('#products-container');
const fallback = [
  { slug: 'solucoes-de-qualidade', name: 'Soluções de qualidade', summary: 'Produtos desenvolvidos com rigor para responder às necessidades do mercado.' },
  { slug: 'operacao-e-distribuicao', name: 'Operação e distribuição', summary: 'Uma cadeia eficiente, próxima dos parceiros e das comunidades.' },
  { slug: 'marcas-st-george', name: 'Marcas St. George', summary: 'Confiança construída todos os dias, de Angola para Angola.' }
];
function render(items) { container.replaceChildren(...items.map(p => { const node = document.createElement('article'); node.className = 'product-card'; node.innerHTML = `<p class="eyebrow">${p.category || 'St. George'}</p><h2>${p.name}</h2><p>${p.summary}</p><a class="arrow" href="/products/${p.slug}" aria-label="Ver ${p.name}">→</a>`; return node; })); }
api('/products').then(items => render(items.length ? items : fallback)).catch(() => render(fallback));
