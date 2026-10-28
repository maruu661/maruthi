import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';
import { CivicCategory, CivicReport } from '../../types';
import { 
  AlertCircle, 
  CheckCircle2, 
  MapPin, 
  Camera, 
  Upload, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  ShieldAlert, 
  FileText, 
  ThumbsUp, 
  Clock, 
  X,
  Compass
} from 'lucide-react';

export const CivicReportForm: React.FC = () => {
  const { 
    addReport, 
    destinations, 
    reports, 
    setCurrentPage, 
    setSelectedReport, 
    language,
    showToast 
  } = useApp();

  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Form State
  const [category, setCategory] = useState<CivicCategory>('pothole');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [locationName, setLocationName] = useState('');
  const [touristSpotNearby, setTouristSpotNearby] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedReport, setSubmittedReport] = useState<CivicReport | null>(null);

  const categories: Array<{ id: CivicCategory; labelEn: string; labelKn: string; icon: string; desc: string }> = [
    { id: 'pothole', labelEn: 'Pothole or Damaged Road', labelKn: 'ಗುಂಡಿ ಬಿದ್ದ ರಸ್ತೆ', icon: '🚧', desc: 'Asphalt craters, cave-ins, road surface hazards' },
    { id: 'garbage', labelEn: 'Garbage or Sanitation', labelKn: 'ಕಸ ಮತ್ತು ನೈರ್ಮಲ್ಯ', icon: '🗑️', desc: 'Overflowing bins, illegal dumping, street waste' },
    { id: 'streetlight', labelEn: 'Streetlight Failure', labelKn: 'ಬೀದಿ ದೀಪ ದುರಸ್ತಿ', icon: '💡', desc: 'Dark corridors, non-functional or flickering lights' },
    { id: 'water', labelEn: 'Water Supply Issue', labelKn: 'ಕುಡಿಯುವ ನೀರು ಪೂರೈಕೆ', icon: '💧', desc: 'Pipe burst, contaminated supply, zero water pressure' },
    { id: 'drainage', labelEn: 'Drainage & Sewage Block', labelKn: 'ಒಳಚರಂಡಿ ಬ್ಲಾಕ್', icon: '🌊', desc: 'Storm water drain overflow, stagnant water' },
    { id: 'public_facility', labelEn: 'Public Facility Problem', labelKn: 'ಸಾರ್ವಜನಿಕ ಸೌಲಭ್ಯ ಸಮಸ್ಯೆ', icon: '🏢', desc: 'Broken doors in restrooms, damaged bus shelters' },
    { id: 'tourist_cleanliness', labelEn: 'Tourist-Area Cleanliness', labelKn: 'ಪ್ರವಾಸಿ ತಾಣದ ಸ್ವಚ್ಛತೆ', icon: '🏞️', desc: 'Litter on hill trails, overflowing bins near attractions' },
    { id: 'tourist_signage', labelEn: 'Damaged Tourist Signage', labelKn: 'ಹಾನಿಗೊಳಗಾದ ಮಾರ್ಗ ಫಲಕ', icon: '🪧', desc: 'Missing or illegible directional boards at heritage spots' },
    { id: 'other', labelEn: 'Other Civic Concern', labelKn: 'ಇತರ ನಾಗರಿಕ ಸಮಸ್ಯೆ', icon: '⚠️', desc: 'Encroachments, stray animals, park upkeep' },
  ];

  // Sample photo choices for rapid prototype testing
  const samplePhotos = [
    'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=600&q=80',
  ];

  // NammaFix Proximity duplicate check
  const potentialDuplicates = reports.filter((r) => {
    if (r.category === category && r.status !== 'Resolved') {
      if (touristSpotNearby && r.touristSpotNearby === touristSpotNearby) return true;
      if (locationName && r.locationName.toLowerCase().includes(locationName.toLowerCase().slice(0, 5))) return true;
    }
    return false;
  });

  const handleNextFromCategory = () => {
    setStep(2);
  };

  const handleNextFromLocation = () => {
    if (!locationName.trim()) {
      showToast('Please provide a landmark or location address.', 'warning');
      return;
    }
    setStep(3);
  };

  const handleNextFromDetails = () => {
    if (!title.trim() || !description.trim()) {
      showToast('Please fill out the issue title and description.', 'warning');
      return;
    }

    // If potential duplicates exist, show NammaFix duplicate review step!
    if (potentialDuplicates.length > 0) {
      setStep(4);
    } else {
      executeSubmission();
    }
  };

  const executeSubmission = () => {
    setIsSubmitting(true);

    setTimeout(() => {
      // Generate reference number TUM-2026-XXXX
      const randomDigits = Math.floor(1000 + Math.random() * 9000);
      const referenceNo = `TUM-2026-${randomDigits}`;

      const catObj = categories.find((c) => c.id === category);

      // Choose coordinates based on tourist spot or Tumakuru center
      let coords: [number, number] = [13.3400 + (Math.random() - 0.5) * 0.03, 77.1000 + (Math.random() - 0.5) * 0.03];
      if (touristSpotNearby) {
        const dest = destinations.find((d) => d.name === touristSpotNearby);
        if (dest) {
          coords = [dest.coordinates[0] + (Math.random() - 0.5) * 0.005, dest.coordinates[1] + (Math.random() - 0.5) * 0.005];
        }
      }

      const newRep = addReport({
        referenceNo,
        title,
        description,
        category,
        categoryLabel: catObj ? catObj.labelEn : 'Civic Issue',
        status: 'Submitted',
        priority: category === 'pothole' || category === 'water' ? 'Critical' : 'Medium',
        locationName,
        touristSpotNearby: touristSpotNearby || undefined,
        coordinates: coords,
        imageUrl: imagePreview || samplePhotos[0],
        isDemo: true,
        assignedDepartment: touristSpotNearby ? 'Tourism & Smart City Rapid Action' : 'Tumakuru City Corporation',
      });

      setSubmittedReport(newRep);
      setIsSubmitting(false);
      setStep(5);

      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }, 900);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      {/* Step Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
          <span>Step {step} of 5</span>
          <span>
            {step === 1 && 'Select Category'}
            {step === 2 && 'Location & Proximity'}
            {step === 3 && 'Details & Photo'}
            {step === 4 && 'NammaFix Duplicate Check'}
            {step === 5 && 'Confirmation'}
          </span>
        </div>
        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-primary-600 h-full transition-all duration-300 rounded-full"
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card">
        
        {/* STEP 1: CATEGORY SELECTION */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary-600 block mb-1">
                Step 1: Category Selection
              </span>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                {language === 'kn' ? 'ಸಮಸ್ಯೆಯ ವರ್ಗವನ್ನು ಆರಿಸಿ' : 'What issue would you like to report?'}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Select the civic or tourism-area maintenance category that best matches your observation.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {categories.map((cat) => {
                const isSelected = category === cat.id;
                return (
                  <div
                    key={cat.id}
                    onClick={() => setCategory(cat.id)}
                    className={`p-4 rounded-2xl border text-left cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                      isSelected
                        ? 'border-primary-600 bg-primary-50/70 ring-2 ring-primary-500/20 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div>
                      <span className="text-2xl block mb-2">{cat.icon}</span>
                      <h3 className="font-bold text-xs sm:text-sm text-slate-900 leading-snug">
                        {cat.labelEn}
                      </h3>
                      <p className="text-[11px] text-secondary-700 font-sans mt-0.5">
                        {cat.labelKn}
                      </p>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-2 leading-relaxed">
                      {cat.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={handleNextFromCategory}
                className="px-6 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-colors"
              >
                <span>Continue to Location</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: LOCATION & TOURIST PROXIMITY */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary-600 block mb-1">
                Step 2: Location
              </span>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Where is this issue located?
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Provide the street, landmark, or identify if it is near a tourist attraction.
              </p>
            </div>

            {/* Tourist destination proximity selector */}
            <div className="p-4 rounded-2xl bg-secondary-50/70 border border-secondary-200 text-xs space-y-2">
              <label className="font-bold text-secondary-900 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-secondary-700" />
                <span>Is this issue near a famous tourist destination? (Optional)</span>
              </label>
              <select
                value={touristSpotNearby}
                onChange={(e) => {
                  setTouristSpotNearby(e.target.value);
                  if (e.target.value && !locationName) {
                    setLocationName(`Approach area / entrance of ${e.target.value}`);
                  }
                }}
                className="w-full p-2.5 rounded-xl border border-secondary-300 bg-white text-slate-800 text-xs font-medium focus:ring-2 focus:ring-secondary-500"
              >
                <option value="">No, it is in a residential or commercial city area</option>
                {destinations.map((d) => (
                  <option key={d.id} value={d.name}>
                    {d.name} ({d.categoryLabel})
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-secondary-700">
                Tagging a destination automatically alerts the <strong>Smart City Tourism Infrastructure Patrol</strong>.
              </p>
            </div>

            {/* Location Address & Landmark */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Specific Landmark, Street, or Cross Road <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="e.g. Near Town Hall Circle, opposite General Hospital gate, B.H. Road"
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            {/* Simulated GPS Pin Box */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Simulated High-Precision GPS Tagging Active</span>
              </div>
              <span className="font-mono text-slate-500 text-[11px]">13.3402° N, 77.1009° E</span>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                onClick={handleNextFromLocation}
                className="px-6 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-colors"
              >
                <span>Continue to Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: DETAILS & PHOTO UPLOAD */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary-600 block mb-1">
                Step 3: Issue Details & Evidence
              </span>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Describe the problem
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Accurate descriptions and photos speed up municipal assignment and verification.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Report Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Broken directional board on hill climb path"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Detailed Description <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="Explain what is damaged, safety risks for citizens or tourists, and how long the issue has persisted..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              {/* Photo Upload Section */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Attach Photo Evidence
                </label>
                
                {imagePreview ? (
                  <div className="relative h-44 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      onClick={() => setImagePreview(null)}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white hover:bg-black/80"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-slate-200 rounded-2xl p-4 text-center space-y-2">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-500">
                      <Camera className="w-5 h-5" />
                    </div>
                    <p className="text-xs text-slate-600">
                      Tap sample prototype photo below or upload from camera
                    </p>
                    
                    {/* Quick Sample Photo Chips */}
                    <div className="flex justify-center gap-2 pt-1">
                      {samplePhotos.map((url, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setImagePreview(url)}
                          className="text-[11px] font-semibold text-primary-700 bg-primary-50 px-2.5 py-1 rounded-lg border border-primary-200 hover:bg-primary-100"
                        >
                          Use Sample Photo #{i + 1}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                onClick={() => setStep(2)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                onClick={handleNextFromDetails}
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-colors"
              >
                {isSubmitting ? (
                  <span>Submitting Report...</span>
                ) : (
                  <>
                    <span>Verify & Submit</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: NAMMAFIX DUPLICATE DETECTION WARNING */}
        {step === 4 && (
          <div className="space-y-5 animate-fadeIn">
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 flex items-start gap-3">
              <ShieldAlert className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-sm">
                  NammaFix Intelligent Discovery: Similar Issue Already Reported!
                </h3>
                <p className="text-xs text-amber-900/90 mt-1">
                  Our system discovered {potentialDuplicates.length} pending report(s) in the same vicinity and category. 
                  To prevent duplicate tickets and accelerate municipal response, you can upvote an existing report or continue submitting a fresh ticket.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Existing Nearby Reports:
              </span>
              {potentialDuplicates.map((dup) => (
                <div key={dup.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs font-bold text-primary-700 bg-primary-50 px-2 py-0.5 rounded">
                        {dup.referenceNo}
                      </span>
                      <span className="text-xs font-semibold text-slate-700">{dup.status}</span>
                    </div>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900">{dup.title}</h4>
                    <p className="text-[11px] text-slate-500">{dup.locationName}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedReport(dup);
                        setCurrentPage('track');
                      }}
                      className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-800"
                    >
                      Inspect & Upvote
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => setStep(3)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Back to Edit
              </button>

              <button
                onClick={executeSubmission}
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs"
              >
                {isSubmitting ? 'Submitting...' : 'Proceed with Fresh Report'}
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: CONFIRMATION & REFERENCE NUMBER */}
        {step === 5 && submittedReport && (
          <div className="text-center py-6 space-y-5 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider border border-emerald-200">
                Submission Successful
              </span>
              <h2 className="text-2xl font-black text-slate-900 mt-2">
                Thank you for improving Tumakuru!
              </h2>
              <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
                Your report has been logged in the Smart City portal and forwarded to the designated municipal field division.
              </p>
            </div>

            {/* Generated Reference Card */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 max-w-md mx-auto text-left space-y-2">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <span className="text-xs text-slate-500">Tracking Reference No:</span>
                <span className="font-mono font-black text-base text-primary-700 bg-primary-50 px-2.5 py-0.5 rounded-lg border border-primary-200">
                  {submittedReport.referenceNo}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Assigned Department:</span>
                <span className="font-semibold text-slate-800">{submittedReport.assignedDepartment}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Status:</span>
                <span className="font-semibold text-blue-700">Submitted (Under Review)</span>
              </div>
              <div className="text-[11px] text-amber-700 italic pt-1">
                Notice: Simulated submission for Smart City Hackathon pilot.
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => {
                  setSelectedReport(submittedReport);
                  setCurrentPage('track');
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                <Clock className="w-4 h-4" />
                <span>Track This Report</span>
              </button>

              <button
                onClick={() => {
                  setStep(1);
                  setTitle('');
                  setDescription('');
                  setLocationName('');
                  setTouristSpotNearby('');
                  setImagePreview(null);
                  setSubmittedReport(null);
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs"
              >
                Submit Another Issue
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
