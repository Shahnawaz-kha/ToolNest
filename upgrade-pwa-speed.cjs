const fs = require('fs');
const path = require('path');

console.log('⚡ Installing PWA Offline Engine & Edge Performance Headers...');

// 1. Create Web App Manifest in public/manifest.json
const manifest = {
  short_name: "ToolNest",
  name: "ToolNest - 89+ Free Online Utility Tools",
  description: "89+ fast, private utility tools running client-side with zero server uploads.",
  icons: [
    {
      src: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%232563eb'><path d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'/></svg>",
      sizes: "192x192 512x512",
      type: "image/svg+xml",
      purpose: "any maskable"
    }
  ],
  start_url: "/",
  background_color: "#ffffff",
  theme_color: "#2563eb",
  display: "standalone",
  orientation: "portrait"
};

fs.writeFileSync(
  path.join(process.cwd(), 'public', 'manifest.json'),
  JSON.stringify(manifest, null, 2)
);
console.log('  ✔ Created public/manifest.json');

// 2. Update index.html to link manifest & theme colors
const indexPath = path.join(process.cwd(), 'index.html');
if (fs.existsSync(indexPath)) {
  let indexContent = fs.readFileSync(indexPath, 'utf-8');
  if (!indexContent.includes('manifest.json')) {
    indexContent = indexContent.replace(
      '<link rel="icon"',
      '<link rel="manifest" href="/manifest.json" />\n    <meta name="theme-color" content="#2563eb" />\n    <meta name="apple-mobile-web-app-capable" content="yes" />\n    <meta name="apple-mobile-web-app-status-bar-style" content="default" />\n    <link rel="icon"'
    );
    fs.writeFileSync(indexPath, indexContent);
    console.log('  ✔ Injected PWA tags into index.html');
  }
}

// 3. Update vercel.json with SPA rewrites + Edge Caching + Security Headers
const vercelConfig = {
  rewrites: [
    { source: "/(.*)", destination: "/" }
  ],
  headers: [
    {
      source: "/assets/(.*)",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      source: "/(.*)",
      headers: [
        {
          key: "X-Content-Type-Options",
          value: "nosniff"
        },
        {
          key: "X-Frame-Options",
          value: "DENY"
        },
        {
          key: "X-XSS-Protection",
          value: "1; mode=block"
        },
        {
          key: "Referrer-Policy",
          value: "strict-origin-when-cross-origin"
        }
      ]
    }
  ]
};

fs.writeFileSync(
  path.join(process.cwd(), 'vercel.json'),
  JSON.stringify(vercelConfig, null, 2)
);
console.log('  ✔ Updated vercel.json (Edge Caching & Security Headers)');

console.log('\n🚀 PWA & SPEED HEADERS READY!');