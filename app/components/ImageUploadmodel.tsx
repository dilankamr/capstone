// components/ImageUploadModal.tsx
"use client";

import React from "react";
import { Modal, ModalBody, ModalContent, useDisclosure } from "@nextui-org/modal";
import ImageUpload from "../components/imageupload";
import { Guide } from "@/service/guide.service";

interface ImageUploadModalProps {
  visible: boolean;
  closeHandler: () => void;
  setImageUrl: (url: string) => void;
  guide: Guide;
}

const ImageUploadModal: React.FC<ImageUploadModalProps> = ({ visible, closeHandler, setImageUrl,guide }) => {
  return (
    <Modal isOpen={visible} onClose={closeHandler} className="h-1/3">
      <ModalContent>
        <ModalBody>
          <ImageUpload setImageUrl={setImageUrl} closeHandler={closeHandler} guide={guide} />
          <button onClick={closeHandler}>Close</button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ImageUploadModal;
