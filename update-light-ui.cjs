const fs = require('fs');
const path = require('path');

console.log('🎨 Applying Crisp Light Theme & Interactive SaaS UI...');

const files = {
  // ==========================================
  // 1. UPDATED CSS - AIRY LIGHT BACKGROUND & SMOOTH GLOWS
  // ==========================================
  'src/index.css': `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-[#f8fafc] text-slate-800 antialiased selection:bg-brand-blue-500 selection:text-white dark:bg-[#0b0f19] dark:text-slate-100;
  }
}

/* Smooth micro-interactions */
.tool-card {
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}
.tool-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px -10px rgba(59, 130, 246, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.02);
}`,

  // ==========================================
  // 2. THEME CONTEXT (LIGHT MODE AS CRISP DEFAULT)
  // ==========================================
  'src/context/ThemeContext.tsx': `import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('tn_theme') as Theme;
    return saved || 'light'; // Clean light mode by default
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('tn_theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};`,

  // ==========================================
  // 3. INTERACTIVE HEADER WITH LIVE STATS & QUICK NAV
  // ==========================================
  'src/components/layout/Header.tsx': `import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, Search, Layers, Menu, X, Sparkles, Heart } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { SearchModal } from '../ui/SearchModal';
import { usePreferences } from '../../context/UserPreferencesContext';

export const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { favorites } = usePreferences();

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-md dark:border-slate-800/80 dark:bg-[#0b0f19]/90">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo & Platform Tag */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-blue-600 via-brand-blue-500 to-indigo-600 shadow-sm shadow-brand-blue-500/20 group-hover:scale-105 transition-transform">
              <Layers className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
                  Tool<span className="text-brand-blue-600">Nest</span>
                </span>
                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600 border border-emerald-200/60 dark:bg-emerald-950/40 dark:border-emerald-800">
                  89 TOOLS
                </span>
              </div>
            </div>
          </Link>

          {/* Center Search Trigger */}
          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50/80 px-4 py-2 text-xs text-slate-500 transition-all hover:bg-white hover:border-brand-blue-400 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-400 w-48 sm:w-72"
          >
            <Search className="h-3.5 w-3.5 text-brand-blue-600" />
            <span className="flex-1 text-left font-medium">Quick find any tool...</span>
            <kbd className="hidden sm:inline-block rounded bg-white px-1.5 py-0.5 text-[10px] font-semibold text-slate-500 border border-slate-200 shadow-2xs dark:bg-slate-800 dark:border-slate-700">
              ⌘K
            </kbd>
          </button>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2">
            {favorites.length > 0 && (
              <Link
                to="/"
                className="hidden sm:flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-600 border border-rose-200/60 hover:bg-rose-100 transition"
              >
                <Heart className="h-3.5 w-3.5 fill-rose-500" />
                <span>{favorites.length} Saved</span>
              </Link>
            )}

            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="rounded-xl border border-slate-200/80 bg-white p-2 text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 transition shadow-2xs"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-500" /> : <Moon className="h-4 w-4 text-slate-600" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-xl border border-slate-200/80 p-2 text-slate-600 sm:hidden dark:border-slate-800 dark:text-slate-300"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="border-b border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-[#0b0f19] sm:hidden">
            <nav className="flex flex-col gap-1 text-xs font-medium">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="rounded-lg px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800">Home & All 89 Tools</Link>
              <Link to="/category/pdf" onClick={() => setMobileMenuOpen(false)} className="rounded-lg px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800">PDF Tools</Link>
              <Link to="/category/image" onClick={() => setMobileMenuOpen(false)} className="rounded-lg px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800">Image Tools</Link>
              <Link to="/category/calculator" onClick={() => setMobileMenuOpen(false)} className="rounded-lg px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800">Calculators</Link>
              <Link to="/category/developer" onClick={() => setMobileMenuOpen(false)} className="rounded-lg px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800">Developer Tools</Link>
            </nav>
          </div>
        )}
      </header>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};`,

  // ==========================================
  // 4. INTERACTIVE TOOL CARD WITH PASTEL BADGES
  // ==========================================
  'src/components/ui/ToolCard.tsx': `import React from 'react';
  import { Link } from 'react-router-dom';
  import { Star, ArrowRight, Zap } from 'lucide-react';
  import { ToolMetadata } from '../../types';
  import { usePreferences } from '../../context/UserPreferencesContext';

  const CATEGORY_COLORS: Record<string, string> = {
    pdf: 'bg-rose-50 text-rose-700 border-rose-200/60 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-900',
    image: 'bg-amber-50 text-amber-700 border-amber-200/60 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-900',
    text: 'bg-blue-50 text-blue-700 border-blue-200/60 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-900',
    calculator: 'bg-emerald-50 text-emerald-700 border-emerald-200/60 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-900',
    developer: 'bg-indigo-50 text-indigo-700 border-indigo-200/60 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-900',
    'qr-barcode': 'bg-violet-50 text-violet-700 border-violet-200/60 dark:bg-violet-950/40 dark:text-violet-300 dark:border-violet-900',
    seo: 'bg-teal-50 text-teal-700 border-teal-200/60 dark:bg-teal-950/40 dark:text-teal-300 dark:border-teal-900',
    'social-media': 'bg-pink-50 text-pink-700 border-pink-200/60 dark:bg-pink-950/40 dark:text-pink-300 dark:border-pink-900',
    design: 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200/60 dark:bg-fuchsia-950/40 dark:text-fuchsia-300 dark:border-fuchsia-900',
    productivity: 'bg-sky-50 text-sky-700 border-sky-200/60 dark:bg-sky-950/40 dark:text-sky-300 dark:border-sky-900',
  };

  export const ToolCard: React.FC<{ tool: ToolMetadata }> = ({ tool }) => {
    const { favorites, toggleFavorite } = usePreferences();
    const isFav = favorites.includes(tool.id);
    const colorClass = CATEGORY_COLORS[tool.category] || 'bg-slate-50 text-slate-700 border-slate-200';

    return (
      <div className="tool-card group relative flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition-all hover:border-brand-blue-300 dark:border-slate-800/90 dark:bg-[#111625]">
        <div>
          <div className="flex items-center justify-between gap-2">
            <span className={\`rounded-md border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider \${colorClass}\`}>
              {tool.category}
            </span>
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleFavorite(tool.id);
              }}
              title={isFav ? 'Remove from favorites' : 'Add to favorites'}
              className="rounded-lg p-1 text-slate-400 hover:text-amber-500 hover:bg-slate-50 transition"
            >
              <Star className={\`h-4 w-4 \${isFav ? 'fill-amber-400 text-amber-400 scale-110' : ''} transition-transform\`} />
            </button>
          </div>

          <h3 className="mt-3 text-sm font-bold text-slate-900 group-hover:text-brand-blue-600 dark:text-white transition-colors">
            {tool.name}
          </h3>
          <p className="mt-1.5 text-xs text-slate-500 line-clamp-2 leading-relaxed dark:text-slate-400">
            {tool.shortDescription}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between dark:border-slate-800">
          <Link
            to={'/tool/' + tool.slug}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-blue-600 hover:text-brand-blue-700 dark:text-brand-blue-400"
          >
            Launch Tool <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
          </Link>
          {tool.isPopular && (
            <span className="flex items-center gap-1 text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200/60">
              <Zap className="h-2.5 w-2.5 fill-amber-500" /> POPULAR
            </span>
          )}
        </div>
      </div>
    );
  };`,

  // ==========================================
  // 5. INTERACTIVE HOMEPAGE WITH CATEGORY TILES & SEARCH
  // ==========================================
  'src/pages/HomePage.tsx': `import React, { useState } from 'react';
import { CATEGORIES } from '../data/categories';
import { TOOLS } from '../data/tools';
import { ToolCard } from '../components/ui/ToolCard';
import { usePreferences } from '../context/UserPreferencesContext';
import { Search, Sparkles, Star, ShieldCheck, Zap, Grid, Heart } from 'lucide-react';

export const HomePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { favorites } = usePreferences();

  const favoriteTools = TOOLS.filter((t) => favorites.includes(t.id));

  // Filter pipeline: Category -> Search Query
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
        <div className="inline-flex items-center gap-2 rounded-full bg-brand-blue-50 px-3.5 py-1 text-xs font-bold text-brand-blue-700 border border-brand-blue-200/60 mb-5 dark:bg-brand-blue-950/40 dark:text-brand-blue-300">
          <Sparkles className="h-3.5 w-3.5 text-brand-blue-600 animate-spin" style={{ animationDuration: '6s' }} />
          100% Free • Client-Side • No Uploads to External Servers
        </div>

        <h1 className="text-3xl font-black tracking-tight sm:text-5xl text-slate-900 dark:text-white leading-tight">
          Supercharge Your Workflow with{' '}
          <span className="bg-gradient-to-r from-brand-blue-600 to-indigo-600 bg-clip-text text-transparent">
            89+ Instant Tools
          </span>
        </h1>

        <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          Fast, private, and secure developer, image, PDF, and text utilities running entirely in your browser.
        </p>

        {/* Hero Quick Search Bar */}
        <div className="mt-7 max-w-lg mx-auto relative">
          <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Type tool name (e.g., 'image compressor', 'base64', 'loan', 'qr')..."
            className="w-full rounded-full border border-slate-200 bg-white pl-11 pr-4 py-3 text-xs sm:text-sm shadow-xs outline-none focus:border-brand-blue-500 focus:ring-4 focus:ring-brand-blue-500/10 dark:bg-slate-900 dark:border-slate-800 dark:text-white"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-3 text-xs text-slate-400 hover:text-slate-600"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* 10 Interactive Category Tiles */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">Explore by Category</h2>
          <span className="text-xs text-brand-blue-600 font-semibold">{TOOLS.length} Active Tools</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {CATEGORIES.map((cat) => {
            const count = TOOLS.filter((t) => t.category === cat.id).length;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(isSelected ? 'all' : cat.id)}
                className={\`flex flex-col p-3 rounded-xl border text-left transition-all \${
                  isSelected
                    ? 'border-brand-blue-500 bg-brand-blue-50/50 shadow-xs dark:bg-brand-blue-950/30'
                    : 'border-slate-200/90 bg-white hover:border-slate-300 hover:bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/60'
                }\`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">{cat.name}</span>
                  <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 dark:bg-slate-800 rounded px-1.5 py-0.2">
                    {count}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 line-clamp-1">{cat.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Favorites Strip (if user saved any) */}
      {favoriteTools.length > 0 && !searchQuery && (
        <div className="mb-10 p-5 rounded-2xl bg-amber-50/40 border border-amber-200/60 dark:bg-amber-950/20 dark:border-amber-900/40">
          <div className="flex items-center gap-2 mb-4">
            <Heart className="h-4 w-4 fill-amber-500 text-amber-500" />
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
      <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-6 dark:border-slate-800">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={\`rounded-lg px-3 py-1.5 text-xs font-semibold transition \${
              selectedCategory === 'all'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
            }\`}
          >
            All Tools ({TOOLS.length})
          </button>
          <button
            onClick={() => setSelectedCategory('pdf')}
            className={\`rounded-lg px-3 py-1.5 text-xs font-semibold \${selectedCategory === 'pdf' ? 'bg-brand-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400'}\`}
          >
            PDF
          </button>
          <button
            onClick={() => setSelectedCategory('image')}
            className={\`rounded-lg px-3 py-1.5 text-xs font-semibold \${selectedCategory === 'image' ? 'bg-brand-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400'}\`}
          >
            Image
          </button>
          <button
            onClick={() => setSelectedCategory('calculator')}
            className={\`rounded-lg px-3 py-1.5 text-xs font-semibold \${selectedCategory === 'calculator' ? 'bg-brand-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400'}\`}
          >
            Calculators
          </button>
          <button
            onClick={() => setSelectedCategory('developer')}
            className={\`rounded-lg px-3 py-1.5 text-xs font-semibold \${selectedCategory === 'developer' ? 'bg-brand-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400'}\`}
          >
            Developer
          </button>
        </div>
      </div>

      {/* Main Tools Grid */}
      {filteredTools.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">No tools matched "{searchQuery}"</p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
            className="mt-3 text-xs font-bold text-brand-blue-600 hover:underline"
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
  // 6. TOOL LAYOUT SHELL WITH SHARE & COPY TOAST
  // ==========================================
  'src/components/layout/ToolLayout.tsx': `import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShieldCheck, Zap, Share2, Check, ArrowLeft } from 'lucide-react';
