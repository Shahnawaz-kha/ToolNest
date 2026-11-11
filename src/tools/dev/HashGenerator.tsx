import React, { useState, useEffect } from 'react';

export const HashGenerator: React.FC = () => {
  const [text, setText] = useState('');
  const [hashes, setHashes] = useState({
    sha1: '',
    sha256: '',
    sha384: '',
    sha512: ''
  });

  const computeHashes = async (inputStr: string) => {
    if (!inputStr) {
      setHashes({ sha1: '', sha256: '', sha384: '', sha512: '' });
      return;
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(inputStr);

    const calc = async (algo: string) => {
      const buffer = await crypto.subtle.digest(algo, data);
      return Array.from(new Uint8Array(buffer))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
    };

    const [sha1, sha256, sha384, sha512] = await Promise.all([
      calc('SHA-1'),
      calc('SHA-256'),
      calc('SHA-384'),
      calc('SHA-512'),
    ]);

    setHashes({ sha1, sha256, sha384, sha512 });
  };

  useEffect(() => {
    computeHashes(text);
  }, [text]);

  const copy = (val: string) => {
    navigator.clipboard.writeText(val);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-2">
          Input Text / String
        </label>
        <textarea
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to calculate cryptographic hashes..."
          className="w-full rounded-xl border border-slate-200 bg-transparent p-3 text-sm outline-none focus:border-brand-blue-500 dark:border-slate-800 dark:text-white"
        />
      </div>

      <div className="space-y-4">
        {[
          { name: 'SHA-256', val: hashes.sha256, desc: 'Recommended modern standard for integrity and security' },
          { name: 'SHA-512', val: hashes.sha512, desc: 'Maximum security high-entropy hashing' },
          { name: 'SHA-384', val: hashes.sha384, desc: 'Truncated high-entropy hash' },
          { name: 'SHA-1', val: hashes.sha1, desc: 'Legacy standard (commonly used for Git commits)' },
        ].map((item) => (
          <div key={item.name} className="rounded-xl border border-slate-200 p-4 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-slate-800 dark:text-white">{item.name}</span>
              <button
                onClick={() => copy(item.val)}
                disabled={!item.val}
                className="text-[11px] font-semibold text-brand-blue-600 dark:text-brand-blue-400 hover:underline disabled:opacity-40"
              >
                Copy Hash
              </button>
            </div>
            <p className="text-[11px] text-slate-500 mb-2">{item.desc}</p>
            <div className="overflow-x-auto rounded bg-white p-2.5 font-mono text-xs text-slate-800 dark:bg-brand-navy-950 dark:text-slate-200 border border-slate-200 dark:border-slate-800 min-h-[38px] break-all">
              {item.val || '—'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};