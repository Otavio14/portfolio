export interface ProfileData {
  avatar: string;
  bio: string;
  education: Array<Education>;
  email: string;
  experience: Array<Experience>;
  github: string;
  languages: Array<string>;
  linkedin: string;
  location: string;
  name: string;
  projectRepositories: Array<string>;
  skills: Array<string>;
  title: string;
}

interface Experience {
  company: string;
  level: string;
  title: string;
}

interface Education {
  institution: string;
  level: string;
  title: string;
}
