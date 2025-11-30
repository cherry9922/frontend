Vercel Deployment Guide

This guide shows how to deploy the frontend (with built-in serverless API) to Vercel and seed demo data.

1) Prepare GitHub repo

- From the `frontend` folder, initialize git and push to GitHub (replace <you> and repo name):

```powershell
cd "c:\Users\HP\Downloads\Frontendproject\Frontendproject\frontend"
git init
git add .
git commit -m "Prepare frontend + serverless API for Vercel"
# create remote on GitHub, then:
git remote add origin git@github.com:<you>/student-wellness-frontend.git
git push -u origin main
```

2) Import to Vercel

- In Vercel dashboard, click "New Project" → import your GitHub repo.
- Build Command: `npm run build`
- Output Directory: `dist`
- Vercel will detect `api/` folder and deploy serverless functions.

3) Environment Variables (set these in Vercel Project Settings)

- `MONGODB_URI` = your MongoDB Atlas connection string (required for persistence)
- `JWT_SECRET` = a long random string used to sign tokens
- `SEED_KEY` = a secret value used to protect the seeder endpoint
- `VITE_USE_MOCK` = false
- (Optional) `VITE_API_URL` = https://<your-vercel-app>.vercel.app

4) Deploy and Seed

- After deployment completes, seed demo data by calling the seed endpoint once:

```powershell
# replace <your-app> and <seed-key>
$seedKey = "<your-seed-key>"
Invoke-WebRequest -Uri "https://<your-app>.vercel.app/api/seed" -Method POST -Headers @{ 'x-seed-key' = $seedKey } -UseBasicParsing
```

- You should get a JSON response: `{ ok: true, message: 'Seed complete...' }`.

5) Test

- Open https://<your-app>.vercel.app
- Login with seeded demo credentials: `admin@example.com` / `adminpass`, `student@example.com` / `studentpass`.
- Check Resources and Programs pages.

Troubleshooting

- If serverless functions fail to connect to MongoDB, check `MONGODB_URI` and whitelist Vercel IPs (for some Atlas plans).
- If CORS or auth errors appear, ensure frontend uses `VITE_API_URL` pointing to your Vercel app.

Security

- After seeding, rotate or remove `SEED_KEY` to prevent re-seeding by others.
- Keep `JWT_SECRET` private.

Need help with pushing to GitHub or importing to Vercel? Tell me and I can generate the exact git commands or walk through the Vercel UI steps interactively.