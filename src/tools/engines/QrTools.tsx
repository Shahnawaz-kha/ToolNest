import React, { useState } from 'react';

export const QrGenerator: React.FC = () => {
  const [text, setText] = useState('https://toolnest.com');
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(text)}`;

  return (
    <div className="space-y-4 text-center sm:text-left">
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter URL or text..." className="w-full rounded-xl border border-slate-200 bg-transparent p-3 text-sm outline-none dark:border-slate-800 dark:text-white" />
      <div className="flex flex-col sm:flex-row items-center gap-6 pt-2">
        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
          <img src={qrUrl} alt="QR Code" className="h-44 w-44" />
        </div>
        <div className="space-y-2">
          <div className="text-xs text-slate-500">Live preview generated in real time.</div>
          <a href={qrUrl} download="qr-code.png" target="_blank" rel="noreferrer" className="inline-block rounded-lg bg-brand-blue-600 px-4 py-2 text-xs font-semibold text-white">
            Download PNG
          </a>
        </div>
      </div>
    </div>
  );
};

export const WifiQrGenerator: React.FC = () => {
  const [ssid, setSsid] = useState('');
  const [pass, setPass] = useState('');
  const wifiString = `WIFI:T:WPA;S:${ssid};P:${pass};;`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(wifiString)}`;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input type="text" value={ssid} onChange={(e) => setSsid(e.target.value)} placeholder="WiFi Network Name (SSID)" className="rounded-xl border border-slate-200 bg-transparent p-3 text-sm outline-none dark:border-slate-800 dark:text-white" />
        <input type="text" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="WiFi Password" className="rounded-xl border border-slate-200 bg-transparent p-3 text-sm outline-none dark:border-slate-800 dark:text-white" />
      </div>
      {ssid && (
        <div className="flex items-center gap-6 pt-3">
          <div className="bg-white p-3 rounded-xl border border-slate-200">
            <img src={qrUrl} alt="WiFi QR" className="h-40 w-40" />
          </div>
          <div className="text-xs text-slate-500">Scan with your phone camera to connect automatically.</div>
        </div>
      )}
    </div>
  );
};