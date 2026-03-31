import type React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockProperties } from '../utils/mockData';
import type { Property } from '../types';

const PropertyPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  useEffect(() => {
    // Simulate API fetch with setTimeout
    const timer = setTimeout(() => {
      const foundProperty = mockProperties.find(p => p.id === id);
      if (foundProperty) {
        setProperty(foundProperty);
      }
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="h-96 bg-gray-100 animate-pulse rounded-lg"></div>
        <div className="h-8 w-1/2 bg-gray-100 animate-pulse rounded mt-6"></div>
        <div className="h-4 w-1/3 bg-gray-100 animate-pulse rounded mt-3"></div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-semibold">Property not found</h2>
        <p className="mt-4 text-gray-500">The property you're looking for might have been removed or doesn't exist.</p>
        <button
          onClick={() => navigate('/')}
          className="mt-6 px-5 py-2 bg-[#FF385C] text-white rounded-lg"
        >
          Back to Home
        </button>
      </div>
    );
  }

  // Photos gallery view
  if (showAllPhotos) {
    return (
      <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
        <div className="sticky top-0 bg-white p-4 flex justify-between items-center border-b">
          <button
            onClick={() => setShowAllPhotos(false)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <span className="font-medium">{property.images.length} photos</span>
          <div></div> {/* Empty div for flex alignment */}
        </div>

        <div className="px-4 py-4 max-w-5xl mx-auto">
          {property.images.map((image, index) => (
            <div key={index} className="mb-8">
              <img
                src={image}
                alt={`${property.title} - Photo ${index + 1}`}
                className="w-full h-auto rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Property header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">{property.title}</h1>
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="ml-1">{property.rating}</span>
            </span>
            <span>·</span>
            <span className="text-gray-600 underline">{property.reviewCount} reviews</span>
            <span>·</span>
            <span className="text-gray-600">{property.location}, {property.country}</span>
          </div>
          <div className="flex gap-4">
            <button className="text-sm flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
              </svg>
              Share
            </button>
            <button className="text-sm flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Image gallery */}
      <div className="relative mb-8">
        {/* Main image grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          <div
            className="md:col-span-2 md:row-span-2 h-64 md:h-full cursor-pointer rounded-lg overflow-hidden"
            onClick={() => setShowAllPhotos(true)}
          >
            <img
              src={property.images[0]}
              alt={property.title}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Only show other images if they exist */}
          {property.images.length > 1 && (
            <div
              className="hidden md:block h-32 cursor-pointer rounded-lg overflow-hidden"
              onClick={() => setShowAllPhotos(true)}
            >
              <img
                src={property.images[1]}
                alt={property.title}
                className="h-full w-full object-cover"
              />
            </div>
          )}

          {property.images.length > 2 && (
            <div
              className="hidden md:block h-32 cursor-pointer rounded-lg overflow-hidden"
              onClick={() => setShowAllPhotos(true)}
            >
              <img
                src={property.images[2]}
                alt={property.title}
                className="h-full w-full object-cover"
              />
            </div>
          )}

          {property.images.length > 3 && (
            <div
              className="hidden md:block h-32 cursor-pointer rounded-lg overflow-hidden"
              onClick={() => setShowAllPhotos(true)}
            >
              <img
                src={property.images[3]}
                alt={property.title}
                className="h-full w-full object-cover"
              />
            </div>
          )}

          {property.images.length > 4 && (
            <div
              className="hidden md:block h-32 relative cursor-pointer rounded-lg overflow-hidden"
              onClick={() => setShowAllPhotos(true)}
            >
              <img
                src={property.images[4]}
                alt={property.title}
                className="h-full w-full object-cover"
              />
              {property.images.length > 5 && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <span className="text-white font-medium">+{property.images.length - 5} more</span>
                </div>
              )}
            </div>
          )}
        </div>

        <button
          className="absolute right-4 bottom-4 bg-white text-black px-4 py-2 rounded-lg font-medium text-sm border shadow-sm"
          onClick={() => setShowAllPhotos(true)}
        >
          Show all photos
        </button>
      </div>

      {/* Property details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-2">
          <div className="border-b pb-6">
            <h2 className="text-xl font-semibold">
              {property.type} hosted by {property.host.name}
              {property.host.isSuperhost && (
                <span className="ml-2 text-xs bg-gray-100 text-gray-800 py-1 px-2 rounded-full">
                  Superhost
                </span>
              )}
            </h2>
            <p className="text-gray-600 mt-1">
              {property.guests} guests · {property.bedrooms} bedrooms · {property.bathrooms} baths
            </p>
          </div>

          <div className="py-6 border-b">
            <h3 className="text-lg font-semibold mb-4">About this place</h3>
            <p className="text-gray-700">{property.description}</p>
          </div>

          <div className="py-6 border-b">
            <h3 className="text-lg font-semibold mb-4">What this place offers</h3>
            <div className="grid grid-cols-2 gap-4">
              {property.amenities.map(amenity => (
                <div key={amenity} className="flex items-center">
                  <div className="h-6 w-6 bg-gray-200 rounded-full mr-4"></div>
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Booking widget */}
        <div className="md:col-span-1">
          <div className="border rounded-lg p-6 shadow-lg sticky top-24">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-xl font-semibold">₹{Math.round(property.price / 5)}</span>
                <span className="text-gray-500"> night</span>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="ml-1">{property.rating}</span>
                <span className="text-gray-500 ml-1">({property.reviewCount} reviews)</span>
              </div>
            </div>

            <div className="border rounded-lg mb-4">
              <div className="grid grid-cols-2 divide-x">
                <div className="p-3">
                  <div className="text-xs font-semibold">CHECK-IN</div>
                  <div>Add date</div>
                </div>
                <div className="p-3">
                  <div className="text-xs font-semibold">CHECKOUT</div>
                  <div>Add date</div>
                </div>
              </div>
              <div className="border-t p-3">
                <div className="text-xs font-semibold">GUESTS</div>
                <div>1 guest</div>
              </div>
            </div>

            <button className="w-full bg-[#FF385C] text-white py-3 rounded-lg font-semibold">
              Reserve
            </button>

            <div className="text-center text-gray-500 mt-4">You won't be charged yet</div>

            <div className="mt-6 space-y-4">
              <div className="flex justify-between">
                <span className="underline">₹{Math.round(property.price / 5)} x 5 nights</span>
                <span>₹{property.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="underline">Cleaning fee</span>
                <span>₹{Math.round(property.price * 0.1)}</span>
              </div>
              <div className="flex justify-between">
                <span className="underline">Service fee</span>
                <span>₹{Math.round(property.price * 0.15)}</span>
              </div>
              <div className="flex justify-between font-semibold pt-4 border-t">
                <span>Total before taxes</span>
                <span>₹{Math.round(property.price + property.price * 0.1 + property.price * 0.15)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyPage;
