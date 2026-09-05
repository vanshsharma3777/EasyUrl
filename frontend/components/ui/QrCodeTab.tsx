'use client';

import React from 'react';
import { Send, Share2 } from 'lucide-react';

interface QrCodeTabProps {
  shortUrl: string;
  qrCode?: string;
}

export const QrCodeTab: React.FC<QrCodeTabProps> = ({ shortUrl, qrCode }) => {
  const shareText = encodeURIComponent(`Check out this shortened link: ${shortUrl}`);
  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${shareText}`;
  
  // Uses backend qrCode if provided, otherwise falls back to generating visually
  const qrSource = qrCode 
    ? qrCode 
    : `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(shortUrl)}`;

  const handleUniversalShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'EasyUrl Short Link',
          text: 'Check out this shortened link:',
          url: shortUrl,
        });
      } catch (err) {
        // Handle cancelation or failure silently
      }
    } else {
      navigator.clipboard.writeText(shortUrl);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6 p-4 bg-slate-950/60 rounded-xl border border-slate-800">
      <div className="bg-white p-2.5 rounded-lg shrink-0 shadow-md">
        <img
          src={qrSource}
          alt="Short URL QR Code"
          className="h-32 w-32 object-contain"
        />
      </div>
      <div className="flex-1 space-y-3 text-center sm:text-left w-full">
        <div>
          <h4 className="text-sm font-semibold text-white">Scan or Share QR Code</h4>
          <p className="text-xs text-slate-400">Instantly share your short link with friends and followers.</p>
        </div>
        <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
          <a
            href={whatsappShareUrl}
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-medium rounded-lg flex items-center gap-1.5 transition-colors"
          >
            <Send className="h-3.5 w-3.5" /> WhatsApp
          </a>

          <button
            onClick={handleUniversalShare}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Share2 className="h-3.5 w-3.5" /> Share Anywhere
          </button>
        </div>
      </div>
    </div>
  );
};