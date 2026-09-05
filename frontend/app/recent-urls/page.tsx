'use client';

import React, { useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { getRecentUrls, ShortenUrlResponse } from '@/lib/api';
import { Copy, Check, ExternalLink, Search, History, RefreshCw, Send, QrCode, Share2, X, PlusCircle, Link2, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function RecentUrlsPage() {
  const router = useRouter();
  const [urls, setUrls] = useState<ShortenUrlResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeQrUrl, setActiveQrUrl] = useState<{ url: string; qr?: string } | null>(null);

  const fetchUrls = async () => {
    setLoading(true);
    setError('');
    try {
      const response: any = await getRecentUrls();
      const urlData = Array.isArray(response) ? response : response?.urls || [];
      setUrls(urlData);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load URL history from server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  const handleCopy = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleUniversalShare = async (shortUrl: string) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'EasyUrl Short Link',
          text: 'Check out this shortened link:',
          url: shortUrl,
        });
      } catch (err) {
        // Share cancelled
      }
    } else {
      navigator.clipboard.writeText(shortUrl);
      alert('Link copied to clipboard!');
    }
  };

  const filteredUrls = (urls || []).filter(
    (item) =>
      item.OriginalUrl?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.ShortUrl?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white relative overflow-x-hidden">
      {/* Background Glow Decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-[128px]" />
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-blue-600/15 rounded-full blur-[128px]" />
        <div className="absolute -bottom-20 right-1/3 w-80 h-80 bg-purple-600/10 rounded-full blur-[128px]" />
      </div>

      <Header />

      <main className="relative z-10 max-w-5xl mx-auto px-6 pt-12 pb-20 flex-1 w-full">
        {/* Section Decorative Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-slate-800/80 pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-1">
               History Dashboard
            </div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-2.5 tracking-tight">
              <History className="h-7 w-7 text-indigo-400" /> Recent URLs
            </h1>
            <p className="text-slate-400 text-sm">
              View, copy, share, or generate QR codes for your shortened links on demand.
            </p>
          </div>

          <button
            onClick={fetchUrls}
            className="self-start md:self-auto px-4 py-2.5 bg-slate-900/90 hover:bg-slate-800/90 border border-slate-700/60 hover:border-indigo-500/40 rounded-xl text-xs font-semibold text-slate-200 flex items-center gap-2 transition-all shadow-lg hover:shadow-indigo-500/10 cursor-pointer backdrop-blur-md"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin text-indigo-400' : ''}`} /> Refresh
          </button>
        </div>

        {/* Search Bar with Focus Accent */}
        {urls.length > 0 && (
          <div className="relative mb-8 max-w-md group">
            <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
            <input
              type="text"
              placeholder="Search original or short URL..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-slate-900/70 border border-slate-800/90 focus:border-indigo-500/80 rounded-xl text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 backdrop-blur-xl transition-all shadow-inner"
            />
          </div>
        )}

        {/* Content Section */}
        {loading ? (
          <div className="py-20 text-center text-slate-500 text-sm flex flex-col items-center gap-3">
            <div className="h-8 w-8 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
            Fetching URLs from endpoint...
          </div>
        ) : error ? (
          <div className="py-12 text-center text-rose-400 text-sm bg-rose-500/10 rounded-2xl border border-rose-500/20 max-w-xl mx-auto shadow-lg backdrop-blur-md">
            {error}
          </div>
        ) : urls.length === 0 ? (
          /* Empty State View */
          <div className="relative overflow-hidden py-16 px-6 text-center bg-gradient-to-b from-slate-900/60 to-slate-950/80 border border-slate-800/80 backdrop-blur-xl rounded-3xl max-w-lg mx-auto space-y-5 shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-tr from-indigo-500/20 to-blue-500/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mx-auto shadow-lg shadow-indigo-500/10">
              <Link2 className="h-7 w-7" />
            </div>
            
            <div className="space-y-1.5">
              <h3 className="text-xl font-bold text-white tracking-tight">No short URL created yet</h3>
              <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                You haven't generated any short links yet. Create your first link to see it listed here along with its QR code.
              </p>
            </div>

            <button
              onClick={() => router.push('/')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-medium text-xs rounded-xl shadow-lg shadow-indigo-600/25 transition-all cursor-pointer transform hover:-translate-y-0.5"
            >
              <PlusCircle className="h-4 w-4" /> Create Short URL First
            </button>
          </div>
        ) : filteredUrls.length === 0 ? (
          <div className="py-12 text-center text-slate-500 text-sm bg-slate-900/40 border border-slate-800/60 rounded-2xl backdrop-blur-md">
            No matching links found for "{searchQuery}".
          </div>
        ) : (
          <div className="space-y-4">
            {filteredUrls.map((item) => {
              const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`Check out this link: ${item.ShortUrl}`)}`;

              return (
                <div
                  key={item.ID}
                  className="group relative bg-slate-900/60 border border-slate-800/80 hover:border-slate-700/90 backdrop-blur-xl p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all shadow-lg hover:shadow-indigo-500/5"
                >
                  {/* Subtle top card glow effect */}
                  <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-t-2xl" />

                  <div className="space-y-1 min-w-0 flex-1">
                    <a
                      href={item.ShortUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono text-sm font-semibold text-indigo-300 hover:text-indigo-200 inline-flex items-center gap-1.5 max-w-full truncate transition-colors"
                    >
                      <span className="truncate">{item.ShortUrl}</span>
                      <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-70 group-hover:opacity-100 transition-opacity" />
                    </a>
                    <p className="text-xs text-slate-500 truncate">{item.OriginalUrl}</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto shrink-0 justify-start sm:justify-end">
                    <button
                      onClick={() => handleCopy(item.ShortUrl, item.ID)}
                      className="px-3 py-1.5 bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700/80 flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                    >
                      {copiedId === item.ID ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-400" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" /> Copy
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => setActiveQrUrl({ url: item.ShortUrl, qr: item.QrCode })}
                      className="px-3 py-1.5 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-medium rounded-lg flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                    >
                      <QrCode className="h-3.5 w-3.5" /> View QR
                    </button>

                    <a
                      href={whatsappShareUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-2.5 py-1.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-medium rounded-lg flex items-center gap-1 transition-all shadow-sm"
                    >
                      <Send className="h-3 w-3" /> WhatsApp
                    </a>

                    <button
                      onClick={() => handleUniversalShare(item.ShortUrl)}
                      className="px-2.5 py-1.5 bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 border border-slate-700/80 text-xs font-medium rounded-lg flex items-center gap-1 transition-all cursor-pointer shadow-sm"
                    >
                      <Share2 className="h-3 w-3" /> Share
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* On-Demand QR Code Modal */}
        {activeQrUrl && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl relative animate-in fade-in zoom-in duration-150">
              <button
                onClick={() => setActiveQrUrl(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-1.5 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="text-center space-y-1">
                <h3 className="text-lg font-bold text-white tracking-tight">QR Code</h3>
                <p className="text-xs text-slate-400 truncate px-4">{activeQrUrl.url}</p>
              </div>

              <div className="bg-white p-4 rounded-2xl flex justify-center items-center shadow-inner border border-slate-200">
                <img
                  src={
                    activeQrUrl.qr
                      ? activeQrUrl.qr
                      : `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(activeQrUrl.url)}`
                  }
                  alt="Short URL QR Code"
                  className="h-48 w-48 object-contain"
                />
              </div>

              <button
                onClick={() => setActiveQrUrl(null)}
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}