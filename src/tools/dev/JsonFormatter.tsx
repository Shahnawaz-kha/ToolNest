import React, { useState } from 'react';

export const JsonFormatter: React.FC = () => {
  const [input, setInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const formatJson = (spaces: number) => {
    if (!input.trim()) return;
    try {
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed, null, spaces));
      setError(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const minifyJson = () => {
    if (!input.trim()) return;
    try {
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed));
      setError(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const loadSample = () => {
    const sample = {
      platform: "ToolNest",
      speed: "ultra-fast",
      toolsCount: 89,
      tags: ["developer", "privacy", "client-side"],
      maintainer: { name: "Core Engineering Team", verified: true }
    };
    setInput(JSON.stringify(sample, null, 2));
    setError(null);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(input);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-2">
          <button onClick={() => formatJson(2)} className="rounded-lg bg-brand-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-blue-700">
            Beautify (2 spaces)
          </button>
          <button onClick={() => formatJson(4)} className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300">
            Beautify (4 spaces)
          </button>
          <button onClick={minifyJson} className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300">
            Minify / Compact
          </button>
        </div>
        <div className="flex gap-2">
          <button onClick={loadSample} className="text-xs font-medium text-brand-purple-600 dark:text-brand-purple-400 hover:underline">
            Load Sample
          </button>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <button onClick={() => { setInput(''); setError(null); }} className="text-xs font-medium text-rose-500 hover:underline">
            Clear
          </button>
        </div>
      </div>

      <textarea
        rows={12}
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          if (error) setError(null);
        }}
        placeholder="Paste your raw JSON code here..."
        className="w-full rounded-xl border border-slate-200 bg-transparent p-4 font-mono text-xs outline-none transition focus:border-brand-blue-500 dark:border-slate-800 dark:text-white"
      />

      {error ? (
        <div className="rounded-lg bg-rose-50 p-3 text-xs text-rose-700 border border-rose-200 dark:bg-rose-950/40 dark:border-rose-900 dark:text-rose-300">
          <strong>Syntax Error:</strong> {error}
        </div>
      ) : input.trim() ? (
        <div className="rounded-lg bg-emerald-50 p-3 text-xs text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:border-emerald-900 dark:text-emerald-300">
          ✔ Valid JSON structure.
        </div>
      ) : null}

      <div className="flex gap-2">
        <button
          onClick={handleCopy}
          disabled={!input}
          className="rounded-lg bg-brand-purple-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-brand-purple-700 disabled:opacity-50"
        >
          {copied ? 'Copied!' : 'Copy JSON'}
        </button>
      </div>
    </div>
  );
};