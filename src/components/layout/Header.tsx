import React, { useState } from 'react';
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
                aria-label={`View ${favorites.length} saved favorite tools`}
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
};