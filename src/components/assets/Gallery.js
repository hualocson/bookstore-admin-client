import { CodeBracketIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { toast } from "react-toastify";
import Button from "../ui/Button";
import Tooltip from "../ui/Tooltip";

const Gallery = ({ imageList = [] }) => {
  const copyUrl = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Copied to clipboard");
    } catch (error) {
      toast.error("Error copying to clipboard");
    }
  };
  return (
    <div className="flex flex-col gap-y-2 items-start">
      <p className="bg-primary-500/10 ring-1 ring-primary-500/20 p-2 rounded-md text-primary-400">
        All assets
      </p>
      <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-4">
        {imageList.length === 0 && (
          <p className="col-span-2 md:col-span-4">No assets found</p>
        )}
        {imageList.map((image) => {
          return (
            <div key={image.id} className="relative group">
              <Image
                src={image.secureUrl}
                alt={image.cloudinaryPublicId}
                width={500}
                height={500}
                priority
                className="h-auto max-w-full rounded-lg group-hover:shadow-lg group-hover:translate-x-1 group-hover:translate-y-1 transition-all duration-300"
              />
              <Tooltip
                trigger={
                  <Button
                    customClass="absolute top-2 right-2 p-2 bg-grayscale-950/40 backdrop-blur-lg rounded-full opacity-0 group-hover:opacity-100 cursor-pointer group-hover:translate-x-1 group-hover:translate-y-1"
                    onClick={() => copyUrl(image.secureUrl)}
                  >
                    <CodeBracketIcon className=" h-4 w-4 text-grayscale-200" />
                  </Button>
                }
                content={
                  <div className="flex flex-col items-center justify-center gap-y-2">
                    Copy
                  </div>
                }
                customClassName="bg-grayscale-900/60 backdrop-blur-md ring-1 ring-grayscale-200/20 p-1 text-xs "
                delayDuration={200}
                side="top"
                asChild
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Gallery;
