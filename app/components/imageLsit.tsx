 
 

import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function StandardImageList() {
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(max-width:900px)');

  const getCols = () => {
    if (isSmallScreen) return 2;
    if (isMediumScreen) return 4;
    return 6;
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div className="p-10 flex flex-wrap items-center justify-center bg-gradient-to-br from-blue-600 via-black to-blue-600 rounded-lg p-6 shadow-lg w-3/4 relative left-100">
        <div className="bg-gradient-to-br from-blue-400 via-violet-900 to-blue-400 rounded-lg p-6 shadow-lg">
          <ImageList
            sx={{
              width: '100%',
              height: 'auto',
              borderRadius: '10px',
            }}
            gap={8}
            cols={getCols()}
            rowHeight={120}
          >
            {itemData.map((item) => (
              <ImageListItem
                key={item.img}
                sx={{
                  position: 'relative',
                  borderRadius: '5px',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    overflow: 'hidden',
                    borderRadius: '5px',
                    filter: 'brightness(0.9)',
                  }}
                >
                  <img
                    className="bg-black"
                    src={item.img}
                    alt={item.title}
                    loading="lazy"
                    style={{
                      width: '65%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </div>
              </ImageListItem>
            ))}
          </ImageList>
        </div>
      </div>
    </div>
  );
}

const itemData = [
  {
    img: '/images/1.png',
    title: 'Nestjs',
  },
  {
    img: 'https://www.desuvit.com/wp-content/uploads/2021/03/mongodb-icon.png',
    title: 'MongoDB',
  },
  {
    img: 'https://www.drupal.org/files/project-images/nextjs-icon-dark-background.png',
    title: 'Nestjs',
  },
  {
    img: '/images/2.png',
    title: 'Html',
  },
  {
    img: 'https://miro.medium.com/v2/resize:fit:1400/1*cGDDA2mfYkjiIhGaN8gDoA.png',
    title: 'Angular',
  },
  {
    img: 'https://opensource.fb.com/img/projects/react.jpg',
    title: 'React',
  },
  {
    img: 'https://static.vecteezy.com/system/resources/previews/009/023/809/non_2x/php-logo-php-letter-php-letter-logo-design-initials-php-logo-linked-with-circle-and-uppercase-monogram-logo-php-typography-for-technology-business-and-real-estate-brand-vector.jpg',
    title: 'Php',
  },
  {
    img: 'https://media.dev.to/cdn-cgi/image/width=1080,height=1080,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fdxy1c2bvl6odeo52dodk.jpg',
    title: 'Tailwind',
  },
  {
    img: '/images/3.png',
    title: 'Csss',
  },
  {
    img: '/images/4.png',
    title: 'JavaScript',
  },
  {
    img: '/images/5.png',
    title: 'C++',
  },
  {
    img: '/images/6.png',
    title: 'Ruby',
  },
  {
    img: '/images/7.png',
    title: 'Kotlin',
  },
  {
    img: '/images/8.png',
    title: 'Python',
  },
  {
    img: 'https://m.media-amazon.com/images/I/410Z2CHLy2L._AC_UF1000,1000_QL80_.jpg',
    title: 'Java',
  },
  {
    img: '/images/10.jpg',
    title: 'Java',
  },
  {
    img: '/images/11.jpg',
    title: 'Metor',
  },
  {
    img: '/images/12.jpg',
    title: 'Rials',
  },
];
