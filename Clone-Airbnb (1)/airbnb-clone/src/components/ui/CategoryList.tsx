import type React from 'react';
import { useState, useRef } from 'react';
import type { Category } from '../../types';

interface CategoryListProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ categories, selectedCategory, onSelectCategory }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

      // Show left arrow if scrolled right
      setShowLeftArrow(scrollLeft > 0);

      // Show right arrow if not scrolled all the way to the right
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative">
      {/* Left scroll arrow */}
      {showLeftArrow && (
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md"
          onClick={scrollLeft}
          aria-label="Scroll left"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Category list */}
      <div
        ref={scrollRef}
        className="flex gap-8 overflow-x-auto scrollbar-hide py-4 px-2"
        onScroll={handleScroll}
      >
        {categories.map((category) => (
          <button
            key={category.id}
            className={`flex flex-col items-center min-w-16 pb-2 border-b-2 transition-colors ${
              selectedCategory === category.id
                ? 'border-black text-black'
                : 'border-transparent text-gray-500 hover:border-gray-200'
            }`}
            onClick={() => onSelectCategory(category.id)}
          >
            <img src={category.icon} alt={category.name} className="h-6 w-6 mb-1 opacity-70" />
            <span className="text-xs whitespace-nowrap">{category.name}</span>
          </button>
        ))}
      </div>

      {/* Right scroll arrow */}
      {showRightArrow && (
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md"
          onClick={scrollRight}
          aria-label="Scroll right"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default CategoryList;
