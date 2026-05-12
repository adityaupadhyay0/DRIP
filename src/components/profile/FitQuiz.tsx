'use client';

import { useState } from 'react';
import { Ruler, ChevronRight, ChevronLeft, CheckCircle2 } from 'lucide-react';

const STEPS = ['Shape', 'Measurements', 'Preferences'];

export default function FitQuiz() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    shape: '',
    chest: '',
    waist: '',
    hips: '',
    fit: 'Regular'
  });

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  if (step === 3) {
    return (
      <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-[2.5rem] p-8 md:p-12 shadow-2xl text-center">
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={40} />
        </div>
        <h4 className="text-2xl font-bold mb-2">Profile Updated!</h4>
        <p className="text-gray-500 mb-8">Your search results will now be optimized for your body type and fit preferences.</p>
        <button
          onClick={() => setStep(0)}
          className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-2xl font-bold"
        >
          Redo Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-[2.5rem] p-8 md:p-12 shadow-2xl flex flex-col min-h-[500px]">
      <div className="flex items-center gap-3 mb-8">
        <Ruler className="text-gray-400" size={24} />
        <div>
          <h3 className="text-2xl font-extrabold tracking-tighter">Personalize Your Fit</h3>
          <p className="text-sm text-gray-500">Step {step + 1} of {STEPS.length}: {STEPS[step]}</p>
        </div>
      </div>

      <div className="flex-grow">
        {step === 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {['Athletic', 'Hourglass', 'Pear', 'Apple', 'Straight', 'Slim'].map(shape => (
              <button
                key={shape}
                onClick={() => setData({ ...data, shape })}
                className={`p-6 rounded-3xl border-2 transition-all text-center font-bold ${
                  data.shape === shape
                  ? 'border-black dark:border-white bg-black dark:bg-white text-white dark:text-black'
                  : 'border-gray-100 dark:border-gray-900 hover:border-gray-300'
                }`}
              >
                {shape}
              </button>
            ))}
          </div>
        )}

        {step === 1 && (
          <div className="space-y-6 max-w-md mx-auto">
            {(['chest', 'waist', 'hips'] as const).map((field) => (
              <div key={field}>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">{field} (cm)</label>
                <input
                  type="number"
                  placeholder="--"
                  className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all text-xl font-bold"
                  value={data[field]}
                  onChange={(e) => setData({ ...data, [field]: e.target.value })}
                />
              </div>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-4">
            {['Oversized', 'Relaxed', 'Regular', 'Slim', 'Tailored'].map(fit => (
              <button
                key={fit}
                onClick={() => setData({ ...data, fit })}
                className={`p-5 rounded-2xl border transition-all flex items-center justify-between font-bold ${
                  data.fit === fit
                  ? 'border-black dark:border-white bg-gray-50 dark:bg-gray-900'
                  : 'border-gray-200 dark:border-gray-800'
                }`}
              >
                <span>{fit} Fit</span>
                {data.fit === fit && <CheckCircle2 size={20} />}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={prev}
          disabled={step === 0}
          className="flex items-center gap-2 px-6 py-3 rounded-full font-bold hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-0 transition-all"
        >
          <ChevronLeft size={20} /> Back
        </button>
        <button
          onClick={next}
          className="flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-8 py-3 rounded-full font-bold hover:opacity-80 transition-all shadow-lg"
        >
          {step === STEPS.length - 1 ? 'Finish' : 'Continue'} <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
