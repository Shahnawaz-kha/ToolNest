import React, { useState } from 'react';

export const WordCounter: React.FC = () => {
  const [text, setText] = useState('');

  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  const charCount = text.length;
  const charNoSpaces = text.replace(/\s/g, '').length;
  const readingTime = Math.ceil(wordCount / 200);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl bg-slate-50 p-4 text-center dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
          <span className="text-2xl font-black text-brand-blue-600 dark:text-brand-blue-400">{wordCount}</span>
          <p className="text-xs text-slate-500 uppercase tracking-wider font-medium mt-1">Words</p>
        </div>
        <div className="rounded-xl bg-slate-50 p-4 text-center dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
          <span className="text-2xl font-black text-brand-purple-600 dark:text-brand-purple-400">{charCount}</span>
          <p className="text-xs text-slate-500 uppercase tracking-wider font-medium mt-1">Characters</p>
        </div>
        <div className="rounded-xl bg-slate-50 p-4 text-center dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
          <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{charNoSpaces}</span>
          <p className="text-xs text-slate-500 uppercase tracking-wider font-medium mt-1">No Spaces</p>
        </div>
        <div className="rounded-xl bg-slate-50 p-4 text-center dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
          <span className="text-2xl font-black text-amber-500">~{readingTime} min</span>
          <p className="text-xs text-slate-500 uppercase tracking-wider font-medium mt-1">Reading Time</p>
        </div>
      </div>

      <textarea
        rows={8}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type or paste your text here..."
        className="w-full rounded-xl border border-slate-200 bg-transparent p-4 text-sm outline-none transition focus:border-brand-blue-500 dark:border-slate-800 dark:text-white"
      />

      <div className="flex gap-3">
        <button
          onClick={() => navigator.clipboard.writeText(text)}
          disabled={!text}
          className="rounded-lg bg-brand-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-brand-blue-700 disabled:opacity-50"
        >
          Copy Text
        </button>
        <button
          onClick={() => setText('')}
          disabled={!text}
          className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900 disabled:opacity-50"
        >
          Clear
        </button>
      </div>
    </div>
  );
};