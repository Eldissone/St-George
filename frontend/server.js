const http = require('http');
const path = require('path');
const express = require('express');
require('dotenv').config();

const app = express();
const port = Number(process.env.PORT || 3000);
const backendUrl = new URL(process.env.BACKEND_URL || 'http://localhost:4000');
const frontend = __dirname;

const legacyHtmlRoutes = {
  '/index.html': '/', '/pages/about-us.html': '/about-us', '/pages/products.html': '/products', '/pages/product-detail.html': '/products',
  '/pages/market.html': '/market', '/pages/corporate-responsibility.html': '/corporate-responsibility', '/pages/contact-us.html': '/contact-us',
  '/pages/careers.html': '/careers', '/pages/blog/index.html': '/blog', '/pages/blog/article.html': '/blog', '/admin/login.html': '/admin/login',
  '/admin/dashboard.html': '/admin', '/admin/products.html': '/admin/products', '/admin/news.html': '/admin/news', '/admin/pages.html': '/admin/pages',
  '/admin/contacts.html': '/admin/contacts', '/admin/careers.html': '/admin/careers', '/admin/media.html': '/admin/media', '/admin/users.html': '/admin/users', '/admin/settings.html': '/admin/settings'
};

function proxyApi(req, res) {
  const request = http.request({ hostname: backendUrl.hostname, port: backendUrl.port, protocol: backendUrl.protocol, method: req.method, path: req.originalUrl, headers: { ...req.headers, host: backendUrl.host } }, response => {
    res.writeHead(response.statusCode || 502, response.headers);
    response.pipe(res);
  });
  request.on('error', () => { if (!res.headersSent) res.status(502).json({ error: { code: 'API_UNAVAILABLE', message: 'API temporarily unavailable.' } }); });
  req.pipe(request);
}

app.disable('x-powered-by');
app.use('/api', proxyApi);
app.get(/\.html$/, (req, res) => {
  const destination = legacyHtmlRoutes[req.path];
  return destination ? res.redirect(301, destination) : res.status(404).end();
});
app.use((req, res, next) => req.path.length > 1 && req.path.endsWith('/') ? res.redirect(301, req.originalUrl.replace(/\/(\?.*)?$/, '$1')) : next());
app.use(express.static(frontend, { index: false, redirect: false, maxAge: '1h' }));

const pages = {
  '/': 'index.html', '/about-us': 'pages/about-us.html', '/products': 'pages/products.html', '/market': 'pages/market.html',
  '/corporate-responsibility': 'pages/corporate-responsibility.html', '/contact-us': 'pages/contact-us.html', '/careers': 'pages/careers.html',
  '/blog': 'pages/blog/index.html', '/admin': 'admin/dashboard.html', '/admin/login': 'admin/login.html', '/admin/products': 'admin/products.html', '/admin/news': 'admin/news.html',
  '/admin/pages': 'admin/pages.html', '/admin/contacts': 'admin/contacts.html', '/admin/careers': 'admin/careers.html', '/admin/media': 'admin/media.html', '/admin/users': 'admin/users.html', '/admin/settings': 'admin/settings.html'
};
Object.entries(pages).forEach(([route, file]) => app.get(route, (req, res) => res.sendFile(path.join(frontend, file))));
app.get(['/products/:slug', '/blog/:slug'], (req, res) => res.sendFile(path.join(frontend, req.path.startsWith('/products') ? 'pages/product-detail.html' : 'pages/blog/article.html')));
app.use((req, res) => res.status(404).sendFile(path.join(frontend, 'pages/not-found.html'), error => { if (error) res.type('text').send('Page not found.'); }));

app.listen(port, () => console.log(`St. George frontend running at http://localhost:${port}`));
