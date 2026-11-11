const fs = require('fs');
const path = require('path');

console.log('🌐 Generating XML Sitemap, robots.txt, 404 Page, and Production Meta...');

// Ensure public directory exists
const publicDir = path.join(process.cwd(), 'public');
fs.mkdirSync(publicDir, { recursive: true });

// Load tools data to extract all 89 slugs
const toolsFilePath = path.join(process.cwd(), 'src', 'data', 'tools.ts');
let toolSlugs = [];
if (fs.existsSync(toolsFilePath)) {
  const content = fs.readFileSync(toolsFilePath, 'utf-8');
  const matches = content.matchAll(/slug:\s*['"]([^'"]+)['"]/g);
  for (const match of matches) {
    toolSlugs.push(match[1]);
  }
}

// 10 Categories
const categories = [
  'pdf', 'image', 'text', 'calculator', 'developer',
  'qr-barcode', 'seo', 'social-media', 'design', 'productivity'
];

// Base domain (Change this to your custom domain when purchased, e.g., https://toolnest.com)
const BASE_URL = 'https://toolnest.com';
const today = new Date().toISOString().split('T')[0];

// ==========================================
// 1. GENERATE SITEMAP.XML
// ==========================================
let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Homepage -->
  <url>
    <loc>${BASE_URL}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <!-- Legal & Trust Pages -->
  <url>
    <loc>${BASE_URL}/privacy</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${BASE_URL}/terms</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${BASE_URL}/about</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>${BASE_URL}/contact</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <!-- Category Pages -->
${categories.map(c => `  <url>
    <loc>${BASE_URL}/category/${c}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}
  <!-- Individual Tool Pages (89+ Tools) -->
${toolSlugs.map(slug => `  <url>
    <loc>${BASE_URL}/tool/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`).join('\n')}
</urlset>`;

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml);
console.log(`  ✔ Generated public/sitemap.xml (${toolSlugs.length + categories.length + 5} URLs mapped)`);

// ==========================================
// 2. GENERATE ROBOTS.TXT
// ==========================================
const robotsTxt = `User-agent: *
Allow: /

# Host & Sitemap
Sitemap: ${BASE_URL}/sitemap.xml
`;
fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt);
console.log('  ✔ Generated public/robots.txt');

// ==========================================
// 3. 404 NOT FOUND PAGE
// ==========================================
const notFoundPage = `import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, ArrowLeft, Home, Search } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-16 text-center">
      <div className="max-w-md">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-blue-50 text-brand-blue-600 mb-6 dark:bg-brand-blue-950/40">
          <Layers className="h-8 w-8" />
        </div>
        <div className="text-5xl font-black text-slate-900 dark:text-white tracking-tight">404</div>
        <h1 className="mt-2 text-xl font-bold text-slate-800 dark:text-slate-200">Tool or Page Not Found</h1>
        <p className="mt-2 text-xs text-slate-500 leading-relaxed">
          The requested utility or URL could not be found. It may have moved or the link might be mistyped.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl bg-brand-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-brand-blue-700"
          >
            <Home className="h-4 w-4" /> Explore 89+ Tools
          </Link>
        </div>
      </div>
    </div>
  );
};`;

fs.writeFileSync(path.join(process.cwd(), 'src', 'pages', 'NotFoundPage.tsx'), notFoundPage);
console.log('  ✔ Created src/pages/NotFoundPage.tsx');

// ==========================================
// 4. UPDATE INDEX.HTML WITH OPENGRAPH & TWITTER META
// ==========================================
const indexHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <!-- Primary Meta Tags -->
    <title>ToolNest - 89+ Free High Performance Online Tools</title>
    <meta name="title" content="ToolNest - 89+ Free High Performance Online Tools" />
    <meta name="description" content="Free, fast, and secure developer, PDF, image, and text utility tools running 100% client-side in your browser with zero server uploads." />
    <meta name="keywords" content="online tools, pdf converter, image compressor, json formatter, word counter, loan calculator, developer tools" />
    <meta name="robots" content="index, follow" />
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://toolnest.com/" />
    <meta property="og:title" content="ToolNest - 89+ Free High Performance Online Tools" />
    <meta property="og:description" content="Free, fast, and secure developer, PDF, image, and text utility tools running 100% in your browser." />
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:title" content="ToolNest - 89+ Free Online Tools" />
    <meta property="twitter:description" content="Fast, private, client-side web utility suite." />
    
    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%232563eb'><path d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'/></svg>" />
  </head>
  <body class="bg-[#f8fafc] text-slate-800 min-h-screen dark:bg-[#0b0f19] dark:text-slate-100">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`;

fs.writeFileSync(path.join(process.cwd(), 'index.html'), indexHtml);
console.log('  ✔ Hardened index.html with SEO & OpenGraph tags');

// ==========================================
// 5. UPDATE APP.TSX TO CATCH 404 ROUTE
// ==========================================
const appTsxPath = path.join(process.cwd(), 'src', 'App.tsx');
if (fs.existsSync(appTsxPath)) {
  let appContent = fs.readFileSync(appTsxPath, 'utf-8');
  if (!appContent.includes('NotFoundPage')) {
    appContent = appContent.replace(
      "import { ContactPage } from './pages/ContactPage';",
      "import { ContactPage } from './pages/ContactPage';\\nimport { NotFoundPage } from './pages/NotFoundPage';"
    );
    appContent = appContent.replace(
      '<Route path="/contact" element={<ContactPage />} />',
      '<Route path="/contact" element={<ContactPage />} />\\n                <Route path="*" element={<NotFoundPage />} />'
    );
    fs.writeFileSync(appTsxPath, appContent);
    console.log('  ✔ Connected wildcard 404 Route in src/App.tsx');
  }
}

console.log('\\n🚀 PRODUCTION OPTIMIZATION & SITEMAP COMPLETE!');