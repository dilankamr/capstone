"use client";

import React, { useEffect } from 'react';
import { useMultiStepContext } from "@/app/step-context";

const GuideList = () => {
  const { finalData, setFinalData } = useMultiStepContext();

  // Save finalData to localStorage whenever it changes
  useEffect(() => {
    if (finalData.length > 0) {
      localStorage.setItem('finalData', JSON.stringify(finalData));
    }
  }, [finalData]);

  // Load finalData from localStorage on component mount
  useEffect(() => {
    const storedData = localStorage.getItem('finalData');
    if (storedData) {
      setFinalData(JSON.parse(storedData));
    }
  }, [setFinalData]);

  return (

    <>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Project Details</h1>
        {finalData.length > 0 ? (
            finalData.map((data, index) => (
                <div key={index} className="mb-6 p-4 border rounded shadow-md">
                  <h2 className="text-xl font-semibold">Project {index + 1}</h2>
                  <p className='rounded'><strong>Title:</strong> {data.titleValue}</p>
                  <p><strong>Summary:</strong> {data.summeryValue}</p>
                  <p><strong>Technologies:</strong> {data.selectedTechnologies.join(', ')}</p>
                  <p><strong>Categories:</strong> {data.selectedCategories.join(', ')}</p>
                </div>
            ))
        ) : (
            <p>Loading.......</p>
        )}
      </div>
    </>
  );
};

export default GuideList;
