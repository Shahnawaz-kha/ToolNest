const fs = require('fs');
const path = require('path');

console.log('✨ Applying Animated Text Gradient & Mobile-First Responsive Redesign...');

const files = {
  // ==========================================
  // 1. CSS KEYFRAMES & SHIMMER GRADIENTS
  // ==========================================
  'src/index.css': `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-[#f8fafc] text-slate-800 antialiased selection:bg-brand-blue-500 selection:text-white dark:bg-[#0b0f19] dark:text-slate-100;
    -webkit-tap-highlight-color: transparent;
  }
}

/* Shimmering Animated Gradient Text */
@keyframes gradient-flow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animate-shimmer-text {
  background: linear-gradient(90deg, #2563eb, #7c3aed, #db2777, #2563eb);
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradient-flow 6s ease infinite;
}

/* Hide scrollbar for mobile horizontal category rail */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Tactile mobile tap physics */
.touch-card {
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.touch-card:active {
  transform: scale(0.98);
}`,

  // ==========================================
  // 2. REDESIGNED HOMEPAGE WITH ANIMATED HEADLINE & MOBILE CATEGORY RAIL
  // ==========================================
  'src/pages/HomePage.tsx': `import React, { useState, useEffect } from 'react';
import { CATEGORIES } from '../data/categories';
import { TOOLS } from '../data/tools';
import { ToolCard } from '../components/ui/ToolCard';
import { usePreferences } from '../context/UserPreferencesContext';
import { Search, Sparkles, Heart, Zap, Layers } from 'lucide-react';

const ROTATING_TEXTS = [
  'Fast, Free & Private',
  '89+ Instant Utilities',
  'Zero Server Uploads',
  'Developer & Math Tools'
];

export const HomePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const { favorites } = usePreferences();

  const favoriteTools = TOOLS.filter((t) => favorites.includes(t.id));

  // Dynamic rotating headline effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % ROTATING_TEXTS.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const filteredTools = TOOLS.filter((tool) => {
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.meta.keywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

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
    <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Animated Hero Section */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
        {/* Floating pill badge */}
        <div className="inline-flex items-center gap-2 rounded-full bg-brand-blue-50 px-3.5 py-1.5 text-xs font-bold text-brand-blue-900 border border-brand-blue-300 mb-4 dark:bg-brand-blue-950/60 dark:text-brand-blue-200 dark:border-brand-blue-800 shadow-2xs">
          <Sparkles className="h-3.5 w-3.5 text-brand-blue-600 animate-pulse" />
          <span>Universal Client-Side Suite</span>
          <span className="hidden sm:inline-block text-slate-400">•</span>
          <span className="hidden sm:inline-block">89 Free Utilities</span>
        </div>

        {/* Animated Main Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.15]">
          All The Tools You Need.{' '}
          <span className="block mt-1 sm:mt-2 animate-shimmer-text">
            {ROTATING_TEXTS[textIndex]}
          </span>
        </h1>

        <p className="mt-4 text-xs sm:text-base text-slate-700 dark:text-slate-300 max-w-xl mx-auto font-medium px-2">
          PDF, Image, Developer, and Calculator tools running completely in your browser memory. Fast, offline-ready, with zero data tracking.
        </p>

        {/* Mobile-Friendly Search Box */}
        <div className="mt-6 sm:mt-8 max-w-xl mx-auto px-1">
          <div className="relative flex items-center">
            <Search className="absolute left-4 h-4 w-4 text-slate-500 dark:text-slate-400 pointer-events-none" />
            <input
              type="text"
              aria-label="Search all 89 utility tools"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 89+ tools (e.g. 'image', 'base64', 'loan', 'qr')..."
              className="w-full rounded-2xl border border-slate-300 bg-white pl-11 pr-16 py-3.5 text-xs sm:text-sm font-medium shadow-xs outline-none text-slate-900 placeholder:text-slate-600 focus:border-brand-blue-600 focus:ring-4 focus:ring-brand-blue-500/10 dark:bg-slate-900 dark:border-slate-700 dark:text-white dark:placeholder:text-slate-400 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                aria-label="Clear search query"
                className="absolute right-3.5 rounded-lg bg-slate-100 dark:bg-slate-800 px-2.5 py-1 text-xs font-bold text-slate-700 hover:text-slate-900 dark:text-slate-300"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Swipeable Category Rail on Mobile, Clean Grid on Desktop */}
      <div className="mb-10 sm:mb-12">
        <div className="flex items-center justify-between mb-3 px-1">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Layers className="h-3.5 w-3.5 text-brand-blue-600" /> Categories
          </h2>
          <span className="text-xs text-brand-blue-800 dark:text-brand-blue-300 font-bold">{CATEGORIES.length} Suites</span>
        </div>

        {/* Horizontal touch scroll on mobile (no-scrollbar), 5-col grid on tablets/desktop */}
        <div className="flex sm:grid sm:grid-cols-5 gap-2.5 overflow-x-auto pb-2 sm:pb-0 no-scrollbar snap-x snap-mandatory">
          {CATEGORIES.map((cat) => {
            const count = TOOLS.filter((t) => t.category === cat.id).length;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => scrollToTools(isSelected ? 'all' : cat.id)}
                aria-label={\`Filter by \${cat.name} (\${count} tools)\`}
                className={\`snap-start shrink-0 min-w-[140px] sm:min-w-0 flex flex-col justify-between p-3.5 rounded-2xl border text-left cursor-pointer touch-card \${
                  isSelected
                    ? 'border-brand-blue-600 bg-brand-blue-50/90 shadow-sm ring-2 ring-brand-blue-500/20 dark:bg-brand-blue-950/60'
                    : 'border-slate-300/90 bg-white hover:border-brand-blue-400 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900'
                }\`}
              >
                <div className="flex justify-between items-center w-full mb-1">
                  <span className="text-xs font-bold text-slate-900 dark:text-white truncate">{cat.name}</span>
                  <span className="text-[10px] font-bold text-slate-700 bg-slate-200 dark:bg-slate-800 dark:text-slate-200 rounded-md px-1.5 py-0.5 ml-1">
                    {count}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-1 font-normal">{cat.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Target Anchor Section */}
      <div id="tools-grid-section" className="scroll-mt-20">
        {/* Saved Favorites */}
        {favoriteTools.length > 0 && !searchQuery && (
          <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-amber-50/70 border border-amber-300 dark:bg-amber-950/30 dark:border-amber-800">
            <div className="flex items-center gap-2 mb-3.5">
              <Heart className="h-4 w-4 fill-amber-600 text-amber-600" />
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">Your Saved Favorites ({favoriteTools.length})</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {favoriteTools.map((t) => (
                <ToolCard key={t.id} tool={t} />
              ))}
            </div>
          </div>
        )}

        {/* Category Pills Filter Bar */}
        <div className="flex items-center justify-between border-b border-slate-300 pb-3 mb-6 dark:border-slate-800">
          <div className="flex overflow-x-auto gap-1.5 no-scrollbar py-0.5">
            <button
              onClick={() => scrollToTools('all')}
              className={\`whitespace-nowrap rounded-xl px-3.5 py-1.5 text-xs font-bold transition \${
                selectedCategory === 'all'
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
                  : 'text-slate-700 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-800'
              }\`}
            >
              All Tools ({TOOLS.length})
            </button>
            <button
              onClick={() => scrollToTools('pdf')}
              className={\`whitespace-nowrap rounded-xl px-3.5 py-1.5 text-xs font-bold transition \${selectedCategory === 'pdf' ? 'bg-brand-blue-700 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-200 dark:text-slate-300'}\`}
            >
              PDF Tools
            </button>
            <button
              onClick={() => scrollToTools('image')}
              className={\`whitespace-nowrap rounded-xl px-3.5 py-1.5 text-xs font-bold transition \${selectedCategory === 'image' ? 'bg-brand-blue-700 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-200 dark:text-slate-300'}\`}
            >
              Image Tools
            </button>
            <button
              onClick={() => scrollToTools('calculator')}
              className={\`whitespace-nowrap rounded-xl px-3.5 py-1.5 text-xs font-bold transition \${selectedCategory === 'calculator' ? 'bg-brand-blue-700 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-200 dark:text-slate-300'}\`}
            >
              Calculators
            </button>
            <button
              onClick={() => scrollToTools('developer')}
              className={\`whitespace-nowrap rounded-xl px-3.5 py-1.5 text-xs font-bold transition \${selectedCategory === 'developer' ? 'bg-brand-blue-700 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-200 dark:text-slate-300'}\`}
            >
              Developer Tools
            </button>
          </div>
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 hidden md:inline-block shrink-0 ml-3">
            {filteredTools.length} Utilities
          </span>
        </div>

        {/* Responsive Grid */}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
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
  // 3. RESPONSIVE MOBILE TOUCH TOOLCARD
  // ==========================================
  'src/components/ui/ToolCard.tsx': `import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, ArrowRight, Zap } from 'lucide-react';
