# Resource Management Skill

Governs how resources (courses, videos, books, papers, repos, websites) are added, linked, and styled across the AI/ML Roadmap website so all three data layers stay consistent.

## Architecture Overview

There are **three separate data layers**, each in a different location with a different schema:

| Layer | File | Purpose |
|-------|------|---------|
| **Dashboard** | `public/data.js` - `PHASES` array | Full detail: each resource has name, URL, provider, description, coverage, rationale. Rendered as clickable cards that open a modal. |
| **Homepage Preview** | `src/pages/index.astro` - inline `<script>` - `PREVIEW_ITEMS` + `SYLLABUS` | Two-tab preview panel. Tech stack grid (icon+label). Syllabus phase tabs with topic+resource pills. |
| **Homepage Resources** | `src/pages/index.astro` - inline `<script>` - `RES_PHASES` | Sidebar + content pane. Resources rendered as linked cards with type badge, title, and source line. |

---

## 1. Dashboard Layer (`public/data.js`)

### Schema per phase

Each phase in `PHASES` has `key`, `icon` (Lucide name), `label`, `stage`, `dur`, `purpose`, `guide`, and `topics[]`.

### Topic resource fields

```
course:  { name, provider, url, desc, covered, why }
youtube: [{ n:title, url, s:channel/size, d:description, covered, why }]
books:   [{ t:title, a:author, url, free:bool, d:description, covered, why }]
papers:  [{ t:title, a:author, url, d:description, covered, why }]
repos:   [{ n:name, url, d:description, covered, why }]
websites:[{ n:name, url, s:source, d:description, covered, why }]
```

### Adding a resource to the dashboard

1. Locate the correct phase and topic inside `PHASES`.
2. Add the resource under the matching type key (`course`, `youtube`, `books`, `papers`, `repos`, or `websites`).
3. Always include: `url`, `d` (short description), `covered` (bullet list of topics), `why` (rationale sentence).
4. For `covered` and `why`, use `\n` with `• ` bullet prefix for multi-line strings.
5. Keep `d` under 140 characters.

### URL rules (dashboard)

- Use the canonical URL (course home page, arXiv abstract, GitHub repo, YouTube playlist).
- Prefer `https://`.
- For papers: use `https://arxiv.org/abs/XXXX.XXXXX` format.
- For YouTube: use the playlist URL or video URL (not shortened).

---

## 2. Homepage Preview Layer (`src/pages/index.astro` inline `<script>`)

### PREVIEW_ITEMS (Tech Stack grid)

```
{ label, meta, cat, icon, color }
```

- `cat` must be one of: `lang`, `math`, `ml`, `dl`, `llm`, `mlops`
- `color` must be one of: `blue`, `gold`, `green`, `red`, `purple`, `pink`, `cyan`
- `icon` is a single emoji character
- `meta` is a short subtitle (2-4 words)

### SYLLABUS (Phase tabs view)

```
{ tag, tagCls, title, dur, topics: [{ idx, name, resources[] }] }
```

- `tagCls` maps to `syl-tag-0` through `syl-tag-7`
- `resources` is a flat array of label strings (no URLs, no types)
- Keep resource names consistent with the other two layers

---

## 3. Homepage Resources Layer (`src/pages/index.astro` inline `<script>`)

### RES_PHASES schema

```
{ tag, title, dur, topics: [{ name, resources: [{ t, l, u, s }] }] }
```

| Field | Purpose | Example |
|-------|---------|---------|
| `t` | Resource type | `'course'`, `'yt'`, `'book'`, `'paper'`, `'repo'`, `'web'` |
| `l` | Display label | `'CS50P — Harvard / edX'` |
| `u` | URL | `'https://cs50.harvard.edu/python/'` |
| `s` | Source/author | `'Harvard University'` |

### Adding a resource to RES_PHASES

1. Find the correct phase and topic.
2. Add `{ t, l, u, s }` to the `resources` array.
3. Match `t` to the correct type key (dashboard equivalents):
   - `course` → dashboard's `course`
   - `yt` → dashboard's `youtube`
   - `book` → dashboard's `books`
   - `paper` → dashboard's `papers`
   - `repo` → dashboard's `repos`
   - `web` → dashboard's `websites`
4. The `l` text should closely match the `name`/`n`/`t` field in `data.js` for the same resource.
5. The `u` URL must be identical to the URL in `data.js` for the same resource.

---

## Consistency Rules

### Naming

| Dashboard | Homepage Resources (RES_PHASES) | Preview Syllabus |
|-----------|----------------------------------|------------------|
| `course.name` | `l` | resource string |
| `youtube[].n` | `l` | resource string |
| `books[].t` | `l` | resource string |
| `papers[].t` | `l` | resource string |
| `repos[].n` | `l` | resource string |
| `websites[].n` | `l` | resource string |

All three layers should use **the same display name** for the same resource.

### Adding a new resource to all three layers

1. Add the full detail to `public/data.js` (dashboard) first.
2. Add the RES_PHASES entry in `src/pages/index.astro` (homepage resources section) with matching `u` and `l`.
3. If the resource represents a new tech stack item, add it to `PREVIEW_ITEMS`.
4. If the resource is part of a new topic, update the relevant `SYLLABUS` topic's `resources` array.

### Resource types cross-reference

```
course  ↔ course   ↔ COURSE  badge (blue)
yt      ↔ youtube  ↔ YT      badge (red)
book    ↔ books    ↔ BOOK    badge (green)
paper   ↔ papers   ↔ PAPER   badge (purple)
repo    ↔ repos    ↔ REPO    badge (cyan)
web     ↔ websites ↔ WEB     badge (gold)
```

### CSS badge classes (homepage resources)

```css
.resc-badge--course  /* blue   */
.resc-badge--yt      /* red    */
.resc-badge--book    /* green  */
.resc-badge--paper   /* purple */
.resc-badge--repo    /* cyan   */
.resc-badge--web     /* gold   */
```

These classes are in `src/styles/home.css` and auto-applied by the `t` field in RES_PHASES.

---

## Modifying existing resources

1. **URL change** — update in all three layers (dashboard, RES_PHASES, and any SYLLABUS/PREVIEW_ITEMS references).
2. **Resource removal** — remove from all three layers to avoid dead links.
3. **Label/name change** — update identically in all three layers.
