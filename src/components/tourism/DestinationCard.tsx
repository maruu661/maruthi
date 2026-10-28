import React from 'react';
import { Destination } from '../../types';
import { useApp } from '../../context/AppContext';
import { Bookmark, MapPin, Navigation, Eye, AlertCircle, ArrowUpRight } from 'lucide-react';

interface DestinationCardProps {
  destination: Destination;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  const { 
    language, 
    setSelectedDestination, 
    savedDestinationIds, 
    toggleSaveDestination 
  } = useApp();

  const isSaved = savedDestinationIds.includes(destination.id);

  const handleDirections = (e: React.MouseEvent) => {
    e.stopPropagation();
    const [lat, lng] = destination.coordinates;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&destination_place_id=${encodeURIComponent(destination.name)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      onClick={() => setSelectedDestination(destination)}
      className="group bg-white rounded-2xl border border-slate-200/90 shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden flex flex-col cursor-pointer hover:-translate-y-1"
    >
      {/* Image Container with Badges */}
      <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-slate-100">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className="text-[11px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-primary-700 shadow-sm border border-white/40">
            {language === 'kn' ? destination.categoryLabelKn : destination.categoryLabel}
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleSaveDestination(destination.id);
            }}
            className={`p-2 rounded-full backdrop-blur-md transition-all shadow-sm ${
              isSaved
                ? 'bg-amber-400 text-slate-900 shadow-amber-400/30'
                : 'bg-black/30 hover:bg-black/50 text-white'
            }`}
            title={isSaved ? 'Remove from saved' : 'Save to travel list'}
            aria-label="Save destination"
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-slate-900' : ''}`} />
          </button>
        </div>

        {/* Bottom overlay in image: Location & Travel Time */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-200">
            <MapPin className="w-3.5 h-3.5 text-secondary-400 shrink-0" />
            <span className="truncate">
              {language === 'kn' ? destination.locationLabelKn : destination.locationLabel}
            </span>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3 className="font-bold text-base sm:text-lg text-slate-900 group-hover:text-primary-700 transition-colors leading-snug">
              {destination.name}
            </h3>
          </div>

          <p className="text-xs font-medium text-secondary-700 mb-2 font-sans">
            {destination.nameKn}
          </p>

          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
            {language === 'kn' ? destination.shortDescKn : destination.shortDesc}
          </p>

          {/* Highlights pills */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {destination.highlights.slice(0, 3).map((hl, i) => (
              <span
                key={i}
                className="text-[10px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md"
              >
                {hl}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div className="text-[11px] text-slate-500 font-medium">
            <span className="font-semibold text-slate-700">{destination.distanceFromCityCenter}</span>
            <span className="mx-1">•</span>
            <span>{destination.travelTimeEst}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleDirections}
              className="p-2 text-xs font-semibold rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-700 transition-colors flex items-center gap-1"
              title="Open directions in Google Maps"
            >
              <Navigation className="w-3.5 h-3.5 text-secondary-600" />
              <span className="hidden sm:inline">Directions</span>
            </button>

            <button
              onClick={() => setSelectedDestination(destination)}
              className="px-3 py-2 text-xs font-semibold rounded-xl bg-primary-600 hover:bg-primary-700 text-white transition-colors flex items-center gap-1 shadow-xs"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Details</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

