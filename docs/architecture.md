# Arquitetura St. George

## Decisão

Monólito modular: Express entrega o frontend e expõe a API no mesmo domínio. Em produção, Nginx termina TLS e encaminha pedidos ao Node.js. PostgreSQL é a fonte de verdade; media deve residir em armazenamento persistente fora do código.

## Limites

- `frontend/`: páginas, estilos e módulos de interface. `js/components/layout.js` monta cabeçalho e rodapé reutilizáveis.
- `backend/src/modules/`: módulos de negócio. `products` demonstra domínio → caso de uso → repositório → HTTP.
- `backend/src/shared/`: infraestrutura transversal, sem regras de negócio.
- `backend/prisma/`: modelo de persistência e migrações.

## Convenções

Notícias, vagas e mercados devem seguir o formato de `products`: entidade independente de Express/Prisma, caso de uso, repositório, controlador e rotas. A API pública devolve apenas registos `PUBLISHED`; escrita exige autenticação e papel autorizado.

Detalhes de produtos e notícias usam HTML único e consulta por `slug`, eliminando ficheiros manuais por conteúdo.

## Antes de produção

Configurar HTTPS, variáveis de ambiente seguras, sessões revogáveis em Redis/base de dados, proteção CSRF, CSP específica, auditoria, backups e validação/varredura de uploads. O cookie atual é assinado e `HttpOnly`, uma fundação simples; antes de múltiplas instâncias, usar sessão persistida.
