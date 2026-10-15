# Serviços locais

O projeto possui dois processos Express independentes:

| Serviço | Pasta | Porta padrão | Responsabilidade |
| --- | --- | --- | --- |
| Frontend | `frontend/` | `3000` | Páginas públicas, backoffice, recursos estáticos e URLs amigáveis. |
| Backend | `backend/` | `4000` | API REST, autenticação, regras de negócio e PostgreSQL. |

O frontend encaminha internamente os pedidos iniciados em `/api/*` para `BACKEND_URL`. Portanto, o navegador conversa apenas com `http://localhost:3000`; cookies de autenticação funcionam sem configuração CORS.

## Arranque

Em dois terminais:

```powershell
cd backend
npm run dev
```

```powershell
cd frontend
npm install
npm run dev
```

No frontend, copie `.env.example` para `.env` caso o backend não esteja em `http://localhost:4000`.
