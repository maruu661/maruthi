import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  Language, 
  PageView, 
  Destination, 
  Facility, 
  CivicReport, 
  Announcement, 
  CommunitySuggestion,
  CivicStatus
} from '../types';
import { DESTINATIONS_DATA } from '../data/destinations';
import { FACILITIES_DATA } from '../data/facilities';
import { INITIAL_REPORTS_DATA } from '../data/reports';
import { ANNOUNCEMENTS_DATA, COMMUNITY_SUGGESTIONS_DATA } from '../data/announcements';
import { TRANSLATIONS } from '../data/translations';

interface ToastData {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: typeof TRANSLATIONS['en'];
  
  currentPage: PageView;
  setCurrentPage: (page: PageView) => void;
  
  universalSearchQuery: string;
  setUniversalSearchQuery: (query: string) => void;
  
  destinations: Destination[];
  selectedDestination: Destination | null;
  setSelectedDestination: (dest: Destination | null) => void;
  savedDestinationIds: string[];
  toggleSaveDestination: (id: string) => void;
  
  facilities: Facility[];
  selectedFacility: Facility | null;
  setSelectedFacility: (fac: Facility | null) => void;
  updateFacilityCondition: (facilityId: string, condition: 'clean' | 'fair' | 'needs_maintenance') => void;
  
  reports: CivicReport[];
  selectedReport: CivicReport | null;
  setSelectedReport: (report: CivicReport | null) => void;
  addReport: (newReport: Omit<CivicReport, 'id' | 'createdAt' | 'updatedAt' | 'upvotes' | 'timeline'>) => CivicReport;
  updateReportStatus: (reportId: string, status: CivicStatus, officerNote: string, internalNote?: string) => void;
  upvoteReport: (reportId: string) => void;
  
  announcements: Announcement[];
  suggestions: CommunitySuggestion[];
  upvoteSuggestion: (id: string) => void;
  addSuggestion: (title: string, description: string, category: string, author: string) => void;
  
  isOffline: boolean;
  userRole: 'citizen' | 'admin';
  setUserRole: (role: 'citizen' | 'admin') => void;
  
  toasts: ToastData[];
  showToast: (message: string, type?: ToastData['type']) => void;
  dismissToast: (id: string) => void;

