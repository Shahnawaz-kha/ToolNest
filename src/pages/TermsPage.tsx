import React from 'react';
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
};