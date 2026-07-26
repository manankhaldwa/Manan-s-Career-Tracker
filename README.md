# Career Track — setup

```
Career_app/
├── index.html      the whole app
├── manifest.json   makes it installable
├── sw.js           service worker (offline)
├── icons/          app icons
├── ROADMAP.md      the decision, dates, contract   ← read this
├── DATA-MODEL.md   how the data works
└── CHECKINS.md     nightly check-in history
```

---

## 1. Run it in VS Code

**Double-clicking `index.html` will not work properly.** It opens on a `file://` URL, and service
workers are blocked there — so no offline mode, no install prompt. You need a local server. Two
minutes:

### Live Server (easiest)
1. Open VS Code → **File → Open Folder** → select `Career_app`.
2. Extensions panel (`Ctrl+Shift+X`) → search **Live Server** by Ritwick Dey → Install.
3. Right-click `index.html` in the file tree → **Open with Live Server**.
4. Browser opens at `http://127.0.0.1:5500`. Service worker registers, install icon appears in the
   address bar.

### Or the terminal (no extension needed)
In VS Code, `Ctrl+~` to open the terminal, then either:

```bash
npx serve .          # Node
python -m http.server 8080   # Python
```

Open `http://localhost:8080`. `localhost` is treated as a secure origin, so PWA features work.

### After you edit `index.html`
Bump `CACHE` in `sw.js` (`ct-v3` → `ct-v4`). The service worker serves the cached copy first, so
without bumping it you will edit the file and see no change. In dev you can also tick
**Application → Service Workers → Update on reload** in DevTools.

---

## 2. Get it on your phone

The service worker needs **HTTPS** on a real domain. `localhost` only works on the machine itself.
Pick one — both free, both about five minutes.

### Netlify Drop (fastest, no account needed to start)
1. Go to `app.netlify.com/drop`.
2. Drag the whole `Career_app` folder into the page.
3. You get an HTTPS URL instantly. Open it on your phone.

### GitHub Pages (better if you'll keep editing)
1. Create a repo, push these files to the **root** of `main`.
2. Repo → Settings → Pages → Source: `main`, folder `/ (root)`.
3. Wait ~1 min → `https://<username>.github.io/<repo>/`.
4. Every `git push` updates the live app.

### Install as an app
- **Android / Chrome:** open the HTTPS URL → ⋮ menu → **Install app** / **Add to Home screen**.
  Launches standalone, no browser bars, works offline.
- **iPhone / Safari:** Share → **Add to Home Screen**. Works, but iOS can evict storage if you
  don't open it for weeks — export more often on iOS.
- **Windows / Chrome or Edge:** install icon in the address bar → pins to taskbar/Start.

---

## 3. Syncing phone ↔ laptop

**Short answer: don't build real sync yet.** You are one person and you will log from your phone
almost every time. Building auth + a database is a week of work that adds zero study hours — the
same trap as building the app instead of applying for the job.

### What's already in the app: manual merge (Pace tab → Backup / transfer)
- **Show my data** — dumps your JSON and copies it to the clipboard.
- **Download file** — saves `career-track-YYYY-MM-DD.json`.
- **Paste + Merge it in** — combines another device's data with this one.

Merge is a **union keyed by session id**, so it is safe in both directions and safe to repeat:
- No duplicates, no overwrites, nothing lost.
- `A merge B` and `B merge A` produce the identical result.
- Merging the same file twice changes nothing.

So the workflow is: export on phone → paste into laptop → merge → export on laptop → paste into
phone → merge. Both devices now match. Takes about a minute, and it doubles as your **backup**,
which is the risk that actually matters (lose the phone, lose the history).

### If you genuinely end up logging from both devices daily
Then add **Supabase** (free tier, Postgres + auth, ~2–3 hours of work):

1. Create a project at `supabase.com`. Copy the project URL and anon key.
2. One table:
   ```sql
   create table sessions (
     id        bigint primary key,     -- keep the app's existing timestamp ids
     user_id   uuid references auth.users not null default auth.uid(),
     date      date not null,
     min       int  not null,
     mod       text not null,
     note      text,
     inserted_at timestamptz default now()
   );
   alter table sessions enable row level security;
   create policy "own rows" on sessions
     for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
   ```
3. Add the JS client via CDN, sign in with magic-link email.
4. On log: insert locally **and** `upsert` to Supabase. On app open: pull rows newer than your last
   sync and merge with the same union-by-id logic already in the app.

Because ids are unique timestamps and rows are append-only, you get last-write-wins for free and
never need conflict resolution. That is the one real payoff of the append-only rule.

**Do not do this until the app has earned it** — say, four straight weeks of logging.

---

## 4. Data and backup

Everything lives in `localStorage` under `ct-v3`, on the device. No account, no server, nothing
leaves your phone — which also means **no automatic backup**. Clearing site data, or losing the
phone, loses the history. Export weekly. It takes ten seconds.

The app migrates automatically from an older `ct-v2` install, so upgrading does not lose data.

## 5. Editing the roadmap

- **Modules:** edit `TRACKS` at the top of the `<script>` in `index.html`. Keep module `id` values
  stable — existing sessions point at them.
- **Your commitment:** `FRESH.commitMin` (per weekday) and `FRESH.floorMin` (weekly floor). These
  apply to a fresh install only.
- **Freeze allowance:** `FREEZE_LIMIT` (4) and `FREEZE_WINDOW` (30 days).
- Bump `CACHE` in `sw.js` after any change.

## 6. Deliberately not built

- **Push notification reminders** — a notification you swipe away is not accountability. The nightly
  check-in lives outside the app on purpose.
- **Editing or deleting sessions** — append-only is the enforcement. See ROADMAP.md Rule 4.
- **Job application pipeline** — comes when you're actually applying to several places.
