export type Language = 'en' | 'kn';

export type PageView = 
  | 'home' 
  | 'explore' 
  | 'map' 
  | 'facilities' 
  | 'report' 
  | 'track' 
  | 'nammafix' 
  | 'community' 
  | 'dashboard' 
  | 'admin';

export type TourismCategory = 
  | 'all'
  | 'nature' 
  | 'temples' 
  | 'forts' 
  | 'scenic' 
  | 'family' 
  | 'near';

export interface Destination {
  id: string;
  name: string;
  nameKn: string;
  category: TourismCategory;
  categoryLabel: string;
  categoryLabelKn: string;
  shortDesc: string;
  shortDescKn: string;
  fullDesc: string;
  fullDescKn: string;
  locationScope: 'city' | 'district';
  locationLabel: string;
  locationLabelKn: string;
  distanceFromCityCenter: string;
  travelTimeEst: string;
  coordinates: [number, number]; // [lat, lng]
  image: string;
  gallery?: string[];
  highlights: string[];
  bestSeason: string;
  timingsNotice: string;
  howToReach: {
    byBus: string;
    byTrain: string;
    byRoad: string;
  };
  visitorTips: string[];
  accessibilityInfo: string;
  nearbyFacilityIds: string[];
  isFeatured?: boolean;
}

export type FacilityCategory = 
  | 'all'
  | 'toilet' 
  | 'water' 
  | 'hospital' 
  | 'bus' 
  | 'parking' 
  | 'park' 
  | 'accessible';

export interface Facility {
  id: string;
  name: string;
  nameKn: string;
  category: FacilityCategory;
  categoryLabel: string;
  categoryLabelKn: string;
  address: string;
  addressKn: string;
  locationLabel: string;
  coordinates: [number, number];
  verificationStatus: 'verified' | 'community' | 'unverified';
  condition: 'clean' | 'fair' | 'needs_maintenance';
  conditionVotes: {
    clean: number;
    fair: number;
    needsMaintenance: number;
  };
  accessibleWheelchair: boolean;
  accessibleTactile: boolean;
  timingsNotice: string;
  contact?: string;
  touristSpotNearby?: string;
  lastUpdated: string;
}

export type CivicCategory = 
  | 'pothole' 
  | 'garbage' 
  | 'streetlight' 
  | 'water' 
  | 'drainage' 
  | 'public_facility' 
  | 'tourist_cleanliness' 
  | 'tourist_signage' 
  | 'other';

export type CivicStatus = 
  | 'Submitted' 
  | 'Under Review' 
  | 'In Progress' 
  | 'Resolved' 
  | 'Rejected';

export interface TimelineEntry {
  status: CivicStatus;
  timestamp: string;
  note: string;
  officerName?: string;
}

export interface CivicReport {
  id: string;
  referenceNo: string;
  title: string;
  description: string;
  category: CivicCategory;
  categoryLabel: string;
  status: CivicStatus;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  locationName: string;
  coordinates: [number, number];
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
  touristSpotNearby?: string;
  isDemo: boolean;
  upvotes: number;
  hasUpvoted?: boolean;
  timeline: TimelineEntry[];
  internalNotes?: string[];
  assignedDepartment: string;
}

export interface ItineraryStop {
  destinationId: string;
  suggestedDuration: string;
  tips: string;
}

export interface Itinerary {
  id: string;
  title: string;
  titleKn: string;
  duration: 'half-day' | 'full-day';
  durationLabel: string;
  pace: 'Relaxed' | 'Moderate' | 'Active';
  description: string;
  idealFor: string;
  image: string;
  stops: ItineraryStop[];
}

export interface Announcement {
  id: string;
  title: string;
  titleKn: string;
  category: 'roads' | 'water' | 'sanitation' | 'tourism' | 'transport' | 'public';
  content: string;
  contentKn: string;
  date: string;
  officialBadge: boolean;
  isUrgent?: boolean;
}

export interface CommunitySuggestion {
  id: string;
  title: string;
  description: string;
  category: string;
  author: string;
  votes: number;
  hasVoted?: boolean;
  date: string;
  status: 'Discussion' | 'Reviewing' | 'Planned';
}

