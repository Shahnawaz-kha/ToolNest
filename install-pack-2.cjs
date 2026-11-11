const fs = require('fs');
const path = require('path');

console.log('⚡ Installing ToolNest Pack 2 (SEO, Social, Design, Productivity)...');

const files = {
  // ==========================================
  // SEO & SOCIAL MEDIA ENGINE
  // ==========================================
  'src/tools/engines/SeoSocialTools.tsx': `import React, { useState } from 'react';

export const MetaTagGenerator: React.FC = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [keywords, setKeywords] = useState('');
  const [author, setAuthor] = useState('');

  const metaCode = \`<!-- Primary Meta Tags -->
<title>\${title}</title>
<meta name="title" content="\${title}" />
<meta name="description" content="\${desc}" />
<meta name="keywords" content="\${keywords}" />
<meta name="author" content="\${author}" />

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:title" content="\${title}" />
<meta property="og:description" content="\${desc}" />

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:title" content="\${title}" />
<meta property="twitter:description" content="\${desc}" />\`;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Website Title" className="rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent p-3 text-sm outline-none dark:text-white" />
        <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author / Site Name" className="rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent p-3 text-sm outline-none dark:text-white" />
      </div>
      <textarea rows={2} value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Meta Description (recomended ~160 chars)" className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent p-3 text-sm outline-none dark:text-white" />
      <input type="text" value={keywords} onChange={(e) => setKeywords(e.target.value)} placeholder="Keywords (comma separated)" className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent p-3 text-sm outline-none dark:text-white" />
      <div className="relative">
        <textarea readOnly rows={8} value={metaCode} className="w-full rounded-xl border border-slate-200 bg-slate-50 dark:bg-slate-900 p-3 font-mono text-xs dark:border-slate-800 dark:text-white" />
        <button onClick={() => navigator.clipboard.writeText(metaCode)} className="mt-2 rounded-lg bg-brand-blue-600 px-4 py-2 text-xs font-semibold text-white">Copy Meta Tags</button>
      </div>
    </div>
  );
};

export const RobotsTxtGenerator: React.FC = () => {
  const [allow, setAllow] = useState(true);
  const [sitemap, setSitemap] = useState('https://example.com/sitemap.xml');
  const txt = \`User-agent: *\\n\${allow ? 'Allow: /' : 'Disallow: /'}\\n\\nSitemap: \${sitemap}\`;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 text-xs dark:text-white">
          <input type="checkbox" checked={allow} onChange={(e) => setAllow(e.target.checked)} /> Allow All Robots
        </label>
        <input type="text" value={sitemap} onChange={(e) => setSitemap(e.target.value)} placeholder="Sitemap URL" className="flex-1 rounded-lg border border-slate-200 dark:border-slate-800 bg-transparent p-2 text-xs dark:text-white" />
      </div>
      <textarea readOnly rows={5} value={txt} className="w-full rounded-xl border border-slate-200 bg-slate-50 dark:bg-slate-900 p-3 font-mono text-xs dark:border-slate-800 dark:text-white" />
      <button onClick={() => navigator.clipboard.writeText(txt)} className="rounded-lg bg-brand-purple-600 px-4 py-2 text-xs font-semibold text-white">Copy robots.txt</button>
    </div>
  );
};

export const TweetSplitter: React.FC = () => {
  const [text, setText] = useState('');
  const splitTweets = (str: string) => {
    const words = str.split(' ');
    const tweets: string[] = [];
    let cur = '';
    words.forEach(w => {
      if ((cur + ' ' + w).length <= 270) {
        cur += (cur ? ' ' : '') + w;
      } else {
        tweets.push(cur);
        cur = w;
      }
    });
    if (cur) tweets.push(cur);
    return tweets.map((t, idx) => \`\${t} (\${idx + 1}/\${tweets.length})\`);
  };

  const tweets = text ? splitTweets(text) : [];

  return (
    <div className="space-y-4">
      <textarea rows={5} value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste long post or article to split into tweets (threads)..." className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent p-3 text-sm outline-none dark:text-white" />
      <div className="text-xs text-slate-500 font-bold uppercase">Thread Preview ({tweets.length} posts)</div>
      <div className="space-y-2">
        {tweets.map((t, i) => (
          <div key={i} className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs flex justify-between items-center dark:text-white">
            <span className="flex-1 pr-3">{t}</span>
            <button onClick={() => navigator.clipboard.writeText(t)} className="text-brand-blue-600 font-bold text-[11px]">Copy</button>
          </div>
        ))}
      </div>
    </div>
  );
};`,

  // ==========================================
  // MORE PRODUCTIVITY & UTILITY TOOLS
  // ==========================================
  'src/tools/engines/MoreProductivity.tsx': `import React, { useState } from 'react';

export const PasswordGenerator: React.FC = () => {
  const [len, setLen] = useState(16);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [pwd, setPwd] = useState('');

  const generate = () => {
    let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (numbers) chars += '0123456789';
    if (symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.';
    let res = '';
    for (let i = 0; i < len; i++) {
      res += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPwd(res);
  };

  React.useEffect(() => { generate(); }, [len, numbers, symbols]);

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-900 font-mono text-lg font-bold text-brand-blue-600 break-all text-center">
        {pwd}
      </div>
      <div className="flex flex-wrap items-center gap-4 text-xs dark:text-white">
        <label>Length: {len}</label>
        <input type="range" min={8} max={40} value={len} onChange={(e) => setLen(parseInt(e.target.value))} />
        <label className="flex items-center gap-1 cursor-pointer">
          <input type="checkbox" checked={numbers} onChange={(e) => setNumbers(e.target.checked)} /> Numbers
        </label>
        <label className="flex items-center gap-1 cursor-pointer">
          <input type="checkbox" checked={symbols} onChange={(e) => setSymbols(e.target.checked)} /> Symbols
        </label>
      </div>
      <div className="flex gap-2">
        <button onClick={() => navigator.clipboard.writeText(pwd)} className="rounded-lg bg-brand-blue-600 px-4 py-2 text-xs font-semibold text-white">Copy Password</button>
        <button onClick={generate} className="rounded-lg bg-slate-100 dark:bg-slate-800 px-4 py-2 text-xs font-semibold dark:text-white">Regenerate</button>
      </div>
    </div>
  );
};

export const RandomDice: React.FC = () => {
  const [roll, setRoll] = useState(6);
  const [isRolling, setIsRolling] = useState(false);

  const rollDice = () => {
    setIsRolling(true);
    setTimeout(() => {
      setRoll(Math.floor(Math.random() * 6) + 1);
      setIsRolling(false);
    }, 200);
  };

  return (
    <div className="text-center space-y-4 py-6">
      <div className={\`text-7xl transition-transform duration-200 \${isRolling ? 'scale-125 rotate-12' : ''}\`}>
        {['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'][roll - 1]}
      </div>
      <button onClick={rollDice} className="rounded-xl bg-brand-purple-600 px-6 py-2.5 text-sm font-bold text-white shadow-md">
        Roll Dice
      </button>
    </div>
  );
};`
};

for (const [filePath, content] of Object.entries(files)) {
  const fullPath = path.join(process.cwd(), filePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content);
  console.log('  ✔ Created ' + filePath);
}

console.log('\\n✨ Pack 2 Installed! Proceeding to connect routes...');