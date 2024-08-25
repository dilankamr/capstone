"use client";

import React, {useEffect, useState} from "react";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { Input, Textarea } from "@nextui-org/input";
import {Project, saveProject} from "@/service/project.service";
import {getAllTechnology, Technology} from "@/service/technology.service";
import ParentTechnologySet from "@/app/project/parentTechnologySet";
// import {useNavigate} from "react-router";

export function ProjectAddPopup({ onSave }) {

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] = React.useState("inside");
  const [titleValue, setTitleValue] = useState("");
  const [summeryValue, setSummeryValue] = useState("");
  const [selectedTechnologies, setSelectedTechnologies] = useState([]);
  // const navigate = useNavigate();
  const onSubmit = async () => {

    const res = await saveProject({
      id: "",
      title: titleValue,
      summary: summeryValue,
      student: "6627d68922ab8ba8199a3f07",
      technology: selectedTechnologies,
    });

    onSave(res);
    clearForm();
    onClose();
  };


  const clearForm = () => {
    setTitleValue("");
    setSummeryValue("");
    setSelectedTechnologies([]); // Clear the selectedTechnologies array
  };



  return (
    <>

      {/*<Button onPress={onOpen}>Add New Project</Button>*/}
      <Button onPress={onOpen} color={"secondary"} radius="full" className=" text-white shadow-lg text-lg font-semibold p-7">Create New Project</Button>
      <Modal
        isOpen={isOpen}
        placement="top-center"
        onClose={onClose}
        onOpenChange={onOpenChange}
         scrollBehavior={scrollBehavior}
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
              Add Project
            </ModalHeader>
            <ModalBody>
              <Input
                label="title"
                placeholder="Enter title"
                type="text"
                value={titleValue}
                variant="bordered"
                onValueChange={setTitleValue}
              />
              <Textarea
                label="summery"
                placeholder="Enter summery"
                type="text"
                value={summeryValue}
                variant="bordered"
                onValueChange={setSummeryValue}
              />
              <ParentTechnologySet
                  selectedTechnologies={selectedTechnologies}
                  setSelectedTechnologies={setSelectedTechnologies}
              />

            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" type="submit" onPress={onSubmit}>
                Submit
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}
