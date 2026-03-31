export interface Property {
  id: string;
  title: string;
  description: string;
  location: string;
  country: string;
  price: number;
  images: string[];
  category: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  guests: number;
  amenities: string[];
  rating: number;
  reviewCount: number;
  host: {
    id: string;
    name: string;
    image: string;
    isSuperhost: boolean;
  };
  isFavorite?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description?: string;
}

export interface FilterOptions {
  location?: string;
  checkIn?: Date | null;
  checkOut?: Date | null;
  guests?: number;
  roomType?: string[];
  priceRange?: [number, number];
  instantBook?: boolean;
  superhost?: boolean;
  amenities?: string[];
  propertyType?: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isHost?: boolean;
}

export interface Review {
  id: string;
  propertyId: string;
  userId: string;
  userName: string;
  userImage?: string;
  rating: number;
  comment: string;
  date: string;
}
