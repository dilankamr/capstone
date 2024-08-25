"use client";
import React, {createContext, useState, useContext, ReactNode, useEffect} from 'react';
import {Project} from "@/service/project.service";

interface ContextProps {

    filteringPageCurrentStep: number;
    setFilteringPageCurrentStep: React.Dispatch<React.SetStateAction<number>>;
    projectResponse:any;
    setProjectResponse:React.Dispatch<React.SetStateAction<any>>;
    currentStep: number;
    setStep: React.Dispatch<React.SetStateAction<number>>;
    userData: any;
    setUserData: React.Dispatch<React.SetStateAction<any>>;
    finalData: any[];
    setFinalData: React.Dispatch<React.SetStateAction<any[]>>;
    selectedTechnologies: string[];
    setSelectedTechnologies: React.Dispatch<React.SetStateAction<string[]>>;
    guideCurrentStep: number;
    setGuideCurrentStep: React.Dispatch<React.SetStateAction<number>>;
    guideUserData: any;
    setGuideUserData: React.Dispatch<React.SetStateAction<any>>;
    guideFinalData: any[];
    setGuideFinalData: React.Dispatch<React.SetStateAction<any[]>>;
    selectedCategories:string[];
    setSelectedCategories:React.Dispatch<React.SetStateAction<string[]>>
    guideSelectedCategories:string[];
    setGuideSelectedCategories:React.Dispatch<React.SetStateAction<string[]>>
    guideSelectedTechnologies:string[];
    setGuideSelectedTechnologies: React.Dispatch<React.SetStateAction<string[]>>;


}

export const MultiStepContext = createContext<ContextProps | undefined>(undefined);

export default function StepContextProvider({ children }: { children: ReactNode }) {

    const[projectResponse,setProjectResponse] = useState("");
    const [currentStep, setStep] = useState(1);
    const [userData, setUserData] = useState<any>({});
    const [finalData, setFinalData] = useState<any[]>([]);
    const [guideCurrentStep, setGuideCurrentStep] = useState(1);
    const [guideUserData, setGuideUserData] = useState<any>({});
    const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([]);
    const [guideFinalData, setGuideFinalData] = useState<any[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [guideSelectedCategories, setGuideSelectedCategories ] =useState<string[]>([]);
    const [ guideSelectedTechnologies,setGuideSelectedTechnologies] = useState<string[]>([]);
    const [ filteringPageCurrentStep, setFilteringPageCurrentStep] = useState(1);

    // const [createProject, setCreateProject]: [
    //     Project[],
    //     React.Dispatch<(prevRows: Project[]) => Project[]>,
    // ] = useState([]);
    //
    // useEffect(() => {
    //     console.log("useEffect: ", createProject);
    // }, [createProject]);
    //
    // const handleSave = (project: Project) => {
    //     console.log("Trying to save: ", project);
    //     setCreateProject((prevRows: Project[]) => [...prevRows, project]);
    // };

    return (
        <MultiStepContext.Provider
            value={{
                currentStep,
                setStep,
                userData,
                setUserData,
                finalData,
                setFinalData,
                selectedTechnologies,
                setSelectedTechnologies,
                guideUserData,
                setGuideUserData,
                guideCurrentStep,
                setGuideCurrentStep,
                guideFinalData,
                setGuideFinalData,
                selectedCategories,
                setSelectedCategories,
                guideSelectedTechnologies,
                setGuideSelectedTechnologies,
                guideSelectedCategories,
                setGuideSelectedCategories,
                projectResponse,
                setProjectResponse,
                filteringPageCurrentStep,
                setFilteringPageCurrentStep
        }}
        >
            {children}
        </MultiStepContext.Provider>
    );
}

export function useMultiStepContext() {
    const context = useContext(MultiStepContext);
    if (!context) {
        throw new Error("useMultiStepContext must be used within a StepContextProvider");
    }
    return context;
}
