# FoundersKick

Connect Commit Collaborate.

A full‑stack social ecosystem for entrepreneurs featuring startup discovery, networking, and collaboration.

## Structure
- `frontend/` Next.js + Tailwind UI
- `backend/` Express API
- `database/` Mongoose models

## Quick Start
1. Copy env examples:
   - `backend/.env.example` -> `backend/.env`
   - `frontend/.env.local.example` -> `frontend/.env.local`
2. Start MongoDB (local or via Docker Compose).
3. Install and run:

```bash
cd backend
npm install
npm run dev
```

```bash
cd ../frontend
npm install
npm run dev
```

## Docker (Optional)
```bash
docker compose up --build
```
