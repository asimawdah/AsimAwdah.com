const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const marked = require('marked');
const hljs = require('highlight.js');

const ROOT = path.resolve(__dirname);
const POSTS_DIR = path.join(ROOT, 'posts');
const PUBLIC_DIR = path.join(ROOT, 'public');
const OUT_DIR = path.join(ROOT, 'out');
const TEMPLATES_DIR = path.join(ROOT, 'templates');

const SITE_TITLE = 'Asim Awdah';
const SITE_DESC = "Asim Awdah's site";
const SITE_URL = 'https://asimawnah.com';
const AUTHOR = 'Asim Awdah';
const EMAIL_HASH = '';
const TWITTER = '@asimawnah';

marked.use({
  highlight: (code, lang) => {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    return hljs.highlight(code, { language }).value;
  }
});

function replaceAll(tmpl, key, value) {
  return tmpl.split(key).join(value);
}

function formatDate(dateValue) {
  const d = dateValue instanceof Date ? dateValue : new Date(dateValue);
  return d.toISOString().slice(0, 10);
}

function readTemplate(name) {
  return fs.readFileSync(path.join(TEMPLATES_DIR, name), 'utf8');
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function slugFromFile(file) {
  return path.basename(file, '.md');
}

function dateSort(a, b) {
  return new Date(b.date) - new Date(a.date);
}

function escapeXml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function loadPosts() {
  const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));
  return files.map(file => {
    const fullPath = path.join(POSTS_DIR, file);
    const src = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(src);
    const html = marked.parse(content);
    const slug = data.slug || slugFromFile(file);
    return {
      file,
      slug,
      title: data.title || slug,
      date: formatDate(data.date || new Date().toISOString().slice(0, 10)),
      description: data.description || '',
      html,
      path: `/${slug}/`,
      draft: data.draft === true,
    };
  }).filter(p => !p.draft).sort(dateSort);
}

function renderPost(post, css) {
  let tmpl = readTemplate('post.html');
  tmpl = replaceAll(tmpl, '{{title}}', post.title);
  tmpl = replaceAll(tmpl, '{{css}}', css);
  tmpl = replaceAll(tmpl, '{{slugPath}}', post.path);
  tmpl = replaceAll(tmpl, '{{date}}', post.date);
  tmpl = replaceAll(tmpl, '{{content}}', post.html);
  return tmpl;
}

function renderIndex(posts, css, aboutUrl) {
  const tmpl = readTemplate('index.html');
  const list = posts.map(p => `
<li>
  <a href="${p.path}">${escapeXml(p.title)}</a>
</li>
`).join('');
  let out = replaceAll(tmpl, '{{title}}', SITE_TITLE);
  out = replaceAll(out, '{{css}}', css);
  out = replaceAll(out, '{{essayList}}', list);
  out = replaceAll(out, '{{aboutUrl}}', aboutUrl);
  return out;
}

function renderAbout(post, css) {
  let tmpl = readTemplate('post.html');
  tmpl = replaceAll(tmpl, '{{title}}', post.title);
  tmpl = replaceAll(tmpl, '{{css}}', css);
  tmpl = replaceAll(tmpl, '{{slugPath}}', '/about/');
  tmpl = replaceAll(tmpl, '{{date}}', post.date);
  tmpl = replaceAll(tmpl, '{{content}}', post.html);
  return tmpl;
}

function generateRss(posts) {
  const items = posts.map(p => `
  <item>
    <title>${escapeXml(p.title)}</title>
    <link>${SITE_URL}${p.path}</link>
    <guid isPermaLink="true">${SITE_URL}${p.path}</guid>
    <pubDate>${new Date(p.date).toUTCString()}</pubDate>
    <description>${escapeXml(p.description)}</description>
  </item>
`).join('');
  return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESC)}</description>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items}
  </channel>
</rss>`;
}

function main() {
  const watch = process.argv.includes('--watch');

  if (!fs.existsSync(POSTS_DIR)) {
    console.error(`posts directory not found: ${POSTS_DIR}`);
    process.exit(1);
  }

  ensureDir(OUT_DIR);

  const css = fs.readFileSync(path.join(PUBLIC_DIR, 'css', 'main.css'), 'utf8');
  const posts = loadPosts();

  // Copy public assets
  function copyRecursive(src, dest) {
    ensureDir(dest);
    for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
      const s = path.join(src, entry.name);
      const d = path.join(dest, entry.name);
      if (entry.isDirectory()) copyRecursive(s, d);
      else fs.copyFileSync(s, d);
    }
  }
  if (fs.existsSync(PUBLIC_DIR)) copyRecursive(PUBLIC_DIR, path.join(OUT_DIR, 'public'));

  // Index
  fs.writeFileSync(path.join(OUT_DIR, 'index.html'), renderIndex(posts, css, '/about/'));

  // Posts
  for (const post of posts) {
    const dir = path.join(OUT_DIR, post.slug);
    ensureDir(dir);
    fs.writeFileSync(path.join(dir, 'index.html'), renderPost(post, css));
  }

  // About
  const aboutPath = path.join(ROOT, 'about.md');
  if (fs.existsSync(aboutPath)) {
    const { data, content } = matter(fs.readFileSync(aboutPath, 'utf8'));
    const aboutHtml = marked.parse(content);
    const aboutPost = { title: data.title || 'About', date: formatDate(data.date || new Date().toISOString().slice(0, 10)), html: aboutHtml };
    ensureDir(path.join(OUT_DIR, 'about'));
    fs.writeFileSync(path.join(OUT_DIR, 'about', 'index.html'), renderAbout(aboutPost, css));
  }

  // RSS
  fs.writeFileSync(path.join(OUT_DIR, 'rss.xml'), generateRss(posts));

  console.log(`Built ${posts.length} posts -> ${OUT_DIR}`);

  if (watch) {
    const chokidar = require('chokidar');
    chokidar.watch([POSTS_DIR, path.join(ROOT, 'about.md'), PUBLIC_DIR, TEMPLATES_DIR]).on('change', () => {
      console.log('Change detected, rebuilding...');
      main();
    });
  }
}

main();
