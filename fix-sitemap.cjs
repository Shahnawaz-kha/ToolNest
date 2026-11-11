const fs = require('fs');
const path = require('path');

console.log('🔄 Updating Sitemap & Robots.txt to match your live Vercel domain...');

const liveDomain = 'https://toolnest-fawn.vercel.app';

// 1. Update public/sitemap.xml
const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
if (fs.existsSync(sitemapPath)) {
  let content = fs.readFileSync(sitemapPath, 'utf-8');
  content = content.replaceAll('https://toolnest.com', liveDomain);
  fs.writeFileSync(sitemapPath, content);
  console.log('  ✔ Updated public/sitemap.xml with live domain URLs');
}

// 2. Update public/robots.txt
const robotsPath = path.join(process.cwd(), 'public', 'robots.txt');
if (fs.existsSync(robotsPath)) {
  let content = fs.readFileSync(robotsPath, 'utf-8');
  content = content.replaceAll('https://toolnest.com', liveDomain);
  fs.writeFileSync(robotsPath, content);
  console.log('  ✔ Updated public/robots.txt with live sitemap location');
}

// 3. Update index.html metadata
const indexPath = path.join(process.cwd(), 'index.html');
if (fs.existsSync(indexPath)) {
  let content = fs.readFileSync(indexPath, 'utf-8');
  content = content.replaceAll('https://toolnest.com/', liveDomain + '/');
  fs.writeFileSync(indexPath, content);
  console.log('  ✔ Updated index.html canonical URL');
}

console.log('\n✨ All 104 URLs updated to: ' + liveDomain);
console.log('Now run: vercel --prod');