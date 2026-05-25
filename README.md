# SUTYA Landing Page

This is a static website and is ready to deploy on Netlify or Vercel.

## Run locally

```bash
python3 -m http.server 8080
```

Then open http://localhost:8080

## Publish with Netlify (recommended)

1. Push this project to GitHub.
2. In Netlify, select Add new site -> Import an existing project.
3. Pick your GitHub repo.
4. Build command: leave empty
5. Publish directory: `.`
6. Deploy.

After that, every push to `main` redeploys automatically.

## Publish with Vercel

1. Push this project to GitHub.
2. In Vercel, select Add New -> Project.
3. Import your repo.
4. Framework preset: Other
5. Build command: leave empty
6. Output directory: `.`
7. Deploy.

After that, every push to `main` redeploys automatically.

## Update after publishing

1. Edit files locally.
2. Commit changes.
3. Push to `main`.
4. Netlify/Vercel automatically publishes the update.
