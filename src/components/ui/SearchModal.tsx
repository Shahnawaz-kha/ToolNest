import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { TOOLS } from '../../data/tools';

export const SearchModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = query.trim() === ''
    ? []
    : TOOLS.filter(
        (t) =>
          t.name.toLowerCase().includes(query.toLowerCase()) ||
          t.shortDescription.toLowerCase().includes(query.toLowerCase()) ||
          t.meta.keywords.some((k) => k.toLowerCase().includes(query.toLowerCase()))
      );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/70 p-4 pt-20 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Search Tools Dialog">
      <div className="relative w-full max-w-xl rounded-2xl bg-white shadow-2xl dark:bg-[#111625] border border-slate-300 dark:border-slate-800 overflow-hidden">
        <div className="flex items-center border-b border-slate-200 px-4 py-3 dark:border-slate-800">
          <Search className="h-5 w-5 text-slate-600 dark:text-slate-300 mr-3" />
          <input
            autoFocus
            type="text"
            aria-label="Search tools by name, utility, or keywords"
            placeholder="Search 89+ tools by name, utility, or keywords..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm font-medium outline-none text-slate-900 placeholder:text-slate-600 dark:text-white dark:placeholder:text-slate-400"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search dialog"
            className="rounded p-1 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto p-2">
          {query.trim() === '' ? (
            <p className="p-4 text-center text-xs font-semibold text-slate-600 dark:text-slate-400">
              Type "word", "compressor", "base64", or other tool names...
            </p>
          ) : filtered.length === 0 ? (
            <p className="p-4 text-center text-xs font-semibold text-slate-600 dark:text-slate-400">No matching tools found.</p>
          ) : (
            filtered.map((tool) => (
              <button
                key={tool.id}
                type="button"
                onClick={() => {
                  navigate('/tool/' + tool.slug);
                  onClose();
                }}
                className="flex w-full items-center justify-between rounded-lg p-3 text-left transition hover:bg-slate-100 dark:hover:bg-slate-800/80"
              >
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{tool.name}</h4>
                  <p className="text-xs text-slate-700 dark:text-slate-300">{tool.shortDescription}</p>
                </div>
                <span className="rounded bg-brand-blue-100 px-2 py-0.5 text-[10px] font-bold text-brand-blue-800 dark:bg-brand-blue-950/60 dark:text-brand-blue-300">
                  {tool.category}
                </span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};