"use client";
import React from "react";
import { UploadButton } from "../utils/uploadthings";
import { Guide, updateGuidePic  } from "@/service/guide.service";

interface ImageUploadProps {
  setImageUrl: (url: string) => void;
  closeHandler: () => void;
  guide: Guide;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ setImageUrl,guide,closeHandler }) => {

    const handleUploadComplete =  async (res: any[]) => {
   
        const imageUrl = res[0].url;
        setImageUrl(imageUrl);

        try {
            await updateGuidePic({ ...guide, profilePic: imageUrl });
            alert("Profile picture updated successfully!");
            window.location.reload();
          } catch (error) {
            alert(`Failed to update profile picture `);
          }
          closeHandler();  
           
      };


  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <UploadButton 
        endpoint="imageUploader"
        onClientUploadComplete={handleUploadComplete}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
    </div>
  );
};

export default ImageUpload;
