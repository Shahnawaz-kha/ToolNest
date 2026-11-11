const fs = require('fs');
const path = require('path');

console.log('🎯 Adding Smooth Auto-Scroll to Tools & Categories...');

const files = {
  // ==========================================
  // 1. UPDATE HOMEPAGE TO SMOOTH-SCROLL ON CATEGORY CLICK
  // ==========================================
  'src/pages/HomePage.tsx': `import React, { useState } from 'react';
import { CATEGORIES } from '../data/categories';
import { TOOLS } from '../data/tools';
import { ToolCard } from '../components/ui/ToolCard';
import { usePreferences } from '../context/UserPreferencesContext';
import { Search, Sparkles, Heart, ArrowDown } from 'lucide-react';

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

  // Smoothly scrolls down to the tools grid
  const scrollToTools = (catId: string) => {
    setSelectedCategory(catId);
    setTimeout(() => {
      const el = document.getElementById('tools-grid-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

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
      <div className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Click a Category to View Tools:
          </h2>
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
                onClick={() => scrollToTools(isSelected ? 'all' : cat.id)}
                aria-label={\`Filter by \${cat.name} (\${count} tools)\`}
                className={\`flex flex-col p-3 rounded-xl border text-left transition-all cursor-pointer \${
                  isSelected
                    ? 'border-brand-blue-600 bg-brand-blue-50/90 shadow-md ring-2 ring-brand-blue-500/20 dark:bg-brand-blue-950/60'
                    : 'border-slate-300 bg-white hover:border-brand-blue-400 hover:bg-slate-50 hover:shadow-xs dark:border-slate-700 dark:bg-slate-900'
                }\`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">{cat.name}</span>
                  <span className="text-[10px] font-bold text-slate-700 bg-slate-200 dark:bg-slate-800 dark:text-slate-200 rounded px-1.5 py-0.5">
                    {count}
                  </span>
                </div>
                <p className="text-[11px] text-slate-700 dark:text-slate-300 line-clamp-1 font-normal flex items-center justify-between">
                  {cat.description}
                  <ArrowDown className="h-2.5 w-2.5 text-brand-blue-600 shrink-0 ml-1 opacity-70" />
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Target Anchor Section to Scroll Into */}
      <div id="tools-grid-section" className="scroll-mt-20">
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
              onClick={() => scrollToTools('all')}
              className={\`rounded-lg px-3.5 py-1.5 text-xs font-bold transition \${
                selectedCategory === 'all'
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
                  : 'text-slate-700 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-800'
              }\`}
            >
              All Tools ({TOOLS.length})
            </button>
            <button
              onClick={() => scrollToTools('pdf')}
              className={\`rounded-lg px-3.5 py-1.5 text-xs font-bold transition \${selectedCategory === 'pdf' ? 'bg-brand-blue-700 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-200 dark:text-slate-300'}\`}
            >
              PDF Tools
            </button>
            <button
              onClick={() => scrollToTools('image')}
              className={\`rounded-lg px-3.5 py-1.5 text-xs font-bold transition \${selectedCategory === 'image' ? 'bg-brand-blue-700 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-200 dark:text-slate-300'}\`}
            >
              Image Tools
            </button>
            <button
              onClick={() => scrollToTools('calculator')}
              className={\`rounded-lg px-3.5 py-1.5 text-xs font-bold transition \${selectedCategory === 'calculator' ? 'bg-brand-blue-700 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-200 dark:text-slate-300'}\`}
            >
              Calculators
            </button>
            <button
              onClick={() => scrollToTools('developer')}
              className={\`rounded-lg px-3.5 py-1.5 text-xs font-bold transition \${selectedCategory === 'developer' ? 'bg-brand-blue-700 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-200 dark:text-slate-300'}\`}
            >
              Developer Tools
            </button>
          </div>
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 hidden sm:inline-block">
            Showing: {filteredTools.length} tools
          </span>
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
    </div>
  );
};`,

  // ==========================================
  // 2. UPDATE TOOL LAYOUT TO AUTO-FOCUS THE TOOL SCREEN
  // ==========================================
  'src/components/layout/ToolLayout.tsx': `import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShieldCheck, Zap, Share2, Check, ArrowLeft } from 'lucide-react';
import { ToolMetadata } from '../../types';
import { usePreferences } from '../../context/UserPreferencesContext';
import { ToolCard } from '../ui/ToolCard';
import { TOOLS } from '../../data/tools';
import { AdBanner } from '../ui/AdBanner';

export const ToolLayout: React.FC<{ tool: ToolMetadata; children: React.ReactNode }> = ({ tool, children }) => {
  const { favorites, toggleFavorite } = usePreferences();
  const isFav = favorites.includes(tool.id);
  const [copiedLink, setCopiedLink] = useState(false);

  const relatedTools = TOOLS.filter((t) => t.category === tool.category && t.id !== tool.id).slice(0, 3);

  // Smooth scroll directly into the tool workstation when opened
  useEffect(() => {
    const el = document.getElementById('tool-main-screen');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [tool.id]);

  const shareTool = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      {/* Top Breadcrumb & Return */}
      <div className="mb-5 flex items-center justify-between text-xs text-slate-700 dark:text-slate-300">
        <Link to="/" className="inline-flex items-center gap-1 hover:text-brand-blue-700 font-bold">
          <ArrowLeft className="h-3 w-3" /> All 89 Tools
        </Link>
        <div className="flex items-center gap-2">
          <Link to={'/category/' + tool.category} className="capitalize hover:underline font-medium">
            {tool.category}
          </Link>
          <span>/</span>
          <span className="font-bold text-slate-900 dark:text-white">{tool.name}</span>
        </div>
      </div>

      {/* Tool Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-slate-300/90 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-[#111625]">
        <div>
          <span className="rounded-md bg-brand-blue-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-blue-900 border border-brand-blue-200 dark:bg-brand-blue-950/60 dark:text-brand-blue-300 dark:border-brand-blue-800">
            {tool.category} TOOL
          </span>
          <h1 className="mt-2 text-2xl font-black text-slate-900 dark:text-white tracking-tight">{tool.name}</h1>
          <p className="mt-1 text-xs text-slate-700 dark:text-slate-300 font-normal">{tool.shortDescription}</p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <button
            onClick={shareTool}
            aria-label="Share tool link"
            className="flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 shadow-2xs"
          >
            {copiedLink ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Share2 className="h-3.5 w-3.5 text-slate-600" />}
            {copiedLink ? 'Copied' : 'Share'}
          </button>

          <button
            onClick={() => toggleFavorite(tool.id)}
            aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
            className="flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 shadow-2xs"
          >
            <Star className={\`h-3.5 w-3.5 \${isFav ? 'fill-amber-500 text-amber-500' : 'text-slate-500'}\`} />
            {isFav ? 'Saved' : 'Favorite'}
          </button>
        </div>
      </div>

      {/* Primary Tool Main Screen with Anchor */}
      <section id="tool-main-screen" className="my-6 scroll-mt-20 rounded-2xl border border-slate-300/90 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#111625]">
        {children}
      </section>

      {/* AdSense Placement Anchor */}
      <AdBanner slot="tool-page-middle" />

      {/* Instructions */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-slate-300/80 bg-white p-5 dark:border-slate-800 dark:bg-[#111625]">
          <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
            <Zap className="h-3.5 w-3.5 text-brand-blue-700 dark:text-brand-blue-400" /> Instructions
          </h2>
          <ul className="mt-2 space-y-1.5 text-xs text-slate-700 dark:text-slate-300 leading-relaxed list-disc list-inside">
            {tool.instructions.howTo.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-slate-300/80 bg-white p-5 dark:border-slate-800 dark:bg-[#111625]">
          <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-700 dark:text-emerald-400" /> Client-Side Processing
          </h2>
          <p className="mt-2 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            All calculations and conversions execute inside your browser window. No files, documents, or data inputs are ever sent to remote servers.
          </p>
        </div>
      </div>

      {/* Related Tools */}
      {relatedTools.length > 0 && (
        <div className="mt-12 border-t border-slate-300 pt-8 dark:border-slate-800">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 mb-4">Related Utilities</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedTools.map((relTool) => (
              <ToolCard key={relTool.id} tool={relTool} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};`,

  // ==========================================
  // 3. REMOVE CONFLICTING INSTANT SCROLL-TO-TOP
  // ==========================================
  'src/components/ui/ScrollToTop.tsx': `export const ScrollToTop: React.FC = () => {
  return null; // Allows smooth scrolling to targets without interference
};`
};

for (const [filePath, content] of Object.entries(files)) {
  const fullPath = path.join(process.cwd(), filePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content);
  console.log('  ✔ Created / Updated ' + filePath);
}

console.log('\\n✨ SMOOTH SCROLLING INSTALLED!');