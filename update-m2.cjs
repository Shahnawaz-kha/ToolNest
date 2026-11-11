const fs = require('fs');
const path = require('path');

console.log('⚡ Updating ToolNest to Milestone 2 (Adding 6 Tools)...');

const files = {
  // 1. Case Converter
  'src/tools/text/CaseConverter.tsx': `import React, { useState } from 'react';

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
          text.toLowerCase().replace(/(^\\s*\\w|[\\.?!]\\s*\\w)/g, (c) => c.toUpperCase())
        );
        break;
      case 'title':
        setText(
          text.toLowerCase().replace(/\\b(\\w)/g, (c) => c.toUpperCase())
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
            .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
            ?.map((x) => x.toLowerCase())
            .join('-') || ''
        );
        break;
      case 'snake':
        setText(
          text
            .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
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
};`,

  // 2. Lorem Ipsum Generator
  'src/tools/text/LoremIpsum.tsx': `import React, { useState } from 'react';

const LOREM_WORDS = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
  'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
  'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
  'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
  'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
  'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
  'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
  'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
];

export const LoremIpsum: React.FC = () => {
  const [count, setCount] = useState(3);
  const [unit, setUnit] = useState<'paragraphs' | 'sentences' | 'words'>('paragraphs');
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const generate = () => {
    let result = '';
    const getRandomWord = () => LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)];

    const makeSentence = () => {
      const len = Math.floor(Math.random() * 8) + 6;
      const words = Array.from({ length: len }, getRandomWord);
      const str = words.join(' ');
      return str.charAt(0).toUpperCase() + str.slice(1) + '.';
    };

    const makeParagraph = () => {
      const sentenceCount = Math.floor(Math.random() * 3) + 4;
      return Array.from({ length: sentenceCount }, makeSentence).join(' ');
    };

    if (unit === 'words') {
      const words = Array.from({ length: count }, getRandomWord);
      result = words.join(' ');
      if (startWithLorem && count >= 5) {
        result = 'Lorem ipsum dolor sit amet ' + words.slice(5).join(' ');
      }
    } else if (unit === 'sentences') {
      const sentences = Array.from({ length: count }, makeSentence);
      result = sentences.join(' ');
    } else {
      const paragraphs = Array.from({ length: count }, makeParagraph);
      if (startWithLorem && paragraphs.length > 0) {
        paragraphs[0] = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' + paragraphs[0];
      }
      result = paragraphs.join('\\n\\n');
    }

    setOutput(result);
  };

  React.useEffect(() => {
    generate();
  }, [count, unit, startWithLorem]);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
            Count
          </label>
          <input
            type="number"
            min={1}
            max={50}
            value={count}
            onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-24 rounded-lg border border-slate-200 bg-transparent px-3 py-1.5 text-xs outline-none focus:border-brand-blue-500 dark:border-slate-800 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
            Type
          </label>
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value as any)}
            className="rounded-lg border border-slate-200 bg-transparent px-3 py-1.5 text-xs outline-none focus:border-brand-blue-500 dark:border-slate-800 dark:text-white dark:bg-brand-navy-900"
          >
            <option value="paragraphs">Paragraphs</option>
            <option value="sentences">Sentences</option>
            <option value="words">Words</option>
          </select>
        </div>

        <div className="flex items-center pt-5">
          <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={startWithLorem}
              onChange={(e) => setStartWithLorem(e.target.checked)}
              className="rounded text-brand-blue-600 focus:ring-0"
            />
            Start with "Lorem ipsum dolor..."
          </label>
        </div>
      </div>

      <textarea
        readOnly
        rows={8}
        value={output}
        className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs leading-relaxed outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-white"
      />

      <div className="flex gap-2">
        <button
          onClick={handleCopy}
          className="rounded-lg bg-brand-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-brand-blue-700"
        >
          {copied ? 'Copied to Clipboard!' : 'Copy Text'}
        </button>
        <button
          onClick={generate}
          className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-400"
        >
          Regenerate
        </button>
      </div>
    </div>
  );
};`,

  // 3. Slug Generator
  'src/tools/text/SlugGenerator.tsx': `import React, { useState } from 'react';

export const SlugGenerator: React.FC = () => {
  const [input, setInput] = useState('');
  const [separator, setSeparator] = useState<'-' | '_'>('-');
  const [lowercase, setLowercase] = useState(true);
  const [copied, setCopied] = useState(false);

  const generateSlug = (str: string) => {
    let slug = str
      .normalize('NFD')
      .replace(/[\\u0300-\\u036f]/g, '')
      .replace(/[^a-zA-Z0-9\\s-_]/g, '')
      .trim()
      .replace(/[\\s_\\-]+/g, separator);

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
};`,

  // 4. JSON Formatter & Validator
  'src/tools/dev/JsonFormatter.tsx': `import React, { useState } from 'react';

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
};`,

  // 5. URL Encoder / Decoder & Parser
  'src/tools/dev/UrlEncoder.tsx': `import React, { useState } from 'react';

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
};`,

  // 6. Cryptographic Hash Generator
  'src/tools/dev/HashGenerator.tsx': `import React, { useState, useEffect } from 'react';

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
};`,

  // 7. Update Tools Catalog (data/tools.ts with all 8 tools)
  'src/data/tools.ts': `import { ToolMetadata } from '../types';

export const TOOLS: ToolMetadata[] = [
  {
    id: 'word-counter',
    slug: 'word-counter',
    name: 'Word & Character Counter',
    shortDescription: 'Count words, characters, sentences, paragraphs, and reading time in real-time.',
    category: 'text',
    iconName: 'Type',
    isPopular: true,
    component: 'WordCounter',
    meta: {
      title: 'Free Online Word Counter & Character Counter | ToolNest',
      description: 'Accurate word counter, character counter, reading time analyzer, and sentence calculator. Client-side, fast and secure.',
      keywords: ['word counter', 'character count', 'reading time calculator', 'text analyzer'],
    },
    instructions: {
      howTo: [
        'Paste or type your content into the text area.',
        'View live statistics including words, characters, and reading time.',
        'Use the copy or clear buttons to manage your text.',
      ],
      features: [
        'Real-time updates with zero lag',
        'Estimated speaking and reading times',
        'Works 100% offline in your browser',
      ],
      faqs: [
        {
          question: 'Is my text sent to any server?',
          answer: 'No. All processing is performed strictly inside your browser. Your data never leaves your device.',
        },
      ],
    },
  },
  {
    id: 'case-converter',
    slug: 'case-converter',
    name: 'Text Case Converter',
    shortDescription: 'Instantly convert text to UPPERCASE, lowercase, Title Case, camelCase, snake_case, and more.',
    category: 'text',
    iconName: 'Type',
    isPopular: true,
    component: 'CaseConverter',
    meta: {
      title: 'Online Text Case Converter (UPPERCASE, lowercase, Title Case) | ToolNest',
      description: 'Convert any text into UPPERCASE, lowercase, Title Case, sentence case, camelCase, snake_case, or kebab-case instantly.',
      keywords: ['case converter', 'uppercase', 'lowercase', 'camelcase converter', 'title case'],
    },
    instructions: {
      howTo: [
        'Enter or paste your text into the editor.',
        'Click on the target case button (e.g., Title Case, camelCase, etc.).',
        'Copy the converted text to your clipboard with one click.',
      ],
      features: [
        'Supports 8 distinct case formats',
        'Ideal for code naming conventions and writing headlines',
        'Preserves numbers and special symbols safely',
      ],
      faqs: [
        {
          question: 'What is camelCase and kebab-case?',
          answer: 'camelCase formats text like "myVariableName" (common in JavaScript), while kebab-case formats it as "my-variable-name" (common in URLs and CSS).',
        },
      ],
    },
  },
  {
    id: 'lorem-ipsum-generator',
    slug: 'lorem-ipsum-generator',
    name: 'Lorem Ipsum Dummy Text Generator',
    shortDescription: 'Generate placeholder Lorem Ipsum text by paragraphs, sentences, or word count.',
    category: 'text',
    iconName: 'FileText',
    component: 'LoremIpsum',
    meta: {
      title: 'Lorem Ipsum Generator - Free Placeholder Text | ToolNest',
      description: 'Generate customized dummy text for websites, mockups, and designs. Choose paragraphs, sentences, or word counts.',
      keywords: ['lorem ipsum generator', 'dummy text', 'placeholder text', 'web design text'],
    },
    instructions: {
      howTo: [
        'Select the unit of measurement (paragraphs, sentences, or words).',
        'Choose the desired quantity and toggle the introductory phrase if desired.',
        'Click Copy Text to paste into your design or layout.',
      ],
      features: [
        'Standard Latin vocabulary',
        'Instant re-generation button',
        'Clean formatting ready for copy-paste',
      ],
      faqs: [
        {
          question: 'Why is Lorem Ipsum used?',
          answer: 'Lorem Ipsum prevents readers from getting distracted by readable content, allowing them to focus entirely on visual design and layout.',
        },
      ],
    },
  },
  {
    id: 'slug-generator',
    slug: 'slug-generator',
    name: 'URL Slug & String Sanitizer',
    shortDescription: 'Generate clean, URL-friendly, SEO-optimized slugs from any headline or title.',
    category: 'text',
    iconName: 'Link',
    component: 'SlugGenerator',
    meta: {
      title: 'SEO Friendly URL Slug Generator | ToolNest',
      description: 'Sanitize strings into safe, clean, SEO-friendly URL slugs. Removes accents, special symbols, and spaces.',
      keywords: ['slug generator', 'url slug', 'seo url builder', 'string sanitizer'],
    },
    instructions: {
      howTo: [
        'Type or paste an article title or headline.',
        'Select your preferred separator (hyphen or underscore).',
        'Copy the formatted slug directly into your CMS or codebase.',
      ],
      features: [
        'Automatically strips accents and diacritics',
        'Eliminates duplicate separators',
        'Strictly complies with modern SEO URL best practices',
      ],
      faqs: [
        {
          question: 'Why should I use hyphens instead of underscores in URLs?',
          answer: 'Major search engines like Google treat hyphens as word separators, whereas underscores may connect words into a single term.',
        },
      ],
    },
  },
  {
    id: 'json-formatter',
    slug: 'json-formatter-validator',
    name: 'JSON Formatter & Validator',
    shortDescription: 'Format, validate, beautify, and minify raw JSON with pinpoint syntax error highlighting.',
    category: 'developer',
    iconName: 'Code',
    isPopular: true,
    component: 'JsonFormatter',
    meta: {
      title: 'Free Online JSON Formatter & Validator | ToolNest',
      description: 'Format, prettify, compact, and validate JSON data instantly in your browser with real-time error detection.',
      keywords: ['json formatter', 'json validator', 'beautify json', 'minify json', 'json parser'],
    },
    instructions: {
      howTo: [
        'Paste your raw JSON into the text editor.',
        'Click Beautify (2 or 4 spaces) or Minify.',
        'Read detailed error reports if the syntax is invalid.',
      ],
      features: [
        'Pinpoint syntax error explanations',
        'Minification to reduce file payload size',
        'One-click sample loader for rapid testing',
      ],
      faqs: [
        {
          question: 'Is my JSON uploaded to an API?',
          answer: 'No. Parsing happens purely via your local browser engine. Sensitive data and credentials remain entirely private.',
        },
      ],
    },
  },
  {
    id: 'url-encoder-decoder',
    slug: 'url-encoder-decoder',
    name: 'URL Encoder / Decoder & Parser',
    shortDescription: 'Encode and decode URI components safely, and inspect query string parameters visually.',
    category: 'developer',
    iconName: 'Link',
    component: 'UrlEncoder',
    meta: {
      title: 'URL Encoder & Decoder with Query String Inspector | ToolNest',
      description: 'Encode and decode URLs and query strings. Breakdown URL parameters into an organized visual table.',
      keywords: ['url encoder', 'url decoder', 'url parser', 'query parameter decoder'],
    },
    instructions: {
      howTo: [
        'Paste your URL or query string into the input area.',
        'Choose whether you want to Encode or Decode.',
        'Review the breakdown table for extracted query parameters.',
      ],
      features: [
        'Encodes illegal URL characters according to RFC 3986',
        'Visual query string inspector table',
        'One-click copy of decoded/encoded strings',
      ],
      faqs: [
        {
          question: 'Why is URL encoding necessary?',
          answer: 'Certain characters like spaces, question marks, and ampersands have special meanings in URLs. Encoding ensures they are transmitted accurately.',
        },
      ],
    },
  },
  {
    id: 'hash-generator',
    slug: 'hash-generator',
    name: 'Cryptographic Hash Generator',
    shortDescription: 'Generate SHA-256, SHA-512, SHA-384, and SHA-1 hashes directly using the native Web Crypto API.',
    category: 'developer',
    iconName: 'Hash',
    isPopular: true,
    component: 'HashGenerator',
    meta: {
      title: 'Online Hash Generator (SHA-256, SHA-512, SHA-1) | ToolNest',
      description: 'Compute secure cryptographic checksums and hashes client-side using native hardware-accelerated Web Crypto.',
      keywords: ['hash generator', 'sha256 generator', 'sha512', 'checksum calculator', 'crypto hash'],
    },
    instructions: {
      howTo: [
        'Type or paste any string into the input box.',
        'The SHA-256, SHA-512, SHA-384, and SHA-1 hashes are computed in real time.',
        'Click Copy Hash next to the desired algorithm.',
      ],
      features: [
        'Hardware accelerated via browser SubtleCrypto API',
        'Zero external crypto library dependencies',
        'Works 100% offline with zero server data transfer',
      ],
      faqs: [
        {
          question: 'Can a hash be reversed back into plain text?',
          answer: 'No. Cryptographic hashes are one-way mathematical functions designed to be irreversible.',
        },
      ],
    },
  },
  {
    id: 'base64-codec',
    slug: 'base64-encoder-decoder',
    name: 'Base64 Encoder / Decoder',
    shortDescription: 'Encode plain text to Base64 format or decode Base64 strings safely.',
    category: 'developer',
    iconName: 'Code',
    isPopular: true,
    component: 'Base64Codec',
    meta: {
      title: 'Online Base64 Encoder and Decoder | ToolNest',
      description: 'Encode and decode Base64 data instantly in your browser with zero latency.',
      keywords: ['base64 encoder', 'base64 decoder', 'developer tools', 'ascii to base64'],
    },
    instructions: {
      howTo: [
        'Select whether you want to Encode or Decode.',
        'Input your source string in the left editor.',
        'The output is generated instantly in the right editor.',
      ],
      features: [
        'One-click clipboard copy',
        'Supports standard UTF-8 characters',
        'Error detection for invalid Base64 input',
      ],
      faqs: [
        {
          question: 'What is Base64 encoding used for?',
          answer: 'Base64 is commonly used to encode binary data into an ASCII string format for transmission over text-based networks.',
        },
      ],
    },
  },
];`,

  // 8. Update ToolHostPage.tsx (Mapping all 8 tools)
  'src/pages/ToolHostPage.tsx': `import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { TOOLS } from '../data/tools';
import { ToolLayout } from '../components/layout/ToolLayout';
import { usePreferences } from '../context/UserPreferencesContext';

import { WordCounter } from '../tools/text/WordCounter';
import { CaseConverter } from '../tools/text/CaseConverter';
import { LoremIpsum } from '../tools/text/LoremIpsum';
import { SlugGenerator } from '../tools/text/SlugGenerator';
import { JsonFormatter } from '../tools/dev/JsonFormatter';
import { UrlEncoder } from '../tools/dev/UrlEncoder';
import { HashGenerator } from '../tools/dev/HashGenerator';
import { Base64Codec } from '../tools/dev/Base64Codec';

const TOOL_COMPONENTS: Record<string, React.ReactNode> = {
  WordCounter: <WordCounter />,
  CaseConverter: <CaseConverter />,
  LoremIpsum: <LoremIpsum />,
  SlugGenerator: <SlugGenerator />,
  JsonFormatter: <JsonFormatter />,
  UrlEncoder: <UrlEncoder />,
  HashGenerator: <HashGenerator />,
  Base64Codec: <Base64Codec />,
};

export const ToolHostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { recordToolUsage } = usePreferences();
  const tool = TOOLS.find((t) => t.slug === slug);

  useEffect(() => {
    if (tool) {
      document.title = tool.meta.title;
      recordToolUsage(tool.id);
    }
  }, [tool]);

  if (!tool) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-xl font-bold">Tool Not Found</h2>
        <Link to="/" className="text-brand-blue-600 underline mt-4 inline-block">Return to Directory</Link>
      </div>
    );
  }

  const ComponentToRender = TOOL_COMPONENTS[tool.component] || <div>Tool under construction</div>;

  return <ToolLayout tool={tool}>{ComponentToRender}</ToolLayout>;
};`
};

for (const [filePath, content] of Object.entries(files)) {
  const fullPath = path.join(process.cwd(), filePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content);
  console.log('  ✔ Created / Updated ' + filePath);
}

console.log('\\n🚀 Milestone 2 applied successfully! All 8 tools are active.');