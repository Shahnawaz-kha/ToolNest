import React, { useState, useRef } from 'react';

export const ImageCompressor: React.FC = () => {
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [quality, setQuality] = useState(0.7);
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setOriginalSize(file.size);
    const reader = new FileReader();
    reader.onload = (ev) => {
      setImgUrl(ev.target?.result as string);
      compress(ev.target?.result as string, quality);
    };
    reader.readAsDataURL(file);
  };

  const compress = (dataUrl: string, q: number) => {
    const img = new Image();
    img.src = dataUrl;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0);
      const res = canvas.toDataURL('image/jpeg', q);
      setCompressedUrl(res);
      setCompressedSize(Math.round((res.length * 3) / 4));
    };
  };

  return (
    <div className="space-y-4">
      <input type="file" accept="image/*" onChange={handleUpload} className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-brand-blue-600 file:text-white file:font-semibold hover:file:bg-brand-blue-700" />
      {imgUrl && (
        <div className="space-y-4">
          <div className="flex items-center gap-4 text-xs dark:text-white">
            <label>Quality: {Math.round(quality * 100)}%</label>
            <input type="range" min={0.1} max={0.9} step={0.05} value={quality} onChange={(e) => {
              const q = parseFloat(e.target.value);
              setQuality(q);
              compress(imgUrl, q);
            }} className="flex-1" />
          </div>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-3 bg-slate-100 dark:bg-slate-900 rounded-lg">
              <div className="text-xs text-slate-500">Original</div>
              <div className="font-bold text-sm">{(originalSize / 1024).toFixed(1)} KB</div>
            </div>
            <div className="p-3 bg-slate-100 dark:bg-slate-900 rounded-lg">
              <div className="text-xs text-slate-500">Compressed</div>
              <div className="font-bold text-sm text-emerald-600">{(compressedSize / 1024).toFixed(1)} KB</div>
            </div>
          </div>
          {compressedUrl && (
            <div className="text-center">
              <a href={compressedUrl} download="compressed-toolnest.jpg" className="inline-block rounded-lg bg-emerald-600 px-6 py-2.5 text-xs font-bold text-white shadow">Download Compressed JPEG</a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export const ImageResizer: React.FC = () => {
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [resizedUrl, setResizedUrl] = useState<string | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const src = ev.target?.result as string;
      setImgUrl(src);
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setWidth(img.width);
        setHeight(img.height);
        renderResize(src, img.width, img.height);
      };
    };
    reader.readAsDataURL(file);
  };

  const renderResize = (src: string, w: number, h: number) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0, w, h);
      setResizedUrl(canvas.toDataURL('image/png'));
    };
  };

  return (
    <div className="space-y-4">
      <input type="file" accept="image/*" onChange={handleUpload} className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-brand-blue-600 file:text-white" />
      {imgUrl && (
        <div className="space-y-4">
          <div className="flex gap-4">
            <div>
              <label className="text-[11px] text-slate-500 block">Width (px)</label>
              <input type="number" value={width} onChange={(e) => {
                const w = parseInt(e.target.value) || 10;
                setWidth(w);
                renderResize(imgUrl, w, height);
              }} className="w-28 rounded-lg border p-2 text-xs dark:bg-slate-900 dark:border-slate-800 dark:text-white" />
            </div>
            <div>
              <label className="text-[11px] text-slate-500 block">Height (px)</label>
              <input type="number" value={height} onChange={(e) => {
                const h = parseInt(e.target.value) || 10;
                setHeight(h);
                renderResize(imgUrl, width, h);
              }} className="w-28 rounded-lg border p-2 text-xs dark:bg-slate-900 dark:border-slate-800 dark:text-white" />
            </div>
          </div>
          {resizedUrl && (
            <a href={resizedUrl} download={`resized-${width}x${height}.png`} className="inline-block rounded-lg bg-brand-blue-600 px-5 py-2 text-xs font-bold text-white">Download Resized Image</a>
          )}
        </div>
      )}
    </div>
  );
};

export const ImageFilters: React.FC = () => {
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [filter, setFilter] = useState<'grayscale' | 'invert' | 'sepia'>('grayscale');

  return (
    <div className="space-y-4">
      <input type="file" accept="image/*" onChange={(e) => {
        const file = e.target.files?.[0];
        if (file) {
          const r = new FileReader();
          r.onload = (ev) => setImgUrl(ev.target?.result as string);
          r.readAsDataURL(file);
        }
      }} className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-brand-purple-600 file:text-white" />
      {imgUrl && (
        <div className="space-y-4">
          <div className="flex gap-2">
            {(['grayscale', 'invert', 'sepia'] as const).map((f) => (
              <button key={f} onClick={() => setFilter(f)} className={`rounded-lg px-3 py-1.5 text-xs font-semibold capitalize ${filter === f ? 'bg-brand-purple-600 text-white' : 'bg-slate-100 dark:bg-slate-800 dark:text-white'}`}>{f}</button>
            ))}
          </div>
          <div className="flex justify-center p-4 bg-slate-100 dark:bg-slate-900 rounded-xl">
            <img src={imgUrl} alt="Preview" className="max-h-64 object-contain rounded" style={{ filter: filter === 'grayscale' ? 'grayscale(100%)' : filter === 'invert' ? 'invert(100%)' : 'sepia(100%)' }} />
          </div>
        </div>
      )}
    </div>
  );
};

export const ImageToBase64: React.FC = () => {
  const [base64, setBase64] = useState('');
  return (
    <div className="space-y-4">
      <input type="file" accept="image/*" onChange={(e) => {
        const file = e.target.files?.[0];
        if (file) {
          const r = new FileReader();
          r.onload = (ev) => setBase64(ev.target?.result as string);
          r.readAsDataURL(file);
        }
      }} className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-brand-blue-600 file:text-white" />
      {base64 && (
        <div className="space-y-2">
          <textarea readOnly rows={6} value={base64} className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-3 font-mono text-[11px] break-all dark:text-white" />
          <button onClick={() => navigator.clipboard.writeText(base64)} className="rounded-lg bg-brand-blue-600 px-4 py-2 text-xs font-bold text-white">Copy Base64 DataURI</button>
        </div>
      )}
    </div>
  );
};