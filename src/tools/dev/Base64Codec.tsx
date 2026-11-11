import React, { useState } from 'react';

export const Base64Codec: React.FC = () => {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [error, setError] = useState<string | null>(null);

  const processOutput = () => {
    if (!input) return '';
    try {
      if (mode === 'encode') {
        return btoa(input);
      } else {
        return atob(input);
      }
    } catch {
      return '';
    }
  };

  const handleInputChange = (val: string) => {
    setInput(val);
    setError(null);
    if (mode === 'decode' && val) {
      try {
        atob(val);
      } catch {
        setError('Invalid Base64 input string');
      }
    }
  };

  const output = processOutput();

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          onClick={() => { setMode('encode'); setError(null); }}
          className={'rounded-lg px-4 py-1.5 text-xs font-semibold transition ' + (
            mode === 'encode'
              ? 'bg-brand-blue-600 text-white'
              : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
          )}
        >
          Encode
        </button>
        <button
          onClick={() => { setMode('decode'); setError(null); }}
          className={'rounded-lg px-4 py-1.5 text-xs font-semibold transition ' + (
            mode === 'decode'
              ? 'bg-brand-blue-600 text-white'
              : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
          )}
        >
          Decode
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-2">
            Input ({mode === 'encode' ? 'Plain Text' : 'Base64'})
          </label>
          <textarea
            rows={6}
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="Type here..."
            className="w-full rounded-xl border border-slate-200 bg-transparent p-3 text-xs font-mono outline-none focus:border-brand-blue-500 dark:border-slate-800 dark:text-white"
          />
          {error && <p className="mt-1 text-xs text-rose-500 font-medium">{error}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-2">
            Output ({mode === 'encode' ? 'Base64' : 'Plain Text'})
          </label>
          <textarea
            readOnly
            rows={6}
            value={output}
            placeholder="Result will appear here..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs font-mono outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-white"
          />
        </div>
      </div>

      <button
        onClick={() => navigator.clipboard.writeText(output)}
        disabled={!output}
        className="rounded-lg bg-brand-purple-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-brand-purple-700 disabled:opacity-50"
      >
        Copy Result
      </button>
    </div>
  );
};