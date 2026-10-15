const crypto = require('crypto');
const { sessionSecret } = require('../../config/env');
const { AppError } = require('../errors/AppError');

// Substituir por sessão persistida (Redis/DB) antes de escalar para múltiplas instâncias.
function requireAuth(req, res, next) {
  if (!req.cookies?.sg_session) return next(new AppError('Authentication required.', 401, 'UNAUTHENTICATED'));
  try {
    const [payload, signature] = req.cookies.sg_session.split('.');
    const expected = crypto.createHmac('sha256', sessionSecret).update(payload).digest('base64url');
    if (!signature || !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) throw new Error('invalid');
    const user = JSON.parse(Buffer.from(payload, 'base64url').toString());
    if (!user?.id || !user?.role || user.exp < Date.now()) throw new Error('invalid');
    req.user = user;
    return next();
  } catch {
    return next(new AppError('Invalid session.', 401, 'UNAUTHENTICATED'));
  }
}

function requireRole(...roles) {
  return (req, res, next) => roles.includes(req.user?.role)
    ? next()
    : next(new AppError('Insufficient permissions.', 403, 'FORBIDDEN'));
}

module.exports = { requireAuth, requireRole };
