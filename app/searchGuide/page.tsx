"use client";
import React, { useState, useEffect } from 'react';
import { Guide, getAllGuide } from '../../service/guide.service';
import { FaSearch } from 'react-icons/fa'; 
import { useRouter } from 'next/navigation';
import stringSimilarity from 'string-similarity'

const GuideSearchComponent: React.FC = () => {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredGuides, setFilteredGuides] = useState<Guide[]>([]);
  const [noResults, setNoResults] = useState<boolean>(false);

  useEffect(() => {
    const fetchGuides = async () => {
      const allGuides = await getAllGuide();
      setGuides(allGuides);
    };

    fetchGuides();
  }, []);

  const handleSearch = () => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    let filtered = guides.filter(guide =>
      guide.firstName.toLowerCase().includes(lowerCaseSearchTerm) ||
      guide.lastName.toLowerCase().includes(lowerCaseSearchTerm) ||
      guide.technologies.some(tech => tech.technologyName.toLowerCase().includes(lowerCaseSearchTerm)) ||
      guide.categories.some(cat => cat.categoryName.toLowerCase().includes(lowerCaseSearchTerm))
    );

    if (filtered.length === 0) {
      filtered = guides.filter(guide => {
        const firstNameSimilarity = stringSimilarity.compareTwoStrings(guide.firstName.toLowerCase(), lowerCaseSearchTerm);
        const lastNameSimilarity = stringSimilarity.compareTwoStrings(guide.lastName.toLowerCase(), lowerCaseSearchTerm);
        const techSimilarity = guide.technologies.some(tech => stringSimilarity.compareTwoStrings(tech.technologyName.toLowerCase(), lowerCaseSearchTerm) > 0.5);
        const categorySimilarity = guide.categories.some(cat => stringSimilarity.compareTwoStrings(cat.categoryName.toLowerCase(), lowerCaseSearchTerm) > 0.5);

        return firstNameSimilarity > 0.5 || lastNameSimilarity > 0.5 || techSimilarity || categorySimilarity;
      });
    }

    setFilteredGuides(filtered);
    setNoResults(filtered.length === 0);
  };

  const router = useRouter();

  return (
    <div className="absolute inset-x-0 inset-y-0 guide-search bg-gradient-to-br from-violet-500 via-black">
      <div className="flex items-center mb-4 w-1/2 mx-auto">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search guides by name, technology, or category"
          className="p-4 border rounded-l mt-16 mb-8 ml-4 flex-grow w-1/2"
        />
        <button 
          onClick={handleSearch}
          className="p-3 bg-blue-500 text-white rounded-r mt-6 mr-8"
        >
          <FaSearch />
        </button>
      </div>
      {noResults ? (
        <div className="text-center text-white mt-20 border w-1/2 mx-auto p-10 bg-red-400">
          No guides found. Please try a different search term.
        </div>
      ) : (
        <div className="guide-list flex flex-wrap gap-4 justify-center bg-gradient-to-br from-violet-500 via-black to-pink-600 opacity-90">
          {filteredGuides.map((guide) => (
            <div
              onClick={() => router.push(`/profile1?id=${guide.id}`)}
              key={guide.id}
              className="guide-item p-4 border rounded mb-4 w-96 h-98 max-w-lg max-h-98 overflow-hidden flex flex-col items-center text-center bg-gradient-to-br from-pink-700 via-black to-violet-800 mt-20"
            >
              <div className="bg-blue-500 p-2 rounded-full mb-1 border border-black w-44 h-44">      
                <img
                  src={guide.profilePic}
                  alt={`${guide.firstName} ${guide.lastName}`}
                  className="w-40 h-40 rounded-full mb-2 bg-white border-4 border-black"
                />
              </div>
              <h2 className="text-lg font-semibold mb-1 truncate">{guide.firstName} {guide.lastName}</h2>
              <p className="text-gray-300 mb-1 truncate">{guide.job}</p>
              <div className="technologies mb-2 flex flex-wrap gap-2 max-h-[80px] overflow-auto">
                <p className="font-semibold mb-1 w-full">Skills</p>
                {guide.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="bg-gradient-to-r from-pink-500 via-pink-800 to-pink-900 text-white px-3 py-1 rounded-full text-sm"
                  >
                    {tech.technologyName}
                  </span>
                ))}
              </div>
              <div className="categories flex flex-col">
                <p className="font-semibold mb-1 w-full">Excellence In</p>
                <div className="flex flex-wrap gap-2 max-h-[80px] overflow-auto justify-center">
                  {guide.categories.map((category, index) => (
                    <span
                      key={index}
                      className="bg-gradient-to-r from-yellow-500 via-yellow-800 to-yellow-900 text-white px-3 py-1 rounded-full text-sm"
                    >
                      {category.categoryName}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GuideSearchComponent;
