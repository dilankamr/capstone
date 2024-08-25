"use client";
import React, { useState, useEffect } from 'react';
import { useDisclosure } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { useMultiStepContext } from "@/app/step-context";
import ParentTechnologySet from "@/app/project/parentTechnologySet";
import { Category, getAllCategory } from "@/service/category.service";
import GuideSelectCategory from "@/app/guide/guide-select-category";;
import {saveGuide} from "@/service/guide.service";
import Nav from '../components/nav1';
import { useRouter } from 'next/navigation';



export default function GuideFormThirdStep() {
    const { setGuideCurrentStep, guideUserData, setGuideUserData, guideFinalData, setGuideFinalData, guideSelectedTechnologies,guideSelectedCategories
    ,setGuideSelectedTechnologies,setGuideSelectedCategories} = useMultiStepContext();
    const { onOpen } = useDisclosure();
    const [rows, setRows] = useState<Category[]>([]);
        const columns = [
        { key: "categoryName", label: "CATEGORY NAME" }
    ];

    useEffect(() => {
        getAllCategory().then(res => {
            console.log("fetch response: ", res);
            setRows(res);
        });
    }, []);

    useEffect(() => {
        console.log("useEffect: ", rows);
    }, [rows]);

    const router = useRouter()

    const submitData = async () => {
        const newUserData = { ...guideUserData, guideSelectedTechnologies: Array.from(new Set(guideSelectedTechnologies)), guideSelectedCategories: Array.from(new Set(guideSelectedCategories)) };


        try {
            // Save project data
            console.log("Guide data being sent to server:", newUserData);
            const res = await saveGuide({
                id: "",
                firstName: newUserData.firstNameValue,
                lastName: newUserData.lastNameValue,
                email: newUserData.emailValue,
                password:newUserData.passwordValue,
                profilePic:'/',
                job: newUserData.jobValue,
                about: newUserData.aboutValue,
                milestones: newUserData.milestonesValue,
                socialMediaLinks: newUserData.socialMediaLinksValue,
                technologies: newUserData.guideSelectedTechnologies,
                categories:newUserData.guideSelectedCategories
            });
            console.log("Response from saveGuide:", res);
            const guideId = res.id;
            router.push(`/profile3?guideId=${guideId}`)

            // Update finalData with the newUserData
            setGuideFinalData(prevFinalData => [...prevFinalData, newUserData]);
            console.log("finalData:", [...guideFinalData, newUserData]);
            // Move to the next step
            // setGuideCurrentStep(1);
            console.log("You have successfully submitted data");

        } catch (error) {
            console.error("Error in onSubmit:", error);
        }
        setGuideUserData("");

        handleLoginClick();
    };

    const handleLoginClick = () => {

      };



    const handlePrev = () => {

        const newUserData = { ...guideUserData, selectedTechnologies: Array.from(new Set(guideSelectedTechnologies)),selectedCategories: Array.from(new Set(guideSelectedCategories)) };
        setGuideUserData(newUserData)
        setGuideCurrentStep((prevStep) => prevStep - 1);
        console.log("Current userData:", newUserData);
    };


    return (
        <>
        <div className='absolute inset-x-0'>
                <Nav/>
            </div>
        <div className="flex justify-center items-center ">
            <section className="w-6/12 ">
                <div className="flex flex-col gap-4">
                    <h2>Select Technologies</h2>
                    <ParentTechnologySet
                        selectedTechnologies={guideSelectedTechnologies}
                        setSelectedTechnologies={setGuideSelectedTechnologies}
                    />
                </div>
                <div className="flex flex-col gap-4 mt-4">
                    <GuideSelectCategory   guideSelectedCategories={guideSelectedCategories}
                                      setGuideSelectedCategories={setGuideSelectedCategories}
                                      rows={rows}
                                      columns={columns} />
                </div>
                <div className="flex gap-4 mt-4">
                    <Button className="bg-blue-500 text-white rounded-full px-4 py-2 shadow-md hover:bg-blue-600 transition duration-300" onClick={handlePrev}>
                        Prev
                    </Button>
                    <Button onClick={submitData}   className="bg-red-500 text-white rounded-full px-4 py-2 shadow-md hover:bg-red-600 transition duration-300" >
                        Create my Account
                    </Button>
                </div>
            </section>

        </div>
        </>
    );
}
