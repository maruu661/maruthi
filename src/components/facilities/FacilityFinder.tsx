import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FacilityCategory, Facility } from '../../types';
import { FacilityCard } from './FacilityCard';
import { ConditionUpdateModal } from './ConditionUpdateModal';
import { 
  Layers, 
  Search, 
  MapPin, 
  Droplet, 
  HeartPulse, 
  Bus, 
  Car, 
  Accessibility, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle,
  Map
} from 'lucide-react';

export const FacilityFinder: React.FC = () => {
  const { facilities, language, setCurrentPage } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<FacilityCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyAccessible, setOnlyAccessible] = useState(false);
  const [modalFacility, setModalFacility] = useState<Facility | null>(null);

  const categories: Array<{ id: FacilityCategory; labelEn: string; labelKn: string; icon: React.ReactNode }> = [
    { id: 'all', labelEn: 'All Facilities', labelKn: 'ಎಲ್ಲಾ ಸೌಲಭ್ಯಗಳು', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'toilet', labelEn: 'Public Toilets', labelKn: 'ಶೌಚಾಲಯಗಳು', icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
    { id: 'water', labelEn: 'Drinking Water ATMs', labelKn: 'ಕುಡಿಯುವ ನೀರು', icon: <Droplet className="w-3.5 h-3.5" /> },
    { id: 'hospital', labelEn: 'Hospitals & Emergency', labelKn: 'ಆಸ್ಪತ್ರೆಗಳು', icon: <HeartPulse className="w-3.5 h-3.5" /> },
    { id: 'bus', labelEn: 'Bus Terminals & Stops', labelKn: 'ಬಸ್ ನಿಲ್ದಾಣಗಳು', icon: <Bus className="w-3.5 h-3.5" /> },
    { id: 'parking', labelEn: 'Parking Areas', labelKn: 'ವಾಹನ ಪಾರ್ಕಿಂಗ್', icon: <Car className="w-3.5 h-3.5" /> },
  ];

  const filteredFacilities = facilities.filter((fac) => {
    // Search
    const q = searchQuery.toLowerCase().trim();
    if (q) {
      const matchName = fac.name.toLowerCase().includes(q);
      const matchKn = fac.nameKn.includes(q);
      const matchAddress = fac.address.toLowerCase().includes(q);
      const matchTourist = fac.touristSpotNearby?.toLowerCase().includes(q);
      if (!matchName && !matchKn && !matchAddress && !matchTourist) return false;
    }

    // Category
    if (selectedCategory !== 'all' && fac.category !== selectedCategory) {
      return false;
    }

    // Accessible filter
    if (onlyAccessible && !fac.accessibleWheelchair) {
      return false;
    }

    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold mb-2 border border-teal-200">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
            <span>{language === 'kn' ? 'ಸ್ಮಾರ್ಟ್ ಸಿಟಿ ಪರಿಶೀಲಿತ ಸೌಲಭ್ಯಗಳು' : 'Tumakuru Smart City Verified Amenities'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {language === 'kn' ? 'ಸಾರ್ವಜನಿಕ ಸೌಲಭ್ಯಗಳ ಶೋಧಕ' : 'Public Facility Finder'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
            Locate verified public restrooms, pure RO drinking water ATMs, emergency health centers, and parking spots across Tumakuru.
          </p>
        </div>

        <button
          onClick={() => setCurrentPage('map')}
          className="px-4 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-colors shrink-0"
        >
          <Map className="w-4 h-4" />
          <span>Switch to Map View</span>
        </button>
      </div>

      {/* Search & Category Filter Section */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder={language === 'kn' ? 'ಸೌಲಭ್ಯ ಅಥವಾ ಬಡಾವಣೆಯನ್ನು ಹುಡುಕಿ...' : 'Search by facility name, address, or landmark (e.g. KSRTC, Amanikere, Hospital)...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-slate-50 focus:bg-white"
            />
          </div>

          {/* Accessible Checkbox */}
          <button
            onClick={() => setOnlyAccessible(!onlyAccessible)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 shrink-0 ${
              onlyAccessible
                ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Accessibility className="w-4 h-4" />
            <span>Wheelchair Accessible Only</span>
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full font-medium whitespace-nowrap transition-all border flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-secondary-600 text-white border-secondary-600 shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                {cat.icon}
                <span>{language === 'kn' ? cat.labelKn : cat.labelEn}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Facilities Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Found {filteredFacilities.length} Public Facilities
          </span>
          <span className="text-xs text-slate-400">
            Data verified by citizen reports and municipal inspections
          </span>
        </div>

        {filteredFacilities.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-xs">
            <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No facilities matching criteria</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
              Try clearing filters or search query to view all Tumakuru public utilities.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setOnlyAccessible(false);
              }}
              className="px-4 py-2 text-xs font-bold rounded-xl bg-secondary-600 text-white hover:bg-secondary-700"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredFacilities.map((fac) => (
              <FacilityCard 
                key={fac.id} 
                facility={fac} 
                onOpenConditionModal={(f) => setModalFacility(f)} 
              />
            ))}
          </div>
        )}
      </div>

      {/* Condition Update Modal */}
      <ConditionUpdateModal
        facility={modalFacility}
        onClose={() => setModalFacility(null)}
      />
    </div>
  );
};
