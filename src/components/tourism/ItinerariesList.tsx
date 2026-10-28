import React, { useState } from 'react';
import { ITINERARIES_DATA } from '../../data/itineraries';
import { useApp } from '../../context/AppContext';
import { Clock, Compass, ChevronDown, ChevronUp, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';

export const ItinerariesList: React.FC = () => {
  const { language, destinations, setSelectedDestination } = useApp();
  const [expandedItinId, setExpandedItinId] = useState<string | null>('itin-hills-nature');

  const toggleExpand = (id: string) => {
    setExpandedItinId(expandedItinId === id ? null : id);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <span>{language === 'kn' ? 'ರೂಪಿಸಲಾದ ಪ್ರವಾಸ ಮಾರ್ಗಗಳು' : 'Smart Sightseeing Itineraries'}</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Curated half-day and full-day trails designed for tourists and visiting families
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {ITINERARIES_DATA.map((itin) => {
          const isExpanded = expandedItinId === itin.id;

          return (
            <div
              key={itin.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Hero header */}
                <div className="relative h-40 w-full overflow-hidden">
                  <img
                    src={itin.image}
                    alt={itin.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
                  
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-primary-600/90 text-white backdrop-blur-sm">
                      {itin.durationLabel}
                    </span>
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-white/90 text-slate-800">
                      Pace: {itin.pace}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h4 className="font-bold text-base leading-snug">
                      {itin.title}
                    </h4>
                    <p className="text-xs text-secondary-300 font-sans">
                      {itin.titleKn}
                    </p>
                  </div>
                </div>

                {/* Body */}
                <div className="p-4 space-y-3">
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {itin.description}
                  </p>

                  <div className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
                    <strong className="text-slate-800">Ideal for: </strong>
                    <span>{itin.idealFor}</span>
                  </div>

                  {/* Stops breakdown */}
                  {isExpanded && (
                    <div className="pt-2 border-t border-slate-100 space-y-2.5 animate-fadeIn">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                        Planned Trail Stops ({itin.stops.length})
                      </span>
                      {itin.stops.map((stop, idx) => {
                        const dest = destinations.find((d) => d.id === stop.destinationId);
                        if (!dest) return null;

                        return (
                          <div 
                            key={idx}
                            onClick={() => setSelectedDestination(dest)}
                            className="p-2.5 rounded-xl bg-slate-50/80 hover:bg-primary-50/50 border border-slate-200/60 cursor-pointer transition-colors"
                          >
                            <div className="flex items-center justify-between text-xs mb-1">
                              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                                <span className="w-4 h-4 rounded-full bg-primary-600 text-white text-[10px] flex items-center justify-center font-bold">
                                  {idx + 1}
                                </span>
                                <span>{dest.name}</span>
                              </span>
                              <span className="text-[10px] font-semibold text-secondary-700 bg-secondary-50 px-2 py-0.5 rounded">
                                {stop.suggestedDuration}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-600 italic pl-5">
                              “{stop.tips}”
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom toggle */}
              <div className="p-4 pt-0">
                <button
                  onClick={() => toggleExpand(itin.id)}
                  className="w-full py-2 text-xs font-semibold rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>{isExpanded ? 'Hide Route Details' : 'View Planned Trail Stops'}</span>
                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
