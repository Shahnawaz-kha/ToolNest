import React, { useState } from 'react';

export const PercentageCalculator: React.FC = () => {
  const [p, setP] = useState<number>(20);
  const [total, setTotal] = useState<number>(150);
  const result = ((p / 100) * total).toFixed(2);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <span>What is</span>
        <input type="number" value={p} onChange={(e) => setP(parseFloat(e.target.value)||0)} className="w-20 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent p-2 text-center font-bold dark:text-white" />
        <span>% of</span>
        <input type="number" value={total} onChange={(e) => setTotal(parseFloat(e.target.value)||0)} className="w-28 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent p-2 text-center font-bold dark:text-white" />
        <span>=</span>
        <span className="font-extrabold text-xl text-brand-blue-600">{result}</span>
      </div>
    </div>
  );
};

export const UnitConverter: React.FC = () => {
  const [val, setVal] = useState<number>(10);
  const [type, setType] = useState<'km-mi'|'c-f'|'kg-lb'>('km-mi');

  let res = '';
  if (type === 'km-mi') res = `${(val * 0.621371).toFixed(2)} Miles`;
  if (type === 'c-f') res = `${((val * 9/5) + 32).toFixed(2)} °F`;
  if (type === 'kg-lb') res = `${(val * 2.20462).toFixed(2)} Pounds`;

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button onClick={() => setType('km-mi')} className={'px-3 py-1.5 rounded-lg text-xs font-semibold ' + (type === 'km-mi' ? 'bg-brand-blue-600 text-white':'bg-slate-100 dark:bg-slate-800')}>Km to Miles</button>
        <button onClick={() => setType('c-f')} className={'px-3 py-1.5 rounded-lg text-xs font-semibold ' + (type === 'c-f' ? 'bg-brand-blue-600 text-white':'bg-slate-100 dark:bg-slate-800')}>Celsius to °F</button>
        <button onClick={() => setType('kg-lb')} className={'px-3 py-1.5 rounded-lg text-xs font-semibold ' + (type === 'kg-lb' ? 'bg-brand-blue-600 text-white':'bg-slate-100 dark:bg-slate-800')}>Kg to Pounds</button>
      </div>
      <div className="flex items-center gap-3">
        <input type="number" value={val} onChange={(e) => setVal(parseFloat(e.target.value)||0)} className="w-32 rounded-lg border border-slate-200 dark:border-slate-800 bg-transparent p-2 font-bold dark:text-white" />
        <span className="text-lg">→</span>
        <div className="font-black text-xl text-brand-purple-600">{res}</div>
      </div>
    </div>
  );
};

export const LoanCalculator: React.FC = () => {
  const [amount, setAmount] = useState(200000);
  const [rate, setRate] = useState(6.5);
  const [years, setYears] = useState(30);

  const r = (rate / 100) / 12;
  const n = years * 12;
  const emi = (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalPayable = emi * n;
  const totalInterest = totalPayable - amount;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="text-[11px] text-slate-500 font-semibold uppercase">Loan Amount ($)</label>
          <input type="number" value={amount} onChange={(e) => setAmount(parseFloat(e.target.value)||0)} className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-transparent p-2 font-bold dark:text-white" />
        </div>
        <div>
          <label className="text-[11px] text-slate-500 font-semibold uppercase">Interest Rate (%)</label>
          <input type="number" step="0.1" value={rate} onChange={(e) => setRate(parseFloat(e.target.value)||0)} className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-transparent p-2 font-bold dark:text-white" />
        </div>
        <div>
          <label className="text-[11px] text-slate-500 font-semibold uppercase">Term (Years)</label>
          <input type="number" value={years} onChange={(e) => setYears(parseFloat(e.target.value)||0)} className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-transparent p-2 font-bold dark:text-white" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 pt-2">
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
          <div className="text-xs text-slate-500">Monthly Payment (EMI)</div>
          <div className="text-2xl font-black text-brand-blue-600">${isNaN(emi) ? '0' : emi.toFixed(2)}</div>
        </div>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
          <div className="text-xs text-slate-500">Total Interest</div>
          <div className="text-2xl font-black text-brand-purple-600">${isNaN(totalInterest) ? '0' : totalInterest.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
};