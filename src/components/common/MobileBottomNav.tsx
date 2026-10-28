import React from 'react';
import { useApp } from '../../context/AppContext';
import { PageView } from '../../types';
import { Home, Compass, PlusCircle, Activity, LayoutDashboard, MapPin } from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const { currentPage, setCurrentPage, language } = useApp();

  const tabs: Array<{ id: PageView; labelEn: string; labelKn: string; icon: React.ReactNode; isPrimaryAction?: boolean }> = [
    { id: 'home', labelEn: 'Home', labelKn: 'ಮುಖಪುಟ', icon: <Home className="w-5 h-5" /> },
    { id: 'explore', labelEn: 'Explore', labelKn: 'ಪ್ರವಾಸ', icon: <Compass className="w-5 h-5" /> },
    { 
      id: 'report', 
      labelEn: 'Report', 
      labelKn: 'ದೂರು', 
      icon: <PlusCircle className="w-6 h-6 text-white" />,
      isPrimaryAction: true
    },
    { id: 'map', labelEn: 'Map', labelKn: 'ನಕ್ಷೆ', icon: <MapPin className="w-5 h-5" /> },
    { id: 'dashboard', labelEn: 'Portal', labelKn: 'ನನ್ನ ಖಾತೆ', icon: <LayoutDashboard className="w-5 h-5" /> },
  ];

  const handleTabClick = (page: PageView) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-lg lg:hidden pb-safe">
      <div className="grid grid-cols-5 items-center h-16 px-1">
        {tabs.map((tab) => {
          const isActive = currentPage === tab.id;

          if (tab.isPrimaryAction) {
            return (
              <div key={tab.id} className="flex justify-center -mt-5">
                <button
                  onClick={() => handleTabClick(tab.id)}
                  className="flex flex-col items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tr from-primary-700 to-secondary-500 shadow-md shadow-primary-700/30 transform active:scale-95 transition-transform"
                  aria-label="Report Civic Issue"
                >
                  {tab.icon}
                </button>
              </div>
            );
          }

          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`flex flex-col items-center justify-center py-1 transition-colors ${
                isActive ? 'text-primary-700 font-semibold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className="relative">
                {tab.icon}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary-600" />
                )}
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight truncate max-w-[56px]">
                {language === 'kn' ? tab.labelKn : tab.labelEn}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
