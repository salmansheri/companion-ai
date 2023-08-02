"use client";

import { useMounted } from "@/hooks/use-mounted";
import React from "react";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";

interface ImageUploadProps {
  value: string;
  onChange: (src: string) => void;
  disabled?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  disabled,
}) => {
  const isMounted = useMounted();

  if (!isMounted) {
    return null;
  }
  return (
    <div className="space-y-4 flex w-full flex-col justify-center items-center">
      <CldUploadButton
        onUpload={(result: any) => onChange(result.info.secure_url)}
        options={{
          maxFiles: 1,
        }}
        uploadPreset="bqhk6xj4"
      >
        <div className="p-4 border-4 border-dashed border-primary/10 hover:opacity-75 transition rounded-lg flex  flex-col space-y-2 items-center justify-center">
          <div className="relative h-40 w-40">
            <Image
              src={value || "/placeholder.svg"}
              fill
              alt="upload"
              className="object-cover "
            />
          </div>
        </div>
      </CldUploadButton>
    </div>
  );
};

export default ImageUpload;
