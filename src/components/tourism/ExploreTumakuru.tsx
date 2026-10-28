import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TourismCategory, Destination } from '../../types';
import { DestinationCard } from './DestinationCard';
import { DestinationDetailModal } from './DestinationDetailModal';
import { ItinerariesList } from './ItinerariesList';
import { 
  Compass, 
  Search, 
  Bookmark, 
  MapPin, 
  SlidersHorizontal, 
  Sparkles, 
  Info, 
  Map, 
  LayoutGrid, 
  Calendar 
} from 'lucide-react';

export const ExploreTumakuru: React.FC = () => {
  const { 
    destinations, 
    selectedDestination, 
    setSelectedDestination, 
    savedDestinationIds,
    language,
    setCurrentPage,
    universalSearchQuery,
    setUniversalSearchQuery
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<TourismCategory>('all');
  const [scopeFilter, setScopeFilter] = useState<'all' | 'city' | 'district'>('all');
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [showItineraries, setShowItineraries] = useState(false);

  const categories: Array<{ id: TourismCategory; labelEn: string; labelKn: string }> = [
    { id: 'all', labelEn: 'All Attractions', labelKn: 'ಎಲ್ಲಾ ತಾಣಗಳು' },
    { id: 'nature', labelEn: 'Nature & Hills', labelKn: 'ಪ್ರಕೃತಿ ಮತ್ತು ಬೆಟ್ಟಗಳು' },
    { id: 'temples', labelEn: 'Temples & Spiritual', labelKn: 'ದೇವಾಲಯಗಳು & ಪವಿತ್ರ ಕ್ಷೇತ್ರ' },
    { id: 'forts', labelEn: 'Forts & Heritage', labelKn: 'ಕೋಟೆ & ಇತಿಹಾಸ' },
    { id: 'scenic', labelEn: 'Scenic Spots', labelKn: 'ರಮಣೀಯ ತಾಣಗಳು' },
    { id: 'family', labelEn: 'Family Visits & Parks', labelKn: 'ಕುಟುಂಬ ವಿಹಾರ' },
    { id: 'near', labelEn: 'City Landmarks', labelKn: 'ನಗರದೊಳಗಿನ ತಾಣಗಳು' },
  ];

  // Filtering
  const filteredDestinations = destinations.filter((dest) => {
    // Search query
    const query = universalSearchQuery.toLowerCase().trim();
    if (query) {
      const matchName = dest.name.toLowerCase().includes(query);
      const matchKn = dest.nameKn.includes(query);
      const matchDesc = dest.shortDesc.toLowerCase().includes(query);
      const matchHighlights = dest.highlights.some((h) => h.toLowerCase().includes(query));
      if (!matchName && !matchKn && !matchDesc && !matchHighlights) return false;
    }

    // Category
    if (selectedCategory !== 'all' && dest.category !== selectedCategory) {
      return false;
    }

    // Scope (City vs District)
    if (scopeFilter !== 'all' && dest.locationScope !== scopeFilter) {
      return false;
    }

    // Saved only
    if (showSavedOnly && !savedDestinationIds.includes(dest.id)) {
      return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 space-y-8 max-w-7xl mx-auto">
      
      {/* Page Header */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-primary-900 via-primary-800 to-secondary-900 text-white p-6 sm:p-10 shadow-lg">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-amber-300 text-xs font-semibold border border-white/15">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'kn' ? 'ತುಮಕೂರು ಪ್ರವಾಸೋದ್ಯಮ ಗೈಡ್' : 'Signature Tourism Experience'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {language === 'kn' ? 'ತುಮಕೂರು ಪ್ರವಾಸೋದ್ಯಮ ಅನ್ವೇಷಣೆ' : 'Explore Tumakuru Destinations'}
          </h1>
          
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
            {language === 'kn'
              ? 'ಪೌರಾಣಿಕ ಬೆಟ್ಟಗಳು, ಇತಿಹಾಸ ಪ್ರಸಿದ್ಧ ಕೋಟೆಗಳು, ಪವಿತ್ರ ಮಠಗಳು ಹಾಗೂ ಹಚ್ಚ ಹಸಿರಿನ ಪರಿಸರ. ನಿಮ್ಮ ವಾರಾಂತ್ಯದ ಯಾತ್ರೆಯನ್ನು ಇಂದೇ ಯೋಜಿಸಿ.'
              : 'Discover majestic monoliths, sacred cave temples, serene springs, and scenic reservoirs. A smart local guide crafted for visitors and residents alike.'}
          </p>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setCurrentPage('map')}
              className="px-4 py-2 rounded-xl bg-white text-primary-900 font-bold text-xs hover:bg-slate-100 transition-colors flex items-center gap-2 shadow-sm"
            >
              <Map className="w-4 h-4 text-primary-600" />
              <span>Interactive Tourism Map</span>
            </button>

            <button
              onClick={() => setShowItineraries(!showItineraries)}
              className="px-4 py-2 rounded-xl bg-secondary-500/30 hover:bg-secondary-500/40 text-white font-semibold text-xs border border-white/20 backdrop-blur-md transition-colors flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-amber-300" />
              <span>{showItineraries ? 'Show Destination Cards' : 'Suggested Itineraries'}</span>
            </button>
          </div>
        </div>

        {/* Subtle decorative background circle */}
        <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-white/5 rounded-full pointer-events-none blur-2xl" />
      </div>

      {/* Traveler Notice Banner */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-50 border border-amber-200/90 text-amber-900 flex items-start gap-3 text-xs leading-relaxed">
        <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong className="font-semibold block text-amber-950">Notice for Travelers:</strong>
          These destinations are presented for exploration and local awareness. Timings, forest checkposts, and temple customs may vary by season. Confirm current conditions before traveling.
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-4">
        {/* Search & Scope Row */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Field */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder={language === 'kn' ? 'ತಾಣಗಳು, ಬೆಟ್ಟಗಳು, ದೇವಾಲಯಗಳನ್ನು ಹುಡುಕಿ...' : 'Search by place name, features, or keywords (e.g. DD Hills, trek, deer)...'}
              value={universalSearchQuery}
              onChange={(e) => setUniversalSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-slate-50 focus:bg-white transition-all"
            />
          </div>

          {/* Scope Filters: All, City, District */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl self-start md:self-auto text-xs">
            <button
              onClick={() => setScopeFilter('all')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                scopeFilter === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Locations
            </button>
            <button
              onClick={() => setScopeFilter('city')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                scopeFilter === 'city'
                  ? 'bg-white text-primary-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              City Center (≤ 5km)
            </button>
            <button
              onClick={() => setScopeFilter('district')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                scopeFilter === 'district'
                  ? 'bg-white text-secondary-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Wider District & Taluks
            </button>
          </div>

          {/* Saved places shortcut */}
          <button
            onClick={() => setShowSavedOnly(!showSavedOnly)}
            className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 shrink-0 ${
              showSavedOnly
                ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${showSavedOnly ? 'fill-slate-950' : ''}`} />
            <span>Saved ({savedDestinationIds.length})</span>
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full font-medium whitespace-nowrap transition-all border ${
                  isSelected
                    ? 'bg-primary-600 text-white border-primary-600 shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                {language === 'kn' ? cat.labelKn : cat.labelEn}
              </button>
            );
          })}
        </div>
      </div>

      {/* Suggested Itineraries Toggle Section */}
      {showItineraries && (
        <div className="p-6 rounded-3xl bg-amber-50/50 border border-amber-200/70 animate-fadeIn">
          <ItinerariesList />
        </div>
      )}

      {/* Destinations Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Showing {filteredDestinations.length} of {destinations.length} Destinations
          </span>
          {showSavedOnly && (
            <button
              onClick={() => setShowSavedOnly(false)}
              className="text-xs text-primary-600 hover:underline font-semibold"
            >
              Show all destinations
            </button>
          )}
        </div>

        {filteredDestinations.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-xs">
            <Compass className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No destinations found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
              Try adjusting your category filter, clearing your search query, or disabling the saved filter.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setScopeFilter('all');
                setShowSavedOnly(false);
                setUniversalSearchQuery('');
              }}
              className="px-4 py-2 text-xs font-bold rounded-xl bg-primary-600 text-white hover:bg-primary-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDestinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        )}
      </div>

      {/* Destination Detail Modal */}
      <DestinationDetailModal
        destination={selectedDestination}
        onClose={() => setSelectedDestination(null)}
      />
    </div>
  );
};
