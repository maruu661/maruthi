import React from 'react';
import { useApp } from '../../context/AppContext';
import { WifiOff, Sparkles } from 'lucide-react';

export const OfflineBanner: React.FC = () => {
  const { isOffline, language } = useApp();

  return (
    <div className="w-full bg-slate-900 text-slate-100 text-xs py-1.5 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 font-semibold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full text-[11px] border border-amber-400/20">
            <Sparkles className="w-3 h-3" />
            Hackathon Pilot
          </span>
          <span className="hidden sm:inline text-slate-300">
            {language === 'kn' 
              ? 'ತುಮಕೂರು ಸ್ಮಾರ್ಟ್ ಸಿಟಿ & ಪ್ರವಾಸೋದ್ಯಮ ಪಿಡಬ್ಲ್ಯೂಎ — ಡೆಮೊ ಆವೃತ್ತಿ'
              : 'Tumakuru Smart City & Tourism PWA — Demo Simulation Mode'}
          </span>
        </div>

        {isOffline ? (
          <div className="flex items-center gap-1.5 text-amber-300 font-medium animate-pulse">
            <WifiOff className="w-3.5 h-3.5" />
            <span>{language === 'kn' ? 'ಆಫ್‌ಲೈನ್ ಮೋಡ್ (ಸಂಗ್ರಹಿತ ಮಾಹಿತಿ)' : 'Offline Mode (Cached Data Active)'}</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-slate-400">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-[11px] font-medium text-emerald-400">PWA Active</span>
          </div>
        )}
      </div>
    </div>
  );
};

