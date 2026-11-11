import React, { useState } from 'react';

export const Base64Codec: React.FC = () => {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'encode'|'decode'>('encode');
  const [output, setOutput] = useState('');

  const process = (val: string, m: 'encode'|'decode') => {
    setInput(val);
    try {
      setOutput(m === 'encode' ? btoa(val) : atob(val));
    } catch {
      setOutput('Invalid input for decoding.');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button onClick={() => { setMode('encode'); process(input, 'encode'); }} className={'rounded-lg px-3 py-1.5 text-xs font-semibold ' + (mode === 'encode' ? 'bg-brand-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800')}>Encode</button>
        <button onClick={() => { setMode('decode'); process(input, 'decode'); }} className={'rounded-lg px-3 py-1.5 text-xs font-semibold ' + (mode === 'decode' ? 'bg-brand-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800')}>Decode</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <textarea rows={6} value={input} onChange={(e) => process(e.target.value, mode)} placeholder="Input text..." className="w-full rounded-xl border border-slate-200 bg-transparent p-3 text-xs font-mono outline-none dark:border-slate-800 dark:text-white" />
        <textarea readOnly rows={6} value={output} placeholder="Result..." className="w-full rounded-xl border border-slate-200 bg-slate-50 dark:bg-slate-900 p-3 text-xs font-mono outline-none dark:border-slate-800 dark:text-white" />
      </div>
      <button onClick={() => navigator.clipboard.writeText(output)} disabled={!output} className="rounded-lg bg-brand-blue-600 px-4 py-2 text-xs font-semibold text-white disabled:opacity-50">Copy Output</button>
    </div>
  );
};

export const JsonFormatter: React.FC = () => {
  const [input, setInput] = useState('{"toolnest":"online utilities","version":1,"fast":true}');
  const [error, setError] = useState<string|null>(null);

  const format = (spaces: number) => {
    try {
      setInput(JSON.stringify(JSON.parse(input), null, spaces));
      setError(null);
    } catch (e: any) { setError(e.message); }
  };
  const minify = () => {
    try {
      setInput(JSON.stringify(JSON.parse(input)));
      setError(null);
    } catch (e: any) { setError(e.message); }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <button onClick={() => format(2)} className="rounded-lg bg-brand-blue-600 px-3 py-1.5 text-xs font-semibold text-white">Beautify (2 Spaces)</button>
        <button onClick={minify} className="rounded-lg bg-slate-100 dark:bg-slate-800 px-3 py-1.5 text-xs font-semibold">Minify</button>
      </div>
      <textarea rows={10} value={input} onChange={(e) => { setInput(e.target.value); setError(null); }} className="w-full rounded-xl border border-slate-200 bg-transparent p-3 text-xs font-mono outline-none dark:border-slate-800 dark:text-white" />
      {error && <div className="text-xs text-rose-500 font-medium">Error: {error}</div>}
      <button onClick={() => navigator.clipboard.writeText(input)} className="rounded-lg bg-brand-purple-600 px-4 py-2 text-xs font-semibold text-white">Copy JSON</button>
    </div>
  );
};

export const HashGenerator: React.FC = () => {
  const [text, setText] = useState('');
  const [sha256, setSha256] = useState('');
  const [sha512, setSha512] = useState('');

  React.useEffect(() => {
    if (!text) { setSha256(''); setSha512(''); return; }
    const buf = new TextEncoder().encode(text);
    crypto.subtle.digest('SHA-256', buf).then(b => {
      setSha256(Array.from(new Uint8Array(b)).map(x => x.toString(16).padStart(2,'0')).join(''));
    });
    crypto.subtle.digest('SHA-512', buf).then(b => {
      setSha512(Array.from(new Uint8Array(b)).map(x => x.toString(16).padStart(2,'0')).join(''));
    });
  }, [text]);

  return (
    <div className="space-y-4">
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter string to hash..." className="w-full rounded-xl border border-slate-200 bg-transparent p-3 text-sm outline-none dark:border-slate-800 dark:text-white" />
      <div>
        <span className="text-xs font-bold text-slate-500">SHA-256</span>
        <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900 font-mono text-xs break-all text-brand-blue-600">{sha256 || '—'}</div>
      </div>
      <div>
        <span className="text-xs font-bold text-slate-500">SHA-512</span>
        <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900 font-mono text-xs break-all text-brand-purple-600">{sha512 || '—'}</div>
      </div>
    </div>
  );
};

export const UuidGenerator: React.FC = () => {
  const [uuids, setUuids] = useState<string[]>([]);
  const generate = (count: number) => {
    const list = Array.from({ length: count }, () => crypto.randomUUID());
    setUuids(list);
  };
  React.useEffect(() => { generate(5); }, []);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button onClick={() => generate(1)} className="rounded-lg bg-brand-blue-600 px-3 py-1.5 text-xs font-semibold text-white">Generate 1</button>
        <button onClick={() => generate(5)} className="rounded-lg bg-slate-100 dark:bg-slate-800 px-3 py-1.5 text-xs font-semibold">Generate 5</button>
        <button onClick={() => generate(10)} className="rounded-lg bg-slate-100 dark:bg-slate-800 px-3 py-1.5 text-xs font-semibold">Generate 10</button>
      </div>
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-4 font-mono text-xs space-y-1.5">
        {uuids.map((u, i) => (
          <div key={i} className="flex justify-between items-center text-slate-800 dark:text-slate-200">
            <span>{u}</span>
            <button onClick={() => navigator.clipboard.writeText(u)} className="text-[11px] text-brand-blue-600 hover:underline">Copy</button>
          </div>
        ))}
      </div>
    </div>
  );
};