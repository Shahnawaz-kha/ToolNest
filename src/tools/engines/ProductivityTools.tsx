import React, { useState, useEffect } from 'react';

export const PomodoroTimer: React.FC = () => {
  const [seconds, setSeconds] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (isActive && seconds > 0) {
      interval = setInterval(() => setSeconds((s) => s - 1), 1000);
    } else if (seconds === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return (
    <div className="text-center space-y-4 py-4">
      <div className="text-6xl font-black tracking-tight text-slate-900 dark:text-white font-mono">
        {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
      </div>
      <div className="flex justify-center gap-3">
        <button onClick={() => setIsActive(!isActive)} className="rounded-xl bg-brand-blue-600 px-6 py-2.5 text-sm font-bold text-white shadow-md hover:bg-brand-blue-700">
          {isActive ? 'Pause' : 'Start Focus Session'}
        </button>
        <button onClick={() => { setIsActive(false); setSeconds(25 * 60); }} className="rounded-xl border border-slate-200 dark:border-slate-800 px-4 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-300">
          Reset
        </button>
      </div>
    </div>
  );
};

export const Stopwatch: React.FC = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let timer: any;
    if (running) {
      timer = setInterval(() => setTime((t) => t + 10), 10);
    }
    return () => clearInterval(timer);
  }, [running]);

  return (
    <div className="text-center space-y-4 py-4">
      <div className="text-5xl font-black font-mono text-brand-purple-600">
        {(time / 1000).toFixed(2)}s
      </div>
      <div className="flex justify-center gap-2">
        <button onClick={() => setRunning(!running)} className="rounded-lg bg-brand-purple-600 px-5 py-2 text-xs font-bold text-white">
          {running ? 'Stop' : 'Start'}
        </button>
        <button onClick={() => { setRunning(false); setTime(0); }} className="rounded-lg bg-slate-100 dark:bg-slate-800 px-4 py-2 text-xs font-semibold">
          Reset
        </button>
      </div>
    </div>
  );
};