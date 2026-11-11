import React, { useState } from 'react';

export const PasswordGenerator: React.FC = () => {
  const [len, setLen] = useState(16);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [pwd, setPwd] = useState('');

  const generate = () => {
    let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (numbers) chars += '0123456789';
    if (symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.';
    let res = '';
    for (let i = 0; i < len; i++) {
      res += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPwd(res);
  };

  React.useEffect(() => { generate(); }, [len, numbers, symbols]);

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-900 font-mono text-lg font-bold text-brand-blue-600 break-all text-center">
        {pwd}
      </div>
      <div className="flex flex-wrap items-center gap-4 text-xs dark:text-white">
        <label>Length: {len}</label>
        <input type="range" min={8} max={40} value={len} onChange={(e) => setLen(parseInt(e.target.value))} />
        <label className="flex items-center gap-1 cursor-pointer">
          <input type="checkbox" checked={numbers} onChange={(e) => setNumbers(e.target.checked)} /> Numbers
        </label>
        <label className="flex items-center gap-1 cursor-pointer">
          <input type="checkbox" checked={symbols} onChange={(e) => setSymbols(e.target.checked)} /> Symbols
        </label>
      </div>
      <div className="flex gap-2">
        <button onClick={() => navigator.clipboard.writeText(pwd)} className="rounded-lg bg-brand-blue-600 px-4 py-2 text-xs font-semibold text-white">Copy Password</button>
        <button onClick={generate} className="rounded-lg bg-slate-100 dark:bg-slate-800 px-4 py-2 text-xs font-semibold dark:text-white">Regenerate</button>
      </div>
    </div>
  );
};

export const RandomDice: React.FC = () => {
  const [roll, setRoll] = useState(6);
  const [isRolling, setIsRolling] = useState(false);

  const rollDice = () => {
    setIsRolling(true);
    setTimeout(() => {
      setRoll(Math.floor(Math.random() * 6) + 1);
      setIsRolling(false);
    }, 200);
  };

  return (
    <div className="text-center space-y-4 py-6">
      <div className={`text-7xl transition-transform duration-200 ${isRolling ? 'scale-125 rotate-12' : ''}`}>
        {['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'][roll - 1]}
      </div>
      <button onClick={rollDice} className="rounded-xl bg-brand-purple-600 px-6 py-2.5 text-sm font-bold text-white shadow-md">
        Roll Dice
      </button>
    </div>
  );
};