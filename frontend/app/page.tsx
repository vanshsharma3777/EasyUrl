'use client';

import { Header } from '@/components/Header';
import { UrlShortenerCard } from '@/components/UrlShortenerCard';
import { FeatureGrid } from '@/components/FeatureGrid';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/Hero';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-600/15 rounded-full blur-[128px]" />
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-[128px]" />
      </div>

      <Header />

      <main className="relative z-10 max-w-4xl mx-auto px-6 pt-20 pb-16 flex-1 flex flex-col justify-center w-full">
        <HeroSection />
        <UrlShortenerCard />
        <FeatureGrid />
      </main>

      <Footer />
    </div>
  );
}