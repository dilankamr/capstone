
"use client";
import React, { useEffect, useState } from 'react';
import { Button } from "@nextui-org/button";
import { useMultiStepContext } from "@/app/step-context";
import ParentTechnologySet from "./parentTechnologySet";

function FormSecondStep() {
    const { setStep, userData, setUserData, selectedTechnologies, setSelectedTechnologies } = useMultiStepContext();

    useEffect(() => {
        // Ensure selectedTechnologies is correctly updated when the component mounts
        if (userData.selectedTechnologies && userData.selectedTechnologies.length > 0) {
            setSelectedTechnologies(userData.selectedTechnologies);
        }
    }, [userData.selectedTechnologies, setSelectedTechnologies]);
    const handleNext = () => {
        const newUserData = { ...userData, selectedTechnologies: Array.from(new Set(selectedTechnologies)) };
        setUserData(newUserData);
        setStep(prevStep => prevStep + 1);
        console.log("Current userData:", newUserData);
    };

    const handlePrev = () => {
        const newUserData = { ...userData, selectedTechnologies: Array.from(new Set(selectedTechnologies)) };
        setUserData(newUserData)
        setStep((prevStep) => prevStep - 1);
        console.log("Current userData:", newUserData);
    };

    return (
        <div className="flex justify-center items-center">
            <section className="w-6/12">
                <ParentTechnologySet
                    selectedTechnologies={selectedTechnologies}
                    setSelectedTechnologies={setSelectedTechnologies}
                />
                <div className="flex flex-col gap-4">
                    <Button radius="full" variant="shadow" color="primary" onClick={handlePrev}>
                        Prev
                    </Button>
                    <Button radius="full" variant="shadow" color="primary" onClick={handleNext}>
                        Next
                    </Button>
                </div>
            </section>
        </div>
    );
}

export default FormSecondStep;
