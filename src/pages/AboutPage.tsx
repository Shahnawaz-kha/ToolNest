import React from 'react';
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
};