import React, { useState } from 'react';

export const WordCounter: React.FC = () => {
  const [text, setText] = useState('');
  const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  const chars = text.length;
  const charsNoSpace = text.replace(/\s/g, '').length;
  const readTime = Math.ceil(words / 200);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 p-3 text-center">
          <div className="text-2xl font-black text-brand-blue-600">{words}</div>
          <div className="text-[11px] font-medium text-slate-500 uppercase">Words</div>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 p-3 text-center">
          <div className="text-2xl font-black text-brand-purple-600">{chars}</div>
          <div className="text-[11px] font-medium text-slate-500 uppercase">Characters</div>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 p-3 text-center">
          <div className="text-2xl font-black text-emerald-600">{charsNoSpace}</div>
          <div className="text-[11px] font-medium text-slate-500 uppercase">No Spaces</div>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 p-3 text-center">
          <div className="text-2xl font-black text-amber-500">~{readTime}m</div>
          <div className="text-[11px] font-medium text-slate-500 uppercase">Reading Time</div>
        </div>
      </div>
      <textarea
        rows={7}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type or paste your text here..."
        className="w-full rounded-xl border border-slate-200 bg-transparent p-3 text-sm outline-none focus:border-brand-blue-500 dark:border-slate-800 dark:text-white"
      />
      <div className="flex gap-2">
        <button onClick={() => navigator.clipboard.writeText(text)} disabled={!text} className="rounded-lg bg-brand-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-brand-blue-700 disabled:opacity-50">Copy Text</button>
        <button onClick={() => setText('')} disabled={!text} className="rounded-lg border border-slate-200 dark:border-slate-800 px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 disabled:opacity-50">Clear</button>
      </div>
    </div>
  );
};

export const CaseConverter: React.FC = () => {
  const [text, setText] = useState('');
  const transform = (t: string) => {
    if (t === 'upper') setText(text.toUpperCase());
    if (t === 'lower') setText(text.toLowerCase());
    if (t === 'title') setText(text.toLowerCase().replace(/\b(\w)/g, (c) => c.toUpperCase()));
    if (t === 'sentence') setText(text.toLowerCase().replace(/(^\s*\w|[\.?!]\s*\w)/g, (c) => c.toUpperCase()));
    if (t === 'camel') setText(text.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase()));
    if (t === 'snake') setText(text.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)?.map(x => x.toLowerCase()).join('_') || '');
    if (t === 'kebab') setText(text.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)?.map(x => x.toLowerCase()).join('-') || '');
  };

  return (
    <div className="space-y-4">
      <textarea rows={6} value={text} onChange={(e) => setText(e.target.value)} placeholder="Type or paste text..." className="w-full rounded-xl border border-slate-200 bg-transparent p-3 text-sm outline-none focus:border-brand-blue-500 dark:border-slate-800 dark:text-white" />
      <div className="flex flex-wrap gap-2">
        {['upper', 'lower', 'title', 'sentence', 'camel', 'snake', 'kebab'].map((m) => (
          <button key={m} onClick={() => transform(m)} className="rounded-lg bg-slate-100 dark:bg-slate-800 px-3 py-1.5 text-xs font-semibold uppercase text-slate-700 dark:text-slate-300 hover:bg-slate-200">{m}</button>
        ))}
      </div>
      <button onClick={() => navigator.clipboard.writeText(text)} disabled={!text} className="rounded-lg bg-brand-blue-600 px-4 py-2 text-xs font-semibold text-white disabled:opacity-50">Copy Converted Text</button>
    </div>
  );
};

export const LoremIpsum: React.FC = () => {
  const [count, setCount] = useState(3);
  const [output, setOutput] = useState('');
  const generate = () => {
    const p = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
    setOutput(Array.from({ length: count }, () => p).join('\n\n'));
  };
  React.useEffect(() => { generate(); }, [count]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <label className="text-xs font-medium text-slate-500">Paragraphs:</label>
        <input type="number" min={1} max={20} value={count} onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))} className="w-20 rounded-lg border border-slate-200 dark:border-slate-800 bg-transparent p-1.5 text-xs font-bold outline-none dark:text-white" />
        <button onClick={generate} className="rounded-lg bg-slate-100 dark:bg-slate-800 px-3 py-1.5 text-xs font-semibold">Regenerate</button>
      </div>
      <textarea readOnly rows={7} value={output} className="w-full rounded-xl border border-slate-200 bg-slate-50 dark:bg-slate-900/60 p-3 text-xs leading-relaxed outline-none dark:border-slate-800 dark:text-white" />
      <button onClick={() => navigator.clipboard.writeText(output)} className="rounded-lg bg-brand-blue-600 px-4 py-2 text-xs font-semibold text-white">Copy Lorem Ipsum</button>
    </div>
  );
};

export const SlugGenerator: React.FC = () => {
  const [title, setTitle] = useState('');
  const slug = title.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9\s-_]/g, '').trim().replace(/[\s_\-]+/g, '-').toLowerCase();

  return (
    <div className="space-y-4">
      <div>
        <label className="text-xs font-medium text-slate-500 mb-1 block">Article or Headline Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. 10 Best Productivity Tools for 2025" className="w-full rounded-xl border border-slate-200 bg-transparent p-3 text-sm outline-none focus:border-brand-blue-500 dark:border-slate-800 dark:text-white" />
      </div>
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-3 font-mono text-sm text-brand-blue-600 dark:text-brand-blue-400">
        /{slug || 'your-slug-preview'}
      </div>
      <button onClick={() => navigator.clipboard.writeText(slug)} disabled={!slug} className="rounded-lg bg-brand-blue-600 px-4 py-2 text-xs font-semibold text-white disabled:opacity-50">Copy Slug</button>
    </div>
  );
};

export const DuplicateRemover: React.FC = () => {
  const [input, setInput] = useState('');
  const lines = input.split('\n');
  const unique = Array.from(new Set(lines.map(l => l.trim()))).filter(Boolean);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center text-xs text-slate-500">
        <span>Original: {lines.length} lines</span>
        <span className="font-bold text-emerald-600">Unique: {unique.length} lines</span>
      </div>
      <textarea rows={8} value={input} onChange={(e) => setInput(e.target.value)} placeholder="Paste lines with duplicates here..." className="w-full rounded-xl border border-slate-200 bg-transparent p-3 text-xs font-mono outline-none dark:border-slate-800 dark:text-white" />
      <button onClick={() => setInput(unique.join('\n'))} disabled={!input} className="rounded-lg bg-brand-purple-600 px-4 py-2 text-xs font-semibold text-white disabled:opacity-50">Deduplicate Now</button>
    </div>
  );
};