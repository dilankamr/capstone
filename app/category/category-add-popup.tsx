"use client";

import React, {useState} from 'react';
import {Button} from "@nextui-org/button";
import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure} from "@nextui-org/modal";
import {Input, Textarea} from "@nextui-org/input";
import {saveCategory} from "@/service/category.service";

export function CategoryAddPopup({ onSave}) {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    const [categoryNameValue, setCategoryNameValue] = useState("");

    const onSubmit = async () => {
        const res = await saveCategory({
            id: "",
            categoryName: categoryNameValue,
            project: "662c77e4c0de72d5345973b0",
            guide: "665870f6f825e7ae234cb13d",
        })
        onSave(res);
        clearForm();
        onClose();
    };

    const clearForm = () => {
        setCategoryNameValue("");
    };


    return (
        <>
            <Button  onPress={onOpen}>Add New Category</Button>
            <Modal
                isOpen={isOpen}
                placement="top-center"
                onClose={onClose}
                onOpenChange={onOpenChange}
            >
                <ModalContent>
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            Add Category
                        </ModalHeader>
                        <ModalBody>
                            <Input
                                label="categoryName"
                                placeholder="Enter categoryName"
                                type="text"
                                value={categoryNameValue}
                                variant="bordered"
                                onValueChange={setCategoryNameValue}
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