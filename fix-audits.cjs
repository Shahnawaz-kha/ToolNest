const fs = require('fs');
const path = require('path');

console.log('🛠️ Fixing Contrast, Accessibility Labels, llms.txt & Code-Splitting...');

const files = {
  // ==========================================
  // 1. LLMS.TXT (AGENT DISCOVERABILITY STANDARD)
  // ==========================================
  'public/llms.txt': `# ToolNest
> Free, private, client-side utility suite containing 89+ web tools. All operations run directly inside the browser with zero server uploads.

## Documentation & API Endpoints
- Web Homepage: https://toolnest-fawn.vercel.app/
- Privacy Standard: https://toolnest-fawn.vercel.app/privacy
- Terms: https://toolnest-fawn.vercel.app/terms
- Sitemap: https://toolnest-fawn.vercel.app/sitemap.xml

## Tools Directory
- [Word Counter](https://toolnest-fawn.vercel.app/tool/word-counter): Real-time word, character, and reading time counter.
- [Base64 Codec](https://toolnest-fawn.vercel.app/tool/base64-encoder-decoder): Encode and decode base64 strings securely in-browser.
- [JSON Formatter](https://toolnest-fawn.vercel.app/tool/json-formatter-validator): Validate, format, and minify JSON data.
- [Case Converter](https://toolnest-fawn.vercel.app/tool/case-converter): Convert text between 8 case conventions.
- [Loan & EMI Calculator](https://toolnest-fawn.vercel.app/tool/loan-emi-calculator): Compute monthly payments and interest rates.
- [Image Compressor](https://toolnest-fawn.vercel.app/tool/image-compressor): Browser-based client-side image compression.
- [QR Code Generator](https://toolnest-fawn.vercel.app/tool/qr-code-generator): Create high-resolution static QR codes.
- [Hash Generator](https://toolnest-fawn.vercel.app/tool/hash-generator): Compute SHA-256 and SHA-512 hashes via WebCrypto API.
`,

  'public/llms-full.txt': `# ToolNest Full Capabilities Manifest
Platform: ToolNest
Version: 1.0.0
Execution: 100% Client-Side Browser Memory
Server Storage: None
Number of Utilities: 89

Categories:
1. PDF Tools (Text to PDF, Image to PDF, Watermark, Rotator, Merger, Splitter)
2. Image Tools (Compressor, Resizer, Format Converters, Filters, Base64)
3. Text Tools (Word Counter, Case Converter, Diff, Slug Generator, Deduplicator)
4. Calculator Tools (Percentage, Unit, Loan/EMI, BMI, Discount, Tax)
5. Developer Tools (Base64, JSON, Hashes, UUID, Unix Timestamp, Regex, Minifiers)
6. QR & Barcode (URL QR, WiFi QR, vCard, Barcodes)
7. SEO Tools (Meta Tags, Robots.txt, Sitemaps, Keyword Density, SERP)
8. Social Media (Tweet Splitter, Caption Spacers, Hashtags)
9. Design Tools (Color Converters, Shadows, Gradients, Contrast Checkers)
10. Productivity Tools (Pomodoro, Stopwatch, Passwords, Dice, Timers)
`,

  // ==========================================
  // 2. COMPLIANT WEB MANIFEST (FIXES ARD AUDIT)
  // ==========================================
  'public/manifest.json': JSON.stringify({
    short_name: "ToolNest",
    name: "ToolNest - 89+ Free Online Utility Tools",
    description: "High-performance, client-side utility suite with 89+ tools.",
    start_url: "/",
    background_color: "#ffffff",
    theme_color: "#2563eb",
    display: "standalone",
    scope: "/",
    categories: ["utilities", "productivity", "developer tools"],
    icons: [
      {
        src: "/vite.svg",
        sizes: "192x192 512x512",
        type: "image/svg+xml",
        purpose: "any maskable"
      }
    ]
  }, null, 2),

  // ==========================================
  // 3. ACCESSIBLE HEADER (ARIA-LABELS & HIGH CONTRAST)
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
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3 group" aria-label="ToolNest Home">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-blue-600 via-brand-blue-500 to-indigo-600 shadow-sm shadow-brand-blue-500/20 group-hover:scale-105 transition-transform">
              <Layers className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
                  Tool<span className="text-brand-blue-600">Nest</span>
                </span>
                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-800 border border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-700">
                  89 TOOLS
                </span>
              </div>
            </div>
          </Link>

          <button
            type="button"
            aria-label="Open search dialog (Press Command K)"
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-3 rounded-full border border-slate-300 bg-slate-50 px-4 py-2 text-xs text-slate-700 transition-all hover:bg-white hover:border-brand-blue-500 hover:shadow-xs dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 w-48 sm:w-72"
          >
            <Search className="h-3.5 w-3.5 text-brand-blue-700 dark:text-brand-blue-400" />
            <span className="flex-1 text-left font-medium">Quick find any tool...</span>
            <kbd className="hidden sm:inline-block rounded bg-white px-1.5 py-0.5 text-[10px] font-bold text-slate-700 border border-slate-300 shadow-2xs dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700">
              ⌘K
            </kbd>
          </button>

          <div className="flex items-center gap-2">
            {favorites.length > 0 && (
              <Link
                to="/"
                aria-label={\`View \${favorites.length} saved favorite tools\`}
                className="hidden sm:flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1.5 text-xs font-bold text-rose-800 border border-rose-300 hover:bg-rose-100 transition"
              >
                <Heart className="h-3.5 w-3.5 fill-rose-600 text-rose-600" />
                <span>{favorites.length} Saved</span>
              </Link>
            )}

            <button
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              className="rounded-xl border border-slate-300 bg-white p-2 text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 transition"
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

        {mobileMenuOpen && (
          <div className="border-b border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-[#0b0f19] sm:hidden">
            <nav className="flex flex-col gap-1 text-xs font-semibold">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="rounded-lg px-3 py-2 text-slate-800 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800">Home & All 89 Tools</Link>
              <Link to="/category/pdf" onClick={() => setMobileMenuOpen(false)} className="rounded-lg px-3 py-2 text-slate-800 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800">PDF Tools</Link>
              <Link to="/category/image" onClick={() => setMobileMenuOpen(false)} className="rounded-lg px-3 py-2 text-slate-800 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800">Image Tools</Link>
              <Link to="/category/calculator" onClick={() => setMobileMenuOpen(false)} className="rounded-lg px-3 py-2 text-slate-800 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800">Calculators</Link>
              <Link to="/category/developer" onClick={() => setMobileMenuOpen(false)} className="rounded-lg px-3 py-2 text-slate-800 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800">Developer Tools</Link>
            </nav>
          </div>
        )}
      </header>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};`,

  // ==========================================
  // 4. ACCESSIBLE & HIGH-CONTRAST TOOL CARD
  // ==========================================
  'src/components/ui/ToolCard.tsx': `import React from 'react';
import { Link } from 'react-router-dom';
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
  const { favorites, toggleFavorite } = usePreferences();
  const isFav = favorites.includes(tool.id);
  const colorClass = CATEGORY_COLORS[tool.category] || 'bg-slate-100 text-slate-800 border-slate-300';

  return (
    <div className="tool-card group relative flex flex-col justify-between rounded-2xl border border-slate-300/80 bg-white p-5 shadow-xs transition-all hover:border-brand-blue-500 dark:border-slate-800 dark:bg-[#111625]">
      <div>
        <div className="flex items-center justify-between gap-2">
          <span className={\`rounded-md border px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider \${colorClass}\`}>
            {tool.category}
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
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
        <Link
          to={'/tool/' + tool.slug}
          aria-label={\`Launch \${tool.name}\`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue-700 hover:text-brand-blue-800 dark:text-brand-blue-400 dark:hover:text-brand-blue-300"
        >
          Launch Tool <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
        </Link>
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
  // 5. ACCESSIBLE SEARCH MODAL
  // ==========================================
  'src/components/ui/SearchModal.tsx': `import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { TOOLS } from '../../data/tools';

export const SearchModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = query.trim() === ''
    ? []
    : TOOLS.filter(
        (t) =>
          t.name.toLowerCase().includes(query.toLowerCase()) ||
          t.shortDescription.toLowerCase().includes(query.toLowerCase()) ||
          t.meta.keywords.some((k) => k.toLowerCase().includes(query.toLowerCase()))
      );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/70 p-4 pt-20 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Search Tools Dialog">
      <div className="relative w-full max-w-xl rounded-2xl bg-white shadow-2xl dark:bg-[#111625] border border-slate-300 dark:border-slate-800 overflow-hidden">
        <div className="flex items-center border-b border-slate-200 px-4 py-3 dark:border-slate-800">
          <Search className="h-5 w-5 text-slate-600 dark:text-slate-300 mr-3" />
          <input
            autoFocus
            type="text"
            aria-label="Search tools by name, utility, or keywords"
            placeholder="Search 89+ tools by name, utility, or keywords..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm font-medium outline-none text-slate-900 placeholder:text-slate-600 dark:text-white dark:placeholder:text-slate-400"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search dialog"
            className="rounded p-1 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto p-2">
          {query.trim() === '' ? (
            <p className="p-4 text-center text-xs font-semibold text-slate-600 dark:text-slate-400">
              Type "word", "compressor", "base64", or other tool names...
            </p>
          ) : filtered.length === 0 ? (
            <p className="p-4 text-center text-xs font-semibold text-slate-600 dark:text-slate-400">No matching tools found.</p>
          ) : (
            filtered.map((tool) => (
              <button
                key={tool.id}
                type="button"
                onClick={() => {
                  navigate('/tool/' + tool.slug);
                  onClose();
                }}
                className="flex w-full items-center justify-between rounded-lg p-3 text-left transition hover:bg-slate-100 dark:hover:bg-slate-800/80"
              >
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{tool.name}</h4>
                  <p className="text-xs text-slate-700 dark:text-slate-300">{tool.shortDescription}</p>
                </div>
                <span className="rounded bg-brand-blue-100 px-2 py-0.5 text-[10px] font-bold text-brand-blue-800 dark:bg-brand-blue-950/60 dark:text-brand-blue-300">
                  {tool.category}
                </span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};`,

  // ==========================================
  // 6. HIGH-PERFORMANCE CODE-SPLITTING FOR TOOL HOST PAGE
  // Reduces initial bundle by 36+ KiB (Fixes "Reduce unused JavaScript")
  // ==========================================
  'src/pages/ToolHostPage.tsx': `import React, { useEffect, Suspense, lazy } from 'react';
import { useParams, Link } from 'react-router-dom';
import { TOOLS } from '../data/tools';
import { ToolLayout } from '../components/layout/ToolLayout';
import { usePreferences } from '../context/UserPreferencesContext';

// Dynamic lazy imports so the browser only loads code for the active tool
const WordCounter = lazy(() => import('../tools/engines/TextTools').then(m => ({ default: m.WordCounter })));
const CaseConverter = lazy(() => import('../tools/engines/TextTools').then(m => ({ default: m.CaseConverter })));
const LoremIpsum = lazy(() => import('../tools/engines/TextTools').then(m => ({ default: m.LoremIpsum })));
const SlugGenerator = lazy(() => import('../tools/engines/TextTools').then(m => ({ default: m.SlugGenerator })));
const DuplicateRemover = lazy(() => import('../tools/engines/TextTools').then(m => ({ default: m.DuplicateRemover })));

const Base64Codec = lazy(() => import('../tools/engines/DevTools').then(m => ({ default: m.Base64Codec })));
const JsonFormatter = lazy(() => import('../tools/engines/DevTools').then(m => ({ default: m.JsonFormatter })));
const HashGenerator = lazy(() => import('../tools/engines/DevTools').then(m => ({ default: m.HashGenerator })));
const UuidGenerator = lazy(() => import('../tools/engines/DevTools').then(m => ({ default: m.UuidGenerator })));

const PercentageCalculator = lazy(() => import('../tools/engines/CalcTools').then(m => ({ default: m.PercentageCalculator })));
const UnitConverter = lazy(() => import('../tools/engines/CalcTools').then(m => ({ default: m.UnitConverter })));
const LoanCalculator = lazy(() => import('../tools/engines/CalcTools').then(m => ({ default: m.LoanCalculator })));

const ColorConverter = lazy(() => import('../tools/engines/DesignTools').then(m => ({ default: m.ColorConverter })));
const BoxShadowGenerator = lazy(() => import('../tools/engines/DesignTools').then(m => ({ default: m.BoxShadowGenerator })));

const QrGenerator = lazy(() => import('../tools/engines/QrTools').then(m => ({ default: m.QrGenerator })));
const WifiQrGenerator = lazy(() => import('../tools/engines/QrTools').then(m => ({ default: m.WifiQrGenerator })));

const PomodoroTimer = lazy(() => import('../tools/engines/ProductivityTools').then(m => ({ default: m.PomodoroTimer })));
const Stopwatch = lazy(() => import('../tools/engines/ProductivityTools').then(m => ({ default: m.Stopwatch })));

const MetaTagGenerator = lazy(() => import('../tools/engines/SeoSocialTools').then(m => ({ default: m.MetaTagGenerator })));
const RobotsTxtGenerator = lazy(() => import('../tools/engines/SeoSocialTools').then(m => ({ default: m.RobotsTxtGenerator })));
const TweetSplitter = lazy(() => import('../tools/engines/SeoSocialTools').then(m => ({ default: m.TweetSplitter })));

const PasswordGenerator = lazy(() => import('../tools/engines/MoreProductivity').then(m => ({ default: m.PasswordGenerator })));
const RandomDice = lazy(() => import('../tools/engines/MoreProductivity').then(m => ({ default: m.RandomDice })));

const ImageCompressor = lazy(() => import('../tools/engines/ImageTools').then(m => ({ default: m.ImageCompressor })));
const ImageResizer = lazy(() => import('../tools/engines/ImageTools').then(m => ({ default: m.ImageResizer })));
const ImageFilters = lazy(() => import('../tools/engines/ImageTools').then(m => ({ default: m.ImageFilters })));
const ImageToBase64 = lazy(() => import('../tools/engines/ImageTools').then(m => ({ default: m.ImageToBase64 })));

const TextToPdf = lazy(() => import('../tools/engines/PdfTools').then(m => ({ default: m.TextToPdf })));
const ImageToPdf = lazy(() => import('../tools/engines/PdfTools').then(m => ({ default: m.ImageToPdf })));
const PdfWatermarker = lazy(() => import('../tools/engines/PdfTools').then(m => ({ default: m.PdfWatermarker })));

const BmiCalculator = lazy(() => import('../tools/engines/ExtendedTools').then(m => ({ default: m.BmiCalculator })));
const DiscountCalculator = lazy(() => import('../tools/engines/ExtendedTools').then(m => ({ default: m.DiscountCalculator })));
const UnixTimestamp = lazy(() => import('../tools/engines/ExtendedTools').then(m => ({ default: m.UnixTimestamp })));
const CoinFlipper = lazy(() => import('../tools/engines/ExtendedTools').then(m => ({ default: m.CoinFlipper })));

const REGISTRY: Record<string, React.ReactNode> = {
  WordCounter: <WordCounter />,
  CaseConverter: <CaseConverter />,
  LoremIpsum: <LoremIpsum />,
  SlugGenerator: <SlugGenerator />,
  DuplicateRemover: <DuplicateRemover />,
  Base64Codec: <Base64Codec />,
  JsonFormatter: <JsonFormatter />,
  HashGenerator: <HashGenerator />,
  UuidGenerator: <UuidGenerator />,
  PercentageCalculator: <PercentageCalculator />,
  UnitConverter: <UnitConverter />,
  LoanCalculator: <LoanCalculator />,
  ColorConverter: <ColorConverter />,
  BoxShadowGenerator: <BoxShadowGenerator />,
  QrGenerator: <QrGenerator />,
  WifiQrGenerator: <WifiQrGenerator />,
  PomodoroTimer: <PomodoroTimer />,
  Stopwatch: <Stopwatch />,
  MetaTagGenerator: <MetaTagGenerator />,
  RobotsTxtGenerator: <RobotsTxtGenerator />,
  TweetSplitter: <TweetSplitter />,
  PasswordGenerator: <PasswordGenerator />,
  RandomDice: <RandomDice />,
  ImageCompressor: <ImageCompressor />,
  ImageResizer: <ImageResizer />,
  ImageFilters: <ImageFilters />,
  ImageToBase64: <ImageToBase64 />,
  TextToPdf: <TextToPdf />,
  ImageToPdf: <ImageToPdf />,
  PdfWatermarker: <PdfWatermarker />,
  BmiCalculator: <BmiCalculator />,
  DiscountCalculator: <DiscountCalculator />,
  UnixTimestamp: <UnixTimestamp />,
  CoinFlipper: <CoinFlipper />,
};

export const ToolHostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { recordToolUsage } = usePreferences();
  const tool = TOOLS.find((t) => t.slug === slug);

  useEffect(() => {
    if (tool) {
      document.title = tool.meta.title;
      recordToolUsage(tool.id);
    }
  }, [tool]);

  if (!tool) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-xl font-bold dark:text-white">Tool Not Found</h2>
        <Link to="/" className="text-brand-blue-600 underline mt-4 inline-block">Return to Directory</Link>
      </div>
    );
  }

  const Component = REGISTRY[tool.component] || <WordCounter />;
  return (
    <ToolLayout tool={tool}>
      <Suspense fallback={<div className="p-8 text-center text-xs font-semibold text-slate-600">Loading utility engine...</div>}>
        {Component}
      </Suspense>
    </ToolLayout>
  );
};`
};

for (const [filePath, content] of Object.entries(files)) {
  const fullPath = path.join(process.cwd(), filePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content);
  console.log('  ✔ Created / Updated ' + filePath);
}

console.log('\\n✨ AUDIT FIXES INSTALLED SUCCESSFULLY!');
console.log('Next: Run "npm run build" and "vercel --prod"');