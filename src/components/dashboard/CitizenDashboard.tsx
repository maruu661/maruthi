import React from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../common/StatusBadge';
import { 
  UserCheck, 
  Compass, 
  MapPin, 
  FileText, 
  Clock, 
  CheckCircle2, 
  Bookmark, 
  Sparkles, 
  AlertCircle, 
  ArrowRight, 
  Flame,
  Search,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export const CitizenDashboard: React.FC = () => {
  const { 
    reports, 
    destinations, 
    savedDestinationIds, 
    setCurrentPage, 
    setSelectedDestination,
    setSelectedReport,
    language 
  } = useApp();

  // Metrics
  const totalReports = reports.length;
  const inProgressReports = reports.filter((r) => r.status === 'In Progress' || r.status === 'Under Review').length;
  const resolvedReports = reports.filter((r) => r.status === 'Resolved').length;

  const savedDestinations = destinations.filter((d) => savedDestinationIds.includes(d.id));
  const recentReports = reports.slice(0, 3);
  const recommendedDestinations = destinations.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary-800 to-secondary-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-semibold backdrop-blur-xs border border-white/15">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Smart City Citizen Dashboard</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            {language === 'kn' ? 'ನಮಸ್ಕಾರ, ತುಮಕೂರು ನಾಗರಿಕರೇ!' : 'Namaskara, Citizen of Tumakuru!'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            Manage your civic reports, explore curated local travel spots, and track your active contributions to a cleaner, smarter city.
          </p>
        </div>

        {/* Quick CTA Buttons */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={() => setCurrentPage('report')}
            className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-sm transition-colors"
          >
            <FileText className="w-4 h-4" />
            <span>Report New Issue</span>
          </button>

          <button
            onClick={() => setCurrentPage('explore')}
            className="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-semibold text-xs border border-white/20 backdrop-blur-xs flex items-center gap-2 transition-colors"
          >
            <Compass className="w-4 h-4 text-secondary-300" />
            <span>Explore Destinations</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-card flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Total Reports Filed
            </span>
            <span className="text-3xl font-black text-slate-900">{totalReports}</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-primary-600 flex items-center justify-center">
            <FileText className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-card flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Active / Under Review
            </span>
            <span className="text-3xl font-black text-amber-600">{inProgressReports}</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-card flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Resolved & Verified
            </span>
            <span className="text-3xl font-black text-emerald-600">{resolvedReports}</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Two Column Layout: Recent Civic Activity (left) + Saved Destinations & Recommendations (right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Recent Civic Issues & NammaFix Alert (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* NammaFix Proximity Preview Card */}
          <div className="p-5 rounded-3xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 flex items-start justify-between gap-4">
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-200/50 px-2 py-0.5 rounded-md">
                <Flame className="w-3 h-3 text-amber-600" />
                NammaFix Live Proximity Watch
              </span>
              <h3 className="font-bold text-sm text-slate-900">
                Active Maintenance along Devarayanadurga & Amanikere Corridors
              </h3>
              <p className="text-xs text-slate-600">
                Civic teams are currently patch-working B.H. Road pothole craters and inspecting trail waste bins.
              </p>
            </div>
            <button
              onClick={() => setCurrentPage('nammafix')}
              className="p-2 rounded-xl bg-white border border-amber-200 text-amber-800 hover:bg-amber-100 shrink-0 transition-colors"
              title="Open NammaFix"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Recent Reports List */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-card p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary-600" />
                <span>Recent Report Activity</span>
              </h3>
              <button
                onClick={() => setCurrentPage('track')}
                className="text-xs font-semibold text-primary-600 hover:underline flex items-center gap-1"
              >
                <span>View All ({reports.length})</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {recentReports.map((rep) => (
                <div
                  key={rep.id}
                  onClick={() => {
                    setSelectedReport(rep);
                    setCurrentPage('track');
                  }}
                  className="p-3.5 rounded-2xl border border-slate-200/70 hover:border-primary-300 hover:bg-primary-50/20 transition-all cursor-pointer flex items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] font-bold text-primary-700 bg-primary-50 px-2 py-0.5 rounded">
                        {rep.referenceNo}
                      </span>
                      <StatusBadge status={rep.status} size="sm" />
                    </div>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 line-clamp-1">
                      {rep.title}
                    </h4>
                    <span className="text-[11px] text-slate-500 block truncate max-w-[280px]">
                      {rep.locationName}
                    </span>
                  </div>

                  <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Saved Places & Recommendations (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Saved Destinations */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-card p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>My Saved Destinations ({savedDestinations.length})</span>
              </h3>
              <button
                onClick={() => setCurrentPage('explore')}
                className="text-xs font-semibold text-primary-600 hover:underline"
              >
                Explore More
              </button>
            </div>

            {savedDestinations.length === 0 ? (
              <div className="py-8 text-center text-slate-400 text-xs">
                No saved destinations yet. Bookmark places while exploring!
              </div>
            ) : (
              <div className="space-y-3">
                {savedDestinations.map((dest) => (
                  <div
                    key={dest.id}
                    onClick={() => {
                      setSelectedDestination(dest);
                      setCurrentPage('explore');
                    }}
                    className="flex items-center gap-3 p-2.5 rounded-2xl hover:bg-slate-50 border border-slate-100 transition-colors cursor-pointer"
                  >
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="w-14 h-14 rounded-xl object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold uppercase text-secondary-600">
                        {dest.categoryLabel}
                      </span>
                      <h4 className="font-bold text-xs text-slate-900 truncate">
                        {dest.name}
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        {dest.distanceFromCityCenter}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Facility Shortcuts */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-card p-6 space-y-3">
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-teal-600" />
              <span>Nearby Public Utilities</span>
            </h3>
            <p className="text-xs text-slate-500">
              Need immediate public restrooms, water ATMs, or bus schedules in Tumakuru?
            </p>
            <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
              <button
                onClick={() => setCurrentPage('facilities')}
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-teal-300 font-semibold text-slate-700 transition-colors text-left"
              >
                🚻 Public Restrooms
              </button>
              <button
                onClick={() => setCurrentPage('facilities')}
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-sky-50 border border-slate-200 hover:border-sky-300 font-semibold text-slate-700 transition-colors text-left"
              >
                💧 Water ATMs
              </button>
              <button
                onClick={() => setCurrentPage('facilities')}
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-300 font-semibold text-slate-700 transition-colors text-left"
              >
                🏥 Emergency Care
              </button>
              <button
                onClick={() => setCurrentPage('map')}
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 font-semibold text-slate-700 transition-colors text-left"
              >
                🗺️ Full Smart Map
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
