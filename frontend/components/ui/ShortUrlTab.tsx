'use client';

import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface ShortUrlTabProps {
  shortUrl: string;
}

export const ShortUrlTab: React.FC<ShortUrlTabProps> = ({ shortUrl }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-3 p-3 bg-slate-950/60 rounded-xl border border-slate-800">
      <span className="font-mono text-indigo-300 text-base flex-1 truncate px-2 w-full sm:w-auto">
        {shortUrl}
      </span>
      <button
        onClick={handleCopy}
        className="w-full sm:w-auto px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 border border-slate-700 transition-colors cursor-pointer"
      >
        {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
        {copied ? 'Copied!' : 'Copy Link'}
      </button>
    </div>
  );
};