export interface IProfileData {
  avatar: string;
  bio: string;
  education: Array<IEducation>;
  email: string;
  experience: Array<IExperience>;
  github: string;
  languages: Array<string>;
  linkedin: string;
  location: string;
  name: string;
  projectRepositories: Array<IProjectRepository>;
  skills: Array<ISkill>;
  title: string;
}

export interface IExperience {
  company: string;
  level: string;
  title: string;
}

export interface IEducation {
  institution: string;
  level: string;
  title: string;
}

export interface ISkill {
  name: string;
  url: string;
}

export interface IProjectRepository {
  owner: string;
  repository: string;
}

export interface IRepositoryData {
  name: string;
  description: string;
  images: Array<string>;
  url: string;
  skills: Array<ISkill>;
}