import { ToolMetadata } from '../../types';
import { usePreferences } from '../../context/UserPreferencesContext';

const CATEGORY_COLORS: Record<string, string> = {
  pdf: 'bg-rose-50 text-rose-900 border-rose-300 dark:bg-rose-950/60 dark:text-rose-200 dark:border-rose-800',
  image: 'bg-amber-50 text-amber-900 border-amber-300 dark:bg-amber-950/60 dark:text-amber-200 dark:border-amber-800',
  text: 'bg-blue-50 text-blue-900 border-blue-300 dark:bg-blue-950/60 dark:text-blue-200 dark:border-blue-800',
  calculator: 'bg-emerald-50 text-emerald-900 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-200 dark:border-emerald-800',
  developer: 'bg-indigo-50 text-indigo-900 border-indigo-300 dark:bg-indigo-950/60 dark:text-indigo-200 dark:border-indigo-800',
  'qr-barcode': 'bg-violet-50 text-violet-900 border-violet-300 dark:bg-violet-950/60 dark:text-violet-200 dark:border-violet-800',
  seo: 'bg-teal-50 text-teal-900 border-teal-300 dark:bg-teal-950/60 dark:text-teal-200 dark:border-teal-800',
  'social-media': 'bg-pink-50 text-pink-900 border-pink-300 dark:bg-pink-950/60 dark:text-pink-200 dark:border-pink-800',
  design: 'bg-fuchsia-50 text-fuchsia-900 border-fuchsia-300 dark:bg-fuchsia-950/60 dark:text-fuchsia-200 dark:border-fuchsia-800',
  productivity: 'bg-sky-50 text-sky-900 border-sky-300 dark:bg-sky-950/60 dark:text-sky-200 dark:border-sky-800',
};

