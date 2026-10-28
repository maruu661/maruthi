import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CivicReport, CivicStatus } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { 
  Search, 
  Clock, 
  MapPin, 
  ThumbsUp, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Calendar, 
  Building2,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export const ReportTracker: React.FC = () => {
  const { 
    reports, 
    selectedReport, 
    setSelectedReport, 
    upvoteReport, 
    language,
    setCurrentPage 
  } = useApp();

  const [searchReference, setSearchReference] = useState(selectedReport ? selectedReport.referenceNo : '');
  const [statusFilter, setStatusFilter] = useState<'All' | CivicStatus>('All');

  // Filter reports
  const filteredReports = reports.filter((rep) => {
    if (statusFilter !== 'All' && rep.status !== statusFilter) return false;
    if (searchReference.trim()) {
      const q = searchReference.toLowerCase().trim();
      const matchRef = rep.referenceNo.toLowerCase().includes(q);
      const matchTitle = rep.title.toLowerCase().includes(q);
      const matchLoc = rep.locationName.toLowerCase().includes(q);
      if (!matchRef && !matchTitle && !matchLoc) return false;
    }
    return true;
  });

  // Current active report to display timeline
  const activeReport = selectedReport || (filteredReports.length > 0 ? filteredReports[0] : null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-primary-700 text-xs font-semibold mb-2 border border-blue-200">
            <Clock className="w-3.5 h-3.5" />
            <span>Real-time Civic Audit Trail</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {language === 'kn' ? 'ನಾಗರಿಕ ದೂರುಗಳ ಸ್ಥಿತಿ ಟ್ರ್ಯಾಕಿಂಗ್' : 'Civic Issue Resolution Tracker'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
            Track transparent, step-by-step resolution timelines from citizen submission through field verification and resolution.
          </p>
        </div>

        <button
          onClick={() => setCurrentPage('report')}
          className="px-4 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-colors shrink-0"
        >
          <FileText className="w-4 h-4" />
          <span>Report New Issue</span>
        </button>
      </div>

      {/* Search & Status Filters */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by Reference Number (e.g. TUM-2026-4821) or location..."
              value={searchReference}
              onChange={(e) => setSearchReference(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-slate-50 focus:bg-white"
            />
          </div>

          {/* Quick Demo Reference Pill Buttons */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 overflow-x-auto pb-1 sm:pb-0">
            <span className="font-semibold text-slate-400 shrink-0">Demo refs:</span>
            {reports.slice(0, 3).map((r) => (
              <button
                key={r.id}
                onClick={() => {
                  setSearchReference(r.referenceNo);
                  setSelectedReport(r);
                }}
                className="font-mono text-[11px] font-bold text-primary-700 bg-primary-50 px-2.5 py-1 rounded-lg border border-primary-200 hover:bg-primary-100 shrink-0 transition-colors"
              >
                {r.referenceNo}
              </button>
            ))}
          </div>
        </div>

        {/* Status filter buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar border-t border-slate-100 pt-2">
          {(['All', 'Submitted', 'Under Review', 'In Progress', 'Resolved'] as const).map((st) => {
            const isSelected = statusFilter === st;
            return (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1 rounded-full font-medium whitespace-nowrap transition-all border ${
                  isSelected
                    ? 'bg-primary-600 text-white border-primary-600 shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                {st}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Reports List (left) + Detailed Vertical Timeline (right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Reports Cards List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block px-1">
            Registered Reports ({filteredReports.length})
          </span>

          {filteredReports.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-400 text-xs">
              No matching reports found for this filter.
            </div>
          ) : (
            <div className="space-y-3 max-h-[700px] overflow-y-auto pr-1">
              {filteredReports.map((rep) => {
                const isSelected = activeReport?.id === rep.id;
                return (
                  <div
                    key={rep.id}
                    onClick={() => setSelectedReport(rep)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-primary-600 bg-primary-50/40 ring-2 ring-primary-500/20 shadow-xs'
                        : 'border-slate-200/90 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="font-mono text-xs font-bold text-primary-700 bg-primary-100/70 px-2 py-0.5 rounded">
                          {rep.referenceNo}
                        </span>
                        <StatusBadge status={rep.status} size="sm" />
                      </div>

                      <h3 className="font-bold text-xs sm:text-sm text-slate-900 leading-snug line-clamp-1">
                        {rep.title}
                      </h3>

                      <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                        {rep.description}
                      </p>
                    </div>

                    <div className="pt-3 mt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                      <span className="truncate max-w-[180px]">{rep.locationName}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            upvoteReport(rep.id);
                          }}
                          className={`flex items-center gap-1 font-semibold px-2 py-0.5 rounded ${
                            rep.hasUpvoted ? 'text-primary-700 bg-primary-100' : 'text-slate-500 hover:bg-slate-100'
                          }`}
                        >
                          <ThumbsUp className="w-3 h-3" />
                          <span>{rep.upvotes}</span>
                        </button>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Detailed Timeline & Case Details (7 cols) */}
        <div className="lg:col-span-7">
          {activeReport ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-card space-y-6">
              
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-sm font-extrabold text-primary-700 bg-primary-50 px-2.5 py-0.5 rounded-lg border border-primary-200">
                      {activeReport.referenceNo}
                    </span>
                    <StatusBadge status={activeReport.status} size="md" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-black text-slate-900 leading-tight">
                    {activeReport.title}
                  </h2>
                </div>

                <button
                  onClick={() => upvoteReport(activeReport.id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all flex items-center gap-1.5 shrink-0 ${
                    activeReport.hasUpvoted
                      ? 'bg-primary-50 text-primary-700 border-primary-200'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>Upvoted ({activeReport.upvotes})</span>
                </button>
              </div>

              {/* Photo & Metadata Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeReport.imageUrl && (
                  <div className="relative h-44 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                    <img 
                      src={activeReport.imageUrl} 
                      alt="Proof" 
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/60 text-white text-[10px] backdrop-blur-xs font-medium">
                      Site Photograph
                    </div>
                  </div>
                )}

                <div className="space-y-2.5 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                    <span className="text-slate-400 font-semibold block text-[10px] uppercase">Department Assigned</span>
                    <span className="font-bold text-slate-800">{activeReport.assignedDepartment}</span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                    <span className="text-slate-400 font-semibold block text-[10px] uppercase">Location</span>
                    <span className="font-bold text-slate-800 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-primary-600 shrink-0" />
                      <span className="truncate">{activeReport.locationName}</span>
                    </span>
                    {activeReport.touristSpotNearby && (
                      <span className="text-[11px] text-secondary-700 block font-medium">
                        Near: {activeReport.touristSpotNearby}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="text-xs text-slate-700 leading-relaxed bg-slate-50/70 p-4 rounded-2xl border border-slate-200/70">
                <span className="font-bold block text-slate-900 mb-1">Citizen Problem Statement:</span>
                {activeReport.description}
              </div>

              {/* Vertical Resolution Timeline */}
              <div className="space-y-4 pt-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-primary-600" />
                  <span>Resolution History & Official Milestones</span>
                </h3>

                <div className="relative pl-6 border-l-2 border-slate-200 space-y-6">
                  {activeReport.timeline.map((item, idx) => (
                    <div key={idx} className="relative group">
                      {/* Timeline dot */}
                      <span className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-white border-2 border-primary-600 group-hover:scale-125 transition-transform shadow-xs" />

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <StatusBadge status={item.status} size="sm" />
                          <span className="text-[11px] text-slate-400 font-medium">{item.timestamp}</span>
                        </div>

                        <p className="text-xs text-slate-700 font-medium leading-relaxed">
                          {item.note}
                        </p>

                        {item.officerName && (
                          <div className="text-[11px] text-secondary-800 font-semibold flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3 text-secondary-600" />
                            <span>Actioned by: {item.officerName}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center text-slate-400 text-xs">
              Select a report from the list on the left to inspect its timeline.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
