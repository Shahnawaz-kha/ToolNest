import React from 'react';
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
};