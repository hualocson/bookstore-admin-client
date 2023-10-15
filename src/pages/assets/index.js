import { assetsApi } from "@/apis";
import Gallery from "@/components/assets/Gallery";
import MainLayout from "@/components/layouts/Layout";
import Button from "@/components/ui/Button";
import ConfirmDialog from "@/components/ui/Dialog";
import Dropzone from "@/components/ui/Dropzone";
import useAssets from "@/hooks/useAssets";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

import { handleErrorResponse } from "@/utils/common-functions";

const AssetsPage = () => {
  const { data, error, isLoading, mutate } = useAssets();

  const [open, setOpen] = useState(false);

  const selectedFile = useRef(null);
  const handleUploadFile = async () => {
    const file = selectedFile.current;

    if (!file) {
      toast.error("Please select a file to upload");
      return;
    }

    try {
      await assetsApi.uploadImage(file);
      toast.success("Upload success");
      selectedFile.current = null;
      setOpen(false);
      mutate();
    } catch (error) {
      const { message } = handleErrorResponse(error);
      toast.error(message);
    }
  };

  return (
    <MainLayout>
      <div className="flex items-center justify-between">
        <h2 className="tab-heading mb-4">Assets</h2>
        <ConfirmDialog
          trigger={
            <Button variant="primary" size="md">
              Upload
            </Button>
          }
          asChildTrigger
          title="Upload assets"
          onConfirm={handleUploadFile}
          confirmText={"Upload"}
          desc={"This will upload the selected file to the server."}
          open={open}
          setOpen={setOpen}
        >
          <Dropzone
            className="flex items-center justify-center p-2 text-center rounded-md w-full aspect-video"
            selectedFile={selectedFile}
          />
        </ConfirmDialog>
      </div>
      <Gallery imageList={data} />
    </MainLayout>
  );
};

export default AssetsPage;
