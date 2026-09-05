'use client';

import React from 'react';
import { Link2, ArrowLeft, History } from 'lucide-react';
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { useRouter, usePathname } from 'next/navigation';

export const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isHomePage = pathname === '/';
  const isFeaturesPage = pathname === '/features';
  const isRecentUrlsPage = pathname === '/recent-urls';

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/vanshsharma3777',
      icon: <FaGithub size={18} />,
      hoverBg: 'hover:bg-slate-700/60 hover:text-white hover:border-slate-500/40',
    },
    {
      name: 'X',
      url: 'https://x.com/itz_sharmaji001',
      icon: <FaXTwitter size={18} />,
      hoverBg: 'hover:bg-slate-700/60 hover:text-white hover:border-slate-500/40',
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/vansh-sharma-812199316/',
      icon: <FaLinkedin size={18} />,
      hoverBg: 'hover:bg-slate-700/60 hover:text-white hover:border-slate-500/40',
    },
  ];

  return (
    <header className="relative z-10 border-b border-slate-800/60 backdrop-blur-md px-6 py-4 flex items-center justify-between max-w-7xl mx-auto w-full">
      {/* Brand Logo */}
      <div 
        onClick={() => router.push('/')} 
        className="flex items-center gap-2 font-bold text-xl tracking-tight text-white cursor-pointer select-none"
      >
        <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-blue-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <Link2 className="h-5 w-5 text-white" />
        </div>
        <span>Easy<span className="text-indigo-400">Url</span></span>
      </div>

      {/* Navigation & Actions */}
      <nav className="flex items-center gap-3">
        {/* Back Home Button (Shown on non-home pages) */}
        {!isHomePage && (
          <button 
            onClick={() => router.push('/')} 
            className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition-all border border-slate-800 hover:border-slate-700 flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Home
          </button>
        )}

        {/* Features Route Button */}
        <button 
          onClick={() => router.push('/features')} 
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all border cursor-pointer ${
            isFeaturesPage
              ? 'bg-indigo-600/20 text-indigo-300 border-indigo-500/40'
              : 'bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border-slate-800 hover:border-slate-700'
          }`}
        >
          Features
        </button>

        {/* Recent URLs Route Button */}
        <button 
          onClick={() => router.push('/recent-urls')} 
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all border flex items-center gap-1.5 cursor-pointer ${
            isRecentUrlsPage
              ? 'bg-indigo-600/20 text-indigo-300 border-indigo-500/40'
              : 'bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border-slate-800 hover:border-slate-700'
          }`}
        >
          <History className="h-3.5 w-3.5 text-indigo-400" />
          Recent URLs
        </button>

        {/* Vertical Divider */}
        <div className="h-5 w-[1px] bg-slate-800 mx-1 hidden sm:block" />

        {/* Social Connect Badge Bar */}
        <div className="hidden sm:flex items-center gap-1.5 bg-slate-950/80 p-1 rounded-xl border border-slate-800/80">
          {socialLinks.map((platform) => (
            <a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={platform.name}
              className={`p-2 rounded-lg text-slate-400 border border-transparent transition-all ${platform.hoverBg}`}
            >
              {platform.icon}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
};