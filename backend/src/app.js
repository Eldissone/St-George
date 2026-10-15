const express = require('express');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { z } = require('zod');
const { buildProductModule } = require('./modules/products/products.module');
const { authRoutes } = require('./modules/auth/presentation/http/auth.routes');
const { prisma } = require('./config/database');
const { notFound, errorHandler } = require('./shared/middleware/errors');

const app = express();
app.disable('x-powered-by');
app.use(helmet({ contentSecurityPolicy: false })); // Definir CSP por ambiente quando forem adicionados fornecedores externos.
app.use(express.json({ limit: '100kb' }));
app.use(cookieParser());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 300, standardHeaders: true, legacyHeaders: false }));

const publicNews = [
  { id: 'n-1', slug: 'st-george-reforca-compromisso', title: 'St. George reforça o seu compromisso com Angola', excerpt: 'Crescemos com uma visão responsável, focada nas pessoas e nas comunidades.', publishedAt: '2026-09-20' },
  { id: 'n-2', slug: 'qualidade-que-atravessa-geracoes', title: 'Qualidade que atravessa gerações', excerpt: 'Conheça os princípios que orientam a nossa atuação diária.', publishedAt: '2026-08-15' },
  { id: 'n-3', slug: 'novos-caminhos-para-o-mercado', title: 'Novos caminhos para o mercado', excerpt: 'Uma operação preparada para servir parceiros em todo o país.', publishedAt: '2026-07-02' }
];

app.use('/api/v1/products', buildProductModule());
app.use('/api/v1/auth', authRoutes());
app.get('/api/v1/news', async (req, res) => {
  const items = await prisma.newsArticle.findMany({ where: { status: 'PUBLISHED' }, orderBy: { publishedAt: 'desc' } }).catch(() => []);
  res.json({ data: items.length ? items : publicNews });
});
app.get('/api/v1/news/:slug', async (req, res) => {
  const article = await prisma.newsArticle.findFirst({ where: { slug: req.params.slug, status: 'PUBLISHED' } }).catch(() => null)
    || publicNews.find(item => item.slug === req.params.slug);
  if (!article) return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Article not found.' } });
  return res.json({ data: { ...article, body: article.body || article.excerpt } });
});
app.post('/api/v1/contact', rateLimit({ windowMs: 60 * 60 * 1000, max: 8 }), async (req, res, next) => {
  try {
    const input = z.object({ name: z.string().min(2).max(100), email: z.string().email(), phone: z.string().max(40).optional(), subject: z.string().max(120).optional(), message: z.string().min(10).max(3000) }).parse(req.body);
    const message = await prisma.contactMessage.create({ data: input });
    res.status(201).json({ data: { id: message.id }, message: 'Message received.' });
  } catch (error) { next(error); }
});

app.get('/health', (req, res) => res.json({ data: { status: 'ok' } }));
app.use(notFound);
app.use(errorHandler);

module.exports = { app };
