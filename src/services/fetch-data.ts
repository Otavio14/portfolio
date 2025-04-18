import axios from "axios";
import { IProfileData, IProjectRepository, IRepositoryData } from "..";

export const fetchProfileData = async (): Promise<IProfileData> => {
  // return await axios.get("/").catch((error) => {
  //   console.error(error);
  // });

  return await new Promise((resolve) => {
    resolve({
      avatar: "https://avatars.githubusercontent.com/u/79605860?v=4",
      bio: "",
      education: [],
      email: "otaviorovere14@gmail.com",
      experience: [],
      github: "Otavio14",
      linkedin: "https://www.linkedin.com/in/ot%C3%A1vio-r-02a64417b/",
      name: "Otavio da Silva Rovere",
      title: "Fullstack Software Developer",
      languages: ["en-US", "pt-BR"],
      projectRepositories: [
        { owner: "Otavio14", repository: "fatec-pi-2-semestre" },
        { owner: "Otavio14", repository: "fatec-pi-4-semestre" },
      ],
      location: "Indaiatuba, SP - Brazil",
      skills: [
        {
          name: "Typescript",
          url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
        },
        {
          name: "Javascript",
          url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
        },
        {
          name: "React",
          url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
        },
        {
          name: "Java",
          url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
        },
        {
          name: "MySQL",
          url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
        },
        {
          name: "SQL",
          url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg",
        },
        {
          name: "Node.js",
          url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
        },
        {
          name: "Express",
          url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
        },
        {
          name: "Angular",
          url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg",
        },
        {
          name: "HTML",
          url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
        },
        {
          name: "CSS",
          url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
        },
        {
          name: "SASS",
          url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sass/sass-original.svg",
        },
        {
          name: "Tailwind CSS",
          url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
        },
        {
          name: "Figma",
          url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg",
        },
        {
          name: "Git",
          url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
        },
        {
          name: "Github",
          url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
        },
        {
          name: "Electron",
          url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/electron/electron-original.svg",
        },
        {
          name: "Python",
          url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
        },
        {
          name: "Spring",
          url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg",
        },
        {
          name: "Android Studio",
          url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/androidstudio/androidstudio-original.svg",
        },
        {
          name: "NestJS",
          url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg",
        },
        {
          name: "NextJS",
          url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
        },
        {
          name: "Vue.js",
          url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg",
        },
        {
          name: "Firebase",
          url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg",
        },
      ],
    });
  });
};

export const defaultProfileData: IProfileData = {
  avatar: "https://avatars.githubusercontent.com/u/79605860?v=4",
  bio: "Quick description about me...",
  education: [],
  email: "otaviorovere14@gmail.com",
  experience: [],
  github: "https://github.com/Otavio14",
  linkedin: "https://www.linkedin.com/in/ot%C3%A1vio-r-02a64417b/",
  name: "Otavio da Silva Rovere",
  title: "Fullstack Software Developer",
  languages: ["en-US", "pt-BR"],
  projectRepositories: [],
  location: "Indaiatuba, SP - Brazil",
  skills: [],
};

function b64DecodeUnicode(str: string): string {
  return decodeURIComponent(
    Array.prototype.map
      .call(atob(str), function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(""),
  );
}

export const fetchRepositoriesData = async ({
  owner,
  repository,
}: IProjectRepository): Promise<IRepositoryData> => {
  const response = await axios.get(
    `https://api.github.com/repos/${owner}/${repository}/readme`,
    {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    },
  );

  const content = b64DecodeUnicode(response.data.content);

  const headingMatch = content.match(/^# (.+)/m);
  const name = headingMatch && headingMatch.length > 0 ? headingMatch[1] : "";

  const textAfterHeadingMatch = content.match(/^# .+\n\n([^#\n]+)/m);
  const description =
    textAfterHeadingMatch && textAfterHeadingMatch.length > 0
      ? textAfterHeadingMatch[1].trim()
      : "";

  // // Extract the first image after the text
  // const firstImageMatch = markdownContent.match(/!\[.*?\]\((.*?)\)/);
  // const firstImage = firstImageMatch ? firstImageMatch[1] : null;

  // // Extract all images inside a div with a specific ID
  // const divMatch = markdownContent.match(
  //   /<div id="specific-id">([\s\S]*?)<\/div>/,
  // );
  // const divContent = divMatch ? divMatch[1] : null;
  // const divImages: string[] = [];
  // if (divContent) {
  //   const imgMatches = [...divContent.matchAll(/<img.*?src="(.*?)".*?>/g)];
  //   imgMatches.forEach((match) => {
  //     if (match[1]) divImages.push(match[1]);
  //   });
  // }

  return await new Promise((resolve) => {
    resolve({
      name: name,
      description: description,
      images: [
        "https://images.unsplash.com/photo-1743653537429-a94889a6fd47?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://plus.unsplash.com/premium_photo-1732736768058-42f76dc6e6e3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1744127026559-9d570bbf2c65?q=80&w=2145&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ],
      url: `https://github.com/${owner}/${repository}`,
      skills: [
        {
          name: "Typescript",
          url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
        },
        {
          name: "Javascript",
          url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
        },
        {
          name: "React",
          url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
        },
      ],
    });
  });
};
