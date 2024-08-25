"use client";
import React from 'react';
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useMultiStepContext } from "@/app/step-context";
import Nav from '../components/nav1';

export default function GuideFormSecondStep() {
    const { guideCurrentStep, setGuideCurrentStep, guideUserData, setGuideUserData } = useMultiStepContext();


    const handleNext = () => {
        setGuideCurrentStep(prevStep => prevStep + 1);
        console.log("current step: ", guideCurrentStep);
        console.log("user data: ", guideUserData);
    };

    const handlePrev = () => {
        setGuideCurrentStep(prevStep => prevStep - 1);
    };

    return (
        <>
        <div className='absolute inset-x-0'>
                <Nav/>
            </div>
        <div className="flex items-center justify-center gap-4">
            <section className="w-6/12">
                <div className="flex flex-col gap-4">

                    <div>
                        <Input
                            label="Job"
                            placeholder="Enter job"
                            type="text"
                            variant="flat"
                            className="w-full"
                            value={guideUserData['jobValue']}
                            onChange={(e) => setGuideUserData({...guideUserData, "jobValue": e.target.value})}
                        />
                    </div>
                    <div>
                        <Input
                            label="About"
                            placeholder="Enter About "
                            type="text"
                            variant="flat"
                            className="w-full"
                            value={guideUserData['aboutValue']}
                            onChange={(e) => setGuideUserData({...guideUserData, "aboutValue": e.target.value})}
                        />
                    </div>
                    <div>
                        <Input
                            label="Milestones"
                            placeholder="Enter Milestones"
                            type="text"
                            variant="flat"
                            className="w-full"
                            value={guideUserData['milestonesValue']}
                            onChange={(e) => setGuideUserData({...guideUserData, "milestonesValue": e.target.value})}
                        />
                    </div>
                    <div>
                        <Input
                            label="Social Media Links"
                            placeholder="Enter Social Media Links"
                            type="text"
                            variant="flat"
                            className="w-full"
                            value={guideUserData['socialMediaLinksValue']}
                            onChange={(e) => setGuideUserData({...guideUserData, "socialMediaLinksValue": e.target.value})}
                        />
                    </div>

                    <div className="flex gap-4 mt-4">
                        <Button radius="full" variant="shadow" color="primary" onClick={handlePrev}>
                            Prev
                        </Button>
                        <Button radius="full" variant="shadow" color="primary" onClick={handleNext}>
                            Next
                        </Button>
                    </div>
                </div>
            </section>
        </div>
        </>
    );
}
