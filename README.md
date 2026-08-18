# Note — Modern Note-Taking Application

> A sleek, distraction-free note-taking app with live Markdown preview, instant autosave, and secure cloud sync. Built with React, Vite, and Supabase.

![Note App Screenshot](https://via.placeholder.com/800x450/e8eaf0/1a1d1f?text=Note+App+Screenshot)

## ✨ Features

### Core Functionality
- **Markdown Editor** — Write naturally with a live preview (Write/Preview tabs). Supports headings, bold, italic, code blocks, tables, lists, blockquotes, and GitHub-flavored Markdown.
- **Instant Autosave** — Notes save automatically ~600ms after you stop typing. Never lose your work.
- **Pin Notes** — Pin important notes to keep them at the top of your list.
- **Trash & Restore** — Move notes to trash, restore them, or delete permanently. Trash auto-cleans after 30 days (via Supabase cron).
- **Light & Dark Mode** — Beautiful glassmorphic UI that adapts to your preference, persisted in localStorage.

### Authentication & Security
- **GitHub OAuth2** — One-click sign-in via Supabase Auth. No passwords to manage.
- **Row-Level Security** — Each user only sees their own notes. Enforced at the database level via Supabase RLS policies.
- **Private by Default** — Your notes are encrypted in transit and at rest. Only you can access them.

### User Experience
- **Responsive Design** — Works beautifully on desktop, tablet, and mobile.
- **Animated Glassmorphic Background** — Subtle floating orbs and twinkling effects for a polished feel.
- **Keyboard Friendly** — Tab navigation, intuitive shortcuts.
- **Fast & Lightweight** — Vite + React 18, optimized bundle, instant hot reload in dev.

---

## 🏗 Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18, Vite 5 |
| **Styling** | CSS Custom Properties, Glassmorphism, CSS Grid/Flexbox |
| **Markdown** | `react-markdown` + `remark-gfm` (GitHub-flavored) |
| **Backend/Auth/DB** | Supabase (PostgreSQL + Auth + Realtime) |
| **Fonts** | Inter (UI), Fraunces (Display), JetBrains Mono (Code) |
| **Deployment** | Vercel / Netlify / any static host |

---

## 📁 Project Structure

```
Notes-Taking-Application/
├── index.html                 # Entry HTML
├── package.json               # Dependencies & scripts
├── vite.config.js             # Vite configuration
├── supabase/
│   └── schema.sql             # Database schema + RLS policies
├── src/
│   ├── main.jsx               # App bootstrap
│   ├── App.jsx                # Root component (routing logic)
│   ├── index.css              # Global styles (CSS variables, components, animations)
│   ├── supabaseClient.js      # Supabase client initialization
│   ├── contexts/
│   │   └── AuthContext.jsx    # Auth state + GitHub OAuth helpers
│   ├── pages/
│   │   ├── LandingPage.jsx    # Public landing page
│   │   ├── Login.jsx          # Auth page (GitHub sign-in)
│   │   └── Dashboard.jsx      # Main app (notes list + editor)
│   ├── components/
│   │   ├── Navbar.jsx         # Top bar with theme toggle
│   │   ├── NoteCard.jsx       # Note preview card in grid
│   │   ├── NoteEditor.jsx     # Full-screen Markdown editor
│   │   ├── Wordmark.jsx       # "Note." brand mark
│   │   └── GithubIcon.jsx     # GitHub logo SVG
│   └── lib/
│       ├── notes.js           # CRUD operations for notes
│       └── format.js          # Utility: stripMarkdown, timeAgo
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- A [Supabase](https://supabase.com) account (free tier works)
- A GitHub account (for OAuth)

### 1. Clone & Install
```bash
git clone <your-repo-url>
cd Notes-Taking-Application
npm install
```

### 2. Create a Supabase Project
1. Go to [supabase.com](https://supabase.com) → **New Project**
2. Once ready, open **Project Settings → API** and copy:
   - **Project URL** (e.g., `https://xyzcompany.supabase.co`)
   - **anon public key** (starts with `eyJ...`)

### 3. Set Up the Database
1. In Supabase Dashboard, go to **SQL Editor** → **New Query**
2. Paste the contents of `supabase/schema.sql` and **Run**
3. This creates the `notes` table with:
   - UUID primary keys
   - `user_id` foreign key to `auth.users`
   - `title`, `content`, `pinned`, `trash` columns
   - Row-Level Security policies (users only see their own notes)
   - Auto-updating `updated_at` trigger

### 4. Configure GitHub OAuth
1. **Create GitHub OAuth App:**
   - Go to GitHub → **Settings → Developer settings → OAuth Apps → New OAuth App**
   - **Homepage URL**: Your app URL (e.g., `http://localhost:5173` for local dev)
   - **Authorization callback URL**: **Must be exactly**
     ```
     https://<your-project-ref>.supabase.co/auth/v1/callback
     ```
     (Find `<your-project-ref>` in your Supabase Project URL)
2. Generate a **Client Secret**. Copy both **Client ID** and **Client Secret**.
3. **In Supabase Dashboard:**
   - Go to **Authentication → Providers → GitHub** → Enable
   - Paste Client ID and Client Secret → **Save**
   - Go to **Authentication → URL Configuration → Redirect URLs**
   - Add your app URLs:
     - Local: `http://localhost:5173`
     - Codespaces: `https://<your-codespace>.app.github.dev` (port must be **Public**)
     - Production: Your deployed URL (e.g., `https://your-app.vercel.app`)

### 5. Configure Environment Variables
```bash
cp .env.example .env
```

Edit `.env` with your Supabase credentials:
```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

### 6. Run Development Server
```bash
npm run dev
```

Open the printed localhost URL (typically `http://localhost:5173`), click **Continue with GitHub**, and start writing!

---

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build locally |

---

## 🎨 Design System

### Color Palette (CSS Variables)
```css
/* Glassmorphism tokens */
--glass-white: rgba(255, 255, 255, 0.65);
--glass-white-light: rgba(255, 255, 255, 0.40);
--glass-white-dark: rgba(255, 255, 255, 0.20);
--glass-border: rgba(255, 255, 255, 0.30);
--glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
--glass-blur: 20px;
--glass-radius: 18px;

/* Text */
--ink: #1a1d1f;
--ink-soft: #4a4f52;
--ink-softest: #8a9096;

/* Accents */
--accent: #6b7280;        /* Cool grey */
--gold: #c9b37e;          /* Warm highlight */
--success: #4caf84;
--danger: #d96c6c;

/* Background gradient */
--bg-start: #e8eaf0;
--bg-end: #d5d8e0;
```

### Typography
- **UI Font**: Inter (400, 500, 600, 700)
- **Display Font**: Fraunces (Variable: 400-600, italic)
- **Monospace**: JetBrains Mono (400, 500)

---

## 🗄 Database Schema

```sql
-- Table: notes
create table notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null default 'Untitled',
  content text default '',
  pinned boolean default false,
  trash boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Row Level Security (each user sees only their notes)
alter table notes enable row level security;
create policy "notes_select_own" on notes for select using (auth.uid() = user_id);
create policy "notes_insert_own" on notes for insert with check (auth.uid() = user_id);
create policy "notes_update_own" on notes for update using (auth.uid() = user_id);
create policy "notes_delete_own" on notes for delete using (auth.uid() = user_id);

-- Auto-update updated_at on every edit
create or replace function set_updated_at() returns trigger as $$
begin new.updated_at = now(); return new; end; $$ language plpgsql;
create trigger notes_set_updated_at before update on notes for each row execute function set_updated_at();
```

---

## 🚢 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import project in Vercel
3. Build Command: `npm run build`
4. Output Directory: `dist`
5. Add Environment Variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
6. Deploy
7. **Important**: Add the deployed URL to Supabase → **Authentication → URL Configuration → Redirect URLs**

### Netlify
1. Connect GitHub repo
2. Build Command: `npm run build`
3. Publish Directory: `dist`
4. Add same env vars in Site Settings → Environment Variables
5. Add deployed URL to Supabase Redirect URLs

### Docker (Optional)
```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

## 🔧 Configuration

### Environment Variables
| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_SUPABASE_URL` | Yes | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Yes | Supabase anon public key |

### Vite Config
The `vite.config.js` uses `@vitejs/plugin-react` with default settings. Modify for:
- Path aliases
- Proxy configuration
- Build optimizations

---

## 🧪 Testing

> Currently no automated tests. Contributions welcome!

### Manual Testing Checklist
- [ ] GitHub OAuth sign-in works (local & deployed)
- [ ] Notes create, read, update, delete
- [ ] Pin/unpin persists
- [ ] Move to trash / restore / permanent delete
- [ ] Markdown rendering (Write ↔ Preview tabs)
- [ ] Autosave triggers (~600ms debounce)
- [ ] Light/dark theme toggle persists
- [ ] Responsive layout (mobile ≤ 640px, tablet ≤ 860px)
- [ ] Sign out clears session

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code Style
- 2-space indentation
- Single quotes for strings
- Functional components + hooks
- CSS variables for theming
- Meaningful component/file names

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Supabase](https://supabase.com) — Backend-as-a-Service (PostgreSQL + Auth + Realtime)
- [Vite](https://vitejs.dev) — Next-generation frontend tooling
- [React](https://react.dev) — UI library
- [react-markdown](https://github.com/remarkjs/react-markdown) — Markdown rendering
- [remark-gfm](https://github.com/remarkjs/remark-gfm) — GitHub-flavored Markdown support
- [Inter](https://fonts.google.com/specimen/Inter) / [Fraunces](https://fonts.google.com/specimen/Fraunces) / [JetBrains Mono](https://www.jetbrains.com/lp/mono/) — Typography

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/your-username/Notes-Taking-Application/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/Notes-Taking-Application/discussions)

---

*Built with ❤️ for developers who love clean, focused note-taking.*