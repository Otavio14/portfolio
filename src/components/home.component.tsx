import { IProfileData } from "..";
import { CardComponent } from "./card.component";

interface Props {
  Id: string;
  ProfileData: IProfileData;
}

export const HomeComponent = ({ Id, ProfileData }: Props) => {
  return (
    <CardComponent
      Id={Id}
      ClassName="grid grid-cols-[0.5fr_1fr] grid-rows-[1fr_auto] gap-8"
    >
      {/* <---------------------------------------------------------- Avatar */}
      <div className="row-span-2 flex h-full w-full flex-col items-center gap-4">
        <img
          src={ProfileData.avatar}
          alt="Profile Picture"
          className="aspect-square w-full rounded-full"
        />
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-2xl font-bold">{ProfileData.name}</h2>
          <h3 className="text-lg">{ProfileData.title}</h3>
          <h3 className="text-sm">{ProfileData.location}</h3>
        </div>
        <div className="mt-auto flex flex-col gap-4 justify-self-end">
          <a
            href={`https://github.com/${ProfileData.github}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 98 96"
              className="fill-text-primary"
            >
              <path d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"></path>
            </svg>
            <p>{ProfileData.github}</p>
          </a>
          <a
            href={ProfileData.linkedin}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 256 256"
              className="fill-text-primary"
            >
              <path d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24Zm0,192H40V40H216V216ZM96,112v64a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0Zm88,28v36a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140ZM100,84A12,12,0,1,1,88,72,12,12,0,0,1,100,84Z"></path>
            </svg>
            <p>Otávio Rovere</p>
          </a>
          <a
            href={`mailto:${ProfileData.email}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 256 256"
              className="fill-text-primary"
            >
              <path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM203.43,64,128,133.15,52.57,64ZM216,192H40V74.19l82.59,75.71a8,8,0,0,0,10.82,0L216,74.19V192Z"></path>
            </svg>
            <p>{ProfileData.email}</p>
          </a>
        </div>
      </div>
      {/* <---------------------------------------------------------- Avatar */}
      {/* <------------------------------------------------------------- Bio */}
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold">Biography</h1>
        <hr className="border-highlight mt-3 mb-6 rounded border-t-[3px]" />
        <p className={`text-justify`}>{ProfileData.bio}</p>
      </div>
      {/* <------------------------------------------------------------- Bio */}
      {/* <---------------------------------------------------------- Skills */}
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold">Skills</h2>
        <hr className="border-highlight mt-3 mb-6 rounded border-t-[3px]" />
        <div className={`flex flex-wrap items-center gap-4`}>
          {ProfileData.skills.map((skill, index) => (
            <img
              key={index}
              src={skill.url}
              alt={skill.name}
              className="h-10 w-10 cursor-pointer"
            />
          ))}
        </div>
      </div>
      {/* <---------------------------------------------------------- Skills */}
    </CardComponent>
  );
};
