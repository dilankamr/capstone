"use client";

import React from 'react';
import { TypeAnimation } from 'react-type-animation';

const TypeWrite = () => {
  return (
    <TypeAnimation
      sequence={[
        "Connecting University Students and Guiders Together...",
        1000,
       
      ]}
      wrapper="span"
      speed={10}
      className='xl:text-[19px] lg:text-[40px] sm:text-[35px] text-[25px] text-white-500  my-2'
      repeat={Infinity}
    />
  );
}

export default TypeWrite;
