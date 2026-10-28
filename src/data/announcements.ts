import { Announcement, CommunitySuggestion } from '../types';

export const ANNOUNCEMENTS_DATA: Announcement[] = [
  {
    id: 'ann-1',
    title: 'Special Weekend Electric Shuttle Buses to Devarayanadurga & Namada Chilume',
    titleKn: 'ವಾರಾಂತ್ಯದಲ್ಲಿ ದೇವರಾಯನದುರ್ಗ & ನಾಮದ ಚಿಲುಮೆಗೆ ವಿಶೇಷ ಎಲೆಕ್ಟ್ರಿಕ್ ಬಸ್ ಸೇವೆ',
    category: 'transport',
    content: 'To ease weekend pilgrim and tourist traffic, KSRTC Tumakuru Division is deploying 6 non-polluting EV shuttle buses operating every 30 minutes from Tumakuru Central Bus Stand to Devarayanadurga foothills.',
    contentKn: 'ಪ್ರವಾಸಿಗರ ಅನುಕೂಲಕ್ಕಾಗಿ ವಾರಾಂತ್ಯದಲ್ಲಿ ತುಮಕೂರು ಬಸ್ ನಿಲ್ದಾಣದಿಂದ ದೇವರಾಯನದುರ್ಗದವರೆಗೆ ಪ್ರತಿ 30 ನಿಮಿಷಕ್ಕೊಮ್ಮೆ ಇವಿ ಬಸ್ ಸಂಚಾರ ಆರಂಭಿಸಲಾಗಿದೆ.',
    date: '28 Oct 2026',
    officialBadge: true,
    isUrgent: false
  },
  {
    id: 'ann-2',
    title: 'Plastic-Free Zone Enforcement Campaign at Namada Chilume Deer Reserve',
    titleKn: 'ನಾಮದ ಚಿಲುಮೆ ಜಿಂಕೆ ವನದಲ್ಲಿ ಪ್ಲಾಸ್ಟಿಕ್ ಮುಕ್ತ ವಲಯ ಕಟ್ಟುನಿಟ್ಟಿನ ಜಾರಿ',
    category: 'tourism',
    content: 'Karnataka Forest Department reminds all visitors that single-use plastic bottles and polythene carry bags are prohibited beyond the entrance gate. Eco-friendly cloth bags and steel water refill stations are provided at the ticketing counter.',
    contentKn: 'ಅರಣ್ಯ ಇಲಾಖೆಯಿಂದ ಏಕಬಳಕೆಯ ಪ್ಲಾಸ್ಟಿಕ್ ಬಾಟಲ್ ಮತ್ತು ಕವರ್‌ಗಳನ್ನು ಪ್ರವೇಶ ದ್ವಾರದಲ್ಲೇ ನಿರ್ಬಂಧಿಸಲಾಗಿದೆ. ಉಚಿತ ಶುದ್ಧ ನೀರಿನ ಮರುಪೂರಣ ಕಿಯೋಸ್ಕ್ ಲಭ್ಯವಿದೆ.',
    date: '27 Oct 2026',
    officialBadge: true,
    isUrgent: true
  },
  {
    id: 'ann-3',
    title: 'Amanikere Musical Fountain Timings for Karthika Maasa Season',
    titleKn: 'ಕಾರ್ತಿಕ ಮಾಸದ ಅಂಗವಾಗಿ ಅಮಾನಿಕೆರೆ ಮ್ಯೂಸಿಕಲ್ ಕಾರಂಜಿ ಪ್ರದರ್ಶನ ಸಮಯ',
    category: 'public',
    content: 'Smart City Corporation has announced two musical fountain shows on Friday, Saturday, and Sunday evenings: 7:00 PM – 7:30 PM (Kannada Devotional & Folk) and 8:00 PM – 8:30 PM (Classical Melodies).',
    contentKn: 'ಶುಕ್ರವಾರ, ಶನಿವಾರ ಮತ್ತು ಭಾನುವಾರ ಸಂಜೆ 7:00 ಮತ್ತು 8:00 ಗಂಟೆಗೆ ಎರಡು ವಿಶೇಷ ಕಾರಂಜಿ ಪ್ರದರ್ಶನಗಳು ನಡೆಯಲಿವೆ.',
    date: '26 Oct 2026',
    officialBadge: true,
    isUrgent: false
  },
  {
    id: 'ann-4',
    title: 'Scheduled Pipeline Maintenance in Ward 8 & 9 (Ashoka Road Sector)',
    titleKn: 'ವಾರ್ಡ್ 8 ಮತ್ತು 9 ರಲ್ಲಿ ಕುಡಿಯುವ ನೀರಿನ ಪೈಪ್‌ಲೈನ್ ನಿರ್ವಹಣೆ',
    category: 'water',
    content: 'Municipal water supply will operate on alternate morning schedules from 6:00 AM to 8:30 AM on Thursday due to pressure valve upgrading at Town Hall overhead reservoir.',
    contentKn: 'ಟೌನ್ ಹಾಲ್ ಜಲಾಶಯದ ಕವಾಟಗಳ ದುರಸ್ತಿಯಿಂದಾಗಿ ಗುರುವಾರ ಬೆಳಗ್ಗೆ ನೀರು ಸರಬರಾಜಿನಲ್ಲಿ ವ್ಯತ್ಯಯ ಉಂಟಾಗಲಿದೆ. ಸಾರ್ವಜನಿಕರು ಸಹಕರಿಸಲು ಕೋರಲಾಗಿದೆ.',
    date: '25 Oct 2026',
    officialBadge: true,
    isUrgent: false
  }
];

export const COMMUNITY_SUGGESTIONS_DATA: CommunitySuggestion[] = [
  {
    id: 'sug-1',
    title: 'Install Kannada & English QR Audio Guide Plaques at Madhugiri Fort Bastions',
    description: 'Madhugiri has profound 17th-century Vijayanagara and Hyder Ali history. Having scan-and-listen QR audio stories at key bastions would elevate the trekking experience for youth and foreign visitors.',
    category: 'Tourism & Heritage',
    author: 'Raghavendra K. (History Enthusiast)',
    votes: 124,
    hasVoted: false,
    date: '24 Oct 2026',
    status: 'Reviewing'
  },
  {
    id: 'sug-2',
    title: 'Dedicated Bicycle Parking Bay and Repair Tool Stand at Amanikere South Gate',
    description: 'Hundreds of young cyclists ride around Amanikere lake road every dawn. A designated bike rack with a floor air pump and basic allen wrenches would promote eco-friendly commuting.',
    category: 'Public Facilities',
    author: 'Sneha Patil (Tumakuru Cycling Club)',
    votes: 98,
    hasVoted: true,
    date: '23 Oct 2026',
    status: 'Planned'
  },
  {
    id: 'sug-3',
    title: 'Add Wheelchair Accessible Boardwalk at Namada Chilume Spring Entrance',
    description: 'The tree roots near the natural spring gate make wheelchair movement difficult for elderly pilgrims. A flat wooden ramp or eco-concrete pathway would make it truly inclusive.',
    category: 'Accessibility',
    author: 'Dr. Anand Murthy (Senior Citizen Forum)',
    votes: 182,
    hasVoted: false,
    date: '21 Oct 2026',
    status: 'Discussion'
  }
];

