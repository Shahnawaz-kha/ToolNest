import React, { useState } from 'react';

export const CaseConverter: React.FC = () => {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const transform = (type: string) => {
    switch (type) {
      case 'upper':
        setText(text.toUpperCase());
        break;
      case 'lower':
        setText(text.toLowerCase());
        break;
      case 'sentence':
        setText(
          text.toLowerCase().replace(/(^\s*\w|[\.?!]\s*\w)/g, (c) => c.toUpperCase())
        );
        break;
      case 'title':
        setText(
          text.toLowerCase().replace(/\b(\w)/g, (c) => c.toUpperCase())
        );
        break;
      case 'camel':
        setText(
          text
            .toLowerCase()
            .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
        );
        break;
      case 'kebab':
        setText(
          text
            .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
            ?.map((x) => x.toLowerCase())
            .join('-') || ''
        );
        break;
      case 'snake':
        setText(
          text
            .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
            ?.map((x) => x.toLowerCase())
            .join('_') || ''
        );
        break;
      case 'alternating':
        setText(
          text
            .split('')
            .map((c, i) => (i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()))
            .join('')
        );
        break;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <textarea
        rows={7}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste or type your text here to transform cases..."
        className="w-full rounded-xl border border-slate-200 bg-transparent p-4 text-sm outline-none transition focus:border-brand-blue-500 dark:border-slate-800 dark:text-white"
      />

      <div className="flex flex-wrap gap-2">
        <button onClick={() => transform('upper')} className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300">
          UPPERCASE
        </button>
        <button onClick={() => transform('lower')} className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300">
          lowercase
        </button>
        <button onClick={() => transform('sentence')} className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300">
          Sentence case
        </button>
        <button onClick={() => transform('title')} className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300">
          Title Case
        </button>
        <button onClick={() => transform('camel')} className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300">
          camelCase
        </button>
        <button onClick={() => transform('kebab')} className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300">
          kebab-case
        </button>
        <button onClick={() => transform('snake')} className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300">
          snake_case
        </button>
        <button onClick={() => transform('alternating')} className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300">
          aLtErNaTiNg
        </button>
      </div>

      <div className="flex gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
        <button
          onClick={handleCopy}
          disabled={!text}
          className="rounded-lg bg-brand-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-brand-blue-700 disabled:opacity-50"
        >
          {copied ? 'Copied to Clipboard!' : 'Copy Result'}
        </button>
        <button
          onClick={() => setText('')}
          disabled={!text}
          className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-400 disabled:opacity-50"
        >
          Clear
        </button>
      </div>
    </div>
  );
};