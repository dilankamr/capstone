"use client";


import {Step, StepLabel} from "@mui/material";
import GuideFormFirstStep from "@/app/guide/form-first-step-1";
import {useContext} from "react";
import {MultiStepContext} from "@/app/step-context";
import GuideFormSecondStep from "@/app/guide/form-second-step-2";
import GuideFormThirdStep from "@/app/guide/form-third-step-3";
import Stepper from "@mui/material/Stepper";
import {Box} from "@mui/system";

const steps = ['Add title and summary', 'Select Technology Stack', 'Select Category'];

export default function Page() {
    const context = useContext(MultiStepContext);

    if (!context) {
        throw new Error("MultiStepContext must be used within a StepContext");
    }

    const { guideCurrentStep } = context;

    function showStep(step: number) {
        switch (step) {
            case 1:
                return <GuideFormFirstStep />;
            case 2:
                return <GuideFormSecondStep />;
            case 3:
                return <GuideFormThirdStep />;
            default:
                return null;
        }
    }

    return (
        <>
            <section className="flex flex-col justify-center items-center p-0 m-0 gap-8 ">

            <h1 className="mt-16">Create your account here..</h1>
    <Box sx={{ width: '100%', marginTop:'20px'}}>
    <Stepper activeStep={guideCurrentStep - 1} alternativeLabel>
    {steps.map((label) => (
            <Step key={label}>
            <StepLabel className="text-white">{label}</StepLabel>
                </Step>
        ))}
    </Stepper>
    </Box>
    </section>
    <br />
    <br />
    {showStep(guideCurrentStep)}

    </>
);
}
