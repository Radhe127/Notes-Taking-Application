# Marginal — a simple, modern notes app

React + Vite frontend talking directly to Supabase (Postgres + Auth). Sign in with Google, write notes in Markdown, done.

## What's in today's build

- Clean, minimal UI (paper/ink theme, light + dark mode)
- GitHub OAuth2 sign-in via Supabase Auth
- Notes with a Markdown editor (Write / Preview tabs)
- Autosave while you type

Folders, tags, search, pin, and share-links aren't in yet — this pass is UI + Markdown editor + OAuth login only.

## 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) → New project.
2. Once it's ready, open **Project Settings → API** and copy the **Project URL** and **anon public key**.

## 2. Set up the database

Open **SQL Editor** in Supabase, paste the contents of `supabase/schema.sql`, and run it. This creates the `notes` table with row-level security so each user can only see their own notes.

## 3. Turn on GitHub sign-in

1. Create a GitHub OAuth App: **GitHub → Settings → Developer settings → OAuth Apps → New OAuth App** (or reuse one you already have).
   - **Homepage URL**: your app's URL (e.g. `http://localhost:5173`, or your Codespaces/deployed URL)
   - **Authorization callback URL**: must be exactly
     ```
     https://<your-project-ref>.supabase.co/auth/v1/callback
     ```
     (find `<your-project-ref>` in your Supabase project URL)
2. Generate a **Client Secret** on that OAuth App page. Copy both the **Client ID** and **Client Secret**.
3. In Supabase: **Authentication → Providers → GitHub** → enable it, paste in the Client ID and Client Secret, and **Save**.
4. In **Authentication → URL Configuration → Redirect URLs**, add the exact URL your app runs on:
   - Local: `http://localhost:5173`
   - Codespaces: your forwarded `https://...app.github.dev` URL (make sure the port is set to **Public** in the Ports tab, or the OAuth redirect will fail)
   - Production: your deployed URL

## 4. Configure the app

```bash
cp .env.example .env
```

Fill in:

```
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

## 5. Run it

```bash
npm install
npm run dev
```

Open the printed localhost URL, click **Continue with GitHub**, and start writing.

## 6. Deploy

Push to GitHub, then deploy on Vercel/Netlify:
- Build command: `npm run build`
- Output directory: `dist`
- Add the two `VITE_SUPABASE_*` env vars in the host's dashboard
- Add the deployed URL to Supabase's **Redirect URLs** (step 3.4) or GitHub OAuth will fail after deploy
