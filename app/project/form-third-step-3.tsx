"use client";
import { RiCheckboxCircleFill } from "react-icons/ri";
import React, { useEffect, useState } from 'react';
import { Button } from "@nextui-org/button";
import { useMultiStepContext } from "@/app/step-context";
import SelectCategory from "@/app/category/select-category";
import { getAllCategory } from "@/service/category.service";
import { useSession } from 'next-auth/react';
import useAxiosAuth from '@/lib/hook/useAxiosAuth';
import { useRouter } from 'next/navigation'
import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure} from "@nextui-org/modal";

const FormThirdStep = () => {
  const {isOpen, onOpen, onOpenChange,onClose} = useDisclosure();
  const { setStep, userData, setUserData, finalData, setFinalData, selectedCategories, setSelectedCategories,projectResponse,setProjectResponse} = useMultiStepContext();
  const [rows, setRows] = useState([]);
  const { data: session } = useSession();
  const axiosAuth = useAxiosAuth();
  const router = useRouter()

  const columns = [
    {
      key: "categoryName",
      label: "CATEGORYNAME",
    }
  ];

  useEffect(() => {
    getAllCategory().then((res) => {
      console.log("fetch response: ", res);
      setRows(res);
    });
  }, []);

  const handlePrev = () => {
    const newUserData = { ...userData, selectedCategories: Array.from(new Set(selectedCategories)) };
    setUserData(newUserData);
    setStep(prevStep => prevStep - 1);
    console.log("Current userData (Prev):", newUserData);
  };
  const onOpenFiltering = () => {

    router.push('/project/filtering-system');
  };

  const closeModal=()=>{
    onClose();
    setUserData("");
    console.log("userData:",userData);
    router.push('/project')


  }


  const submitData = async () => {


    if (!session) {
      console.error("No active session found");
      return;
    }

    const newUserData = { ...userData, selectedCategories: Array.from(new Set(selectedCategories)) };

    try {
      // Save project data
      console.log("Project data being sent to server:", newUserData);
      const res = await axiosAuth.post('/projects', {
        title: newUserData.titleValue,
        summary: newUserData.summeryValue,
        student: session?.user.id || '',
        technology: newUserData.selectedTechnologies,
        category: newUserData.selectedCategories,
      });
      setProjectResponse(res.data);
      console.log("projectResponseID",projectResponse);

      console.log("Response from saveProject:", res.data);


      const technologyNames = res.data.technologies.map((tech: any) => tech.technologyName);
      console.log("Extracted Technology Names:", technologyNames);

      const categoryNames = res.data.category.map((cat: any) => cat.categoryName);
      console.log("Extracted Technology Names:", categoryNames);

      const updatedUserData = {
        ...newUserData,
        selectedTechnologies: technologyNames,
        selectedCategories: categoryNames,
      };

      // Update finalData with the newUserData
      setFinalData(prevFinalData => [...prevFinalData, { ...newUserData, selectedTechnologies: technologyNames, selectedCategories: categoryNames }]);
      console.log("finalData:", [...finalData, updatedUserData]);

      // Move to the next step
      // setStep(1);
       // router.push('/project/guideList')

console.log("You have successfully submitted data");
    } catch (error) {
      console.error("Error in onSubmit:", error);
    }
    setUserData("");
    onOpen();

  };


// Inside your component
  useEffect(() => {
    if (projectResponse) {
      console.log("projectResponseID", projectResponse);
      // any other actions that need to happen when projectResponse changes
    }
  }, [projectResponse]); // This useEffect will run whenever projectResponse changes
// const successfullyCreatedModel =()=>{
//
// }
  return (
<>
  <div className="flex justify-center items-center">
    <section className="w-6/12">
      <div className="flex flex-col gap-2">
        <SelectCategory
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            rows={rows}
            columns={columns}
        />
      </div>
      <div className="flex flex-col gap-4">
        <br />
        <Button radius="full" variant="shadow" color="primary" onClick={handlePrev}>
          Prev
        </Button>
        <Button radius="full" variant="shadow" color="danger" onClick={submitData}>
          Submit
        </Button>
      </div>
    </section>
  </div>



  <Modal isOpen={isOpen} onOpenChange={onOpenChange}
         classNames={{
           base: "border-[#52525B] bg-[#18181B] dark:bg-[#18181B] ",
           backdrop: "bg-[black]/90 backdrop-opacity-40"
         }} >
    <ModalContent className={"p-5"}>
      {(onClose) => (
          <>
          <div className={"flex flex-col justify-center gap-1"}>


            {/*<ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>*/}

            <ModalBody>
              <div>
              <div className={"flex justify-center gap-1  "}><RiCheckboxCircleFill className={" text-green-500 text-6xl -mt-5"}/></div>
              <br/>
          <h1 className={"text-center text-xl font-bold"}>Congratulations! You have successfully created the project!</h1>
              <p className={"text-center font-light text-xs text-gray-400 mt-3 "}>Choose the best guide for your project. Click the button below. </p>




              <div className={"flex flex-col justify-center p-5 gap-2 mt-2 "}>
                <Button className={"font-semibold"} color="primary" onPress={onOpenFiltering}  variant="ghost">
                  Find a Guide
                </Button>
              <Button  className={"font-semibold"} color="danger" variant="light" onPress={closeModal}>
                Close
              </Button>

              </div>
              </div>

            </ModalBody>
          </div>
          </>
      )}
    </ModalContent>
  </Modal>

</>


  );
};

export default FormThirdStep;
