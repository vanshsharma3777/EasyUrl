'use client';

import React from 'react';
import { Zap, QrCode, Share2, ShieldCheck, Globe, RefreshCw } from 'lucide-react';

export const FeatureList = () => {
  const currentFeatures = [
    {
      icon: <Zap className="h-6 w-6 text-indigo-400" />,
      title: "Quick Redirection",
      description: "Engineered for high-speed edge routing to eliminate latency and route users to target destinations instantly.",
    },
    {
      icon: <QrCode className="h-6 w-6 text-indigo-400" />,
      title: "Automatic QR Code Generation",
      description: "Instantaneous visual QR code creation for every shortened URL, ready for high-resolution rendering and download.",
    },
    {
      icon: <Share2 className="h-6 w-6 text-indigo-400" />,
      title: "Automated Cross-App Sharing",
      description: "One-click distribution pipeline to effortlessly push both shortened links and QR codes directly to external platforms like WhatsApp and Twitter/X.",
    },
    {
      icon: <RefreshCw className="h-6 w-6 text-indigo-400" />,
      title: "Smart Deduplication & Loop Prevention",
      description: "Prevents already shortened links from being re-shortened while guaranteeing a single unique short URL per distinct original link.",
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-indigo-400" />,
      title: "Threat & Safety Screening",
      description: "Automated URL verification checks incoming links against malicious domain registries before saving them.",
    },
    {
      icon: <Globe className="h-6 w-6 text-indigo-400" />,
      title: "Developer REST API",
      description: "Clean JSON API endpoints at /v1/urls engineered for fast integrations into third-party services and client dashboards.",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
      {currentFeatures.map((feat, idx) => (
        <div 
          key={idx} 
          className="bg-slate-900/50 border border-slate-800 backdrop-blur-xl p-6 rounded-2xl space-y-3 transition-all hover:border-indigo-500/40 hover:bg-slate-900/80"
        >
          <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl w-fit">
            {feat.icon}
          </div>
          <h3 className="text-lg font-semibold text-white">{feat.title}</h3>
          <p className="text-sm text-slate-400 leading-relaxed">{feat.description}</p>
        </div>
      ))}
    </div>
  );
};