import { ToolMetadata } from '../../types';
import { usePreferences } from '../../context/UserPreferencesContext';
import { ToolCard } from '../ui/ToolCard';
import { TOOLS } from '../../data/tools';

export const ToolLayout: React.FC<{ tool: ToolMetadata; children: React.ReactNode }> = ({ tool, children }) => {
  const { favorites, toggleFavorite } = usePreferences();
  const isFav = favorites.includes(tool.id);
  const [copiedLink, setCopiedLink] = useState(false);

  const relatedTools = TOOLS.filter((t) => t.category === tool.category && t.id !== tool.id).slice(0, 3);

  const shareTool = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      {/* Top Breadcrumb & Return */}
      <div className="mb-5 flex items-center justify-between text-xs text-slate-500">
        <Link to="/" className="inline-flex items-center gap-1 hover:text-brand-blue-600 font-medium">
          <ArrowLeft className="h-3 w-3" /> All 89 Tools
        </Link>
        <div className="flex items-center gap-2">
          <span className="capitalize">{tool.category}</span>
          <span>/</span>
          <span className="font-semibold text-slate-800 dark:text-white">{tool.name}</span>
        </div>
      </div>

      {/* Tool Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-[#111625]">
        <div>
          <span className="rounded-md bg-brand-blue-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-blue-700 dark:bg-brand-blue-950/50 dark:text-brand-blue-300">
            {tool.category} TOOL
          </span>
          <h1 className="mt-2 text-2xl font-black text-slate-900 dark:text-white tracking-tight">{tool.name}</h1>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{tool.shortDescription}</p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <button
            onClick={shareTool}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
          >
            {copiedLink ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Share2 className="h-3.5 w-3.5 text-slate-400" />}
            {copiedLink ? 'Copied Link' : 'Share'}
          </button>

          <button
            onClick={() => toggleFavorite(tool.id)}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
          >
            <Star className={\`h-3.5 w-3.5 \${isFav ? 'fill-amber-400 text-amber-400' : 'text-slate-400'}\`} />
            {isFav ? 'Saved' : 'Favorite'}
          </button>
        </div>
      </div>

      {/* Tool Interactive Workstation */}
      <section className="my-6 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#111625]">
        {children}
      </section>

      {/* Privacy & Instructions */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-slate-200/80 bg-white p-5 dark:border-slate-800 dark:bg-[#111625]">
          <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-white">
            <Zap className="h-3.5 w-3.5 text-brand-blue-500" /> Instructions
          </h2>
          <ul className="mt-2 space-y-1.5 text-xs text-slate-500 leading-relaxed list-disc list-inside">
            {tool.instructions.howTo.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-slate-200/80 bg-white p-5 dark:border-slate-800 dark:bg-[#111625]">
          <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-white">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" /> Client-Side Processing
          </h2>
          <p className="mt-2 text-xs text-slate-500 leading-relaxed">
            All data calculations and image operations execute inside your browser window. No files or inputs are sent to remote servers.
          </p>
        </div>
      </div>

      {/* Related Tools */}
      {relatedTools.length > 0 && (
        <div className="mt-12 border-t border-slate-200 pt-8 dark:border-slate-800">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">Related Utilities</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedTools.map((relTool) => (
              <ToolCard key={relTool.id} tool={relTool} />
            ))}
          </div>
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

console.log('\\n✨ LIGHT THEME & INTERACTIVE SAAS UI APPLIED!');