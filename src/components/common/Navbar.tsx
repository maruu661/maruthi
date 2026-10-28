import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PageView } from '../../types';
import { 
  Compass, 
  MapPin, 
  FileText, 
  Search, 
  Languages, 
  Menu, 
  X, 
  ShieldCheck, 
  UserCheck, 
  Building2, 
  Activity, 
  Layers, 
  Users,
  Flame,
  LayoutDashboard
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    language, 
    toggleLanguage, 
    currentPage, 
    setCurrentPage, 
    userRole, 
    setUserRole,
    universalSearchQuery,
    setUniversalSearchQuery
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  const navItems: Array<{ id: PageView; labelEn: string; labelKn: string; icon: React.ReactNode }> = [
    { id: 'home', labelEn: 'Home', labelKn: 'ಮುಖಪುಟ', icon: <Building2 className="w-4 h-4" /> },
    { id: 'explore', labelEn: 'Explore', labelKn: 'ಪ್ರವಾಸೋದ್ಯಮ', icon: <Compass className="w-4 h-4" /> },
    { id: 'map', labelEn: 'Smart Map', labelKn: 'ಸ್ಮಾರ್ಟ್ ನಕ್ಷೆ', icon: <MapPin className="w-4 h-4" /> },
    { id: 'facilities', labelEn: 'Facilities', labelKn: 'ಸೌಲಭ್ಯಗಳು', icon: <Layers className="w-4 h-4" /> },
    { id: 'report', labelEn: 'Report Issue', labelKn: 'ದೂರು ದಾಖಲಿಸಿ', icon: <FileText className="w-4 h-4" /> },
    { id: 'track', labelEn: 'Track', labelKn: 'ಟ್ರ್ಯಾಕ್', icon: <Activity className="w-4 h-4" /> },
    { id: 'nammafix', labelEn: 'NammaFix', labelKn: 'ನಮ್ಮಫಿಕ್ಸ್', icon: <Flame className="w-4 h-4" /> },
    { id: 'community', labelEn: 'Community', labelKn: 'ಸಮುದಾಯ', icon: <Users className="w-4 h-4" /> },
    { id: 'dashboard', labelEn: 'Dashboard', labelKn: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್', icon: <LayoutDashboard className="w-4 h-4" /> },
  ];

  const handleNavClick = (page: PageView) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (universalSearchQuery.trim()) {
      if (currentPage !== 'explore' && currentPage !== 'facilities') {
        setCurrentPage('explore');
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Brand Logo & Title */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer select-none group shrink-0"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-primary-700 via-primary-600 to-secondary-500 flex items-center justify-center text-white shadow-md shadow-primary-700/20 group-hover:scale-105 transition-transform">
              <span className="font-extrabold text-lg tracking-wider">NT</span>
            </div>
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-black text-lg sm:text-xl text-slate-900 tracking-tight">
                  Nama Tumukuru
                </span>
                <span className="text-xs sm:text-sm font-semibold text-secondary-600 font-sans">
                  ನಮ್ಮ ತುಮಕೂರು
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block tracking-wide">
                Your City. Your Voice. Your Journey.
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              const isHighlight = item.id === 'nammafix';
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs xl:text-sm font-medium transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-primary-50 text-primary-700 font-semibold shadow-xs'
                      : isHighlight
                      ? 'text-amber-700 hover:bg-amber-50 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  {item.icon}
                  <span>{language === 'kn' ? item.labelKn : item.labelEn}</span>
                  {isHighlight && (
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Search, Language & Role Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Inline search bar (Desktop) */}
            <form onSubmit={handleSearchSubmit} className="hidden md:flex relative items-center">
              <input
                type="text"
                placeholder={language === 'kn' ? 'ಹುಡುಕಿ...' : 'Search city or places...'}
                value={universalSearchQuery}
                onChange={(e) => setUniversalSearchQuery(e.target.value)}
                className="w-40 xl:w-56 pl-8 pr-3 py-1.5 text-xs rounded-full border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 pointer-events-none" />
            </form>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 shadow-2xs transition-colors"
              title="Toggle English / ಕನ್ನಡ"
            >
              <Languages className="w-3.5 h-3.5 text-secondary-600" />
              <span>{language === 'en' ? 'ಕನ್ನಡ' : 'English'}</span>
            </button>

            {/* Role Switcher (Admin / Citizen simulation) */}
            <button
              onClick={() => {
                const nextRole = userRole === 'citizen' ? 'admin' : 'citizen';
                setUserRole(nextRole);
                if (nextRole === 'admin') setCurrentPage('admin');
              }}
              className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                userRole === 'admin'
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                  : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
              }`}
              title="Toggle view between Citizen and City Officer (Demo Simulation)"
            >
              {userRole === 'admin' ? (
                <>
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>Admin Mode</span>
                </>
              ) : (
                <>
                  <UserCheck className="w-3.5 h-3.5 text-slate-500" />
                  <span>Citizen</span>
                </>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 lg:hidden focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 py-3 space-y-2 animate-fadeIn">
            {/* Mobile Search */}
            <form onSubmit={handleSearchSubmit} className="relative pb-2">
              <input
                type="text"
                placeholder={language === 'kn' ? 'ಹುಡುಕಿ...' : 'Search city, attractions, facilities...'}
                value={universalSearchQuery}
                onChange={(e) => setUniversalSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </form>

            <div className="grid grid-cols-2 gap-1.5 pt-1">
              {navItems.map((item) => {
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-medium text-left transition-colors ${
                      isActive
                        ? 'bg-primary-50 text-primary-700 font-semibold'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {item.icon}
                    <span>{language === 'kn' ? item.labelKn : item.labelEn}</span>
                  </button>
                );
              })}
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <button
                onClick={() => {
                  const nextRole = userRole === 'citizen' ? 'admin' : 'citizen';
                  setUserRole(nextRole);
                  if (nextRole === 'admin') setCurrentPage('admin');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-1.5 py-1 px-2 rounded-lg bg-slate-100 text-slate-800 font-semibold"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-primary-600" />
                <span>Switch to {userRole === 'citizen' ? 'Admin Portal' : 'Citizen View'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

