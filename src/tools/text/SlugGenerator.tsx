import React, { useState } from 'react';

export const SlugGenerator: React.FC = () => {
  const [input, setInput] = useState('');
  const [separator, setSeparator] = useState<'-' | '_'>('-');
  const [lowercase, setLowercase] = useState(true);
  const [copied, setCopied] = useState(false);

  const generateSlug = (str: string) => {
    let slug = str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9\s-_]/g, '')
      .trim()
      .replace(/[\s_\-]+/g, separator);

    return lowercase ? slug.toLowerCase() : slug;
  };

  const slug = generateSlug(input);

  const handleCopy = () => {
    navigator.clipboard.writeText(slug);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-2">
          Source Article or Page Title
        </label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. 10 Best Online Developer Utilities for 2025!"
          className="w-full rounded-xl border border-slate-200 bg-transparent px-4 py-3 text-sm outline-none transition focus:border-brand-blue-500 dark:border-slate-800 dark:text-white"
        />
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">Separator:</span>
          <button
            onClick={() => setSeparator('-')}
            className={'rounded px-3 py-1 text-xs font-semibold transition ' + (separator === '-' ? 'bg-brand-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300')}
          >
            Hyphen (-)
          </button>
          <button
            onClick={() => setSeparator('_')}
            className={'rounded px-3 py-1 text-xs font-semibold transition ' + (separator === '_' ? 'bg-brand-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300')}
          >
            Underscore (_)
          </button>
        </div>

        <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
          <input
            type="checkbox"
            checked={lowercase}
            onChange={(e) => setLowercase(e.target.checked)}
            className="rounded text-brand-blue-600"
          />
          Force lowercase
        </label>
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-2">
          Generated SEO Slug
        </label>
        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-3 font-mono text-sm dark:border-slate-800 dark:bg-slate-900 dark:text-white min-h-[46px]">
          <span className="text-slate-400 select-none">/</span>
          <span className="flex-1 break-all text-brand-blue-600 dark:text-brand-blue-400 font-medium">
            {slug || 'your-slug-will-appear-here'}
          </span>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleCopy}
          disabled={!slug}
          className="rounded-lg bg-brand-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-brand-blue-700 disabled:opacity-50"
        >
          {copied ? 'Copied!' : 'Copy Slug'}
        </button>
      </div>
    </div>
  );
};