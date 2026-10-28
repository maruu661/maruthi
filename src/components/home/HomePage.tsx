import React from 'react';
import { useApp } from '../../context/AppContext';
import { DestinationCard } from '../tourism/DestinationCard';
import { DestinationDetailModal } from '../tourism/DestinationDetailModal';
import { 
  Compass, 
  MapPin, 
  FileText, 
  Activity, 
  Search, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Droplet, 
  HeartPulse, 
  Bus, 
  Car, 
  Flame, 
  Users, 
  Calendar 
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { 
    setCurrentPage, 
    destinations, 
    facilities, 
    announcements, 
    selectedDestination, 
    setSelectedDestination, 
    universalSearchQuery, 
    setUniversalSearchQuery, 
    language 
  } = useApp();

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (universalSearchQuery.trim()) {
      setCurrentPage('explore');
    }
  };

  const featuredDestinations = destinations.slice(0, 4);
  const featuredFacilities = facilities.slice(0, 4);

  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-950 via-primary-900 to-slate-900 text-white pt-12 pb-20 sm:pt-20 sm:pb-28">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left text & search column (7 cols) */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-amber-300 text-xs font-bold border border-white/15 backdrop-blur-md shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Nama Tumukuru — ನಮ್ಮ ತುಮಕೂರು</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                {language === 'kn' ? (
                  <>
                    ತುಮಕೂರು ಅನ್ವೇಷಿಸಿ.<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-teal-300 to-sky-300">
                      ನಿಮ್ಮ ನಗರ ಸುಧಾರಿಸಿ.
                    </span>
                  </>
                ) : (
                  <>
                    Discover Tumakuru.<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-teal-300 to-sky-300">
                      Improve Your City.
                    </span>
                  </>
                )}
              </h1>

              <p className="text-sm sm:text-base lg:text-lg text-slate-200 max-w-2xl leading-relaxed mx-auto lg:mx-0">
                {language === 'kn'
                  ? 'ಐತಿಹಾಸಿಕ ಬೆಟ್ಟಗಳು, ಪವಿತ್ರ ಮಠಗಳು, ಅಗತ್ಯ ಸಾರ್ವಜನಿಕ ಸೌಲಭ್ಯಗಳನ್ನು ಕಂಡುಕೊಳ್ಳಿ ಮತ್ತು ಸುಂದರ ತುಮಕೂರಿನ ನಿರ್ಮಾಣಕ್ಕೆ ಕೈಜೋಡಿಸಿ.'
                  : 'Explore famous destinations, find essential public facilities, and help build a better Tumakuru with transparent, civic reporting.'}
              </p>

              {/* Prominent Universal Search Field */}
              <form onSubmit={handleHeroSearch} className="max-w-xl mx-auto lg:mx-0">
                <div className="relative flex items-center shadow-xl rounded-2xl bg-white p-1.5 border border-white/20">
                  <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
                  <input
                    type="text"
                    placeholder={language === 'kn' ? 'ಪ್ರವಾಸಿ ತಾಣ, ಶೌಚಾಲಯ, ಆಸ್ಪತ್ರೆ ಅಥವಾ ಸಮಸ್ಯೆ ಹುಡುಕಿ...' : 'Search places, tourist attractions, facilities, or civic services...'}
                    value={universalSearchQuery}
                    onChange={(e) => setUniversalSearchQuery(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none bg-transparent"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs shrink-0 transition-colors shadow-sm"
                  >
                    Search
                  </button>
                </div>
              </form>

              {/* Primary & Secondary Action CTAs */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => setCurrentPage('explore')}
                  className="px-6 py-3.5 rounded-2xl bg-primary-600 hover:bg-primary-500 text-white font-extrabold text-sm flex items-center gap-2 shadow-lg shadow-primary-900/50 transition-all hover:-translate-y-0.5"
                >
                  <Compass className="w-5 h-5" />
                  <span>{language === 'kn' ? 'ತುಮಕೂರು ಪ್ರವಾಸೋದ್ಯಮ' : 'Explore Tumakuru'}</span>
                </button>

                <button
                  onClick={() => setCurrentPage('report')}
                  className="px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-sm flex items-center gap-2 shadow-lg shadow-amber-950/20 transition-all hover:-translate-y-0.5"
                >
                  <FileText className="w-5 h-5" />
                  <span>{language === 'kn' ? 'ದೂರು ದಾಖಲಿಸಿ' : 'Report a Civic Issue'}</span>
                </button>
              </div>

              {/* Verified Trust Badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>7+ Iconic Attractions</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400" />
                  <span>Verified Public Restrooms</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>NammaFix Civic Synergies</span>
                </div>
              </div>
            </div>

            {/* Right visual card column (5 cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-slate-800">
                <img
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
                  alt="Devarayanadurga Hills Tumakuru"
                  className="w-full h-80 sm:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                {/* Floating pill badge */}
                <div className="absolute top-4 left-4 p-2 px-3 rounded-xl bg-white/90 backdrop-blur-md text-slate-900 text-xs font-bold shadow-md flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  <span>Devarayanadurga • 3,940 ft</span>
                </div>

                {/* Bottom destination caption */}
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="text-[11px] font-semibold text-secondary-300 uppercase tracking-wide">
                    Featured Destination
                  </span>
                  <h3 className="font-extrabold text-xl leading-snug">
                    Devarayanadurga Forest Reserve
                  </h3>
                  <p className="text-xs text-slate-200 mt-1 line-clamp-2">
                    Scenic hill temples, trekking routes, and medicinal flora just 15 km from Tumakuru city center.
                  </p>
                  <button
                    onClick={() => {
                      const dest = destinations.find((d) => d.id === 'devarayanadurga');
                      if (dest) setSelectedDestination(dest);
                    }}
                    className="mt-3 text-xs font-bold text-amber-300 hover:text-amber-200 underline underline-offset-4 flex items-center gap-1"
                  >
                    <span>Inspect details & visitor tips</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Floating mini stat card */}
              <div className="hidden sm:flex absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-200 items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-secondary-600 flex items-center justify-center font-bold">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 block">Smart City PWA</span>
                  <span className="text-[11px] text-slate-500">Offline-ready mapping & drafts</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. FOUR MAIN SERVICE CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-14 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Card 1: Explore Tourist Places */}
          <div
            onClick={() => setCurrentPage('explore')}
            className="group bg-white p-6 rounded-3xl border border-slate-200/90 shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer flex flex-col justify-between hover:-translate-y-1"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-primary-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900 group-hover:text-primary-700 transition-colors">
                1. Explore Tourist Places
              </h3>
              <p className="text-xs text-secondary-700 font-sans mt-0.5 mb-2">
                ಪ್ರವಾಸಿ ತಾಣಗಳ ದರ್ಶನ
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                Discover iconic hills, monolithic forts, ancient temples, and picturesque dams across Tumakuru.
              </p>
            </div>
            <div className="pt-4 mt-2 flex items-center gap-1 text-xs font-bold text-primary-600 group-hover:translate-x-1 transition-transform">
              <span>Start Exploring</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 2: Find Public Facilities */}
          <div
            onClick={() => setCurrentPage('facilities')}
            className="group bg-white p-6 rounded-3xl border border-slate-200/90 shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer flex flex-col justify-between hover:-translate-y-1"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-secondary-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900 group-hover:text-secondary-700 transition-colors">
                2. Find Public Facilities
              </h3>
              <p className="text-xs text-secondary-700 font-sans mt-0.5 mb-2">
                ಸಾರ್ವಜನಿಕ ಸೌಲಭ್ಯಗಳು
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                Locate clean restrooms, RO drinking water ATMs, emergency health centers, and parking lots.
              </p>
            </div>
            <div className="pt-4 mt-2 flex items-center gap-1 text-xs font-bold text-secondary-600 group-hover:translate-x-1 transition-transform">
              <span>Find Amenities</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 3: Report Civic Issues */}
          <div
            onClick={() => setCurrentPage('report')}
            className="group bg-white p-6 rounded-3xl border border-slate-200/90 shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer flex flex-col justify-between hover:-translate-y-1"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900 group-hover:text-amber-700 transition-colors">
                3. Report Civic Issues
              </h3>
              <p className="text-xs text-secondary-700 font-sans mt-0.5 mb-2">
                ನಾಗರಿಕ ಸಮಸ್ಯೆ ವರದಿ
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                Submit geo-tagged photos of potholes, waste, or tourist-corridor damage in a 3-step wizard.
              </p>
            </div>
            <div className="pt-4 mt-2 flex items-center gap-1 text-xs font-bold text-amber-600 group-hover:translate-x-1 transition-transform">
              <span>Report an Issue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 4: Track Reports */}
          <div
            onClick={() => setCurrentPage('track')}
            className="group bg-white p-6 rounded-3xl border border-slate-200/90 shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer flex flex-col justify-between hover:-translate-y-1"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900 group-hover:text-emerald-700 transition-colors">
                4. Track Reports
              </h3>
              <p className="text-xs text-secondary-700 font-sans mt-0.5 mb-2">
                ದೂರಿನ ಸ್ಥಿತಿ ಪರಿಶೀಲನೆ
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                Follow real-time vertical milestone timelines with officer notes from submission to resolution.
              </p>
            </div>
            <div className="pt-4 mt-2 flex items-center gap-1 text-xs font-bold text-emerald-600 group-hover:translate-x-1 transition-transform">
              <span>Track Reference</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

        </div>
      </section>

      {/* 3. POPULAR TOURIST DESTINATIONS PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-primary-600">
              Famous Destinations & Landmarks
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Explore Tumakuru
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Hand-picked heritage marvels, spiritual sanctuaries, and scenic reservoirs
            </p>
          </div>

          <button
            onClick={() => setCurrentPage('explore')}
            className="text-xs font-bold text-primary-600 hover:text-primary-800 flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span>View All ({destinations.length}) Destinations</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredDestinations.map((dest) => (
            <DestinationCard key={dest.id} destination={dest} />
          ))}
        </div>
      </section>

      {/* 4. NAMMAFIX FEATURE SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-tr from-amber-600 via-orange-600 to-primary-800 text-white p-8 sm:p-12 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-amber-200 text-xs font-bold backdrop-blur-xs">
              <Flame className="w-4 h-4 text-amber-300" />
              <span>NammaFix Signature Feature</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Where Smart City Tech Meets Tourism
            </h2>
            <p className="text-xs sm:text-sm text-slate-100 leading-relaxed">
              Why separate tourist sightseeing from civic maintenance? NammaFix lets visitors flag broken directional signage or litter on hill paths, while automatically filtering duplicate reports and deploying rapid action teams.
            </p>
            <div className="flex flex-wrap gap-4 pt-2 text-xs font-bold">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-300" />
                <span>Duplicate Detection</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-300" />
                <span>Tourist Corridor Priority</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-300" />
                <span>Community Upvoting</span>
              </div>
            </div>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <button
              onClick={() => setCurrentPage('nammafix')}
              className="px-6 py-3.5 rounded-2xl bg-white text-slate-900 font-bold text-xs sm:text-sm hover:bg-slate-100 transition-colors shadow-md text-center"
            >
              Explore NammaFix Engine
            </button>
            <button
              onClick={() => setCurrentPage('map')}
              className="px-6 py-3.5 rounded-2xl bg-black/20 hover:bg-black/30 text-white font-semibold text-xs sm:text-sm border border-white/20 backdrop-blur-xs transition-colors text-center"
            >
              Interactive Map
            </button>
          </div>
        </div>
      </section>

      {/* 5. NEARBY PUBLIC UTILITIES PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-secondary-600">
              Essential Public Amenities
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Public Facility Directory
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Find clean restrooms, drinking water points, and hospitals near you
            </p>
          </div>

          <button
            onClick={() => setCurrentPage('facilities')}
            className="text-xs font-bold text-secondary-700 hover:text-secondary-900 flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span>View All ({facilities.length}) Facilities</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredFacilities.map((fac) => (
            <div
              key={fac.id}
              onClick={() => setCurrentPage('facilities')}
              className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-card hover:shadow-card-hover transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">
                  {fac.categoryLabel}
                </span>
                <h3 className="font-bold text-sm text-slate-900 leading-snug">
                  {fac.name}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2">
                  {fac.address}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="capitalize font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[10px]">
                  {fac.condition.replace('_', ' ')}
                </span>
                <span className="text-primary-600 font-semibold text-xs flex items-center gap-1">
                  <span>View</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. HOW IT WORKS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xs space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-primary-600">
              Simple 4-Step Process
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              How Nama Tumukuru Works
            </h2>
            <p className="text-xs text-slate-500">
              Connecting civic pride with effortless digital transparency
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
              <span className="w-8 h-8 rounded-xl bg-primary-600 text-white text-xs font-bold flex items-center justify-center">
                1
              </span>
              <h3 className="font-bold text-sm text-slate-900">Explore & Discover</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Browse famous destinations, view interactive maps, or locate clean public facilities across Tumakuru.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
              <span className="w-8 h-8 rounded-xl bg-secondary-600 text-white text-xs font-bold flex items-center justify-center">
                2
              </span>
              <h3 className="font-bold text-sm text-slate-900">Spot an Issue</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Encounter a pothole, overflowing dustbin, broken sign, or leaking tap during your commute or travels.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
              <span className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold flex items-center justify-center">
                3
              </span>
              <h3 className="font-bold text-sm text-slate-900">Photo & Geo-Tag</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Snap a photo, confirm GPS location, and receive an instant tracking reference number without login friction.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
              <span className="w-8 h-8 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center justify-center">
                4
              </span>
              <h3 className="font-bold text-sm text-slate-900">Track & Resolve</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Follow real-time milestone transitions as municipal engineering teams inspect and verify fixes on-site.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Destination detail modal if opened */}
      <DestinationDetailModal
        destination={selectedDestination}
        onClose={() => setSelectedDestination(null)}
      />

    </div>
  );
};