export const ToolCard: React.FC<{ tool: ToolMetadata }> = ({ tool }) => {
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = usePreferences();
  const isFav = favorites.includes(tool.id);
  const colorClass = CATEGORY_COLORS[tool.category] || 'bg-slate-100 text-slate-800 border-slate-300';

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    navigate('/tool/' + tool.slug);
  };

  return (
    <div
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') navigate('/tool/' + tool.slug);
      }}
      aria-label={\`Open \${tool.name}\`}
      className="touch-card group relative flex flex-col justify-between rounded-2xl border border-slate-300/80 bg-white p-4 sm:p-5 shadow-xs cursor-pointer hover:border-brand-blue-500 hover:shadow-md dark:border-slate-800 dark:bg-[#111625]"
    >
      <div>
        <div className="flex items-center justify-between gap-2">
          <span className={\`rounded-md border px-2 py-0.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider \${colorClass}\`}>
            {tool.category}
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(tool.id);
            }}
            aria-label={isFav ? \`Remove \${tool.name} from favorites\` : \`Add \${tool.name} to favorites\`}
            className="rounded-xl p-2 text-slate-500 hover:text-amber-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition"
          >
            <Star className={\`h-4 w-4 \${isFav ? 'fill-amber-500 text-amber-500 scale-110' : ''} transition-transform\`} />
          </button>
        </div>

        <h3 className="mt-2.5 text-sm font-bold text-slate-900 group-hover:text-brand-blue-600 dark:text-white transition-colors leading-snug">
          {tool.name}
        </h3>
        <p className="mt-1 text-xs text-slate-700 line-clamp-2 leading-relaxed dark:text-slate-300 font-normal">
          {tool.shortDescription}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between dark:border-slate-800">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue-700 group-hover:text-brand-blue-800 dark:text-brand-blue-400">
          Open Tool <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </span>
        {tool.isPopular && (
          <span className="flex items-center gap-1 text-[10px] font-extrabold text-amber-800 bg-amber-100/90 px-1.5 py-0.5 rounded border border-amber-300 dark:bg-amber-950/60 dark:text-amber-200 dark:border-amber-800">
            <Zap className="h-2.5 w-2.5 fill-amber-700" /> POPULAR
          </span>
        )}
      </div>
    </div>
  );
};`,

  // ==========================================
  // 4. ERGONOMIC MOBILE HEADER
  // ==========================================
  'src/components/layout/Header.tsx': `import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, Search, Layers, Menu, X, Heart } from 'lucide-react';
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
      <header className="sticky top-0 z-40 border-b border-slate-200/90 bg-white/95 backdrop-blur-md dark:border-slate-800/90 dark:bg-[#0b0f19]/95">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-3 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group" aria-label="ToolNest Home">
            <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-blue-600 to-indigo-600 shadow-sm shadow-brand-blue-500/20 group-hover:scale-105 transition-transform">
              <Layers className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="text-lg sm:text-xl font-black tracking-tight text-slate-900 dark:text-white">
                Tool<span className="text-brand-blue-600">Nest</span>
              </span>
            </div>
          </Link>

          {/* Search Trigger */}
          <button
            type="button"
            aria-label="Open search dialog (Press Command K)"
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-2 sm:gap-3 rounded-full border border-slate-300 bg-slate-50 px-3 sm:px-4 py-2 text-xs text-slate-700 transition hover:bg-white hover:border-brand-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 w-36 sm:w-64"
          >
            <Search className="h-3.5 w-3.5 text-brand-blue-700 dark:text-brand-blue-400 shrink-0" />
            <span className="flex-1 text-left font-medium truncate">Search 89+ tools...</span>
            <kbd className="hidden sm:inline-block rounded bg-white px-1.5 py-0.5 text-[10px] font-bold text-slate-700 border border-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700">
              ⌘K
            </kbd>
          </button>

          {/* Action Icons */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {favorites.length > 0 && (
              <Link
                to="/"
                aria-label={\`View \${favorites.length} saved favorite tools\`}
                className="flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-1.5 text-xs font-bold text-rose-800 border border-rose-300 hover:bg-rose-100 transition"
              >
                <Heart className="h-3.5 w-3.5 fill-rose-600 text-rose-600" />
                <span className="hidden sm:inline-block">{favorites.length} Saved</span>
                <span className="sm:hidden">{favorites.length}</span>
              </Link>
            )}

            <button
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              className="rounded-xl border border-slate-300 bg-white p-2 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 transition"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-500" /> : <Moon className="h-4 w-4 text-slate-700" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              className="rounded-xl border border-slate-300 p-2 text-slate-700 sm:hidden dark:border-slate-700 dark:text-slate-200"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="border-b border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-[#0b0f19] sm:hidden shadow-lg animate-in slide-in-from-top-2 duration-150">
            <nav className="flex flex-col gap-1 text-xs font-bold">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="rounded-xl px-3 py-2.5 text-slate-800 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800">Home & All 89 Tools</Link>
              <Link to="/category/pdf" onClick={() => setMobileMenuOpen(false)} className="rounded-xl px-3 py-2.5 text-slate-800 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800">PDF Tools</Link>
              <Link to="/category/image" onClick={() => setMobileMenuOpen(false)} className="rounded-xl px-3 py-2.5 text-slate-800 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800">Image Tools</Link>
              <Link to="/category/calculator" onClick={() => setMobileMenuOpen(false)} className="rounded-xl px-3 py-2.5 text-slate-800 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800">Calculators</Link>
              <Link to="/category/developer" onClick={() => setMobileMenuOpen(false)} className="rounded-xl px-3 py-2.5 text-slate-800 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800">Developer Tools</Link>
            </nav>
          </div>
        )}
      </header>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};`
};

for (const [filePath, content] of Object.entries(files)) {
  const fullPath = path.join(process.cwd(), filePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content);
  console.log('  ✔ Created / Updated ' + filePath);
}

console.log('\\n✨ ANIMATED GRADIENTS & MOBILE-FIRST DESIGN READY!');