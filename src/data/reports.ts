import { CivicReport } from '../types';

export const INITIAL_REPORTS_DATA: CivicReport[] = [
  {
    id: 'rep-4821',
    referenceNo: 'TUM-2026-4821',
    title: 'Damaged Directional Signage on Devarayanadurga Ghat Road',
    description: 'The reflective directional sign at hairpin bend #3 towards Yoga Narasimha Temple has fallen due to wind and heavy brush, creating confusion for night-time pilgrims and tourists.',
    category: 'tourist_signage',
    categoryLabel: 'Damaged Tourist Signage',
    status: 'In Progress',
    priority: 'High',
    locationName: 'Hairpin Bend 3, DD Hills Ghat Road',
    coordinates: [13.3718, 77.2091],
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=800&q=80',
    createdAt: '2026-10-24T09:30:00Z',
    updatedAt: '2026-10-27T14:15:00Z',
    touristSpotNearby: 'Devarayanadurga (DD Hills)',
    isDemo: true,
    upvotes: 43,
    hasUpvoted: false,
    assignedDepartment: 'Tourism Infrastructure & PWD Division',
    timeline: [
      {
        status: 'Submitted',
        timestamp: '2026-10-24 09:30 AM',
        note: 'Report submitted by citizen via Nama Tumukuru PWA with geo-tagged photograph.',
      },
      {
        status: 'Under Review',
        timestamp: '2026-10-25 11:00 AM',
        note: 'Verified by Smart City Civic Desk. Categorized under Tourist Route Safety.',
        officerName: 'Assistant Engineer, PWD Tumakuru Zone',
      },
      {
        status: 'In Progress',
        timestamp: '2026-10-27 02:15 PM',
        note: 'Fabrication order issued for heavy-gauge retro-reflective sign board. Site clearance team scheduled for tomorrow morning.',
        officerName: 'Junior Engineer, Road Maintenance Wing',
      }
    ],
    internalNotes: [
      'Coordinate with Forest Range Officer, Devarayanadurga range for clearance permission.',
      'Check if solar blinker needs replacement as well.'
    ]
  },
  {
    id: 'rep-3190',
    referenceNo: 'TUM-2026-3190',
    title: 'Overflowing Waste Bins near Amanikere Lake Food Kiosks',
    description: 'Weekend tourist footfall caused litter accumulation and overflowing wet waste bins near the Glass House southern promenade.',
    category: 'tourist_cleanliness',
    categoryLabel: 'Tourist-Area Cleanliness',
    status: 'Resolved',
    priority: 'Medium',
    locationName: 'Glasshouse Promenade, Amanikere Park',
    coordinates: [13.3424, 77.1089],
    imageUrl: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=800&q=80',
    createdAt: '2026-10-22T16:20:00Z',
    updatedAt: '2026-10-23T11:45:00Z',
    touristSpotNearby: 'Amanikere Lake & Glass House',
    isDemo: true,
    upvotes: 28,
    hasUpvoted: true,
    assignedDepartment: 'City Corporation Solid Waste Management',
    timeline: [
      {
        status: 'Submitted',
        timestamp: '2026-10-22 04:20 PM',
        note: 'Citizen report flagged via NammaFix proximity scanner.',
      },
      {
        status: 'Under Review',
        timestamp: '2026-10-22 06:00 PM',
        note: 'Assigned to Ward 14 evening sanitation rapid action patrol.',
        officerName: 'Health Inspector, Ward 14',
      },
      {
        status: 'In Progress',
        timestamp: '2026-10-23 07:15 AM',
        note: 'Clean-up vehicle dispatched. 4 twin-compartment bins emptied and washed.',
        officerName: 'Sanitation Supervisor',
      },
      {
        status: 'Resolved',
        timestamp: '2026-10-23 11:45 AM',
        note: 'Site sanitized. Additional 240L bins installed for weekend rush. Verified by Park Supervisor.',
        officerName: 'Chief Health Officer, CC Tumakuru',
      }
    ],
    internalNotes: [
      'Permanent twin-bin installation scheduled under Smart City Lake Revitalization phase 2.'
    ]
  },
  {
    id: 'rep-8812',
    referenceNo: 'TUM-2026-8812',
    title: 'Deep Pothole at B.H. Road Junction near Town Hall',
    description: 'Post-rain depression and loose asphalt right in front of the Town Hall signal causing traffic congestion and two-wheeler skid hazards.',
    category: 'pothole',
    categoryLabel: 'Pothole or Damaged Road',
    status: 'In Progress',
    priority: 'Critical',
    locationName: 'B.H. Road, opposite Town Hall Circle',
    coordinates: [13.3382, 77.1035],
    imageUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80',
    createdAt: '2026-10-25T08:10:00Z',
    updatedAt: '2026-10-27T10:00:00Z',
    isDemo: true,
    upvotes: 67,
    hasUpvoted: false,
    assignedDepartment: 'Tumakuru Smart City Roads & Infrastructure',
    timeline: [
      {
        status: 'Submitted',
        timestamp: '2026-10-25 08:10 AM',
        note: 'Citizen report received with GPS location.',
      },
      {
        status: 'Under Review',
        timestamp: '2026-10-25 10:30 AM',
        note: 'High traffic junction priority tag assigned.',
        officerName: 'Executive Engineer, Smart City Works',
      },
      {
        status: 'In Progress',
        timestamp: '2026-10-27 10:00 AM',
        note: 'Cold-mix asphalt patch team mobilized. Temporary barricade placed.',
        officerName: 'Section Officer, Roads',
      }
    ]
  },
  {
    id: 'rep-5509',
    referenceNo: 'TUM-2026-5509',
    title: 'Low Water Pressure at Public RO ATM Near Central Bus Stand',
    description: 'Drinking water dispenser is running on very low output and dispensing warm water during afternoon hours.',
    category: 'public_facility',
    categoryLabel: 'Public Facility',
    status: 'Under Review',
    priority: 'Medium',
    locationName: 'KSRTC Central Bus Stand Platform 1 Outgate',
    coordinates: [13.3400, 77.1012],
    createdAt: '2026-10-26T15:40:00Z',
    updatedAt: '2026-10-27T09:10:00Z',
    isDemo: true,
    upvotes: 19,
    hasUpvoted: false,
    assignedDepartment: 'Karnataka Urban Water Supply Board (KUWSDB)',
    timeline: [
      {
        status: 'Submitted',
        timestamp: '2026-10-26 03:40 PM',
        note: 'Complaint lodged regarding drinking water dispenser flow rate.',
      },
      {
        status: 'Under Review',
        timestamp: '2026-10-27 09:10 AM',
        note: 'Service request dispatched to RO maintenance vendor for filter inspection.',
        officerName: 'Technical Assistant, Water Supply',
      }
    ]
  },
  {
    id: 'rep-1934',
    referenceNo: 'TUM-2026-1934',
    title: 'Non-Functional Streetlights along Siddaganga Math Approach Road',
    description: 'Three consecutive LED streetlights are flickering or dead along the pedestrian pathway from Kyatsandra underpass to Math main arch.',
    category: 'streetlight',
    categoryLabel: 'Streetlight',
    status: 'Resolved',
    priority: 'High',
    locationName: 'Math Approach Avenue, Kyatsandra',
    coordinates: [13.3210, 77.1450],
    createdAt: '2026-10-20T19:00:00Z',
    updatedAt: '2026-10-21T18:30:00Z',
    touristSpotNearby: 'Siddaganga Math',
    isDemo: true,
    upvotes: 35,
    assignedDepartment: 'BESCOM & Smart City Street Lighting Division',
    timeline: [
      {
        status: 'Submitted',
        timestamp: '2026-10-20 07:00 PM',
        note: 'Reported by local pilgrim volunteer.',
      },
      {
        status: 'Under Review',
        timestamp: '2026-10-21 09:00 AM',
        note: 'Feeder box inspection scheduled.',
        officerName: 'Assistant Executive Engineer, BESCOM',
      },
      {
        status: 'In Progress',
        timestamp: '2026-10-21 02:00 PM',
        note: 'Loose neutral wire at pole #14 tightened and 2 LED luminaires replaced under warranty.',
        officerName: 'Lineman Crew 3',
      },
      {
        status: 'Resolved',
        timestamp: '2026-10-21 06:30 PM',
        note: 'Lighting tested and verified at dusk. All 3 fixtures illuminating at 100% capacity.',
        officerName: 'Field Inspector, Smart City Lighting',
      }
    ]
  }
];
