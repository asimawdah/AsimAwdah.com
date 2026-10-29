---
title: On Simple Publishing
date: 2026-10-28
description: Why I chose a markdown-only publishing system for AsimAwdah.com.
slug: why-i-blog
---

Most publishing platforms today are heavy. They want a database, a user account, a theme editor, and a monthly fee. I wanted none of that.

So this site is just a folder of markdown files. To publish:

1. Create `posts/my-essay.md`.
2. Add frontmatter (title, date, description, slug).
3. Write the essay in markdown.
4. Run `npm run build`.
5. Deploy the `out/` folder.

That's it. The build script reads the markdown, converts it to HTML with [marked](https://marked.js.org) and [highlight.js](https://highlightjs.org), and stamps it with the same minimal design as [amasad.me](https://amasad.me).

## The frontmatter

Each post starts with YAML frontmatter:

```yaml
---
title: My Essay Title
date: 2026-10-29
description: A short summary.
slug: my-essay
---
```

Everything after the closing `---` is the essay body, written in standard markdown.

## Design

The visual style is deliberately spare: Questrial for the header, Lato for headings, a serif body font, blue links with an underline on hover, and a centered essay column. Code blocks are syntax highlighted. There's an RSS feed at `/rss` so readers can subscribe without an algorithm.

If you want to copy this for your own site, clone the repo, replace the posts, and change the name in `build.js` and `templates/`.
