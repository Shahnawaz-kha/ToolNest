const fs = require('fs');
const path = require('path');

console.log('🚀 Installing Viral Social Sharing & Interactive Feedback Widgets...');

const files = {
  // ==========================================
  // VIRAL SHARING & FEEDBACK TOOL LAYOUT
  // ==========================================
  'src/components/layout/ToolLayout.tsx': `import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShieldCheck, Zap, Share2, Check, ArrowLeft, ThumbsUp, ThumbsDown, MessageCircle } from 'lucide-react';
import { ToolMetadata } from '../../types';
import { usePreferences } from '../../context/UserPreferencesContext';
import { ToolCard } from '../ui/ToolCard';
import { TOOLS } from '../../data/tools';
import { AdBanner } from '../ui/AdBanner';

export const ToolLayout: React.FC<{ tool: ToolMetadata; children: React.ReactNode }> = ({ tool, children }) => {
  const { favorites, toggleFavorite } = usePreferences();
  const isFav = favorites.includes(tool.id);
  const [copiedLink, setCopiedLink] = useState(false);
  const [feedbackGiven, setFeedbackGiven] = useState<'yes' | 'no' | null>(null);

  const relatedTools = TOOLS.filter((t) => t.category === tool.category && t.id !== tool.id).slice(0, 3);

  // Smooth scroll directly into the tool workstation when opened
  useEffect(() => {
    const el = document.getElementById('tool-main-screen');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [tool.id]);

  const currentUrl = encodeURIComponent(window.location.href);
  const shareText = encodeURIComponent(\`Check out this free \${tool.name} on ToolNest (100% private, runs in browser)!\`);

  const shareToWhatsapp = () => {
    window.open(\`https://api.whatsapp.com/send?text=\${shareText}%20\${currentUrl}\`, '_blank');
  };

  const shareToTwitter = () => {
    window.open(\`https://twitter.com/intent/tweet?text=\${shareText}&url=\${currentUrl}\`, '_blank');
  };

  const copyDirectLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      {/* Top Breadcrumb */}
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
            onClick={copyDirectLink}
            aria-label="Copy tool direct link"
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

      {/* Primary Tool Main Screen */}
      <section id="tool-main-screen" className="my-6 scroll-mt-20 rounded-2xl border border-slate-300/90 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#111625]">
        {children}
      </section>

      {/* Viral Quick Share & Feedback Bar */}
      <div className="my-6 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-900/40">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Share this utility:</span>
          <button
            onClick={shareToWhatsapp}
            className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-emerald-700 transition"
          >
            WhatsApp
          </button>
          <button
            onClick={shareToTwitter}
            className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-bold text-white hover:bg-black transition dark:bg-slate-800"
          >
            X (Twitter)
          </button>
        </div>

        {/* User Engagement Rating Widget */}
        <div className="flex items-center gap-2">
          {feedbackGiven ? (
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
              ✔ Thank you for your feedback!
            </span>
          ) : (
            <>
              <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">Helpful?</span>
              <button
                onClick={() => setFeedbackGiven('yes')}
                aria-label="Vote helpful"
                className="rounded-md border border-slate-300 p-1.5 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 transition dark:border-slate-700"
              >
                <ThumbsUp className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setFeedbackGiven('no')}
                aria-label="Vote unhelpful"
                className="rounded-md border border-slate-300 p-1.5 text-slate-600 hover:bg-rose-50 hover:text-rose-700 transition dark:border-slate-700"
              >
                <ThumbsDown className="h-3.5 w-3.5" />
              </button>
            </>
          )}
        </div>
      </div>

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
};`
};

for (const [filePath, content] of Object.entries(files)) {
  const fullPath = path.join(process.cwd(), filePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content);
  console.log('  ✔ Created / Updated ' + filePath);
}

console.log('\\n✨ VIRAL SHARING & FEEDBACK WIDGET INSTALLED!');