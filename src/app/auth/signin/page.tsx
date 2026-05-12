'use client';

import { signIn } from 'next-auth/react';
import { Apple } from 'lucide-react';

export default function SignInPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-65px)] px-6">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold tracking-tighter mb-2">Join DRIP</h1>
          <p className="text-gray-500">Sign in to sync your wardrobe and get personalized style advice.</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => signIn('google', { callbackUrl: '/' })}
            className="flex items-center justify-center gap-3 w-full border border-gray-200 dark:border-gray-700 py-3.5 rounded-2xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
          >
            <span>Continue with Google</span>
          </button>

          <button
            onClick={() => signIn('apple', { callbackUrl: '/' })}
            className="flex items-center justify-center gap-3 w-full bg-black dark:bg-white text-white dark:text-black py-3.5 rounded-2xl font-semibold hover:opacity-80 transition-all"
          >
            <Apple size={20} />
            <span>Continue with Apple</span>
          </button>
        </div>

        <p className="text-[10px] text-center text-gray-400 mt-8 uppercase tracking-widest leading-relaxed">
          By continuing, you agree to DRIP&apos;s Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
