'use client';

import React from 'react';
import { BarChart3, Clock, Rocket } from 'lucide-react';

export const V2RoadmapCard = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-indigo-950/40 via-slate-900/80 to-slate-900/40 border border-indigo-500/30 backdrop-blur-xl p-8 rounded-3xl space-y-6">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Rocket className="h-3.5 w-3.5" /> Roadmap v2.0
          </div>
          <div className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 text-xs font-mono font-medium flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" /> Coming Soon
          </div>
        </div>
      </div>

      <div className="space-y-3 max-w-2xl">
        <div className="flex items-center gap-3">
          <BarChart3 className="h-7 w-7 text-indigo-400 shrink-0" />
          <h2 className="text-2xl font-bold text-white">Click Analytics & Traffic Insights</h2>
        </div>
        <p className="text-slate-300 text-sm md:text-base leading-relaxed">
          Detailed metrics for your shortened URLs are on the way. You’ll soon be able to track total clicks, geographic locations, referrer sources, device breakdowns, and peak activity times right from a dedicated analytics dashboard.
        </p>
      </div>

      <div className="pt-2 flex flex-wrap gap-3 text-xs font-mono text-slate-400">
        <span className="px-3 py-1.5 rounded-lg bg-slate-950/80 border border-slate-800">📊 Real-Time Click Counts</span>
        <span className="px-3 py-1.5 rounded-lg bg-slate-950/80 border border-slate-800">🌍 Geo Distribution</span>
        <span className="px-3 py-1.5 rounded-lg bg-slate-950/80 border border-slate-800">💻 Device & Browser Specs</span>
      </div>
    </div>
  );
};