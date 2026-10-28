import React from 'react';
import { useApp } from '../../context/AppContext';
import { Phone, Shield, ExternalLink, Heart, Compass, MapPin, AlertCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentPage, language } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-24 lg:pb-12 border-t border-slate-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          
          {/* Brand info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-600 to-secondary-500 flex items-center justify-center text-white font-extrabold text-lg shadow-sm">
                NT
              </div>
              <div>
                <span className="font-bold text-white text-base block">Nama Tumukuru</span>
                <span className="text-xs text-secondary-400 font-sans block">ನಮ್ಮ ತುಮಕೂರು</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {language === 'kn'
                ? 'ತುಮಕೂರು ನಗರ ಮತ್ತು ಜಿಲ್ಲೆಯ ಪ್ರವಾಸೋದ್ಯಮ, ಸಾರ್ವಜನಿಕ ಸೌಲಭ್ಯಗಳು ಮತ್ತು ಸ್ಮಾರ್ಟ್ ಸಿಟಿ ನಾಗರಿಕ ಸೇವೆಗಳ ಏಕೀಕೃತ ಡಿಜಿಟಲ್ ವೇದಿಕೆ.'
                : 'Tumakuru’s citizen-first digital portal combining smart-city civic reporting, public facility discovery, and destination exploration.'}
            </p>
            <div className="text-xs text-amber-400/90 font-medium flex items-center gap-1.5 bg-amber-400/10 p-2 rounded-lg border border-amber-400/20">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{language === 'kn' ? 'ಹ್ಯಾಕಥಾನ್ ಮಾದರಿ — ಡೆಮೊ ಆವೃತ್ತಿ' : 'Smart City Hackathon Prototype — Demo Data'}</span>
            </div>
          </div>

          {/* Quick Civic Navigation */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-3">
              {language === 'kn' ? 'ಸ್ಮಾರ್ಟ್ ಸೇವೆಗಳು' : 'Smart City Services'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => setCurrentPage('explore')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Compass className="w-3.5 h-3.5 text-secondary-400" />
                  <span>{language === 'kn' ? 'ಪ್ರವಾಸಿ ತಾಣಗಳ ಅನ್ವೇಷಣೆ' : 'Explore Tourist Destinations'}</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('facilities')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <MapPin className="w-3.5 h-3.5 text-primary-400" />
                  <span>{language === 'kn' ? 'ಸಾರ್ವಜನಿಕ ಸೌಲಭ್ಯ ಶೋಧಕ' : 'Public Facility Finder'}</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('report')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>{language === 'kn' ? 'ದೂರು ದಾಖಲಿಸಿ (NammaFix)' : 'Report Civic Issue'}</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('track')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>{language === 'kn' ? 'ದೂರು ಪರಿಶೀಲನೆ (Track)' : 'Track Report Timeline'}</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('community')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  <span>{language === 'kn' ? 'ಸಮುದಾಯ ಸಲಹೆಗಳು' : 'Community Announcements'}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Emergency & Municipal Helplines */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-3 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-rose-400" />
              <span>{language === 'kn' ? 'ತುರ್ತು ಸಂಪರ್ಕ ಸಂಖ್ಯೆಗಳು' : 'Tumakuru Helplines'}</span>
            </h4>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex justify-between items-center py-1 border-b border-slate-800">
                <span className="text-slate-400">Police Emergency:</span>
                <span className="font-semibold text-white">112 / 100</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-800">
                <span className="text-slate-400">Ambulance / Health:</span>
                <span className="font-semibold text-white">108</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-800">
                <span className="text-slate-400">District Hospital:</span>
                <span className="font-medium">0816-2278383</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-800">
                <span className="text-slate-400">KSRTC Inquiry:</span>
                <span className="font-medium">0816-2278244</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-400">BESCOM Helpline:</span>
                <span className="font-medium">1912</span>
              </div>
            </div>
          </div>

          {/* Prototype details */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-secondary-400" />
              <span>{language === 'kn' ? 'ಪಾರದರ್ಶಕತೆ & ಗೌಪ್ಯತೆ' : 'Civic Tech Standards'}</span>
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Designed according to open civic dashboard specifications with PWA offline-first caching, bilingual accessibility, and zero fabricated official claims.
            </p>
            <div className="pt-1">
              <button
                onClick={() => setCurrentPage('admin')}
                className="text-xs text-secondary-400 hover:text-secondary-300 font-semibold underline underline-offset-4 flex items-center gap-1"
              >
                <span>Authorized Civic Admin Portal</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© 2026 Nama Tumukuru (ನಮ್ಮ ತುಮಕೂರು). Built for Smart City Innovation Hackathon.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>for the citizens & visitors of Tumakuru</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
