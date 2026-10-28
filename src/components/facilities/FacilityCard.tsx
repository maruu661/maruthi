import React from 'react';
import { Facility } from '../../types';
import { useApp } from '../../context/AppContext';
import { 
  MapPin, 
  Navigation, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Clock, 
  Accessibility, 
  ShieldCheck, 
  Users, 
  Flag,
  Phone,
  Droplet,
  HeartPulse,
  Bus,
  Car
} from 'lucide-react';

interface FacilityCardProps {
  facility: Facility;
  onOpenConditionModal: (fac: Facility) => void;
}

export const FacilityCard: React.FC<FacilityCardProps> = ({ facility, onOpenConditionModal }) => {
  const { language, setCurrentPage } = useApp();

  const handleDirections = () => {
    const [lat, lng] = facility.coordinates;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&destination_place_id=${encodeURIComponent(facility.name)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const getCategoryIcon = () => {
    switch (facility.category) {
      case 'toilet':
        return <span className="p-2 rounded-xl bg-teal-50 text-teal-700"><CheckCircle2 className="w-4 h-4" /></span>;
      case 'water':
        return <span className="p-2 rounded-xl bg-sky-50 text-sky-700"><Droplet className="w-4 h-4" /></span>;
      case 'hospital':
        return <span className="p-2 rounded-xl bg-rose-50 text-rose-700"><HeartPulse className="w-4 h-4" /></span>;
      case 'bus':
        return <span className="p-2 rounded-xl bg-emerald-50 text-emerald-700"><Bus className="w-4 h-4" /></span>;
      case 'parking':
        return <span className="p-2 rounded-xl bg-slate-100 text-slate-700"><Car className="w-4 h-4" /></span>;
      default:
        return <span className="p-2 rounded-xl bg-blue-50 text-primary-700"><MapPin className="w-4 h-4" /></span>;
    }
  };

  const getConditionBadge = () => {
    switch (facility.condition) {
      case 'clean':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            <CheckCircle2 className="w-3 h-3" />
            <span>Clean & Working</span>
          </span>
        );
      case 'fair':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
            <AlertTriangle className="w-3 h-3" />
            <span>Moderate Condition</span>
          </span>
        );
      case 'needs_maintenance':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
            <XCircle className="w-3 h-3" />
            <span>Needs Maintenance</span>
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-card hover:shadow-card-hover transition-all duration-300 p-5 flex flex-col justify-between">
      <div>
        {/* Top Header */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center gap-2.5">
            {getCategoryIcon()}
            <div>
              <span className="text-[11px] font-bold tracking-wider uppercase text-slate-400 block">
                {language === 'kn' ? facility.categoryLabelKn : facility.categoryLabel}
              </span>
              <h3 className="font-bold text-base text-slate-900 leading-snug">
                {facility.name}
              </h3>
            </div>
          </div>
          {getConditionBadge()}
        </div>

        <p className="text-xs font-medium text-secondary-700 mb-2 font-sans">
          {facility.nameKn}
        </p>

        {/* Address */}
        <div className="flex items-start gap-1.5 text-xs text-slate-600 mb-3">
          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
          <span>{facility.address}</span>
        </div>

        {/* Tourist connection badge if applicable */}
        {facility.touristSpotNearby && (
          <div className="mb-3 inline-flex items-center gap-1.5 text-[11px] font-medium text-primary-800 bg-primary-50 px-2.5 py-1 rounded-lg border border-primary-200/70">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-600" />
            <span>Serving: {facility.touristSpotNearby}</span>
          </div>
        )}

        {/* Timings Notice & Accessibility Tags */}
        <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
            <Clock className="w-3.5 h-3.5 shrink-0 text-slate-400" />
            <span className="italic">{facility.timingsNotice}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            {facility.accessibleWheelchair && (
              <span className="inline-flex items-center gap-1 text-[10px] font-medium text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                <Accessibility className="w-3 h-3" />
                <span>Wheelchair Accessible</span>
              </span>
            )}
            {facility.accessibleTactile && (
              <span className="inline-flex items-center gap-1 text-[10px] font-medium text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                <span>Tactile Paving</span>
              </span>
            )}
            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              <span className="capitalize">{facility.verificationStatus}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
        <div className="text-[11px] text-slate-400">
          Updated: {facility.lastUpdated}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onOpenConditionModal(facility)}
            className="px-2.5 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors flex items-center gap-1"
            title="Submit community cleanliness/condition report"
          >
            <Users className="w-3.5 h-3.5 text-secondary-600" />
            <span className="hidden sm:inline">Update Status</span>
          </button>

          <button
            onClick={handleDirections}
            className="px-3.5 py-1.5 text-xs font-bold rounded-xl bg-secondary-600 hover:bg-secondary-700 text-white transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Directions</span>
          </button>
        </div>
      </div>
    </div>
  );
};
