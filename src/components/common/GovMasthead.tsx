import React, { useState, useEffect } from 'react';
import { GovEmblem } from './GovEmblem';
import { PhoneCall, Eye, Volume2, Globe, Clock, ShieldCheck } from 'lucide-react';

interface GovMastheadProps {
  variant?: 'light' | 'dark' | 'compact';
  className?: string;
}

export const GovMasthead: React.FC<GovMastheadProps> = ({
  variant = 'dark',
  className = ''
}) => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<string>('');
  const [fontSizeScale, setFontSizeScale] = useState<'normal' | 'large' | 'larger'>('normal');
  const [language, setLanguage] = useState<'EN' | 'HI'>('EN');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-IN', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        }) + ' IST'
      );
      setCurrentDate(
        now.toLocaleDateString('en-IN', {
          weekday: 'short',
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        })
      );
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleFontChange = (scale: 'normal' | 'large' | 'larger') => {
    setFontSizeScale(scale);
    const root = document.documentElement;
    if (scale === 'large') {
      root.style.fontSize = '105%';
    } else if (scale === 'larger') {
      root.style.fontSize = '110%';
    } else {
      root.style.fontSize = '100%';
    }
  };

  const isDark = variant === 'dark';

  return (
    <div className={`w-full select-none ${className}`}>
      {/* Official Saffron-White-Green Tricolor Ribbon */}
      <div className="tiranga-strip" />

      {/* Main Government Bar */}
      <div
        className={`px-3 sm:px-4 lg:px-6 py-1.5 border-b text-xs transition-colors ${
          isDark
            ? 'bg-slate-950 text-slate-300 border-slate-800'
            : 'bg-slate-100 text-slate-700 border-slate-200'
        }`}
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          
          {/* Left: Official Government of India & Ministry Titles */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <GovEmblem size="sm" variant={isDark ? 'gold' : 'navy'} className="shrink-0" />
            <div className="leading-tight">
              <div className="flex items-center gap-1.5 flex-wrap text-[11px] sm:text-xs">
                <span className={`font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {language === 'HI' ? 'भारत सरकार' : 'GOVERNMENT OF INDIA'}
                </span>
                <span className="text-slate-500">•</span>
                <span className={`font-semibold ${isDark ? 'text-amber-400' : 'text-blue-900'}`}>
                  {language === 'HI' ? 'रेल मंत्रालय' : 'MINISTRY OF RAILWAYS'}
                </span>
                <span className="hidden md:inline text-slate-500">•</span>
                <span className="hidden md:inline text-[10px] font-mono text-slate-400">
                  CRIS / Indian Railways
                </span>
              </div>
            </div>
          </div>

          {/* Right: GIGW Accessibility & Telemetry Bar */}
          <div className="flex items-center gap-2 sm:gap-3 text-[11px] shrink-0">
            
            {/* Live 24-hr Railway IST Clock */}
            <div className="hidden sm:flex items-center gap-1.5 font-mono text-[10px] px-2 py-0.5 rounded bg-slate-800/60 border border-slate-700/60 text-slate-300">
              <Clock className="w-3 h-3 text-amber-400" />
              <span>{currentTime}</span>
              <span className="text-slate-500">|</span>
              <span className="text-slate-400">{currentDate}</span>
            </div>

            {/* Indian Railways Helpline 139 badge */}
            <div className="hidden lg:flex items-center gap-1 text-[10px] font-bold text-amber-400 bg-amber-950/40 border border-amber-500/30 px-2 py-0.5 rounded">
              <PhoneCall className="w-3 h-3 text-amber-400" />
              <span>RailMadad: 139</span>
            </div>

            {/* Accessibility Font Size Controls (GIGW Compliant) */}
            <div className="flex items-center border border-slate-700 rounded overflow-hidden text-[10px] font-mono">
              <button
                onClick={() => handleFontChange('normal')}
                title="Default font size"
                className={`px-1.5 py-0.5 hover:bg-slate-800 transition-colors ${
                  fontSizeScale === 'normal' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400'
                }`}
              >
                A-
              </button>
              <button
                onClick={() => handleFontChange('large')}
                title="Larger font size"
                className={`px-1.5 py-0.5 border-x border-slate-700 hover:bg-slate-800 transition-colors ${
                  fontSizeScale === 'large' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400'
                }`}
              >
                A
              </button>
              <button
                onClick={() => handleFontChange('larger')}
                title="Largest font size"
                className={`px-1.5 py-0.5 hover:bg-slate-800 transition-colors ${
                  fontSizeScale === 'larger' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400'
                }`}
              >
                A+
              </button>
            </div>

            {/* Bilingual Switcher (English / हिन्दी) */}
            <button
              onClick={() => setLanguage(l => l === 'EN' ? 'HI' : 'EN')}
              className="flex items-center gap-1 px-2 py-0.5 rounded border border-slate-700 hover:border-slate-500 text-[10px] font-bold text-slate-300 transition-colors"
              title="Toggle Hindi / English"
            >
              <Globe className="w-3 h-3 text-sky-400" />
              <span>{language === 'EN' ? 'हिन्दी' : 'English'}</span>
            </button>

            {/* Security Clearance Tag */}
            <span className="hidden xl:inline-flex items-center gap-1 text-[9px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-1.5 py-0.5 rounded">
              <ShieldCheck className="w-2.5 h-2.5" />
              NIC-CERT SECURE
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
