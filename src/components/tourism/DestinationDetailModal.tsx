import React from 'react';
import { Destination } from '../../types';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  MapPin, 
  Navigation, 
  Bookmark, 
  AlertTriangle, 
  Bus, 
  Train, 
  Car, 
  Clock, 
  Accessibility, 
  CheckCircle2, 
  Flag,
  Share2
} from 'lucide-react';

interface DestinationDetailModalProps {
  destination: Destination | null;
  onClose: () => void;
}

export const DestinationDetailModal: React.FC<DestinationDetailModalProps> = ({ destination, onClose }) => {
  const { 
    language, 
    savedDestinationIds, 
    toggleSaveDestination, 
    facilities, 
    setSelectedFacility, 
    setCurrentPage, 
    showToast 
  } = useApp();

  if (!destination) return null;

  const isSaved = savedDestinationIds.includes(destination.id);

  // Find nearby facilities from our database
  const nearbyFacilities = facilities.filter((f) => 
    destination.nearbyFacilityIds.includes(f.id) || 
    (f.touristSpotNearby && f.touristSpotNearby.toLowerCase().includes(destination.name.toLowerCase().slice(0, 8)))
  );

  const handleDirections = () => {
    const [lat, lng] = destination.coordinates;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&destination_place_id=${encodeURIComponent(destination.name)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${destination.name} — Nama Tumukuru`,
        text: destination.shortDesc,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link copied to clipboard!', 'info');
    }
  };

  const handleReportCivicIssue = () => {
    onClose();
    setCurrentPage('report');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="relative bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hero Image Section */}
        <div className="relative h-64 sm:h-80 w-full bg-slate-900">
          <img
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          {/* Close & Share Top Buttons */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2.5 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-colors"
              title="Share destination"
              aria-label="Share destination"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-colors"
              title="Close dialog"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Title on Hero */}
          <div className="absolute bottom-5 left-5 right-5 text-white">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider bg-primary-600/90 text-white px-3 py-1 rounded-full backdrop-blur-sm">
                {language === 'kn' ? destination.categoryLabelKn : destination.categoryLabel}
              </span>
              <span className="text-xs font-medium bg-black/40 backdrop-blur-md text-slate-200 px-3 py-1 rounded-full border border-white/20">
                {destination.locationScope === 'city' ? 'Tumakuru City' : 'Tumakuru District'}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {destination.name}
            </h2>
            <p className="text-base sm:text-lg text-secondary-300 font-sans mt-0.5">
              {destination.nameKn}
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 space-y-6">
          
          {/* Quick Metrics Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <MapPin className="w-4 h-4 text-primary-600" />
              <span>
                <strong className="text-slate-900">{destination.distanceFromCityCenter}</strong> from city center
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-600">
              <Clock className="w-4 h-4 text-secondary-600" />
              <span>Est. {destination.travelTimeEst}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleSaveDestination(destination.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all flex items-center gap-1.5 ${
                  isSaved
                    ? 'bg-amber-100 text-amber-900 border-amber-300'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-amber-600' : ''}`} />
                <span>{isSaved ? 'Saved in Travel List' : 'Save to Travel List'}</span>
              </button>

              <button
                onClick={handleDirections}
                className="px-3.5 py-1.5 text-xs font-bold rounded-xl bg-secondary-600 hover:bg-secondary-700 text-white transition-all flex items-center gap-1.5 shadow-sm"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Directions</span>
              </button>
            </div>
          </div>

          {/* Mandatory Smart-City Traveler Notice */}
          <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-amber-900 flex items-start gap-3 text-xs leading-relaxed">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block text-amber-950 mb-0.5">
                {language === 'kn' ? 'ಪ್ರವಾಸಿಗರ ಗಮನಕ್ಕೆ: ಭೇಟಿ ನೀಡುವ ಮುನ್ನ ದೃಢಪಡಿಸಿ' : 'Traveler Notice — Check Before Visiting:'}
              </span>
              <span>{destination.timingsNotice}</span>
            </div>
          </div>

          {/* Overview text */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-2">
              {language === 'kn' ? 'ತಾಣದ ಪರಿಚಯ ಮತ್ತು ಇತಿಹಾಸ' : 'About this Destination'}
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              {language === 'kn' ? destination.fullDescKn : destination.fullDesc}
            </p>
          </div>

          {/* Key Highlights */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-2.5">
              {language === 'kn' ? 'ಪ್ರಮುಖ ಆಕರ್ಷಣೆಗಳು' : 'Key Highlights'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {destination.highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs text-slate-800 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* How to Reach */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-2.5">
              {language === 'kn' ? 'ತಲುಪುವುದು ಹೇಗೆ?' : 'How to Reach'}
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                <Bus className="w-4 h-4 text-primary-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-900 block">By KSRTC / Local Bus:</span>
                  <span className="text-slate-600">{destination.howToReach.byBus}</span>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                <Train className="w-4 h-4 text-secondary-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-900 block">Nearest Railway:</span>
                  <span className="text-slate-600">{destination.howToReach.byTrain}</span>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                <Car className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-900 block">By Road / Taxi / Auto:</span>
                  <span className="text-slate-600">{destination.howToReach.byRoad}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Visitor Tips & Accessibility */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200/60 text-xs">
              <h4 className="font-bold text-blue-950 mb-2 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-blue-700" />
                <span>Visitor Tips & Etiquette</span>
              </h4>
              <ul className="space-y-1.5 text-slate-700 list-disc list-inside">
                {destination.visitorTips.map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-200/60 text-xs">
              <h4 className="font-bold text-teal-950 mb-2 flex items-center gap-1.5">
                <Accessibility className="w-4 h-4 text-teal-700" />
                <span>Accessibility Information</span>
              </h4>
              <p className="text-slate-700 leading-relaxed">
                {destination.accessibilityInfo}
              </p>
            </div>
          </div>

          {/* Nearby Public Amenities */}
          {nearbyFacilities.length > 0 && (
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                {language === 'kn' ? 'ಸಮೀಪದ ಸಾರ್ವಜನಿಕ ಸೌಲಭ್ಯಗಳು' : 'Nearby Public Facilities'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {nearbyFacilities.map((fac) => (
                  <div
                    key={fac.id}
                    onClick={() => {
                      onClose();
                      setSelectedFacility(fac);
                      setCurrentPage('facilities');
                    }}
                    className="p-3 rounded-xl border border-slate-200 hover:border-primary-300 bg-white hover:bg-primary-50/30 transition-colors cursor-pointer flex items-center justify-between"
                  >
                    <div>
                      <span className="text-xs font-bold text-slate-900 block truncate max-w-[200px]">
                        {fac.name}
                      </span>
                      <span className="text-[11px] text-slate-500 block">
                        {fac.categoryLabel}
                      </span>
                    </div>
                    <span className="text-xs text-primary-600 font-semibold underline">
                      View
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Civic Cleanliness CTA (Connects tourism to civic reporting!) */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <h4 className="text-sm font-bold flex items-center gap-1.5">
                <Flag className="w-4 h-4 text-amber-400" />
                <span>Help keep Tumakuru destinations clean & well-maintained</span>
              </h4>
              <p className="text-xs text-slate-300 mt-0.5">
                Spotted broken signage, litter, or a broken water tap here?
              </p>
            </div>
            <button
              onClick={handleReportCivicIssue}
              className="px-4 py-2 text-xs font-bold rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 transition-colors shrink-0 shadow-sm"
            >
              Report Issue for this Site
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

