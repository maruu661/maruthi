import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { useApp } from '../../context/AppContext';
import { Destination, Facility, CivicReport } from '../../types';
import { DestinationDetailModal } from '../tourism/DestinationDetailModal';
import { 
  Layers, 
  MapPin, 
  Navigation, 
  Bookmark, 
  Eye, 
  Filter, 
  Compass, 
  Droplet, 
  HeartPulse, 
  Bus, 
  Car, 
  AlertCircle,
  X,
  Sparkles
} from 'lucide-react';

export const InteractiveMap: React.FC = () => {
  const { 
    destinations, 
    facilities, 
    reports, 
    selectedDestination, 
    setSelectedDestination,
    language 
  } = useApp();

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  // Filter layers state
  const [showDestinations, setShowDestinations] = useState(true);
  const [showToilets, setShowToilets] = useState(true);
  const [showWater, setShowWater] = useState(true);
  const [showHospitals, setShowHospitals] = useState(true);
  const [showTransit, setShowTransit] = useState(true);
  const [showParking, setShowParking] = useState(true);
  const [showReports, setShowReports] = useState(true);

  // Selected item on map for side panel
  const [selectedMapItem, setSelectedMapItem] = useState<{
    type: 'destination' | 'facility' | 'report';
    data: Destination | Facility | CivicReport;
  } | null>(() => {
    return {
      type: 'destination',
      data: destinations[0]
    };
  });

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return; // already initialized

    // Center on Tumakuru City [13.3400, 77.1000]
    const map = L.map(mapContainerRef.current, {
      center: [13.3400, 77.1000],
      zoom: 12,
      zoomControl: false,
    });

    L.control.zoom({ position: 'topright' }).addTo(map);

    // OpenStreetMap standard tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);

    const markersGroup = L.layerGroup().addTo(map);
    markersLayerRef.current = markersGroup;
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Markers based on toggles
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;

    const markersGroup = markersLayerRef.current;
    markersGroup.clearLayers();

    // 1. Destinations Markers
    if (showDestinations) {
      destinations.forEach((dest) => {
        const iconHtml = `
          <div style="background-color: #1D4ED8; color: white; width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(29, 78, 216, 0.4); border: 2.5px solid white; cursor: pointer; transform: scale(1); transition: transform 0.2s;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
            </svg>
          </div>
        `;
        const customIcon = L.divIcon({
          html: iconHtml,
          className: 'custom-destination-marker',
          iconSize: [34, 34],
          iconAnchor: [17, 17],
        });

        const marker = L.marker(dest.coordinates, { icon: customIcon });
        marker.on('click', () => {
          setSelectedMapItem({ type: 'destination', data: dest });
          mapInstanceRef.current?.panTo(dest.coordinates);
        });
        marker.bindTooltip(`<b>${dest.name}</b><br/><span style="color:#0D9488">${dest.categoryLabel}</span>`, {
          direction: 'top',
          offset: [0, -18],
        });
        marker.addTo(markersGroup);
      });
    }

    // 2. Facilities Markers
    facilities.forEach((fac) => {
      let shouldShow = false;
      let bgColor = '#0D9488';
      let iconSvg = '';

      if (fac.category === 'toilet' && showToilets) {
        shouldShow = true;
        bgColor = '#0D9488'; // teal
        iconSvg = `<path d="M7 21h10M12 21v-4M4 11a8 8 0 0 1 16 0c0 4.418-3.582 8-8 8s-8-3.582-8-8z"/>`;
      } else if (fac.category === 'water' && showWater) {
        shouldShow = true;
        bgColor = '#0284C7'; // cyan
        iconSvg = `<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>`;
      } else if (fac.category === 'hospital' && showHospitals) {
        shouldShow = true;
        bgColor = '#DC2626'; // red
        iconSvg = `<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>`;
      } else if (fac.category === 'bus' && showTransit) {
        shouldShow = true;
        bgColor = '#059669'; // emerald
        iconSvg = `<path d="M8 6v6M15 6v6M2 12h19.6M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.6-.4-1.2-1-1.3l-2-.5V6c0-1.7-1.3-3-3-3H7C5.3 3 4 4.3 4 6v6.2l-2 .5c-.6.1-1 .7-1 1.3 0 .4.1.8.2 1.2.3 1.1.8 2.8.8 2.8h3"/>`;
      } else if (fac.category === 'parking' && showParking) {
        shouldShow = true;
        bgColor = '#475569'; // slate
        iconSvg = `<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 17V7h4a3 3 0 0 1 0 6H9"/>`;
      }

      if (shouldShow) {
        const iconHtml = `
          <div style="background-color: ${bgColor}; color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 6px rgba(0,0,0,0.3); border: 2px solid white; cursor: pointer;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              ${iconSvg}
            </svg>
          </div>
        `;
        const marker = L.marker(fac.coordinates, {
          icon: L.divIcon({
            html: iconHtml,
            className: 'custom-facility-marker',
            iconSize: [28, 28],
            iconAnchor: [14, 14],
          }),
        });
        marker.on('click', () => {
          setSelectedMapItem({ type: 'facility', data: fac });
          mapInstanceRef.current?.panTo(fac.coordinates);
        });
        marker.bindTooltip(`<b>${fac.name}</b><br/>${fac.categoryLabel}`, {
          direction: 'top',
          offset: [0, -14],
        });
        marker.addTo(markersGroup);
      }
    });

    // 3. Civic Reports & NammaFix Markers
    if (showReports) {
      reports.forEach((rep) => {
        const isResolved = rep.status === 'Resolved';
        const color = isResolved ? '#10B981' : '#F59E0B';
        const iconHtml = `
          <div style="background-color: ${color}; color: white; width: 26px; height: 26px; border-radius: 6px; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(0,0,0,0.25); border: 2px solid white; cursor: pointer; transform: rotate(45deg);">
            <div style="transform: rotate(-45deg);">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
            </div>
          </div>
        `;
        const marker = L.marker(rep.coordinates, {
          icon: L.divIcon({
            html: iconHtml,
            className: 'custom-report-marker',
            iconSize: [26, 26],
            iconAnchor: [13, 13],
          }),
        });
        marker.on('click', () => {
          setSelectedMapItem({ type: 'report', data: rep });
          mapInstanceRef.current?.panTo(rep.coordinates);
        });
        marker.bindTooltip(`<b>${rep.referenceNo}: ${rep.title}</b><br/>Status: ${rep.status}`, {
          direction: 'top',
          offset: [0, -14],
        });
        marker.addTo(markersGroup);
      });
    }
  }, [
    destinations, 
    facilities, 
    reports, 
    showDestinations, 
    showToilets, 
    showWater, 
    showHospitals, 
    showTransit, 
    showParking, 
    showReports
  ]);

  const handleDirections = (coordinates: [number, number], label: string) => {
    const [lat, lng] = coordinates;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&destination_place_id=${encodeURIComponent(label)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-4">
      
      {/* Top Header & Layer Filter Chips */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2">
              <Compass className="w-6 h-6 text-primary-600" />
              <span>{language === 'kn' ? 'ತುಮಕೂರು ಸ್ಮಾರ್ಟ್ ನಕ್ಷೆ & ಸ್ಥಳೀಯ ಗೈಡ್' : 'Tumakuru Smart Map & Local Guide'}</span>
            </h1>
            <p className="text-xs text-slate-500">
              Interactive Leaflet layer combining tourist attractions, public amenities, and civic reports
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>OpenStreetMap Engine</span>
          </div>
        </div>

        {/* Layer Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar pt-1 border-t border-slate-100">
          <span className="text-slate-400 font-semibold flex items-center gap-1 shrink-0">
            <Filter className="w-3.5 h-3.5" />
            Layers:
          </span>

          <button
            onClick={() => setShowDestinations(!showDestinations)}
            className={`px-3 py-1.5 rounded-full font-semibold transition-all border shrink-0 flex items-center gap-1.5 ${
              showDestinations
                ? 'bg-primary-600 text-white border-primary-600 shadow-xs'
                : 'bg-slate-50 text-slate-600 border-slate-200'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-white" />
            <span>Attractions ({destinations.length})</span>
          </button>

          <button
            onClick={() => setShowToilets(!showToilets)}
            className={`px-3 py-1.5 rounded-full font-semibold transition-all border shrink-0 flex items-center gap-1.5 ${
              showToilets
                ? 'bg-secondary-600 text-white border-secondary-600 shadow-xs'
                : 'bg-slate-50 text-slate-600 border-slate-200'
            }`}
          >
            <span>Toilets</span>
          </button>

          <button
            onClick={() => setShowWater(!showWater)}
            className={`px-3 py-1.5 rounded-full font-semibold transition-all border shrink-0 flex items-center gap-1.5 ${
              showWater
                ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                : 'bg-slate-50 text-slate-600 border-slate-200'
            }`}
          >
            <Droplet className="w-3.5 h-3.5" />
            <span>Water ATMs</span>
          </button>

          <button
            onClick={() => setShowHospitals(!showHospitals)}
            className={`px-3 py-1.5 rounded-full font-semibold transition-all border shrink-0 flex items-center gap-1.5 ${
              showHospitals
                ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                : 'bg-slate-50 text-slate-600 border-slate-200'
            }`}
          >
            <HeartPulse className="w-3.5 h-3.5" />
            <span>Hospitals</span>
          </button>

          <button
            onClick={() => setShowTransit(!showTransit)}
            className={`px-3 py-1.5 rounded-full font-semibold transition-all border shrink-0 flex items-center gap-1.5 ${
              showTransit
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                : 'bg-slate-50 text-slate-600 border-slate-200'
            }`}
          >
            <Bus className="w-3.5 h-3.5" />
            <span>Bus Transit</span>
          </button>

          <button
            onClick={() => setShowParking(!showParking)}
            className={`px-3 py-1.5 rounded-full font-semibold transition-all border shrink-0 flex items-center gap-1.5 ${
              showParking
                ? 'bg-slate-700 text-white border-slate-700 shadow-xs'
                : 'bg-slate-50 text-slate-600 border-slate-200'
            }`}
          >
            <Car className="w-3.5 h-3.5" />
            <span>Parking</span>
          </button>

          <button
            onClick={() => setShowReports(!showReports)}
            className={`px-3 py-1.5 rounded-full font-semibold transition-all border shrink-0 flex items-center gap-1.5 ${
              showReports
                ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-xs'
                : 'bg-slate-50 text-slate-600 border-slate-200'
            }`}
          >
            <AlertCircle className="w-3.5 h-3.5" />
            <span>NammaFix Issues</span>
          </button>
        </div>
      </div>

      {/* Map + Side Panel Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[640px]">
        
        {/* Leaflet Map Canvas */}
        <div className="lg:col-span-2 h-full rounded-2xl overflow-hidden border border-slate-200 shadow-md relative bg-slate-100">
          <div ref={mapContainerRef} className="w-full h-full" />

          {/* Map Legend Overlay */}
          <div className="absolute bottom-3 left-3 z-[400] bg-white/90 backdrop-blur-md px-3 py-2 rounded-xl border border-slate-200 shadow-sm text-[11px] text-slate-700 space-y-1">
            <span className="font-bold text-slate-900 block mb-0.5">Map Pins Legend</span>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-primary-600 inline-block" />
              <span>Tourist Destination</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-secondary-600 inline-block" />
              <span>Public Restroom / Water ATM</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-amber-500 inline-block" />
              <span>NammaFix Civic Report</span>
            </div>
          </div>
        </div>

        {/* Selected Item Detail Panel */}
        <div className="h-full bg-white rounded-2xl border border-slate-200 shadow-card p-5 overflow-y-auto flex flex-col justify-between">
          {selectedMapItem ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Selected Map Feature
                </span>
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                  selectedMapItem.type === 'destination' 
                    ? 'bg-blue-100 text-blue-800' 
                    : selectedMapItem.type === 'facility'
                    ? 'bg-teal-100 text-teal-800'
                    : 'bg-amber-100 text-amber-900'
                }`}>
                  {selectedMapItem.type === 'destination' && 'Attraction'}
                  {selectedMapItem.type === 'facility' && 'Public Facility'}
                  {selectedMapItem.type === 'report' && 'Civic Report'}
                </span>
              </div>

              {/* Destination Card Preview */}
              {selectedMapItem.type === 'destination' && (() => {
                const dest = selectedMapItem.data as Destination;
                return (
                  <div className="space-y-3">
                    <div className="relative h-44 rounded-xl overflow-hidden">
                      <img src={dest.image} alt={dest.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                        <span className="text-[11px] font-semibold text-secondary-300">
                          {dest.categoryLabel}
                        </span>
                        <h3 className="font-bold text-base leading-snug">{dest.name}</h3>
                        <p className="text-xs text-slate-200">{dest.nameKn}</p>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {dest.shortDesc}
                    </p>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs space-y-1">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Distance:</span>
                        <span className="font-semibold text-slate-800">{dest.distanceFromCityCenter}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Est. Time:</span>
                        <span className="font-semibold text-slate-800">{dest.travelTimeEst}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <button
                        onClick={() => setSelectedDestination(dest)}
                        className="flex-1 py-2 text-xs font-bold rounded-xl bg-primary-600 text-white hover:bg-primary-700 transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Full Guide</span>
                      </button>

                      <button
                        onClick={() => handleDirections(dest.coordinates, dest.name)}
                        className="p-2 text-xs font-semibold rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors"
                        title="Directions"
                      >
                        <Navigation className="w-4 h-4 text-secondary-600" />
                      </button>
                    </div>
                  </div>
                );
              })()}

              {/* Facility Card Preview */}
              {selectedMapItem.type === 'facility' && (() => {
                const fac = selectedMapItem.data as Facility;
                return (
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-bold text-base text-slate-900 leading-snug">{fac.name}</h3>
                      <p className="text-xs text-secondary-700">{fac.nameKn}</p>
                    </div>

                    <div className="text-xs text-slate-600 flex items-start gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span>{fac.address}</span>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">Condition:</span>
                        <span className={`font-semibold capitalize px-2 py-0.5 rounded text-[11px] ${
                          fac.condition === 'clean' 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : 'bg-amber-100 text-amber-900'
                        }`}>
                          {fac.condition.replace('_', ' ')}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">Verification:</span>
                        <span className="font-semibold text-slate-800 capitalize">{fac.verificationStatus}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 italic">
                        {fac.timingsNotice}
                      </div>
                    </div>

                    <button
                      onClick={() => handleDirections(fac.coordinates, fac.name)}
                      className="w-full py-2.5 text-xs font-bold rounded-xl bg-secondary-600 hover:bg-secondary-700 text-white transition-colors flex items-center justify-center gap-2 shadow-xs"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Directions to Facility</span>
                    </button>
                  </div>
                );
              })()}

              {/* Report Card Preview */}
              {selectedMapItem.type === 'report' && (() => {
                const rep = selectedMapItem.data as CivicReport;
                return (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-slate-500">{rep.referenceNo}</span>
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                        {rep.status}
                      </span>
                    </div>

                    <h3 className="font-bold text-sm text-slate-900 leading-snug">{rep.title}</h3>
                    <p className="text-xs text-slate-600">{rep.description}</p>

                    <div className="text-xs text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
                      <strong>Location: </strong>{rep.locationName}
                    </div>

                    <button
                      onClick={() => handleDirections(rep.coordinates, rep.title)}
                      className="w-full py-2 text-xs font-semibold rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-800 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Navigation className="w-3.5 h-3.5 text-primary-600" />
                      <span>Navigate to Issue Site</span>
                    </button>
                  </div>
                );
              })()}
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400 text-xs">
              Click any pin on the map to inspect details
            </div>
          )}

          {/* Pro-tip */}
          <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-500">
            <strong>Pro Tip:</strong> Click any pin on the map to center the view and inspect directions.
          </div>
        </div>

      </div>

      {/* Destination detail modal if opened */}
      <DestinationDetailModal
        destination={selectedDestination}
        onClose={() => setSelectedDestination(null)}
      />
    </div>
  );
};
