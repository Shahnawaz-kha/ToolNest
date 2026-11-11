import React, { useState, useEffect } from 'react';
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
                aria-label={`Filter by ${cat.name} (${count} tools)`}
                className={`snap-start shrink-0 min-w-[140px] sm:min-w-0 flex flex-col justify-between p-3.5 rounded-2xl border text-left cursor-pointer touch-card ${
                  isSelected
                    ? 'border-brand-blue-600 bg-brand-blue-50/90 shadow-sm ring-2 ring-brand-blue-500/20 dark:bg-brand-blue-950/60'
                    : 'border-slate-300/90 bg-white hover:border-brand-blue-400 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900'
                }`}
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
              className={`whitespace-nowrap rounded-xl px-3.5 py-1.5 text-xs font-bold transition ${
                selectedCategory === 'all'
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
                  : 'text-slate-700 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-800'
              }`}
            >
              All Tools ({TOOLS.length})
            </button>
            <button
              onClick={() => scrollToTools('pdf')}
              className={`whitespace-nowrap rounded-xl px-3.5 py-1.5 text-xs font-bold transition ${selectedCategory === 'pdf' ? 'bg-brand-blue-700 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-200 dark:text-slate-300'}`}
            >
              PDF Tools
            </button>
            <button
              onClick={() => scrollToTools('image')}
              className={`whitespace-nowrap rounded-xl px-3.5 py-1.5 text-xs font-bold transition ${selectedCategory === 'image' ? 'bg-brand-blue-700 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-200 dark:text-slate-300'}`}
            >
              Image Tools
            </button>
            <button
              onClick={() => scrollToTools('calculator')}
              className={`whitespace-nowrap rounded-xl px-3.5 py-1.5 text-xs font-bold transition ${selectedCategory === 'calculator' ? 'bg-brand-blue-700 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-200 dark:text-slate-300'}`}
            >
              Calculators
            </button>
            <button
              onClick={() => scrollToTools('developer')}
              className={`whitespace-nowrap rounded-xl px-3.5 py-1.5 text-xs font-bold transition ${selectedCategory === 'developer' ? 'bg-brand-blue-700 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-200 dark:text-slate-300'}`}
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
};