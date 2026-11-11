import React, { useState } from 'react';
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
};