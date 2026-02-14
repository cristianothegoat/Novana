
export enum RouteType {
  ROAD_TRIP = 'Road Trip',
  HIKING = 'Hiking',
  CITY_TOUR = 'City Tour',
  CULTURAL = 'Cultural',
  SCENIC = 'Scenic'
}

export interface RouteSegment {
  id: string;
  name: string;
  transport: string;
  distance: string;
  duration: string;
  startLocation: string;
  endLocation: string;
  departureTime: string;
  arrivalTime: string;
  highlights: string[];
  icon: string;
}

export interface TripRoute {
  id: string;
  title: string;
  description: string;
  distance: string;
  days: string;
  rating: number;
  type: RouteType;
  imageUrl: string;
  segments: RouteSegment[];
}

export interface NavItem {
  label: string;
  path: string;
}
