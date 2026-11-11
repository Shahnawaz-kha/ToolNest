import React from 'react';

interface AdBannerProps {
  slot?: string;
  format?: 'auto' | 'rectangle' | 'horizontal';
  className?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({
  slot = '0000000000',
  format = 'auto',
  className = '',
}) => {
  const isProduction = Boolean((import.meta as any).env?.PROD);

  return (
    <div className={`my-8 overflow-hidden rounded-2xl border border-slate-300 bg-slate-100/60 p-4 text-center dark:border-slate-700 dark:bg-slate-900/60 ${className}`}>
      <div className="mb-1 text-[11px] font-bold uppercase tracking-widest text-slate-700 dark:text-slate-300">
        Advertisement
      </div>
      {isProduction ? (
        <ins
          className="adsbygoogle block"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      ) : (
        <div className="flex min-h-[90px] items-center justify-center rounded-xl border border-dashed border-slate-400 dark:border-slate-600 bg-white/70 dark:bg-slate-800/60 p-6 text-xs font-semibold text-slate-700 dark:text-slate-200">
          Google AdSense Placement Area (Auto-renders in production)
        </div>
      )}
    </div>
  );
};