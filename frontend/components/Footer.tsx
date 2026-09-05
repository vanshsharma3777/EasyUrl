'use client';

import React from 'react';

export const Footer = () => {
  return (
    <footer className="relative z-10 border-t border-slate-800/60 py-6 text-center text-xs text-slate-500">
      © {new Date().getFullYear()} EasyUrl. Designed for speed and simplicity.
    </footer>
  );
};