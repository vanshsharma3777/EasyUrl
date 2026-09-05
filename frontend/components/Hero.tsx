'use client';



export const HeroSection = () => {
  return (
    <div className="text-center space-y-4 mb-10">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
        Fast, Secure & Tracking Included
      </div>
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
        Shorten URLs in Seconds.
      </h1>
      <p className="text-slate-400 text-base md:text-lg max-w-xl mx-auto font-normal">
        Transform long, clunky web addresses into sleek, shareable links and QR codes instantly.
      </p>
    </div>
  );
};