  openFacilityConditionModal: Facility | null;
  setOpenFacilityConditionModal: (fac: Facility | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_REPORTS = 'nama_tumukuru_reports_v1';
const LOCAL_STORAGE_SAVED_DEST = 'nama_tumukuru_saved_destinations_v1';
const LOCAL_STORAGE_FACILITIES = 'nama_tumukuru_facilities_v1';
const LOCAL_STORAGE_SUGGESTIONS = 'nama_tumukuru_suggestions_v1';
const LOCAL_STORAGE_LANG = 'nama_tumukuru_lang_v1';

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem(LOCAL_STORAGE_LANG) as Language) || 'en';
  });

  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [universalSearchQuery, setUniversalSearchQuery] = useState('');
  
  const [destinations] = useState<Destination[]>(DESTINATIONS_DATA);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  
  const [savedDestinationIds, setSavedDestinationIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_SAVED_DEST);
      return saved ? JSON.parse(saved) : ['devarayanadurga', 'amanikere-lake'];
    } catch {
      return ['devarayanadurga', 'amanikere-lake'];
    }
  });

  const [facilities, setFacilities] = useState<Facility[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_FACILITIES);
      return saved ? JSON.parse(saved) : FACILITIES_DATA;
    } catch {
      return FACILITIES_DATA;
    }
  });
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const [openFacilityConditionModal, setOpenFacilityConditionModal] = useState<Facility | null>(null);

  const [reports, setReports] = useState<CivicReport[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_REPORTS);
      return saved ? JSON.parse(saved) : INITIAL_REPORTS_DATA;
    } catch {
      return INITIAL_REPORTS_DATA;
    }
  });
  const [selectedReport, setSelectedReport] = useState<CivicReport | null>(null);

  const [announcements] = useState<Announcement[]>(ANNOUNCEMENTS_DATA);
  const [suggestions, setSuggestions] = useState<CommunitySuggestion[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_SUGGESTIONS);
      return saved ? JSON.parse(saved) : COMMUNITY_SUGGESTIONS_DATA;
    } catch {
      return COMMUNITY_SUGGESTIONS_DATA;
    }
  });

  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [userRole, setUserRole] = useState<'citizen' | 'admin'>('citizen');
  const [toasts, setToasts] = useState<ToastData[]>([]);

  // Sync Language
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(LOCAL_STORAGE_LANG, lang);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'kn' : 'en');
  };

  const t = TRANSLATIONS[language];

  // Offline listener
  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      showToast(t.onlineStatus, 'info');
    };
    const handleOffline = () => {
      setIsOffline(true);
      showToast(t.offlineStatus, 'warning');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [t]);

  // Persist reports
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_REPORTS, JSON.stringify(reports));
    } catch (e) {
      console.error('LocalStorage write error', e);
    }
  }, [reports]);

  // Persist saved destinations
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_SAVED_DEST, JSON.stringify(savedDestinationIds));
    } catch (e) {
      console.error('LocalStorage write error', e);
    }
  }, [savedDestinationIds]);

  // Persist facilities
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_FACILITIES, JSON.stringify(facilities));
    } catch (e) {
      console.error('LocalStorage write error', e);
    }
  }, [facilities]);

  // Persist suggestions
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_SUGGESTIONS, JSON.stringify(suggestions));
    } catch (e) {
      console.error('LocalStorage write error', e);
    }
  }, [suggestions]);

  // Toast Helpers
  const showToast = (message: string, type: ToastData['type'] = 'info') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      dismissToast(id);
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Toggle Save Destination
  const toggleSaveDestination = (id: string) => {
    setSavedDestinationIds((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        showToast(language === 'kn' ? 'ತಾಣವನ್ನು ಉಳಿಸಿದ ಪಟ್ಟಿಯಿಂದ ತೆಗೆಯಲಾಗಿದೆ' : 'Removed from saved places', 'info');
        return prev.filter((item) => item !== id);
      } else {
        showToast(language === 'kn' ? 'ತಾಣವನ್ನು ನಿಮ್ಮ ಪಟ್ಟಿಗೆ ಉಳಿಸಲಾಗಿದೆ!' : 'Saved to your Tumakuru travel list!', 'success');
        return [...prev, id];
      }
    });
  };

  // Update Facility Condition
  const updateFacilityCondition = (facilityId: string, condition: 'clean' | 'fair' | 'needs_maintenance') => {
    setFacilities((prev) =>
      prev.map((fac) => {
        if (fac.id === facilityId) {
          const updatedVotes = { ...fac.conditionVotes };
          if (condition === 'clean') updatedVotes.clean += 1;
          if (condition === 'fair') updatedVotes.fair += 1;
          if (condition === 'needs_maintenance') updatedVotes.needsMaintenance += 1;

          return {
            ...fac,
            condition,
            conditionVotes: updatedVotes,
            lastUpdated: 'Just now (Community verified)',
          };
        }
        return fac;
      })
    );
    showToast(
      language === 'kn'
        ? 'ಸೌಲಭ್ಯದ ಸ್ಥಿತಿಯ ನವೀಕರಣ ಯಶಸ್ವಿಯಾಗಿದೆ. ಧನ್ಯವಾದಗಳು!'
        : 'Facility condition feedback recorded. Thank you for contributing!',
      'success'
    );
  };

  // Add Civic Report
  const addReport = (newReportData: Omit<CivicReport, 'id' | 'createdAt' | 'updatedAt' | 'upvotes' | 'timeline'>): CivicReport => {
    const now = new Date();
    const dateFormatted = now.toLocaleDateString('en-GB') + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const newReport: CivicReport = {
      ...newReportData,
      id: 'rep-' + Date.now().toString(36),
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
      upvotes: 1,
      hasUpvoted: true,
      timeline: [
        {
          status: 'Submitted',
          timestamp: dateFormatted,
          note: 'Civic issue report submitted via Nama Tumukuru PWA. Demo tracking generated.'
        }
      ]
    };

    setReports((prev) => [newReport, ...prev]);
    showToast(
      language === 'kn' 
        ? `ದೂರು ದಾಖಲಾಗಿದೆ! ಉಲ್ಲೇಖ ಸಂಖ್ಯೆ: ${newReport.referenceNo}` 
        : `Report submitted! Reference No: ${newReport.referenceNo}`, 
      'success'
    );
    return newReport;
  };

  // Update Report Status (for Admin)
  const updateReportStatus = (reportId: string, status: CivicStatus, officerNote: string, internalNote?: string) => {
    const now = new Date();
    const dateFormatted = now.toLocaleDateString('en-GB') + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setReports((prev) =>
      prev.map((rep) => {
        if (rep.id === reportId) {
          const updatedTimeline = [
            ...rep.timeline,
            {
              status,
              timestamp: dateFormatted,
              note: officerNote,
              officerName: userRole === 'admin' ? 'Civic Duty Officer (Smart City Tumakuru)' : undefined
            }
          ];

          const updatedInternalNotes = internalNote 
            ? [...(rep.internalNotes || []), internalNote]
            : rep.internalNotes;

          return {
            ...rep,
            status,
            updatedAt: now.toISOString(),
            timeline: updatedTimeline,
            internalNotes: updatedInternalNotes
          };
        }
        return rep;
      })
    );

    showToast(`Status updated to "${status}" for report ${reportId}`, 'success');
  };

  // Upvote Report
  const upvoteReport = (reportId: string) => {
    setReports((prev) =>
      prev.map((rep) => {
        if (rep.id === reportId) {
          const already = rep.hasUpvoted;
          return {
            ...rep,
            upvotes: already ? rep.upvotes - 1 : rep.upvotes + 1,
            hasUpvoted: !already
          };
        }
        return rep;
      })
    );
  };

  // Upvote Suggestion
  const upvoteSuggestion = (id: string) => {
    setSuggestions((prev) =>
      prev.map((sug) => {
        if (sug.id === id) {
          const already = sug.hasVoted;
          return {
            ...sug,
            votes: already ? sug.votes - 1 : sug.votes + 1,
            hasVoted: !already
          };
        }
        return sug;
      })
    );
  };

  const addSuggestion = (title: string, description: string, category: string, author: string) => {
    const newSug: CommunitySuggestion = {
      id: 'sug-' + Date.now(),
      title,
      description,
      category,
      author: author || 'Tumakuru Citizen',
      votes: 1,
      hasVoted: true,
      date: 'Just now',
      status: 'Discussion'
    };
    setSuggestions((prev) => [newSug, ...prev]);
    showToast(language === 'kn' ? 'ನಿಮ್ಮ ಸಲಹೆಯನ್ನು ಸೇರಿಸಲಾಗಿದೆ!' : 'Community suggestion posted successfully!', 'success');
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
        currentPage,
        setCurrentPage,
        universalSearchQuery,
        setUniversalSearchQuery,
        destinations,
        selectedDestination,
        setSelectedDestination,
        savedDestinationIds,
        toggleSaveDestination,
        facilities,
        selectedFacility,
        setSelectedFacility,
        updateFacilityCondition,
        reports,
        selectedReport,
        setSelectedReport,
        addReport,
        updateReportStatus,
        upvoteReport,
        announcements,
        suggestions,
        upvoteSuggestion,
        addSuggestion,
        isOffline,
        userRole,
        setUserRole,
        toasts,
        showToast,
        dismissToast,
        openFacilityConditionModal,
        setOpenFacilityConditionModal
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
