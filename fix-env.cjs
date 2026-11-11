const fs = require('fs');
const path = require('path');

// 1. Create vite-env.d.ts so TypeScript recognizes Vite's browser types
const envDtsPath = path.join(process.cwd(), 'src', 'vite-env.d.ts');
fs.writeFileSync(envDtsPath, '/// <reference types="vite/client" />\n');
console.log('  ✔ Created src/vite-env.d.ts');

// 2. Safely type-cast AdBanner.tsx so it compiles under any TypeScript mode
const adBannerPath = path.join(process.cwd(), 'src', 'components', 'ui', 'AdBanner.tsx');
if (fs.existsSync(adBannerPath)) {
  let content = fs.readFileSync(adBannerPath, 'utf-8');
  content = content.replace(
    'Boolean(import.meta.env.PROD);',
    'Boolean((import.meta as any).env?.PROD);'
  );
  fs.writeFileSync(adBannerPath, content);
  console.log('  ✔ Updated src/components/ui/AdBanner.tsx');
}

console.log('\n✨ Ready! Now run: npm run build');