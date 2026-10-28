import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../common/StatusBadge';
import { 
  Flame, 
  MapPin, 
  AlertTriangle, 
  CheckCircle2, 
  Compass, 
  ThumbsUp, 
  Filter, 
  ShieldAlert, 
  ArrowRight, 
  Layers,
  Sparkles,
  Search
} from 'lucide-react';

export const NammaFixDiscovery: React.FC = () => {
  const { 
    reports, 
    destinations, 
    upvoteReport, 
    setSelectedReport, 
    setCurrentPage, 
    language 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'all' | 'tourist' | 'duplicates'>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  // Filter tourist-only issues
  const touristReports = reports.filter((r) => r.touristSpotNearby || r.category === 'tourist_cleanliness' || r.category === 'tourist_signage');

  // Potential duplicate groups: group by category and check if multiple unresolved reports exist
  const duplicateCandidateCategories = ['pothole', 'garbage', 'streetlight'];
  const duplicateCandidates = reports.filter((r) => duplicateCandidateCategories.includes(r.category));

  const displayedReports = activeTab === 'tourist' 
    ? touristReports 
    : activeTab === 'duplicates'
    ? duplicateCandidates
    : reports;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Signature Feature Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-amber-600 via-orange-600 to-primary-800 text-white p-6 sm:p-10 shadow-lg">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-amber-200 text-xs font-bold border border-white/20">
            <Flame className="w-3.5 h-3.5 text-amber-300" />
            <span>Civic & Tourism Synergy Engine</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            NammaFix — Intelligent Civic Discovery
          </h1>

          <p className="text-xs sm:text-sm text-slate-100 leading-relaxed max-w-2xl">
            NammaFix bridges local community participation with visitor exploration. By detecting proximity clusters, flagging duplicate reports, and prioritizing tourist corridor maintenance, we ensure Tumakuru shines for residents and travelers alike.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
            <button
              onClick={() => setCurrentPage('report')}
              className="px-4 py-2 rounded-xl bg-white text-slate-900 font-bold hover:bg-slate-100 transition-colors shadow-sm"
            >
              Report Issue in Your Area
            </button>
            <button
              onClick={() => setCurrentPage('map')}
              className="px-4 py-2 rounded-xl bg-black/20 hover:bg-black/30 text-white font-semibold border border-white/20 backdrop-blur-xs transition-colors"
            >
              View Issue Cluster Map
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 p-1.5 bg-white rounded-2xl border border-slate-200 shadow-xs text-xs font-semibold overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
            activeTab === 'all' 
              ? 'bg-primary-600 text-white shadow-xs' 
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          All City Issues ({reports.length})
        </button>

        <button
          onClick={() => setActiveTab('tourist')}
          className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'tourist' 
              ? 'bg-secondary-600 text-white shadow-xs' 
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Tourist Corridors & Heritage Spots ({touristReports.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('duplicates')}
          className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'duplicates' 
              ? 'bg-amber-500 text-slate-950 shadow-xs' 
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Duplicate Detection Showcase ({duplicateCandidates.length})</span>
        </button>
      </div>

      {/* Explanatory Callout when on Duplicate Detection */}
      {activeTab === 'duplicates' && (
        <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-950 text-xs flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong className="font-bold block text-amber-900 mb-0.5">
              NammaFix Duplicate Prevention Logic:
            </strong>
            When multiple citizens report the same pothole, streetlight, or waste overflow within a 300-meter radius, NammaFix automatically flags them as <em>Suspected Duplicates</em>. This aggregates upvotes instead of creating separate municipal work orders, accelerating turnaround times!
          </div>
        </div>
      )}

      {/* Issues Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {displayedReports.map((rep) => (
          <div
            key={rep.id}
            className="bg-white rounded-2xl border border-slate-200/90 shadow-card hover:shadow-card-hover transition-all duration-300 p-5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="font-mono text-xs font-bold text-primary-700 bg-primary-50 px-2 py-0.5 rounded">
                  {rep.referenceNo}
                </span>
                <StatusBadge status={rep.status} size="sm" />
              </div>

              <h3 className="font-bold text-sm text-slate-900 leading-snug mb-1">
                {rep.title}
              </h3>

              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
                {rep.description}
              </p>

              {rep.imageUrl && (
                <div className="relative h-32 rounded-xl overflow-hidden mb-3 bg-slate-100">
                  <img src={rep.imageUrl} alt="Issue" className="w-full h-full object-cover" />
                </div>
              )}

              {rep.touristSpotNearby && (
                <div className="inline-flex items-center gap-1.5 text-[11px] font-medium text-secondary-800 bg-secondary-50 px-2.5 py-1 rounded-lg border border-secondary-200/70 mb-2">
                  <Compass className="w-3 h-3 text-secondary-600" />
                  <span>Proximity: {rep.touristSpotNearby}</span>
                </div>
              )}

              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{rep.locationName}</span>
              </div>
            </div>

            <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => upvoteReport(rep.id)}
                className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg border transition-all ${
                  rep.hasUpvoted
                    ? 'bg-primary-50 text-primary-700 border-primary-200'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>{rep.upvotes} Upvotes</span>
              </button>

              <button
                onClick={() => {
                  setSelectedReport(rep);
                  setCurrentPage('track');
                }}
                className="text-xs text-primary-600 hover:text-primary-800 font-semibold flex items-center gap-1"
              >
                <span>Track Status</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

