import type React from 'react';
import { useParams } from 'react-router-dom';

const PropertyDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Property title and share/save buttons */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Property Name</h1>
        <div className="flex gap-4">
          <button className="text-sm flex items-center">
            <span>Share</span>
          </button>
          <button className="text-sm flex items-center">
            <span>Save</span>
          </button>
        </div>
      </div>

      {/* Property images gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-8">
        <div className="h-72 bg-gray-200 rounded-l-lg"></div>
        <div className="grid grid-cols-2 gap-2">
          <div className="h-[142px] bg-gray-200"></div>
          <div className="h-[142px] bg-gray-200 rounded-tr-lg"></div>
          <div className="h-[142px] bg-gray-200"></div>
          <div className="h-[142px] bg-gray-200 rounded-br-lg"></div>
        </div>
      </div>

      {/* Property info and booking section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - property information */}
        <div className="lg:col-span-2">
          <div className="border-b pb-6 mb-6">
            <h2 className="text-xl font-semibold mb-2">Entire villa hosted by Host Name</h2>
            <p className="text-gray-600">
              4 guests · 2 bedrooms · 2 beds · 2 baths
            </p>
          </div>

          <div className="border-b pb-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">About this place</h3>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in lorem at velit varius
              condimentum. Nulla facilisi. Suspendisse potenti. Duis auctor, arcu eu porttitor aliquam,
              est nulla malesuada urna, in egestas eros quam vel arcu.
            </p>
          </div>

          <div className="border-b pb-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">What this place offers</h3>
            <div className="grid grid-cols-2">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                <span>Wifi</span>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                <span>Kitchen</span>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                <span>Free parking</span>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                <span>TV</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right column - booking widget */}
        <div className="lg:col-span-1">
          <div className="border rounded-lg p-6 shadow-md sticky top-24">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-semibold">$100 <span className="text-base font-normal">night</span></span>
              <div className="flex items-center">
                <span className="text-sm mr-1">★ 4.9</span>
                <span className="text-sm text-gray-600">(112 reviews)</span>
              </div>
            </div>

            <div className="border rounded-lg mb-4">
              <div className="grid grid-cols-2 border-b">
                <div className="p-3 border-r">
                  <div className="text-xs font-semibold">CHECK-IN</div>
                  <div>Add date</div>
                </div>
                <div className="p-3">
                  <div className="text-xs font-semibold">CHECKOUT</div>
                  <div>Add date</div>
                </div>
              </div>
              <div className="p-3">
                <div className="text-xs font-semibold">GUESTS</div>
                <div>1 guest</div>
              </div>
            </div>

            <button className="w-full bg-pink-600 text-white py-3 rounded-lg font-semibold mb-4">
              Check availability
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;
