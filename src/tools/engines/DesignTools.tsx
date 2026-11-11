import React, { useState } from 'react';

export const ColorConverter: React.FC = () => {
  const [hex, setHex] = useState('#6366f1');

  const hexToRgb = (h: string) => {
    const r = parseInt(h.slice(1, 3), 16) || 0;
    const g = parseInt(h.slice(3, 5), 16) || 0;
    const b = parseInt(h.slice(5, 7), 16) || 0;
    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <input type="color" value={hex} onChange={(e) => setHex(e.target.value)} className="h-12 w-12 cursor-pointer rounded-lg border-0 bg-transparent" />
        <input type="text" value={hex} onChange={(e) => setHex(e.target.value)} className="rounded-lg border border-slate-200 dark:border-slate-800 bg-transparent p-2 font-mono text-sm dark:text-white" />
      </div>
      <div className="p-4 rounded-xl text-white font-semibold flex items-center justify-center h-20 rounded-xl" style={{ backgroundColor: hex }}>
        {hex}
      </div>
      <div className="p-3 bg-slate-100 dark:bg-slate-900 rounded-lg font-mono text-xs">
        {hexToRgb(hex)}
      </div>
    </div>
  );
};

export const BoxShadowGenerator: React.FC = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(10);
  const [blur, setBlur] = useState(25);
  const [spread, setSpread] = useState(-5);
  const [color, setColor] = useState('rgba(0, 0, 0, 0.1)');

  const css = `box-shadow: ${x}px ${y}px ${blur}px ${spread}px ${color};`;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 text-xs">
        <div>
          <label>Offset X: {x}px</label>
          <input type="range" min={-50} max={50} value={x} onChange={(e) => setX(parseInt(e.target.value))} className="w-full" />
        </div>
        <div>
          <label>Offset Y: {y}px</label>
          <input type="range" min={-50} max={50} value={y} onChange={(e) => setY(parseInt(e.target.value))} className="w-full" />
        </div>
        <div>
          <label>Blur: {blur}px</label>
          <input type="range" min={0} max={100} value={blur} onChange={(e) => setBlur(parseInt(e.target.value))} className="w-full" />
        </div>
        <div>
          <label>Spread: {spread}px</label>
          <input type="range" min={-30} max={50} value={spread} onChange={(e) => setSpread(parseInt(e.target.value))} className="w-full" />
        </div>
      </div>
      <div className="flex justify-center p-8 bg-slate-50 dark:bg-slate-950 rounded-xl">
        <div className="h-24 w-36 bg-white dark:bg-slate-800 rounded-xl" style={{ boxShadow: `${x}px ${y}px ${blur}px ${spread}px rgba(0,0,0,0.15)` }} />
      </div>
      <div className="flex justify-between items-center bg-slate-100 dark:bg-slate-900 p-3 rounded-lg font-mono text-xs dark:text-white">
        <code>{css}</code>
        <button onClick={() => navigator.clipboard.writeText(css)} className="text-brand-blue-600 text-xs font-bold">Copy CSS</button>
      </div>
    </div>
  );
};