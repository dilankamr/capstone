 "use client"
import React, { useEffect, useState } from 'react';
import { Guide, getAllGuide } from '../../service/guide.service';
import { useRouter } from 'next/navigation';

const GuideList: React.FC = () => {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const handleExploreMoreClick = () => {
    
    router.push('/searchGuide');
  };  
  

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const guideData = await getAllGuide();
        setGuides(guideData);
      } catch (error) {
        console.error('Failed to fetch guides:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGuides();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }
  
  const limitedGuides = Array.isArray(guides) ? guides.slice(0, 8) : [];
  console.log('Limited guides:', limitedGuides);
  return (
    <div className="min-h-2xl">
    <div className="container mx-auto p-4  bg-gradient-to-br from-pink-700 via-black to-violet-800 ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 m-4 ">
        {limitedGuides.map((guide) => (
          <div
            key={guide.id}
            onClick={() => router.push(`/profile1?id=${guide.id}`)}
            className="text-white rounded-lg shadow-lg hover:shadow-white transition-shadow duration-300 overflow-hidden h-[450px] bg-gradient-to-br from-pink-500 via-black to-violet-600"
          >
            <div className="relative w-full h-[300px]">
              <img
                src={guide.profilePic}
                alt={`${guide.firstName} ${guide.lastName}`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center p-4">
        <h2 className="text-xl font-bold text-gray-200">{`${guide.firstName} ${guide.lastName}`}</h2>
       <p className="text-sm mb-2 text-gray-400">{guide.job}</p>
         <div className="flex flex-wrap gap-2 justify-center relative top-2">
              {guide.technologies.slice(0, 3).map((tech, index) => (
             <span
             key={index}
             className="px-3 py-1 border-2 border-gray-300 rounded-full text-xs font-semibold text-gray-400 bg-black-600"
            >
                {tech.technologyName}
             </span>
             ))}
            {guide.technologies.length > 3 && (
              <span className="px-3 py-1 border-2 border-gray-300 rounded-full text-xs font-semibold text-gray-400 bg-black-600">
             +{guide.technologies.length - 3} more
             </span>
            )}
          </div>
      </div>

          </div>
        ))}
      </div> 
      <div className="flex justify-center mt-10 ">
        
        <button onClick={handleExploreMoreClick} className="bg-gradient-to-br from-blue-900 via-blue-800 to-black text-xl text-white p-3 rounded-lg hover:from-yellow-400 hover:via-yellow-700 hover:to-red-900 hover:shadow-lg transition duration-300 cursor-pointer">Explore more</button>
        
        </div>
    </div>

   
  </div>
   
  
  );
};

export default GuideList;




 
