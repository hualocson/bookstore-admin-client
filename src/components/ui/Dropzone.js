import { useDropzone } from "react-dropzone";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Button from "./Button";
import { cn, handleErrorResponse } from "@/utils/common-functions";
const Dropzone = ({ className, selectedFile }) => {
  const [file, setFile] = useState(null);

  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      if (acceptedFiles?.length) {
        setFile(
          Object.assign(acceptedFiles[0], {
            preview: URL.createObjectURL(acceptedFiles[0]),
          })
        );
        selectedFile.current = acceptedFiles[0];
      }

      if (rejectedFiles?.length) {
        const { errors } = rejectedFiles[0];
        setErrorMessage(errors[0].message);
      }
    },
    [selectedFile]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    maxFiles: 1,
    maxSize: 10 * 10 ** 6,
    disabled: file !== null,
  });

  const removeFile = (e) => {
    e.preventDefault();
    setFile(null);
  };

  return (
    <div
      {...getRootProps({
        className: cn(
          !file
            ? "cursor-pointer border border-grayscale-300"
            : "border border-primary-400 border-dashed",
          className
        ),
      })}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : file ? (
        <div className="relative h-full w-full rounded-lg">
          <Image
            src={file.preview}
            alt={file.name}
            onLoad={() => {
              URL.revokeObjectURL(file.preview);
            }}
            fill
            className="h-auto max-w-full rounded-lg object-contain"
          />
          <Button
            variant="danger"
            size="sm"
            customClass="absolute top-0 right-0"
            icon={<XMarkIcon className="h-4 w-4 text-grayscale-200" />}
            onClick={removeFile}
          />
        </div>
      ) : (
        <p className="select-none">
          Drag drop some files here, or click to select files
        </p>
      )}
    </div>
  );
};

export default Dropzone;
