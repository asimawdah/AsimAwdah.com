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

3. Publish the generated `out/` directory.

## VPS with Nginx

The Nginx server block is in [`deploy/nginx.conf`](./deploy/nginx.conf). It serves the generated `out/` directory and redirects requests for missing paths straight to `/`.

Copy the file to `/etc/nginx/sites-available/asimawdah.com`, update its `root` to the absolute path of this project's `out/` directory, enable the site, then test and reload Nginx:

```bash
sudo ln -s /etc/nginx/sites-available/asimawdah.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

Point your domain's DNS records at the VPS. Set up HTTPS for the domain after the HTTP site is working.

## Local preview

```bash
npm run dev
```

This builds the site, serves it at <http://localhost:3000>, and rebuilds automatically when files in `posts/`, `about.md`, `public/`, or `templates/` change. Set `PORT` to use a different port:

```bash
PORT=8080 npm run dev
```

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
