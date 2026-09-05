'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';

export const FeaturesHero = () => {
  return (
    <div className="text-center space-y-4 mb-16">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
        Capabilities
      </div>
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
        Everything you need to link better.
      </h1>
      <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto font-normal">
        Explore the built-in tools powering EasyUrl, designed to keep your distribution smooth, trackable, and reliable.
      </p>
    </div>
  );
};