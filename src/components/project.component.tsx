import { useRef, useState } from "react";
import { IRepositoryData } from "../@types";
import { CardComponent } from "./card.component";

interface Props {
  Id: string;
  Repository: IRepositoryData;
}

export const ProjectComponent = ({
  Id,
  Repository = {
    name: "",
    description: "",
    images: [],
    url: "",
    skills: [],
  },
}: Props) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const imagesContainerRef = useRef<HTMLDivElement>(null);
  const imagesPreviewContainerRef = useRef<HTMLDivElement>(null);

  const getImages = (): Array<HTMLElement> => {
    const container = imagesContainerRef.current;

    if (!container) return [];

    return Array.from(container.children) as HTMLElement[];
  };

  const getImagesPreview = (): Array<HTMLElement> => {
    const container = imagesPreviewContainerRef.current;

    if (!container) return [];

    return Array.from(container.children) as HTMLElement[];
  };

  const goToImage = (index: number) => {
    const target = getImages().find((s) => s.id === `${Id}-image-${index}`);
    const targetPreview = getImagesPreview().find(
      (s) => s.id === `${Id}-image-preview-${index}`,
    );

    if (target && targetPreview) {
      target.scrollIntoView({ behavior: "smooth" });
      targetPreview.scrollIntoView({ behavior: "smooth" });
      setCurrentImageIndex(index);
    }
  };

  const goToNextImage = () => {
    const images = getImages();
    const nextIndex = (currentImageIndex + 1) % images.length;

    goToImage(nextIndex);
  };

  const goToPreviousImage = () => {
    const images = getImages();
    const previousIndex =
      (currentImageIndex - 1 + images.length) % images.length;

    goToImage(previousIndex);
  };

  return (
    <CardComponent
      Id={Id}
      ClassName={`grid grid-cols-[1fr_0.4fr] grid-rows-[auto_1fr] gap-8`}
    >
      <h1 className={`col-span-2 text-2xl font-bold`}>{Repository.name}</h1>
      <div className="row-span-2 flex h-full flex-col">
        <div
          ref={imagesContainerRef}
          className="scrollbar-hidden flex h-full snap-x snap-mandatory overflow-x-auto"
        >
          {Repository.images.map((image, index) => (
            <img
              key={index}
              alt={`Repository Image ${index + 1}`}
              className={`h-auto w-full min-w-full snap-center object-contain`}
              src={image}
              id={`${Id}-image-${index}`}
            />
          ))}
        </div>
        <div className="grid h-fit grid-cols-[auto_1fr_auto] gap-1">
          <button
            className="bg-bg-navbar flex h-full w-6 cursor-pointer items-center justify-center rounded-[3px]"
            onClick={goToPreviousImage}
          >
            <div className="h-0 w-0 border-t-[5px] border-r-[10px] border-b-[5px] border-l-0 border-transparent border-r-[#000]"></div>
          </button>
          <div
            ref={imagesPreviewContainerRef}
            className="scrollbar-hidden flex snap-x snap-mandatory gap-1 overflow-x-scroll"
          >
            {Repository.images.map((image, index) => (
              <img
                key={index}
                alt={`Repository Image ${index + 1}`}
                className={`h-[65px] w-[115px] cursor-pointer snap-start ${currentImageIndex === index ? "border-highlight border-2" : ""}`}
                src={image}
                onClick={() => goToImage(index)}
                id={`${Id}-image-preview-${index}`}
              />
            ))}
          </div>
          <button
            className="bg-bg-navbar flex h-full w-6 cursor-pointer items-center justify-center rounded-[3px]"
            onClick={goToNextImage}
          >
            <div className="h-0 w-0 border-t-[5px] border-r-0 border-b-[5px] border-l-[10px] border-transparent border-l-[#000]"></div>
          </button>
        </div>
      </div>
      <p className={`text-justify`}>{Repository.description}</p>
      <div className={`flex flex-wrap items-center gap-4`}>
        {Repository.skills.map((skill, index) => (
          <img
            key={index}
            src={skill.url}
            alt={skill.name}
            className="h-10 w-10 cursor-pointer"
          />
        ))}
      </div>
    </CardComponent>
  );
};
