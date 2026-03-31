import type React from 'react';
import { useState } from 'react';
import CategoryList from '../components/ui/CategoryList';
import PropertyCard from '../components/ui/PropertyCard';
import { categories, mockProperties } from '../utils/mockData';

const HomePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const filteredProperties = selectedCategory === 'all'
    ? mockProperties
    : mockProperties.filter(property => property.category === selectedCategory);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Category filter */}
      <div className="border-b sticky top-20 bg-white z-10 pt-4">
        <CategoryList
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
        />
      </div>

      {/* Property listings */}
      <div className="mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProperties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {/* Show message if no properties match the filter */}
        {filteredProperties.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-xl font-semibold mb-2">No properties found</h3>
            <p className="text-gray-500">Try changing your search filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
