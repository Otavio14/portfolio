import { useTranslation } from "react-i18next";
import { IProfileData } from "../@types";
import { CardComponent } from "./card.component";

interface Props {
  Id: string;
  ProfileData: IProfileData;
}

export const DetailsComponent = ({ Id, ProfileData }: Props) => {
  const { t } = useTranslation("DETAILS");

  return (
    <CardComponent Id={Id} ClassName={`grid grid-cols-2 gap-8`}>
      <div className={`flex h-full flex-col gap-10`}>
        <h1
          className={`col-span-2 border-b-2 pb-2 text-center text-2xl font-bold`}
        >
          {t("education")}
        </h1>
        <div className={`flex h-full flex-col gap-8`}>
          {ProfileData.education.map((e, i) => (
            <div
              key={i}
              className={`bg-bg-tertiary border-highlight flex flex-col rounded border-l-4 p-6 hover:translate-y-[-3px] hover:shadow-[0_6px_12px_rgba(0,0,0,0.2)]`}
            >
              <h2 className={`text-lg font-semibold`}>{e.title}</h2>
              <p className={`text-base`}>{e.institution}</p>
              <p className={`text-sm`}>{e.level}</p>
            </div>
          ))}
        </div>
      </div>
      <div className={`flex h-full flex-col gap-10`}>
        <h1
          className={`col-span-2 border-b-2 pb-2 text-center text-2xl font-bold`}
        >
          {t("experience")}
        </h1>
        <div className={`flex h-full flex-col gap-8`}>
          {ProfileData.experience.map((e, i) => (
            <div
              key={i}
              className={`bg-bg-tertiary border-highlight flex flex-col rounded border-l-4 p-6 hover:translate-y-[-3px] hover:shadow-[0_6px_12px_rgba(0,0,0,0.2)]`}
            >
              <h2 className={`text-lg font-semibold`}>{e.title}</h2>
              <p className={`text-base`}>{e.company}</p>
              <p className={`text-sm`}>{e.level}</p>
            </div>
          ))}
        </div>
      </div>
    </CardComponent>
  );
};
