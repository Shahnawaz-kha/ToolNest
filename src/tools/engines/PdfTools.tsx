import React, { useState } from 'react';

export const TextToPdf: React.FC = () => {
  const [text, setText] = useState('ToolNest Document\n\nGenerated completely client-side in your browser.');
  const [title, setTitle] = useState('My Document');

  const generatePdf = () => {
    const printWindow = window.open('', '', 'width=800,height=600');
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>${title}</title>
          <style>
            body { font-family: sans-serif; padding: 40px; line-height: 1.6; }
            h1 { color: #1e293b; border-bottom: 2px solid #3b82f6; padding-bottom: 8px; }
            pre { white-space: pre-wrap; font-family: inherit; }
          </style>
        </head>
        <body>
          <h1>${title}</h1>
          <pre>${text}</pre>
          <script>
            window.onload = function() { window.print(); window.close(); }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="space-y-4">
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Document Title" className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent p-3 text-sm font-bold dark:text-white" />
      <textarea rows={8} value={text} onChange={(e) => setText(e.target.value)} placeholder="Type document body here..." className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent p-3 text-sm dark:text-white" />
      <button onClick={generatePdf} className="rounded-xl bg-brand-blue-600 px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-brand-blue-700">Print / Save as PDF</button>
    </div>
  );
};

export const ImageToPdf: React.FC = () => {
  const [imgUrl, setImgUrl] = useState<string | null>(null);

  const printImageAsPdf = () => {
    if (!imgUrl) return;
    const win = window.open('', '', 'width=800,height=900');
    if (!win) return;
    win.document.write(`
      <html>
        <head><title>Print Image PDF</title><style>body { margin:0; display:flex; justify-content:center; align-items:center; height:100vh; } img { max-width:100%; max-height:100%; }</style></head>
        <body>
          <img src="${imgUrl}" />
          <script>window.onload = () => { window.print(); window.close(); }</script>
        </body>
      </html>
    `);
    win.document.close();
  };

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
          <img src={imgUrl} alt="Preview" className="max-h-60 mx-auto rounded border" />
          <button onClick={printImageAsPdf} className="w-full rounded-xl bg-brand-purple-600 py-2.5 text-xs font-bold text-white shadow">Convert & Save as PDF</button>
        </div>
      )}
    </div>
  );
};

export const PdfWatermarker: React.FC = () => {
  const [watermark, setWatermark] = useState('CONFIDENTIAL');
  return (
    <div className="space-y-4">
      <input type="text" value={watermark} onChange={(e) => setWatermark(e.target.value)} placeholder="Watermark Stamp Text" className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent p-3 text-sm font-bold dark:text-white" />
      <div className="relative h-48 border border-dashed rounded-xl flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-900/40">
        <div className="text-4xl font-black text-rose-500/20 rotate-[-25deg] select-none uppercase tracking-widest">{watermark}</div>
        <div className="absolute inset-0 flex items-center justify-center text-xs text-slate-400">PDF Preview Canvas Stamp</div>
      </div>
    </div>
  );
};