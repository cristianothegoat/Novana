
import { TripRoute, RouteType } from './types';

export const ROUTES: TripRoute[] = [
  {
    id: 'mumbai-city',
    title: 'Mumbai City Tour',
    description: "Explore the heart of India's financial capital, from Gateway of India to Marine Drive.",
    distance: '45 km',
    days: '1 day',
    rating: 4.8,
    type: RouteType.CITY_TOUR,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlJrBh9M7Oc8c9SNjCVgXppkw6dJPj0DyJafuyPnl5Lk18stLGrqRKuCvDLbkXB0Djm3gz-7kVCm9EYyXzV_-LSOfv_CnIrHQFIChGePrd2zmtvhQ_1nrv63uveom8pb-wmnr3nWvAg314qxDoV6WkgQhQkz0rjEgmmkHczb9yoHkKjYlYWgDhItkp7R0W4q8QrYj9EifMBYZd3n7gOjE75AV_1-ib8yd3pWbsu0GEX7JsuO1tVNlWaagRsiBkHY-bXTba5nmbHLF5',
    segments: [
      {
        id: 's1',
        name: 'Gateway to Colaba',
        transport: 'Walking',
        distance: '1.2 km',
        duration: '25 mins',
        startLocation: 'Gateway of India',
        endLocation: 'Colaba Causeway',
        departureTime: '09:00 AM',
        arrivalTime: '09:25 AM',
        highlights: ['Heritage architecture', 'Street markets'],
        icon: 'directions_walk'
      },
      {
        id: 's2',
        name: 'Colaba to Marine Drive',
        transport: 'Driving',
        distance: '4.8 km',
        duration: '15 mins',
        startLocation: 'Colaba Causeway',
        endLocation: 'Marine Drive Pier',
        departureTime: '10:00 AM',
        arrivalTime: '10:15 AM',
        highlights: ['Coastal views', 'Queen\'s Necklace'],
        icon: 'directions_car'
      }
    ]
  },
  {
    id: 'swiss-alps',
    title: 'Swiss Alps Explorer',
    description: "Experience terrain and depth using advanced rendering through mountains and valleys.",
    distance: '320 km',
    days: '7 days',
    rating: 4.9,
    type: RouteType.HIKING,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVoWzJ1TN6ESWlihqcKaq1twecJOSKboXmODtkbpSQ352FHKySYCtkS14u1Ybrgp8I-wsgAFOJa0mmJNAAp3rL-KPW5YkL1wfqFb4sQi1HO-W9bqN3OgKl6dDc-REhlIQ3WWo3f8vdoOlA5wFFUFUN2NWZq0CiH9lXsJq-ekR4DtXZSbHuDPx7ms5Ch2L6URF7I2mT0zLY6qb4lI_QEu8ArzQD7CH1bJ_5fRF6HSlboqZ57FvjCDkGfKICEIQ16HRmhIPaEUyDY8H3',
    segments: [
      {
        id: 'swiss1',
        name: 'Interlaken Ascent',
        transport: 'Train',
        distance: '12 km',
        duration: '45 mins',
        startLocation: 'Interlaken Ost',
        endLocation: 'Grindelwald',
        departureTime: '08:30 AM',
        arrivalTime: '09:15 AM',
        highlights: ['Valley views', 'Eiger North Face'],
        icon: 'train'
      },
      {
        id: 'swiss2',
        name: 'Eiger Trail Hike',
        transport: 'Hiking',
        distance: '6 km',
        duration: '3 hours',
        startLocation: 'Eigergletscher',
        endLocation: 'Alpiglen',
        departureTime: '10:00 AM',
        arrivalTime: '01:00 PM',
        highlights: ['Alpine flora', 'Glacier views'],
        icon: 'hiking'
      }
    ]
  },
  {
    id: 'pacific-coast',
    title: 'Pacific Coast Highway',
    description: "A scenic ride along the California coast with stunning ocean views and hidden gems.",
    distance: '850 km',
    days: '5 days',
    rating: 4.7,
    type: RouteType.ROAD_TRIP,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPHIhbbR6RapAr7U9t8Ut738ke9EKeEyIl7Ko4F9veZV6SvONMdX3oN8sp-Y9NEProcIDqMWg2CDLPH02JLPxKwQFuBQN4942Elol_yfArMSAMLk7rBt91QnDakviUCU4bO1DjTEEe-zcjMtuj8Arl1hzo1Zh28rU_TSTUZkt3Hi920MgeRZc52DQeb8eQ2pcQyPYYXdljSpK-MhxA42KOVnU0VifKMV06jQkX4gjzo7Ov1cpTWIu3-qme_aBD3R8JYz1x2CXXL2R9',
    segments: [
      {
        id: 'pch1',
        name: 'Monterey to Big Sur',
        transport: 'Car',
        distance: '48 km',
        duration: '1 hour',
        startLocation: 'Monterey',
        endLocation: 'Big Sur',
        departureTime: '09:00 AM',
        arrivalTime: '10:00 AM',
        highlights: ['Bixby Bridge', 'Cliffside driving'],
        icon: 'directions_car'
      }
    ]
  }
];
