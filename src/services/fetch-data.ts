import { ProfileData } from "..";

export const fetchProfileData = async (): Promise<ProfileData> => {
  // return await axios.get("/").catch((error) => {
  //   console.error(error);
  // });

  return await new Promise((resolve) => {
    resolve({
      avatar: "https://avatars.githubusercontent.com/u/79605860?v=4",
      bio: "Quick description about me...",
      education: [
        {
          institution: "Fatec Indaiatuba",
          level: "Superior",
          title: "Analysis and Systems Development",
        },
      ],
      email: "otaviorovere14@gmail.com",
      experience: [
        {
          company: "Company",
          level: "Junior",
          title: "Software Developer",
        },
      ],
      github: "https://github.com/Otavio14",
      linkedin: "https://www.linkedin.com/in/ot%C3%A1vio-r-02a64417b/",
      name: "Otavio da Silva Rovere",
      title: "Fullstack Software Developer",
      languages: ["en-US", "pt-BR"],
      projectRepositories: [
        "https://github.com/Otavio14/fatec-pi-2-semestre",
        "https://github.com/Otavio14/Ignite-Lab",
      ],
      location: "Indaiatuba, SP - Brazil",
      skills: ["javascript", "typescript", "react"],
    });
  });
};

export const defaultProfileData: ProfileData = {
  avatar: "https://avatars.githubusercontent.com/u/79605860?v=4",
  bio: "Quick description about me...",
  education: [
    {
      institution: "Fatec Indaiatuba",
      level: "Superior",
      title: "Analysis and Systems Development",
    },
  ],
  email: "otaviorovere14@gmail.com",
  experience: [
    {
      company: "Company",
      level: "Junior",
      title: "Software Developer",
    },
  ],
  github: "https://github.com/Otavio14",
  linkedin: "https://www.linkedin.com/in/ot%C3%A1vio-r-02a64417b/",
  name: "Otavio da Silva Rovere",
  title: "Fullstack Software Developer",
  languages: ["en-US", "pt-BR"],
  projectRepositories: [
    "https://github.com/Otavio14/fatec-pi-2-semestre",
    "https://github.com/Otavio14/Ignite-Lab",
  ],
  location: "Indaiatuba, SP - Brazil",
  skills: ["javascript", "typescript", "react"],
};
