"use client"
import Image from 'next/image';
import CustomGraph from '../components/feedbackGraph';
import { Feedback } from '../feedback/feedback';
import { fetchFeedbacks } from '@/service/feedback.service';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { getOneGuide,Guide } from '@/service/guide.service';
import { getAllTechnology, Technology } from '@/service/technology.service';
import { Category, getAllCategory } from '@/service/category.service';
import { Chip} from '@nextui-org/chip';
import GuideUserDisplayFeedbackPage from '../feedback/FeedbackDisplayGuide1';
import { useSearchParams } from 'next/navigation';
import HomePage from '../feedback/page';
import Nav from '../components/nav1';


const UserResume = () => {


const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
const [guide, setGuide] = useState<Guide | null>(null);
const [technologies, setTechnologies] = useState<Technology[]>([]);
const [categories, setCategories] = useState<Category[]>([]);
const [isExpanded, setIsExpanded] = useState(false);
const searchParams = useSearchParams();
const id = searchParams?.get('id');
useEffect(() => {
    if (id) {
      getOneGuide(id).then(guide => {
        setGuide(guide);
      }).catch(console.error);

      getAllTechnology().then(techs => {
        setTechnologies(techs);
      }).catch(console.error);

      getAllCategory().then(cats => {
        setCategories(cats);
      }).catch(console.error);
    }
  }, [id]);

  useEffect(() => {
    const loadFeedbacks = async () => {
      try {
        const data = await fetchFeedbacks(axios);
        setFeedbacks(data);
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
      }
    };

    loadFeedbacks();
  }, []);



     if (!guide) {
            return <div>No guide found</div>;
     }


      const maxWords = 300;
      const words = guide.about.split(' ');
      const shouldTruncate = words.length > maxWords;
      const displayedText = shouldTruncate && !isExpanded ? words.slice(0, maxWords).join(' ') + '...' : guide.about;

      const handleToggle = () => {
        setIsExpanded(!isExpanded);
      };

      console.log(guide.socialMediaLinks);

  return (

        <div className="absolute inset-0 w-full  rounded-l-lg">
          <div className='absolute inset-x-0'>
                    <Nav/>
            </div>

          <div className="absolute inset-0 w-full bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white  rounded-l-lg">
          <div className=" absolute inset-x-0 w-full h-80 bg-cover bg-center bg-gradient-to-br from-gray-700 via-black to-gray-800 " style={{ borderRadius: '0.75rem'  }}>
          <hr className="my-64 border-t-5 " style={{ borderColor: '#FFFFFF' }}/>
          </div>
            <div className="text-center ">

              {/* image section   */}
             <div className="relative w-80 h-80 mx-auto p-2  rounded-full top-24"  style={{ backgroundColor: '#FFFFFF' }}>
               <div className="relative w-full h-full bg-black rounded-full p-2">
                <div className="relative w-full h-full bg-blue-800 rounded-full">
                    <Image
                      src={guide.profilePic}
                      alt="Profile Picture"
                      layout="fill"
                      className="rounded-full object-cover"
                    />
                </div>
               </div>
            </div>
            <div className='mt-28 mb-20'>
              <h2 className="text-4xl font-bold mt-4 text-gray-300">{guide.firstName} {guide.lastName}</h2>
              <p className="text-lg text-gray-400">{guide.job}</p>
              <p className="text-lg text-gray-500">{guide.email}</p>
            </div>
            </div>

            <hr className="border-t-3 w-3/4 mx-auto  opacity-50" style={{ borderColor: '#BB86FC' }}/>

            <div className="py-2  flex flex-col items-center text-center bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
            <div className='w-full '>
              <h3 className="text-3xl font-semibold flex items-center justify-center p-8 mr-10">
              <img src="/images/24.png" alt="Info Icon" className="mr-4 w-14 h-14" /> About Me
            </h3>
          <div className="w-3/4 mx-auto max-w-2xl  border border-gray-400 rounded-lg p-4 ">
          <p className="m-4 text-xl text-gray-300">{displayedText}</p>
             {shouldTruncate && (
                 <button onClick={handleToggle} className="text-blue-500 hover:text-blue-700 mt-2">
                 {isExpanded ? 'Read Less' : 'Read More'}
                   </button>
              )}
           </div>
      </div>
         <hr className="mt-20 border-t-3 w-3/4 mx-auto  opacity-50" style={{ borderColor: '#BB86FC' }}/>

             <div className="mt-6 mr-16">
                      <h3 className="text-3xl font-semibold flex items-center">
                     <img src="/images/29.png" alt="Info Icon" className="mr-2 w-16 h-16" />Social medias
                     </h3>
                     </div>

                     {guide.socialMediaLinks && guide.socialMediaLinks.length > 0 ? (
                          <ul className="mt-4 list-disc list-inside text-left">
                             {guide.socialMediaLinks.map((link, index) => (
                             <li key={index} className="text-blue-500 hover:underline text-lg">
                                <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
                             </li>
                              ))}
                            </ul>
                               ) : (
                      <p className="mt-4 text-gray-500">No social media links available.</p>
                             )}



               <hr className="mt-24 border-t-3 w-3/4 mx-auto  opacity-50" style={{ borderColor: '#BB86FC' }}/>


               <div className='mr-20 mt-20 mb-10' >
                 <h3 className="text-3xl font-semibold flex items-center">
                    <img src="/images/25.png" alt="Info Icon" className="mr-2 w-20 h-20" />Skills
                 </h3>
               </div>
              <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                         {guide.technologies?.map((tech, index) => (
                           <Chip
                             key={index}
                             className="bg-gradient-to-r from-pink-500 via-pink-800 to-pink-900 text-white
                             text-xl font-semibold rounded-lg px-6 py-5 border border-transparent hover:border-gray-400"
                           >
                           {tech.technologyName}
                          </Chip>
                         ))}
                </div>

             <hr className="mt-24 border-t-3 w-3/4 mx-auto opacity-50" style={{ borderColor: '#BB86FC' }}/>


              <div className=' mr-20 mt-20 mb-10'>
                <h3 className="text-3xl font-semibold flex items-center">
                 <img src="/images/23.png" alt="Info Icon" className="mr-4 w-16 h-16" />Expertise
                </h3>
                </div>
                <div className='mt-10  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                {guide.categories?.map((cat, index) => (
                  <Chip
                    key={index}
                    className="bg-gradient-to-r from-yellow-500 via-yellow-800 to-yellow-900 text-white text-xl font-semibold
                    mr-2 mb-2 px-6 py-5 rounded-lg border border-transparent hover:border-gray-400"
                  >
                    {cat.categoryName}
                  </Chip>
                ))}



             </div>
             <div className='bg-gradient-to-br from-gray-800 via-black to-gray-900 text-white'>
           </div>
           <hr className="my-24 border-t-3 w-4/5 mx-auto" style={{ borderColor: '#32ae85' }}/>

           <div className="mt-20 w-full flex flex-col items-center ">
                <h3 className="text-3xl font-semibold flex juatify-center items-center mb-12">
                 <img src="/images/26.png" alt="Info Icon" className="mr-4 w-14 h-14" />Ratings
                </h3>
                <div className="w-full max-w-4xl">
                    <CustomGraph guideId={guide.id}/>
                </div>
           </div>


            <div className="mt-20 w-full flex flex-col items-center">
                <h3 className="text-3xl font-semibold flex items-center mb-12  ">

                 <img src="/images/27.png" alt="Info Icon" className="mr-4 w-14 h-14" />What  mentees  say
                </h3>
                <HomePage/>
                <GuideUserDisplayFeedbackPage feedbacks={feedbacks} guideID={guide.id}/>
            </div>
            </div>
        </div>
    </div>
  );
};

export default UserResume;


