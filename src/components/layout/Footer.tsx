import React from 'react';
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
};