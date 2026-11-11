const fs = require('fs');
const path = require('path');

console.log('🚀 Upgrading Full Card Clickability & Instant Scroll-To-Top Navigation...');

const files = {
  // ==========================================
  // 1. SCROLL TO TOP ON PAGE REDIRECT
  // ==========================================
  'src/components/ui/ScrollToTop.tsx': `import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // Snaps directly to the top of the tool screen
    });
  }, [pathname]);

  return null;
};`,

  // ==========================================
  // 2. FULLY CLICKABLE TOOL CARD (WHOLE BOX NAVIGATES)
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

  // Clicking anywhere on the card redirects the user to the tool page
  const handleCardClick = (e: React.MouseEvent) => {
    // If the user clicked the favorite star, don't redirect
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
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
      className="tool-card group relative flex flex-col justify-between rounded-2xl border border-slate-300/80 bg-white p-5 shadow-xs transition-all cursor-pointer hover:border-brand-blue-500 hover:shadow-md hover:-translate-y-1 dark:border-slate-800 dark:bg-[#111625]"
    >
      <div>
        <div className="flex items-center justify-between gap-2">
          <span className={\`rounded-md border px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider \${colorClass}\`}>
            {tool.category}
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(tool.id);
            }}
            aria-label={isFav ? \`Remove \${tool.name} from favorites\` : \`Add \${tool.name} to favorites\`}
            className="rounded-lg p-1.5 text-slate-500 hover:text-amber-600 hover:bg-slate-100 transition dark:text-slate-400 dark:hover:bg-slate-800"
          >
            <Star className={\`h-4 w-4 \${isFav ? 'fill-amber-500 text-amber-500 scale-110' : ''} transition-transform\`} />
          </button>
        </div>

        <h3 className="mt-3 text-sm font-bold text-slate-900 group-hover:text-brand-blue-600 dark:text-white transition-colors">
          {tool.name}
        </h3>
        <p className="mt-1.5 text-xs text-slate-700 line-clamp-2 leading-relaxed dark:text-slate-300 font-normal">
          {tool.shortDescription}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between dark:border-slate-800">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue-700 group-hover:text-brand-blue-800 dark:text-brand-blue-400">
          Open Tool <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1.5" />
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
  // 3. WIRE SCROLL TO TOP INTO APP.TSX
  // ==========================================
  'src/App.tsx': `import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { PreferencesProvider } from './context/UserPreferencesContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { ScrollToTop } from './components/ui/ScrollToTop';
import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { ToolHostPage } from './pages/ToolHostPage';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsPage } from './pages/TermsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

export function App() {
  return (
    <ThemeProvider>
      <PreferencesProvider>
        <BrowserRouter>
          <ScrollToTop />
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/category/:id" element={<CategoryPage />} />
                <Route path="/tool/:slug" element={<ToolHostPage />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </PreferencesProvider>
    </ThemeProvider>
  );
}

export default App;`
};

for (const [filePath, content] of Object.entries(files)) {
  const fullPath = path.join(process.cwd(), filePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content);
  console.log('  ✔ Created / Updated ' + filePath);
}

console.log('\\n✨ FULL CARD CLICKABILITY & SCROLL-TO-TOP INSTALLED!');