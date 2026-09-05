'use client';

import React, { useState } from 'react';
import { Globe, ArrowRight, Link2, QrCode } from 'lucide-react';
import { shortenUrl } from '@/lib/api';
import { ShortUrlTab } from './ui/ShortUrlTab';
import { QrCodeTab } from './ui/QrCodeTab';

export const UrlShortenerCard = () => {
  const [inputUrl, setInputUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'url' | 'qr'>('url');
  const [result, setResult] = useState<{ shortUrl: string; OriginalUrl: string } | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputUrl) return;

    setLoading(true);
    setError('');

    try {
      const data = await shortenUrl(inputUrl);
      setResult({
        shortUrl: data.ShortUrl,
        OriginalUrl: data.OriginalUrl,
      });
    } catch (err: any) {
      // Fallback standard behavior if API fails or while testing
      setError("Internal Server Error.")
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900/60 border border-slate-800 backdrop-blur-xl p-4 md:p-6 rounded-2xl shadow-2xl space-y-6">
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
            <Globe className="h-5 w-5" />
          </div>
          <input
            type="url"
            required
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            placeholder="Paste your long URL here (e.g. https://example.com/very-long-link)"
            className="w-full pl-11 pr-4 py-3.5 bg-slate-950/80 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-mono text-sm"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-medium rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/25 transition-all shrink-0 cursor-pointer"
        >
          {loading ? (
            <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              Shorten URL
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </form>

      {error && <p className="text-rose-400 text-xs px-1">{error}</p>}

      {result && (
        <div className="pt-4 border-t border-slate-800/80 space-y-4">
          <div className="flex border-b border-slate-800">
            <button
              onClick={() => setActiveTab('url')}
              className={`pb-3 px-4 text-sm font-medium flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
                activeTab === 'url'
                  ? 'border-indigo-500 text-indigo-400'
                  : 'border-transparent text-slate-400 hover:text-slate-300'
              }`}
            >
              <Link2 className="h-4 w-4" /> Shortened Link
            </button>
            <button
              onClick={() => setActiveTab('qr')}
              className={`pb-3 px-4 text-sm font-medium flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
                activeTab === 'qr'
                  ? 'border-indigo-500 text-indigo-400'
                  : 'border-transparent text-slate-400 hover:text-slate-300'
              }`}
            >
              <QrCode className="h-4 w-4" /> QR Code
            </button>
          </div>

          {activeTab === 'url' ? (
            <ShortUrlTab shortUrl={result.shortUrl} />
          ) : (
            <QrCodeTab shortUrl={result.shortUrl} />
          )}
        </div>
      )}
    </div>
  );
};