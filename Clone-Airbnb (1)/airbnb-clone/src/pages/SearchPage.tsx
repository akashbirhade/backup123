import type React from 'react';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const location = searchParams.get('location') || '';
  const [showMap, setShowMap] = useState(true);

  return (
    <div className="min-h-screen">
      {/* Filter bar */}
      <div className="sticky top-20 z-10 bg-white border-b py-4">
        <div className="container mx-auto px-4">
          <div className="flex gap-4 overflow-x-auto pb-2">
            {['Price', 'Type of place', 'Free cancellation', 'Wifi', 'Kitchen', 'Washer', 'Air conditioning', 'Free parking'].map((filter) => (
              <button
                key={filter}
                className="px-4 py-2 rounded-full border hover:border-black text-sm whitespace-nowrap"
              >
                {filter}
              </button>
            ))}
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm">
              <span className="font-semibold">Display total before taxes</span>
              <button className="ml-2 w-8 h-4 bg-gray-200 rounded-full relative">
                <span className="absolute top-0 left-0 h-4 w-4 bg-white rounded-full border"></span>
              </button>
            </div>
            <button
              className="flex items-center border px-4 py-2 rounded-lg"
              onClick={() => setShowMap(!showMap)}
            >
              <span>{showMap ? 'Hide map' : 'Show map'}</span>
              <span className="ml-2">🗺️</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-semibold mb-6">Stays in {location || 'your location'}</h1>

        {/* Search results grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${showMap ? '2' : '4'} gap-6`}>
          {/* Property card placeholders */}
          {Array(10).fill(0).map((_, index) => (
            <div key={index} className="rounded-xl overflow-hidden mb-6">
              <div className="bg-gray-200 h-60 w-full"></div>
              <div className="mt-3">
                <div className="flex justify-between">
                  <span className="font-semibold">Location, Country</span>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="ml-1">4.95</span>
                  </div>
                </div>
                <div className="text-gray-500 mt-1">150 kilometers away</div>
                <div className="text-gray-500">May 15-20</div>
                <div className="mt-2">
                  <span className="font-semibold">$100</span> night
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Map section */}
        {showMap && (
          <div className="hidden lg:block fixed top-[76px] right-0 w-1/2 h-[calc(100vh-76px)] bg-gray-200">
            <div className="h-full flex items-center justify-center text-gray-400">
              Map will be displayed here
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
