'use client';

import React from 'react';
import { Zap, QrCode, ShieldCheck } from 'lucide-react';

export const FeatureGrid = () => {
  const features = [
    {
      icon: <Zap className="h-5 w-5 text-indigo-400" />,
      title: "Instant Redirection",
      description: "High-speed edge routing ensures minimal latency for your links.",
    },
    {
      icon: <QrCode className="h-5 w-5 text-indigo-400" />,
      title: "Auto QR Generation",
      description: "Every short URL comes paired with a high-res printable QR code.",
    },
    {
      icon: <ShieldCheck className="h-5 w-5 text-indigo-400" />,
      title: "Secure & Reliable",
      description: "All links pass through automated threat detection checks.",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12" id="features">
      {features.map((feature, idx) => (
        <div key={idx} className="p-4 rounded-xl bg-slate-900/30 border border-slate-800/60 space-y-2">
          {feature.icon}
          <h3 className="text-sm font-semibold text-slate-200">{feature.title}</h3>
          <p className="text-xs text-slate-400">{feature.description}</p>
        </div>
      ))}
    </div>
  );
};