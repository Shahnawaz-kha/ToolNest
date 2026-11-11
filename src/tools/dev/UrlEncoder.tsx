import React, { useState } from 'react';

export const UrlEncoder: React.FC = () => {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [parsedParams, setParsedParams] = useState<{ key: string; value: string }[]>([]);

  const getOutput = () => {
    if (!input) return '';
    try {
      return mode === 'encode' ? encodeURIComponent(input) : decodeURIComponent(input);
    } catch {
      return 'Error: Malformed URI sequence';
    }
  };

  const parseUrl = () => {
    try {
      const url = new URL(input);
      const params: { key: string; value: string }[] = [];
      url.searchParams.forEach((value, key) => {
        params.push({ key, value });
      });
      setParsedParams(params);
    } catch {
      setParsedParams([]);
    }
  };

  const output = getOutput();

  return (
    <div className="space-y-5">
      <div className="flex gap-2">
        <button
          onClick={() => setMode('encode')}
          className={'rounded-lg px-4 py-1.5 text-xs font-semibold transition ' + (
            mode === 'encode' ? 'bg-brand-blue-600 text-white' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
          )}
        >
          Encode Component
        </button>
        <button
          onClick={() => setMode('decode')}
          className={'rounded-lg px-4 py-1.5 text-xs font-semibold transition ' + (
            mode === 'decode' ? 'bg-brand-blue-600 text-white' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
          )}
        >
          Decode Component
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-2">Input URL or Text</label>
          <textarea
            rows={5}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              parseUrl();
            }}
            placeholder="https://example.com/search?q=online tools&sort=asc"
            className="w-full rounded-xl border border-slate-200 bg-transparent p-3 font-mono text-xs outline-none focus:border-brand-blue-500 dark:border-slate-800 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-2">Result</label>
          <textarea
            readOnly
            rows={5}
            value={output}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 font-mono text-xs outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-white"
          />
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => navigator.clipboard.writeText(output)}
          disabled={!output}
          className="rounded-lg bg-brand-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-brand-blue-700 disabled:opacity-50"
        >
          Copy Result
        </button>
      </div>

      {parsedParams.length > 0 && (
        <div className="mt-6 border-t border-slate-200 pt-4 dark:border-slate-800">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-3">
            Detected Query Parameters ({parsedParams.length})
          </h4>
          <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
            <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800 text-xs text-left">
              <thead className="bg-slate-50 dark:bg-slate-900/60 font-semibold text-slate-600 dark:text-slate-300">
                <tr>
                  <th className="px-4 py-2">Parameter Key</th>
                  <th className="px-4 py-2">Parameter Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
                {parsedParams.map((p, i) => (
                  <tr key={i}>
                    <td className="px-4 py-2 text-brand-purple-600 dark:text-brand-purple-400">{p.key}</td>
                    <td className="px-4 py-2 text-slate-700 dark:text-slate-300">{p.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};