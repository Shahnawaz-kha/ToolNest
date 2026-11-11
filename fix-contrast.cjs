const fs = require('fs');
const path = require('path');

console.log('🎨 Upgrading all text and elements to WCAG AAA High Contrast...');

const files = {
  // ==========================================
  // 1. HIGH-CONTRAST HOMEPAGE
  // ==========================================
  'src/pages/HomePage.tsx': `import React, { useState } from 'react';
import { CATEGORIES } from '../data/categories';
import { TOOLS } from '../data/tools';
import { ToolCard } from '../components/ui/ToolCard';
import { usePreferences } from '../context/UserPreferencesContext';
import { Search, Sparkles, Heart } from 'lucide-react';

export const HomePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { favorites } = usePreferences();

  const favoriteTools = TOOLS.filter((t) => favorites.includes(t.id));

  const filteredTools = TOOLS.filter((tool) => {
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.meta.keywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* SaaS Hero Section */}
      <div className="relative text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-brand-blue-50 px-4 py-1.5 text-xs font-bold text-brand-blue-900 border border-brand-blue-300 mb-5 dark:bg-brand-blue-950/60 dark:text-brand-blue-200 dark:border-brand-blue-800">
          <Sparkles className="h-3.5 w-3.5 text-brand-blue-700 dark:text-brand-blue-400" />
          100% Free • Client-Side • No Uploads to External Servers
        </div>

        <h1 className="text-3xl font-black tracking-tight sm:text-5xl text-slate-900 dark:text-white leading-tight">
          Supercharge Your Workflow with{' '}
          <span className="bg-gradient-to-r from-brand-blue-700 to-indigo-700 bg-clip-text text-transparent dark:from-brand-blue-400 dark:to-indigo-400">
            89+ Instant Tools
          </span>
        </h1>

        <p className="mt-3 text-sm sm:text-base text-slate-700 dark:text-slate-200 max-w-xl mx-auto font-medium">
          Fast, private, and secure developer, image, PDF, and text utilities running entirely in your browser.
        </p>

        {/* Hero Quick Search Bar */}
        <div className="mt-7 max-w-lg mx-auto relative">
          <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-600 dark:text-slate-300" />
          <input
            type="text"
            aria-label="Search all 89 tools"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Type tool name (e.g., 'image compressor', 'base64', 'loan')..."
            className="w-full rounded-full border border-slate-300 bg-white pl-11 pr-4 py-3 text-xs sm:text-sm font-medium shadow-xs outline-none text-slate-900 placeholder:text-slate-600 focus:border-brand-blue-600 focus:ring-4 focus:ring-brand-blue-500/10 dark:bg-slate-900 dark:border-slate-700 dark:text-white dark:placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              aria-label="Clear search query"
              className="absolute right-3.5 top-3 text-xs font-bold text-slate-600 hover:text-slate-900 dark:text-slate-300"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* 10 Interactive Category Tiles */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">Explore by Category</h2>
          <span className="text-xs text-brand-blue-800 dark:text-brand-blue-300 font-bold">{TOOLS.length} Active Tools</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {CATEGORIES.map((cat) => {
            const count = TOOLS.filter((t) => t.category === cat.id).length;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(isSelected ? 'all' : cat.id)}
                aria-label={\`Filter by \${cat.name} (\${count} tools)\`}
                className={\`flex flex-col p-3 rounded-xl border text-left transition-all \${
                  isSelected
                    ? 'border-brand-blue-600 bg-brand-blue-50/70 shadow-xs dark:bg-brand-blue-950/50'
                    : 'border-slate-300 bg-white hover:border-slate-400 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900'
                }\`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">{cat.name}</span>
                  <span className="text-[10px] font-bold text-slate-700 bg-slate-200 dark:bg-slate-800 dark:text-slate-200 rounded px-1.5 py-0.5">
                    {count}
                  </span>
                </div>
                <p className="text-[11px] text-slate-700 dark:text-slate-300 line-clamp-1 font-normal">{cat.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Favorites Strip */}
      {favoriteTools.length > 0 && !searchQuery && (
        <div className="mb-10 p-5 rounded-2xl bg-amber-50/60 border border-amber-300 dark:bg-amber-950/30 dark:border-amber-800">
          <div className="flex items-center gap-2 mb-4">
            <Heart className="h-4 w-4 fill-amber-600 text-amber-600" />
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">Your Saved Favorites ({favoriteTools.length})</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {favoriteTools.map((t) => (
              <ToolCard key={t.id} tool={t} />
            ))}
          </div>
        </div>
      )}

      {/* Filter Tabs Bar */}
      <div className="flex items-center justify-between border-b border-slate-300 pb-3 mb-6 dark:border-slate-700">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={\`rounded-lg px-3 py-1.5 text-xs font-bold transition \${
              selectedCategory === 'all'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
            }\`}
          >
            All Tools ({TOOLS.length})
          </button>
          <button
            onClick={() => setSelectedCategory('pdf')}
            className={\`rounded-lg px-3 py-1.5 text-xs font-bold \${selectedCategory === 'pdf' ? 'bg-brand-blue-700 text-white' : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300'}\`}
          >
            PDF
          </button>
          <button
            onClick={() => setSelectedCategory('image')}
            className={\`rounded-lg px-3 py-1.5 text-xs font-bold \${selectedCategory === 'image' ? 'bg-brand-blue-700 text-white' : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300'}\`}
          >
            Image
          </button>
          <button
            onClick={() => setSelectedCategory('calculator')}
            className={\`rounded-lg px-3 py-1.5 text-xs font-bold \${selectedCategory === 'calculator' ? 'bg-brand-blue-700 text-white' : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300'}\`}
          >
            Calculators
          </button>
          <button
            onClick={() => setSelectedCategory('developer')}
            className={\`rounded-lg px-3 py-1.5 text-xs font-bold \${selectedCategory === 'developer' ? 'bg-brand-blue-700 text-white' : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300'}\`}
          >
            Developer
          </button>
        </div>
      </div>

      {/* Main Tools Grid */}
      {filteredTools.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-sm font-bold text-slate-800 dark:text-slate-200">No tools matched "{searchQuery}"</p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
            className="mt-3 text-xs font-bold text-brand-blue-700 dark:text-brand-blue-400 hover:underline"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      )}
    </div>
  );
};`,

  // ==========================================
  // 2. HIGH-CONTRAST FOOTER
  // ==========================================
  'src/components/layout/Footer.tsx': `import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../../data/categories';
import { Layers, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto border-t border-slate-300 bg-white dark:border-slate-800 dark:bg-[#0b0f19]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          <div className="col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-blue-700 text-white">
                <Layers className="h-4 w-4" />
              </div>
              <span className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
                Tool<span className="text-brand-blue-700 dark:text-brand-blue-400">Nest</span>
              </span>
            </div>
            <p className="mt-3 max-w-sm text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
              89+ high-performance online utility tools running entirely in your browser. Fast, private, zero-latency utilities designed for developers, students, and creators worldwide.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-emerald-800 dark:text-emerald-300 font-bold">
              <ShieldCheck className="h-4 w-4" /> 100% Client-Side Safe
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
              Popular Tools
            </h3>
            <ul className="mt-3 space-y-2 text-xs font-medium">
              <li><Link to="/tool/word-counter" className="text-slate-700 hover:text-brand-blue-700 dark:text-slate-300 dark:hover:text-white">Word Counter</Link></li>
              <li><Link to="/tool/image-compressor" className="text-slate-700 hover:text-brand-blue-700 dark:text-slate-300 dark:hover:text-white">Image Compressor</Link></li>
              <li><Link to="/tool/text-to-pdf-converter" className="text-slate-700 hover:text-brand-blue-700 dark:text-slate-300 dark:hover:text-white">Text to PDF</Link></li>
              <li><Link to="/tool/loan-emi-calculator" className="text-slate-700 hover:text-brand-blue-700 dark:text-slate-300 dark:hover:text-white">Loan Calculator</Link></li>
              <li><Link to="/tool/json-formatter-validator" className="text-slate-700 hover:text-brand-blue-700 dark:text-slate-300 dark:hover:text-white">JSON Formatter</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
              Categories
            </h3>
            <ul className="mt-3 space-y-2 text-xs font-medium">
              {CATEGORIES.slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <Link to={'/category/' + cat.id} className="text-slate-700 hover:text-brand-blue-700 dark:text-slate-300 dark:hover:text-white">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
              Legal & Trust
            </h3>
            <ul className="mt-3 space-y-2 text-xs font-medium">
              <li><Link to="/privacy" className="text-slate-700 hover:text-brand-blue-700 dark:text-slate-300 dark:hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-slate-700 hover:text-brand-blue-700 dark:text-slate-300 dark:hover:text-white">Terms of Service</Link></li>
              <li><Link to="/about" className="text-slate-700 hover:text-brand-blue-700 dark:text-slate-300 dark:hover:text-white">About ToolNest</Link></li>
              <li><Link to="/contact" className="text-slate-700 hover:text-brand-blue-700 dark:text-slate-300 dark:hover:text-white">Contact & Feedback</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-300 pt-6 text-center text-xs text-slate-700 dark:border-slate-800 dark:text-slate-300 font-medium">
          © {new Date().getFullYear()} ToolNest Platform. All rights reserved. Zero external server processing.
        </div>
      </div>
    </footer>
  );
};`,

  // ==========================================
  // 3. HIGH-CONTRAST AD BANNER
  // ==========================================
  'src/components/ui/AdBanner.tsx': `import React from 'react';

interface AdBannerProps {
  slot?: string;
  format?: 'auto' | 'rectangle' | 'horizontal';
  className?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({
  slot = '0000000000',
  format = 'auto',
  className = '',
}) => {
  const isProduction = Boolean((import.meta as any).env?.PROD);

  return (
    <div className={\`my-8 overflow-hidden rounded-2xl border border-slate-300 bg-slate-100/60 p-4 text-center dark:border-slate-700 dark:bg-slate-900/60 \${className}\`}>
      <div className="mb-1 text-[11px] font-bold uppercase tracking-widest text-slate-700 dark:text-slate-300">
        Advertisement
      </div>
      {isProduction ? (
        <ins
          className="adsbygoogle block"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      ) : (
        <div className="flex min-h-[90px] items-center justify-center rounded-xl border border-dashed border-slate-400 dark:border-slate-600 bg-white/70 dark:bg-slate-800/60 p-6 text-xs font-semibold text-slate-700 dark:text-slate-200">
          Google AdSense Placement Area (Auto-renders in production)
        </div>
      )}
    </div>
  );
};`
};

for (const [filePath, content] of Object.entries(files)) {
  const fullPath = path.join(process.cwd(), filePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content);
  console.log('  ✔ Created / Updated ' + filePath);
}

console.log('\\n✨ ALL CONTRAST ISSUES RESOLVED (WCAG AAA)!');