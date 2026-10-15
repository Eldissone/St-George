# Arranque local

Pré-requisitos: Node.js 20+ e uma instância PostgreSQL.

1. Na pasta `backend`, copie `.env.example` para `.env` e substitua a ligação PostgreSQL e o segredo de sessão.
2. Ainda em `backend`, instale as dependências: `npm install`.
3. Gere o cliente e aplique a primeira migração: `npm run prisma:generate` e `npm run prisma:migrate`.
4. Defina `ADMIN_EMAIL` e `ADMIN_PASSWORD` (12+ caracteres) no `.env` e execute `npm run admin:create`.
5. Inicie: `npm run dev`. O site fica disponível em `http://localhost:3000`.

Para produção, execute o Node.js atrás de Nginx com HTTPS e aplique os requisitos de segurança descritos em `architecture.md`.
