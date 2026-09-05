'use client';

import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FeaturesHero } from '@/components/FeaturesHero';
import { FeatureList } from '@/components/FeatureList';
import { V2RoadmapCard } from '@/components/V2RoadmapCard';

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-600/15 rounded-full blur-[128px]" />
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-[128px]" />
      </div>

      <Header />

      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-16 pb-20 flex-1 w-full">
        <FeaturesHero />
        <FeatureList />
        <V2RoadmapCard />
      </main>

      <Footer />
    </div>
  );
}