import { useRef } from "react";
import { IRepositoryData } from "..";
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
  const imagesContainerRef = useRef<HTMLDivElement>(null);

  const goToImage = (index: number) => {
    const container = imagesContainerRef.current;
    if (!container) return;

    const images = Array.from(container.children) as HTMLElement[];

    const target = images.find((s) => s.id === `${Id}-image-${index}`);

    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <CardComponent
      Id={Id}
      ClassName={`grid grid-cols-[1fr_0.4fr] grid-rows-[auto_1fr_0.3fr] gap-8`}
    >
      <h1 className={`col-span-2 text-2xl font-bold`}>{Repository.name}</h1>
      <div className="row-span-2">
        <div
          ref={imagesContainerRef}
          className="scrollbar-hidden flex snap-x snap-mandatory overflow-x-auto"
        >
          {Repository.images.map((image, index) => (
            <img
              key={index}
              alt={`Repository Image ${index + 1}`}
              className={`h-full w-auto snap-center`}
              src={image}
              id={`${Id}-image-${index}`}
            />
          ))}
        </div>
        <div className="flex gap-1">
          {Repository.images.map((image, index) => (
            <img
              key={index}
              alt={`Repository Image ${index + 1}`}
              className={`h-[65px] w-[115px] cursor-pointer`}
              src={image}
              onClick={() => goToImage(index)}
            />
          ))}
        </div>
        <div className="grid grid-cols-[auto_1fr_auto] gap-0.5">
          <button className="bg-text-secondary flex h-[18px] w-[38px] cursor-pointer items-center justify-center rounded-[3px]">
            <div className="h-0 w-0 border-t-[5px] border-r-[10px] border-b-[5px] border-l-0 border-transparent border-r-[#000]"></div>
          </button>
          <div className="bg-black opacity-15">
            <div className="bg-text-secondary h-[18px] w-[60px] cursor-pointer rounded-[3px]"></div>
          </div>
          <button className="bg-text-secondary flex h-[18px] w-[38px] cursor-pointer items-center justify-center rounded-[3px]">
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
