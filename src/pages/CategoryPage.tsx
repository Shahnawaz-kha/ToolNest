import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CATEGORIES } from '../data/categories';
import { TOOLS } from '../data/tools';
import { ToolCard } from '../components/ui/ToolCard';

export const CategoryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const category = CATEGORIES.find((c) => c.id === id);
  const tools = TOOLS.filter((t) => t.category === id);

  if (!category) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-xl font-bold">Category not found</h2>
        <Link to="/" className="text-brand-blue-600 underline mt-4 inline-block">Return Home</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">{category.name}</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{category.description}</p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {tools.map((t) => (
          <ToolCard key={t.id} tool={t} />
        ))}
      </div>
    </div>
  );
};