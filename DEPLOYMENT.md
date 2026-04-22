# Deployment Guide (Vercel)

This project is configured for a Vercel full-stack deployment:
- Static frontend served from `frontend/`
- Serverless API served from `api/[...path].js`
- Backend logic in `backend/src/*`

## 1. Required Environment Variables

Set these in Vercel Project Settings -> Environment Variables:

```env
DATABASE_URL=postgres://...
JWT_SECRET=use-a-long-random-secret
```

Without these, API endpoints return a clear `CONFIG_ERROR` response.

## 2. Optional Environment Variables

```env
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_token
ADMIN_CREDENTIAL=admin@example.com
ADMIN_PASSWORD=strong-admin-password
ADMIN_NAME=Moto Admin
```

Notes:
- `BLOB_READ_WRITE_TOKEN` is only needed for `POST /api/hero-video`.
- Admin bootstrap user is only auto-created when both `ADMIN_CREDENTIAL` and `ADMIN_PASSWORD` are provided.

## 3. Vercel Project Setup

1. Push this repository to GitHub.
2. In Vercel, click New Project and import the repository.
3. Use these settings:
   - Framework Preset: `Other`
   - Root Directory: `.`
   - Build Command: `echo build-complete`
   - Output Directory: `frontend`
4. Add required environment variables from section 1.
5. Add optional variables from section 2 only if needed.
6. Deploy.

## 4. Routing Behavior on Vercel

Configured in `vercel.json`:
- `/api/*` is handled by `api/[...path].js`
- `/admin` and `/admin/*` rewrite to `frontend/admin/index.html`
- Other static files are served from `frontend/`

## 5. Post-Deploy Verification

After deployment, verify:

1. `GET /api/settings` returns JSON.
2. `GET /api/products` returns seeded or saved data.
3. `/admin` loads the admin UI.
4. Admin login works with seeded admin or configured admin bootstrap credentials.
5. If using uploads, `POST /api/hero-video` works when `BLOB_READ_WRITE_TOKEN` is set.

## 6. Troubleshooting

If API returns configuration errors:

- Error: `missing required environment variable(s): DATABASE_URL, JWT_SECRET`
  - Fix: add missing variables in Vercel and redeploy.

- Error: `Hero video upload is unavailable: BLOB_READ_WRITE_TOKEN is not configured.`
  - Fix: add `BLOB_READ_WRITE_TOKEN` if you need hero video upload.

## 7. Local Development

```bash
npm run install-all
copy .env.example .env
npm start
```

Local URLs:
- Site: `http://localhost:3000`
- Admin: `http://localhost:3000/admin`
