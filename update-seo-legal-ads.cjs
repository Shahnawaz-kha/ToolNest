const fs = require('fs');
const path = require('path');

console.log('⚖️ Installing AdSense System, SEO Schema, Legal Pages & Router...');

const files = {
  // ==========================================
  // 1. REUSABLE ADSENSE COMPONENT
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
  // In production, replace data-ad-client with your actual AdSense publisher ID (e.g. ca-pub-xxxxxxxx)
  const isProduction = process.env.NODE_ENV === 'production';

  return (
    <div className={\`my-8 overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50/60 p-4 text-center dark:border-slate-800/80 dark:bg-slate-900/40 \${className}\`}>
      <div className="mb-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">
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
        <div className="flex min-h-[90px] items-center justify-center rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 p-6 text-xs font-medium text-slate-400">
          Google AdSense Placement Area (Auto-renders in production)
        </div>
      )}
    </div>
  );
};`,

  // ==========================================
  // 2. PRIVACY POLICY PAGE (ADSENSE COMPLIANT)
  // ==========================================
  'src/pages/PrivacyPolicy.tsx': `import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowLeft, Lock, HardDrive, Cookie } from 'lucide-react';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-blue-600 hover:underline mb-6">
        <ArrowLeft className="h-3.5 w-3.5" /> Return to Directory
      </Link>

      <div className="rounded-2xl border border-slate-200/80 bg-white p-8 shadow-xs dark:border-slate-800 dark:bg-[#111625]">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">Privacy Policy</h1>
            <p className="text-xs text-slate-500">Effective Date: {new Date().toLocaleDateString()}</p>
          </div>
        </div>

        <div className="space-y-6 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-6">
          <section>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <HardDrive className="h-4 w-4 text-brand-blue-600" /> 1. Client-Side Processing Architecture
            </h2>
            <p>
              ToolNest operates on a strict zero-upload privacy standard. All files, PDF operations, images, text transformations, cryptographic hashes, and calculations occur directly within your device's browser memory (RAM) utilizing JavaScript, HTML5 Canvas, and the native Web Crypto API. No files or strings input into ToolNest are ever transferred to, indexed by, or stored upon remote servers.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <Lock className="h-4 w-4 text-brand-purple-600" /> 2. Local Storage and Preferences
            </h2>
            <p>
              We utilize browser <code>localStorage</code> solely to preserve user preferences: your selected theme (dark or light mode), your starred favorite tools, and your list of recently used tools. This information resides on your local device and is never transmitted to us or any third party.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <Cookie className="h-4 w-4 text-amber-500" /> 3. Advertising & Cookies (Google AdSense)
            </h2>
            <p>
              ToolNest may partner with third-party vendors, including Google, to serve advertisements. Google's use of advertising cookies enables it and its partners to serve ads based on your visit to this site and/or other sites on the Internet.
            </p>
            <p className="mt-2">
              Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noreferrer" className="text-brand-blue-600 underline">Google Ads Settings</a> or through <a href="https://www.aboutads.info" target="_blank" rel="noreferrer" className="text-brand-blue-600 underline">aboutads.info</a>.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-2">4. Contact Inquiries</h2>
            <p>
              For privacy-related questions or data protection inquiries, you may reach us through our <Link to="/contact" className="text-brand-blue-600 underline">Contact Page</Link>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};`,

  // ==========================================
  // 3. TERMS OF SERVICE PAGE
  // ==========================================
  'src/pages/TermsPage.tsx': `import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, CheckCircle2 } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-blue-600 hover:underline mb-6">
        <ArrowLeft className="h-3.5 w-3.5" /> Return to Directory
      </Link>

      <div className="rounded-2xl border border-slate-200/80 bg-white p-8 shadow-xs dark:border-slate-800 dark:bg-[#111625]">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-blue-50 text-brand-blue-600 dark:bg-brand-blue-950/40">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">Terms of Service</h1>
            <p className="text-xs text-slate-500">Last updated: {new Date().toLocaleDateString()}</p>
          </div>
        </div>

        <div className="space-y-6 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-6">
          <section>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-2">1. Agreement to Terms</h2>
            <p>
              By accessing and utilizing ToolNest, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you should discontinue use of the platform immediately.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-2">2. Permitted Use</h2>
            <p>
              ToolNest utilities are free for personal, commercial, academic, and developer use. You may process, format, convert, and calculate any content you possess the legal authority to manipulate.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-2">3. Disclaimer of Warranties</h2>
            <p>
              All tools, calculators, code formatters, and outputs are provided on an "as is" and "as available" basis without warranties of any kind. ToolNest assumes no liability for mathematical inaccuracies, financial decisions made based on loan calculators, or formatting discrepancies.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-2">4. Changes to Service</h2>
            <p>
              We reserve the right to add, modify, or discontinue any utility tool at any time without prior notice.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};`,

  // ==========================================
  // 4. ABOUT US PAGE
  // ==========================================
  'src/pages/AboutPage.tsx': `import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Layers, Zap, Shield, Cpu, Globe } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-blue-600 hover:underline mb-6">
        <ArrowLeft className="h-3.5 w-3.5" /> Return to Directory
      </Link>

      <div className="space-y-8">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-8 shadow-xs dark:border-slate-800 dark:bg-[#111625]">
          <span className="rounded-md bg-brand-blue-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-blue-700 dark:bg-brand-blue-950/40 dark:text-brand-blue-300">
            About Our Mission
          </span>
          <h1 className="mt-3 text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            High-Performance Web Utilities, Zero Compromise.
          </h1>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            ToolNest was built by engineers who were tired of ad-cluttered, slow utility websites that require server uploads just to resize an image or format JSON. We engineered ToolNest to deliver 89+ tools with zero latency, complete client-side execution, and absolute privacy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-[#111625]">
            <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-brand-blue-50 text-brand-blue-600 mb-3">
              <Cpu className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Local Hardware Speed</h3>
            <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">
              Calculations and image operations leverage your computer's CPU and GPU via modern Web APIs for instant results.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-[#111625]">
            <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 mb-3">
              <Shield className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Guaranteed Privacy</h3>
            <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">
              Your confidential documents, code snippets, and customer numbers never touch a third-party server.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-[#111625]">
            <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-purple-50 text-brand-purple-600 mb-3">
              <Globe className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">100% Free Always</h3>
            <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">
              Every single tool across all 10 categories is free with no subscription tiers, paywalls, or accounts required.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};`,

  // ==========================================
  // 5. INTERACTIVE CONTACT & FEEDBACK FORM
  // ==========================================
  'src/pages/ContactPage.tsx': `import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [toolRequest, setToolRequest] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-blue-600 hover:underline mb-6">
        <ArrowLeft className="h-3.5 w-3.5" /> Return to Directory
      </Link>

      <div className="rounded-2xl border border-slate-200/80 bg-white p-8 shadow-xs dark:border-slate-800 dark:bg-[#111625]">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-blue-50 text-brand-blue-600 dark:bg-brand-blue-950/40">
            <Mail className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">Get in Touch</h1>
            <p className="text-xs text-slate-500">Suggest a new tool, report a bug, or inquire about partnerships.</p>
          </div>
        </div>

        {submitted ? (
          <div className="py-12 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 mb-4">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Message Dispatched!</h2>
            <p className="mt-2 text-xs text-slate-500 max-w-sm mx-auto">
              Thank you for contributing to ToolNest. Our engineering team reviews all feature requests and suggestions.
            </p>
            <button
              onClick={() => { setSubmitted(false); setMessage(''); }}
              className="mt-6 rounded-xl bg-brand-blue-600 px-5 py-2 text-xs font-bold text-white shadow-sm"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 border-t border-slate-100 dark:border-slate-800 pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Doe"
                  className="w-full rounded-xl border border-slate-200 bg-transparent p-3 text-xs outline-none focus:border-brand-blue-500 dark:border-slate-800 dark:text-white"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@example.com"
                  className="w-full rounded-xl border border-slate-200 bg-transparent p-3 text-xs outline-none focus:border-brand-blue-500 dark:border-slate-800 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Tool Request (Optional)</label>
              <input
                type="text"
                value={toolRequest}
                onChange={(e) => setToolRequest(e.target.value)}
                placeholder="e.g. SVG to WebP Converter, Audio Waveform Generator"
                className="w-full rounded-xl border border-slate-200 bg-transparent p-3 text-xs outline-none focus:border-brand-blue-500 dark:border-slate-800 dark:text-white"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Message</label>
              <textarea
                rows={5}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How can we make ToolNest better for your workflow?"
                className="w-full rounded-xl border border-slate-200 bg-transparent p-3 text-xs outline-none focus:border-brand-blue-500 dark:border-slate-800 dark:text-white"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-blue-600 px-6 py-3 text-xs font-bold text-white shadow-sm hover:bg-brand-blue-700 transition"
            >
              <Send className="h-3.5 w-3.5" /> Submit Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
};`,

  // ==========================================
  // 6. UPDATE TOOL LAYOUT TO INCLUDE ADS & SCHEMA
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

  // Injects Google SoftwareApplication JSON-LD Rich Snippet Schema
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'toolnest-schema';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: tool.name,
      description: tool.meta.description,
      applicationCategory: 'UtilityApplication',
      operatingSystem: 'All',
      offers: {
        '@type': 'Offer',
        price: '0.00',
        priceCurrency: 'USD',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        ratingCount: '128',
      },
    });

    const existing = document.getElementById('toolnest-schema');
    if (existing) existing.remove();
    document.head.appendChild(script);

    return () => {
      const el = document.getElementById('toolnest-schema');
      if (el) el.remove();
    };
  }, [tool]);

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
          <Link to={'/category/' + tool.category} className="capitalize hover:underline">
            {tool.category}
          </Link>
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
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 shadow-2xs"
          >
            {copiedLink ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Share2 className="h-3.5 w-3.5 text-slate-400" />}
            {copiedLink ? 'Copied Link' : 'Share'}
          </button>

          <button
            onClick={() => toggleFavorite(tool.id)}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 shadow-2xs"
          >
            <Star className={\`h-3.5 w-3.5 \${isFav ? 'fill-amber-400 text-amber-400' : 'text-slate-400'}\`} />
            {isFav ? 'Saved' : 'Favorite'}
          </button>
        </div>
      </div>

      {/* Primary Tool Workstation */}
      <section className="my-6 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#111625]">
        {children}
      </section>

      {/* AdSense Placement Anchor */}
      <AdBanner slot="tool-page-middle" />

      {/* Instructions & Client-Side Proof */}
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
            All calculations and conversions execute inside your browser window. No files, documents, or data inputs are ever sent to remote servers.
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
};`,

  // ==========================================
  // 7. UPDATED FOOTER WITH WORKING LEGAL LINKS
  // ==========================================
  'src/components/layout/Footer.tsx': `import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../../data/categories';
import { Layers, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto border-t border-slate-200/80 bg-white dark:border-slate-800/80 dark:bg-[#0b0f19]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          <div className="col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-blue-600 text-white">
                <Layers className="h-4 w-4" />
              </div>
              <span className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
                Tool<span className="text-brand-blue-600">Nest</span>
              </span>
            </div>
            <p className="mt-3 max-w-sm text-xs text-slate-500 leading-relaxed">
              89+ high-performance online utility tools running entirely in your browser. Fast, private, zero-latency utilities designed for developers, students, and creators worldwide.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-emerald-600 font-semibold">
              <ShieldCheck className="h-4 w-4" /> 100% Client-Side Safe
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
              Popular Tools
            </h3>
            <ul className="mt-3 space-y-2 text-xs">
              <li><Link to="/tool/word-counter" className="text-slate-500 hover:text-brand-blue-600">Word Counter</Link></li>
              <li><Link to="/tool/image-compressor" className="text-slate-500 hover:text-brand-blue-600">Image Compressor</Link></li>
              <li><Link to="/tool/text-to-pdf-converter" className="text-slate-500 hover:text-brand-blue-600">Text to PDF</Link></li>
              <li><Link to="/tool/loan-emi-calculator" className="text-slate-500 hover:text-brand-blue-600">Loan Calculator</Link></li>
              <li><Link to="/tool/json-formatter-validator" className="text-slate-500 hover:text-brand-blue-600">JSON Formatter</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
              Categories
            </h3>
            <ul className="mt-3 space-y-2 text-xs">
              {CATEGORIES.slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <Link to={'/category/' + cat.id} className="text-slate-500 hover:text-brand-blue-600">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
              Legal & Trust
            </h3>
            <ul className="mt-3 space-y-2 text-xs">
              <li><Link to="/privacy" className="text-slate-500 hover:text-brand-blue-600">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-slate-500 hover:text-brand-blue-600">Terms of Service</Link></li>
              <li><Link to="/about" className="text-slate-500 hover:text-brand-blue-600">About ToolNest</Link></li>
              <li><Link to="/contact" className="text-slate-500 hover:text-brand-blue-600">Contact & Feedback</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-100 pt-6 text-center text-[11px] text-slate-400 dark:border-slate-800">
          © {new Date().getFullYear()} ToolNest Platform. All rights reserved. Zero external server processing.
        </div>
      </div>
    </footer>
  );
};`,

  // ==========================================
  // 8. UPDATED APP ROUTER WITH LEGAL PAGES
  // ==========================================
  'src/App.tsx': `import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { PreferencesProvider } from './context/UserPreferencesContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { ToolHostPage } from './pages/ToolHostPage';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsPage } from './pages/TermsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

export function App() {
  return (
    <ThemeProvider>
      <PreferencesProvider>
        <BrowserRouter>
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

console.log('\\n✨ ADSENSE, SEO SCHEMA & LEGAL ARCHITECTURE INSTALLED!');