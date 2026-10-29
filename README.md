# AsimAwdah.com

A minimal, markdown-based personal blog matching the [amasad.me](https://amasad.me) design.

## How to publish

1. Write a post: create `posts/your-slug.md` with YAML frontmatter:

   ```markdown
   ---
   title: My Essay
   date: 2026-10-29
   description: A short summary.
   slug: my-essay
   ---

   Your essay in markdown.
   ```

2. Build the site:

   ```bash
   npm run build
   ```

3. Publish the generated `out/` directory (e.g. push to GitHub Pages, Netlify, Vercel, or any static host).

## Project structure

- `posts/` — your markdown essays
- `about.md` — about page
- `public/css/main.css` — styles (amasad.me design)
- `templates/` — HTML templates
- `build.js` — static site generator
- `out/` — generated site (publish this)

## Features

- Markdown essays with YAML frontmatter (title, date, description, slug)
- Syntax-highlighted code blocks (highlight.js)
- RSS feed at `/rss.xml`
- About page
- Clean, minimal typography matching amasad.me
- Responsive design
