import React, { useState } from 'react';

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
      result = paragraphs.join('\n\n');
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
};