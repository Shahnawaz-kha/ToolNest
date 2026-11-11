import React, { useState } from 'react';

export const BmiCalculator: React.FC = () => {
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(175);
  const bmi = (weight / ((height / 100) ** 2)).toFixed(1);
  const val = parseFloat(bmi);
  let status = 'Normal weight';
  if (val < 18.5) status = 'Underweight';
  else if (val >= 25 && val < 30) status = 'Overweight';
  else if (val >= 30) status = 'Obese';

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-slate-500 block mb-1">Weight (kg)</label>
          <input type="number" value={weight} onChange={(e) => setWeight(parseFloat(e.target.value)||0)} className="w-full rounded-lg border p-2 text-sm font-bold dark:bg-slate-900 dark:border-slate-800 dark:text-white" />
        </div>
        <div>
          <label className="text-xs text-slate-500 block mb-1">Height (cm)</label>
          <input type="number" value={height} onChange={(e) => setHeight(parseFloat(e.target.value)||0)} className="w-full rounded-lg border p-2 text-sm font-bold dark:bg-slate-900 dark:border-slate-800 dark:text-white" />
        </div>
      </div>
      <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-900 text-center">
        <div className="text-3xl font-black text-brand-blue-600">{bmi}</div>
        <div className="text-xs font-semibold uppercase text-slate-500 mt-1">{status}</div>
      </div>
    </div>
  );
};

export const DiscountCalculator: React.FC = () => {
  const [price, setPrice] = useState(120);
  const [discount, setDiscount] = useState(25);
  const savings = (price * (discount / 100)).toFixed(2);
  const finalPrice = (price - parseFloat(savings)).toFixed(2);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-slate-500 block mb-1">Original Price ($)</label>
          <input type="number" value={price} onChange={(e) => setPrice(parseFloat(e.target.value)||0)} className="w-full rounded-lg border p-2 font-bold dark:bg-slate-900 dark:border-slate-800 dark:text-white" />
        </div>
        <div>
          <label className="text-xs text-slate-500 block mb-1">Discount (%)</label>
          <input type="number" value={discount} onChange={(e) => setDiscount(parseFloat(e.target.value)||0)} className="w-full rounded-lg border p-2 font-bold dark:bg-slate-900 dark:border-slate-800 dark:text-white" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 text-center">
        <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border dark:border-slate-800">
          <div className="text-xs text-slate-500">You Save</div>
          <div className="text-xl font-black text-emerald-600">${savings}</div>
        </div>
        <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border dark:border-slate-800">
          <div className="text-xs text-slate-500">Final Price</div>
          <div className="text-xl font-black text-brand-blue-600">${finalPrice}</div>
        </div>
      </div>
    </div>
  );
};

export const UnixTimestamp: React.FC = () => {
  const [now, setNow] = useState(Math.floor(Date.now() / 1000));
  React.useEffect(() => {
    const t = setInterval(() => setNow(Math.floor(Date.now() / 1000)), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="space-y-4 text-center">
      <div className="text-xs text-slate-500 uppercase font-semibold">Current Unix Epoch Time</div>
      <div className="text-4xl font-mono font-black text-brand-purple-600">{now}</div>
      <div className="text-xs text-slate-600 dark:text-slate-400 font-mono">{new Date(now * 1000).toUTCString()}</div>
      <button onClick={() => navigator.clipboard.writeText(now.toString())} className="rounded-lg bg-brand-purple-600 px-4 py-2 text-xs font-bold text-white">Copy Timestamp</button>
    </div>
  );
};

export const CoinFlipper: React.FC = () => {
  const [side, setSide] = useState<'HEADS' | 'TAILS'>('HEADS');
  const [flipping, setFlipping] = useState(false);

  const flip = () => {
    setFlipping(true);
    setTimeout(() => {
      setSide(Math.random() > 0.5 ? 'HEADS' : 'TAILS');
      setFlipping(false);
    }, 300);
  };

  return (
    <div className="text-center space-y-4 py-6">
      <div className={`inline-block w-24 h-24 rounded-full border-4 border-amber-400 bg-amber-200 dark:bg-amber-600 flex items-center justify-center font-black text-amber-900 dark:text-amber-100 text-lg transition-transform ${flipping ? 'scale-110 rotate-180' : ''}`}>
        {side}
      </div>
      <div>
        <button onClick={flip} className="rounded-xl bg-brand-blue-600 px-6 py-2.5 text-xs font-bold text-white shadow">Flip Coin</button>
      </div>
    </div>
  );
};