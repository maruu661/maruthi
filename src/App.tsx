import React from 'react';
import { useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { MobileBottomNav } from './components/common/MobileBottomNav';
import { Footer } from './components/common/Footer';
import { OfflineBanner } from './components/common/OfflineBanner';
import { ToastContainer } from './components/common/ToastContainer';

// Screens
import { HomePage } from './components/home/HomePage';
import { ExploreTumakuru } from './components/tourism/ExploreTumakuru';
import { InteractiveMap } from './components/map/InteractiveMap';
import { FacilityFinder } from './components/facilities/FacilityFinder';
import { CivicReportForm } from './components/reports/CivicReportForm';
import { ReportTracker } from './components/reports/ReportTracker';
import { NammaFixDiscovery } from './components/nammafix/NammaFixDiscovery';
import { CommunityHub } from './components/community/CommunityHub';
import { CitizenDashboard } from './components/dashboard/CitizenDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';

export const App: React.FC = () => {
  const { currentPage } = useApp();

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'explore':
        return <ExploreTumakuru />;
      case 'map':
        return <InteractiveMap />;
      case 'facilities':
        return <FacilityFinder />;
      case 'report':
        return <CivicReportForm />;
      case 'track':
        return <ReportTracker />;
      case 'nammafix':
        return <NammaFixDiscovery />;
      case 'community':
        return <CommunityHub />;
      case 'dashboard':
        return <CitizenDashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Top Banner (Hackathon pilot notice + offline indicator) */}
      <OfflineBanner />

      {/* Main Top Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      {/* Bottom Footer */}
      <Footer />

      {/* Fixed Mobile Bottom Navigation Bar (Hidden on desktop) */}
      <MobileBottomNav />

      {/* Floating Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

