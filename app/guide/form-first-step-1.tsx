import React, { useState } from 'react';
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useMultiStepContext } from "@/app/step-context";
import Nav from '../components/nav1';

export default function GuideFormFirstStep() {
    const { guideCurrentStep, setGuideCurrentStep, guideUserData, setGuideUserData } = useMultiStepContext();
    const [error, setError] = useState<string | null>(null);

    const validateEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleNext = () => {
        // Validation logic
        if (!guideUserData['firstNameValue'] || !guideUserData['lastNameValue'] || !guideUserData['emailValue'] || !guideUserData['passwordValue']) {
            setError("Please fill out all fields.");
            return;
        }
        if (!validateEmail(guideUserData['emailValue'])) {
            setError("Please enter a valid email address.");
            return;
        }
        if (guideUserData['passwordValue'].length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        setError(null); // Clear error if validation passes
        setGuideCurrentStep(prevStep => prevStep + 1);
        console.log("current step: ", guideCurrentStep);
        console.log("user data: ", guideUserData);
    };

    return (
        <>
        <div className='absolute inset-x-0'>
                <Nav/>
            </div>
        <div className="flex items-center justify-center gap-4 ">

            <section className="w-6/12">
                <div className="flex flex-col gap-4">
                    <div>
                        <Input
                            label="First Name"
                            placeholder="Enter first name"
                            type="text"
                            variant="flat"
                            className="w-full"
                            value={guideUserData['firstNameValue']}
                            onChange={(e) => setGuideUserData({ ...guideUserData, "firstNameValue": e.target.value })}
                        />
                    </div>
                    <div>
                        <Input
                            label="Last Name"
                            placeholder="Enter last name"
                            type="text"
                            variant="flat"
                            className="w-full"
                            value={guideUserData['lastNameValue']}
                            onChange={(e) => setGuideUserData({ ...guideUserData, "lastNameValue": e.target.value })}
                        />
                    </div>
                    <div>
                        <Input
                            label="Email"
                            placeholder="Enter email"
                            type="text"
                            variant="flat"
                            className="w-full"
                            value={guideUserData['emailValue']}
                            onChange={(e) => setGuideUserData({ ...guideUserData, "emailValue": e.target.value })}
                        />
                    </div>
                    <div>
                        <Input
                            label="Password"
                            placeholder="Enter Password"
                            type="text"
                            variant="flat"
                            className="w-full"
                            value={guideUserData['passwordValue']}
                            onChange={(e) => setGuideUserData({ ...guideUserData, "passwordValue": e.target.value })}
                        />
                    </div>
                    {error && (
                        <div className="text-red-500 text-sm">
                            {error}
                        </div>
                    )}
                    <br />
                    <Button radius="full" variant="shadow" color="primary" onClick={handleNext}>
                        Next
                    </Button>
                </div>
            </section>
        </div>
        </>
    );
}
