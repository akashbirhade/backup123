import type React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Property } from '../../types';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(property.isFavorite || false);

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (property.images.length > 1) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % property.images.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (property.images.length > 1) {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + property.images.length) % property.images.length);
    }
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <Link to={`/rooms/${property.id}`} className="block">
      <div className="rounded-xl overflow-hidden">
        {/* Image carousel */}
        <div className="relative h-[280px] group">
          <img
            src={property.images[currentImageIndex]}
            alt={property.title}
            className="h-full w-full object-cover rounded-xl"
          />

          {/* Favorite button */}
          <button
            onClick={toggleFavorite}
            className="absolute top-3 right-3 z-10"
            aria-label={isFavorite ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <svg
              viewBox="0 0 32 32"
              className={`h-7 w-7 ${isFavorite ? 'fill-[#FF385C]' : 'fill-transparent stroke-white'}`}
              stroke="currentColor"
              strokeWidth="2"
              focusable="false"
              style={{ strokeLinecap: 'round' }}
            >
              <path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z"></path>
            </svg>
          </button>

          {/* Navigation buttons - only show if more than 1 image */}
          {property.images.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1 opacity-0 group-hover:opacity-80 transition-opacity"
                aria-label="Previous image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1 opacity-0 group-hover:opacity-80 transition-opacity"
                aria-label="Next image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Image pagination dots */}
          {property.images.length > 1 && (
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1">
              {property.images.map((_, index) => (
                <span
                  key={index}
                  className={`h-1.5 w-1.5 rounded-full ${currentImageIndex === index ? 'bg-white' : 'bg-white/50'}`}
                ></span>
              ))}
            </div>
          )}
        </div>

        {/* Property info */}
        <div className="mt-3">
          <div className="flex justify-between items-start">
            <h3 className="font-medium">
              {property.location}, {property.country}
            </h3>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="ml-1">{property.rating}</span>
            </div>
          </div>
          <p className="text-gray-500 mt-1 text-sm truncate">{property.type}</p>
          <p className="text-gray-500 text-sm">150 kilometers away</p>
          <p className="text-gray-500 text-sm">Jun 5 - 10</p>
          <p className="mt-2">
            <span className="font-semibold">₹{Math.round(property.price / 5)}</span> night
          </p>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
