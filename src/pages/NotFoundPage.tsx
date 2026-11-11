import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, ArrowLeft, Home, Search } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-16 text-center">
      <div className="max-w-md">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-blue-50 text-brand-blue-600 mb-6 dark:bg-brand-blue-950/40">
          <Layers className="h-8 w-8" />
        </div>
        <div className="text-5xl font-black text-slate-900 dark:text-white tracking-tight">404</div>
        <h1 className="mt-2 text-xl font-bold text-slate-800 dark:text-slate-200">Tool or Page Not Found</h1>
        <p className="mt-2 text-xs text-slate-500 leading-relaxed">
          The requested utility or URL could not be found. It may have moved or the link might be mistyped.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl bg-brand-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-brand-blue-700"
          >
            <Home className="h-4 w-4" /> Explore 89+ Tools
          </Link>
        </div>
      </div>
    </div>
  );
};