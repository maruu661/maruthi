import { Itinerary } from '../types';

export const ITINERARIES_DATA: Itinerary[] = [
  {
    id: 'itin-hills-nature',
    title: 'Mystic Hills, Sacred Spring & Wildlife Trail',
    titleKn: 'ಗಿರಿಧಾಮ, ನೈಸರ್ಗಿಕ ಚಿಲುಮೆ ಮತ್ತು ವನ್ಯಜೀವಿ ಯಾನ',
    duration: 'half-day',
    durationLabel: 'Half Day (5 - 6 Hours)',
    pace: 'Moderate',
    description: 'An invigorating morning trail through Tumakuru’s forested hills: spot spotted deer at Namada Chilume, climb to scenic temple vistas at Devarayanadurga, and indulge in famous Kyatsandra Thatte Idli.',
    idealFor: 'Nature lovers, photographers, family outings, and spiritual seekers.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    stops: [
      {
        destinationId: 'namada-chilume',
        suggestedDuration: '1.5 Hours (8:30 AM – 10:00 AM)',
        tips: 'Arrive early for crisp forest air. Observe deer and visit the medicinal nursery.'
      },
      {
        destinationId: 'devarayanadurga',
        suggestedDuration: '2.5 Hours (10:15 AM – 12:45 PM)',
        tips: 'Visit Bhoga Narasimha temple at base, then ascend to Kumbhi view point. Carry water; be mindful of monkeys.'
      },
      {
        destinationId: 'siddaganga-math',
        suggestedDuration: '1.5 Hours (1:15 PM – 2:45 PM)',
        tips: 'Stop on the return route for peaceful darshan and afternoon prasada.'
      }
    ]
  },
  {
    id: 'itin-heritage-spiritual',
    title: 'Spiritual Haven & Smart City Promenade',
    titleKn: 'ಆಧ್ಯಾತ್ಮಿಕ ತಾಣ & ಸ್ಮಾರ್ಟ್ ಸಿಟಿ ಅಮಾನಿಕೆರೆ ಸಂಜೆ',
    duration: 'half-day',
    durationLabel: 'Half Day (4 - 5 Hours)',
    pace: 'Relaxed',
    description: 'Immerse in the compassionate legacy of Siddaganga Math, explore central Tumakuru’s historic clock tower plaza, and unwind by the sunset waters and musical fountain at Amanikere Lake.',
    idealFor: 'Senior citizens, spiritual pilgrims, and relaxed family walks.',
    image: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=800&q=80',
    stops: [
      {
        destinationId: 'siddaganga-math',
        suggestedDuration: '2 Hours (10:00 AM – 12:00 PM)',
        tips: 'Pay respects at Dr. Sri Sri Shivakumara Swamiji Samadhi; experience Maha Dasoha hall.'
      },
      {
        destinationId: 'tumkur-clock-tower',
        suggestedDuration: '1 Hour (12:30 PM – 1:30 PM)',
        tips: 'Walk the shaded university avenue; sample traditional Karnataka meal at nearby local restaurants.'
      },
      {
        destinationId: 'amanikere-lake',
        suggestedDuration: '2 Hours (5:00 PM – 7:00 PM)',
        tips: 'Stroll along the illuminated glass house; witness the weekend dancing fountain display.'
      }
    ]
  },
  {
    id: 'itin-monolith-adventure',
    title: 'Mighty Monolith & Grand Reservoir Circuit',
    titleKn: 'ಮಧುಗಿರಿ ಬೃಹತ್ ಏಕಶಿಲೆ & ಮಾರ್ಕೋನಹಳ್ಳಿ ಯಾನ',
    duration: 'full-day',
    durationLabel: 'Full Day (8 - 9 Hours)',
    pace: 'Active',
    description: 'An exhilarating full-day expedition conquering Asia’s second-largest monolithic fort at Madhugiri, followed by blessings at Goravanahalli and a golden hour sunset over Marconahalli Dam.',
    idealFor: 'Trekkers, history buffs, and road trip enthusiasts.',
    image: 'https://images.unsplash.com/photo-1599837565318-67429bde7162?auto=format&fit=crop&w=800&q=80',
    stops: [
      {
        destinationId: 'madhugiri-fort',
        suggestedDuration: '3.5 Hours (7:00 AM – 10:30 AM)',
        tips: 'Begin the ascent early to avoid midday rock heating. Wear rubber-grip trekking shoes and carry 2L hydration.'
      },
      {
        destinationId: 'goravanahalli-temple',
        suggestedDuration: '1.5 Hours (11:30 AM – 1:00 PM)',
        tips: 'Short drive from Madhugiri. Take darshan and partake in Annadana lunch.'
      },
      {
        destinationId: 'marconahalli-dam',
        suggestedDuration: '2 Hours (4:30 PM – 6:30 PM)',
        tips: 'Relax on the lush embankment; witness Sir M. Visvesvaraya’s automatic siphons at sunset.'
      }
    ]
  }
];

