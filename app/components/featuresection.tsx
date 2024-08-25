import Image from 'next/image';

const FeaturesSection = () => (
  <div className='flex items-center justify-center h-full'>
  <div className="py-12 mt-10 bg-gradient-to-br from-blue-500 via-black to-violet-800 rounded-lg p-6 rounded-lg shadow-lg w-3/4">
    <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
       
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
         
<div className="bg-gradient-to-br from-black via-violet-900 to-blue-400 rounded-lg p-6 rounded-lg shadow-lg">
  <div className="relative overflow-hidden rounded-lg">
    <div className="absolute inset-0 bg-gradient-to-br from-black-300 via-violet-800 to-blue-500  rounded-lg"></div>
    <div className="relative z-10 text-white">
      <div className="flex items-center justify-center mb-4">
        <Image 
          src="/images/13.jpg" 
          alt="Expert Guides" 
          width={300} 
          height={180} 
          objectFit="cover" 
          objectPosition="center"
          className="rounded-lg"
        />
      </div>
      <h3 className="text-xl font-semibold mb-2">Expert Guides</h3>
      <p className="text-gray-300">Connect with industry experts who have years of experience in various IT fields. Our guides are professionals in their respective domains, ready to provide you with personalized guidance.</p>
    </div>
  </div>
</div>

<div className="bg-gradient-to-br from-black via-violet-900 to-blue-400 rounded-lg p-6 rounded-lg shadow-lg">
  <div className="relative overflow-hidden rounded-lg">
    <div className="absolute inset-0 bg-gradient-to-br from-black-300 via-violet-800 to-blue-500  rounded-lg"></div>
    <div className="relative z-10 text-white">
      <div className="flex items-center justify-center mb-4">
        <Image 
          src="/images/17.png" 
          alt="Diverse Technologies" 
          width={300} 
          height={180} 
          objectFit="cover" 
          objectPosition="center"
          className="rounded-lg"
        />
      </div>
      <h3 className="text-xl font-semibold mb-2">Diverse Technologies</h3>
      <p className="text-gray-300">Whether you need help with front-end development, back-end integration, or database management, our platform connects you with guides proficient in a wide array of technologies and frameworks.</p>
    </div>
  </div>
</div>
<div className="bg-gradient-to-br from-black via-violet-900 to-blue-400 rounded-lg p-6 rounded-lg shadow-lg">
  <div className="relative overflow-hidden rounded-lg">
    <div className="absolute inset-0 bg-gradient-to-br from-black-300 via-violet-800 to-blue-500  rounded-lg"></div>
    <div className="relative z-10 text-white">
      <div className="flex items-center justify-center mb-4">
        <Image 
          src="/images/14.jpeg" 
          alt="Project Success" 
          width={300} 
          height={180} 
          objectFit="cover" 
          objectPosition="center"
          className="rounded-lg"
        />
      </div>
      <h3 className="text-xl font-semibold mb-2">Project Success</h3>
      <p className="text-gray-300">Hear from users who have successfully completed their projects with the help of our guides. Our platform has helped numerous projects achieve their goals, from startups to enterprise solutions.</p>
    </div>
  </div>
</div>





        
<div className="bg-gradient-to-br from-black via-violet-900 to-blue-400 rounded-lg p-6 rounded-lg shadow-lg">
  <div className="relative overflow-hidden rounded-lg">
    <div className="absolute inset-0 bg-gradient-to-br from-black-300 via-violet-800 to-blue-500  rounded-lg"></div>
    <div className="relative z-10 text-white">
      <div className="flex items-center justify-center mb-4">
        <Image 
          src="/images/18.png" 
          alt="Community and Support" 
          width={300} 
          height={180} 
          objectFit="cover" 
          objectPosition="center"
          className="rounded-lg"
        />
      </div>
      <h3 className="text-xl font-semibold mb-2">Community and Support</h3>
      <p className="text-gray-300">Join a thriving community of developers and IT professionals. Get support from both your guides and peers through our forums, webinars, and collaborative tools.</p>
    </div>
  </div>
</div>

       
        
      </div>
    </div>
  </div>
  </div>
);

export default FeaturesSection;

  
  
  