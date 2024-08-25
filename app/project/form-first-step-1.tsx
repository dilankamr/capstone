import React, {useState} from 'react';
import { Input, Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useMultiStepContext } from "@/app/step-context";

function FormFirstStep() {

    const { currentStep,setStep, userData, setUserData } = useMultiStepContext();

    const handleNext = () => {
     ;
        setStep(prevStep => prevStep + 1);
        console.log("current step: ", currentStep);
         console.log("user data: ", userData);
    };

    return (
        <div className="flex items-center justify-center">
            <section className="w-6/12">
                <div className="flex flex-col gap-4">
                    <div>
                        <Input
                            label="Title"
                            placeholder="Enter title"
                            type="text"
                            variant="flat"
                            className="w-full"
                            value={userData['titleValue']}
                            onChange={(e) => setUserData({...userData,"titleValue":e.target.value})}
                        />
                    </div>
                    <div>
                        <Textarea
                            label="Summary"
                            placeholder="Enter summary"
                            type="text"
                            variant="flat"
                            className="w-full"
                            value={userData['summeryValue']}
                            onChange={(e) => setUserData({...userData,"summeryValue":e.target.value})}
                        />
                    </div>
                    <br />
                    <Button radius="full" variant="shadow" color="primary" onClick={handleNext}>
                        Next
                    </Button>
                </div>
            </section>
        </div>
    );
}

export default FormFirstStep;
