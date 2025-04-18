import { useEffect, useRef, useState } from "react";
import { IProfileData, IRepositoryData } from ".";
import { DetailsComponent } from "./components/details.component";
import { HomeComponent } from "./components/home.component";
import { ProjectComponent } from "./components/project.component";
import {
  defaultProfileData,
  fetchProfileData,
  fetchRepositoriesData,
} from "./services/fetch-data";

export const AppComponent = () => {
  const darkModeInitialValue = () => {
    const local = localStorage.getItem("prefers-color-scheme");

    if (local) {
      return local === "dark";
    } else {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
  };

  const [profileData, setProfileData] =
    useState<IProfileData>(defaultProfileData);
  const [currentSection, setCurrentSection] = useState<string>("");
  const [repositoryData, setRepositoryData] = useState<Array<IRepositoryData>>(
    [],
  );
  const [darkMode, setDarkMode] = useState(darkModeInitialValue());

  const tickingRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const goToSection = (section: string) => {
    const container = containerRef.current;
    if (!container) return;

    const sections = Array.from(container.children) as HTMLElement[];

    const target = sections.find((s) => s.id === section);

    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  const changeTheme = () => {
    setDarkMode((prev) => !prev);
  };

  useEffect(() => {
    goToSection("home");
  }, []);

  useEffect(() => {
    localStorage.setItem("prefers-color-scheme", darkMode ? "dark" : "light");
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  useEffect(() => {
    fetchProfileData().then((data) => {
      setProfileData(data);
    });
  }, []);

  useEffect(() => {
    const fetchRepositories = async () => {
      for (const repository of profileData.projectRepositories) {
        const data = await fetchRepositoriesData(repository);

        setRepositoryData((prev) => [...prev, data]);
      }
    };

    fetchRepositories();
  }, [profileData]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (!tickingRef.current) {
        tickingRef.current = true;

        window.requestAnimationFrame(() => {
          const sections = Array.from(container.children) as HTMLElement[];
          const snappedSection = sections
            .filter(
              (child) =>
                (child as HTMLElement).dataset.identifier === "card-component",
            )
            .find((section) => {
              const rect = section.getBoundingClientRect();
              return rect.left >= 0 && rect.left < window.innerWidth;
            });

          if (snappedSection) setCurrentSection(snappedSection.id);

          tickingRef.current = false;
        });
      }
    };

    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const handleScroll = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
        event.preventDefault();
        container.scrollBy({
          left: event.deltaY,
          behavior: "smooth",
        });
      }
    };

    container.addEventListener("wheel", handleScroll, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleScroll);
    };
  }, []);

  const NavButton = ({
    Target,
    children,
  }: {
    Target: "details" | "home" | "projects";
    children?: React.ReactNode;
  }) => {
    const onClick = () => {
      if (Target === "projects" && profileData.projectRepositories.length > 0) {
        const firstRepositorySection =
          profileData.projectRepositories[0].repository || "";

        goToSection(firstRepositorySection);
      } else goToSection(Target);
    };
    const isActive = ["details", "home"].includes(currentSection)
      ? currentSection === Target
      : !["details", "home"].includes(Target);

    return (
      <button
        onClick={onClick}
        className={`group flex h-10 w-10 cursor-pointer items-center justify-center rounded-full ${isActive ? "[&>*]:fill-highlight" : ""}`}
      >
        {children}
      </button>
    );
  };

  return (
    <div
      ref={containerRef}
      className="scrollbar-hidden flex h-screen w-full min-w-screen snap-x snap-mandatory items-center overflow-x-scroll"
    >
      {/* <---------------------------------------------------------- Navbar */}
      <nav
        className={`fixed bottom-8 left-[50%] flex h-fit w-fit translate-x-[-50%] items-center justify-center gap-4 rounded`}
      >
        <div
          className={`bg-text-secondary flex items-center justify-center rounded`}
        >
          <button
            className={`group flex h-10 w-10 cursor-pointer items-center justify-center rounded-full p-2`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 256 256"
              className="fill-bg-primary group-hover:fill-highlight"
            >
              <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm16-40a8,8,0,0,1-8,8,16,16,0,0,1-16-16V128a8,8,0,0,1,0-16,16,16,0,0,1,16,16v40A8,8,0,0,1,144,176ZM112,84a12,12,0,1,1,12,12A12,12,0,0,1,112,84Z"></path>
            </svg>
          </button>
          <button
            className={`group flex h-10 w-10 cursor-pointer items-center justify-center rounded-full p-2`}
            onClick={changeTheme}
          >
            {darkMode ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 256 256"
                className="fill-bg-primary group-hover:fill-highlight"
              >
                <path d="M233.54,142.23a8,8,0,0,0-8-2,88.08,88.08,0,0,1-109.8-109.8,8,8,0,0,0-10-10,104.84,104.84,0,0,0-52.91,37A104,104,0,0,0,136,224a103.09,103.09,0,0,0,62.52-20.88,104.84,104.84,0,0,0,37-52.91A8,8,0,0,0,233.54,142.23ZM188.9,190.34A88,88,0,0,1,65.66,67.11a89,89,0,0,1,31.4-26A106,106,0,0,0,96,56,104.11,104.11,0,0,0,200,160a106,106,0,0,0,14.92-1.06A89,89,0,0,1,188.9,190.34Z"></path>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 256 256"
                className="fill-bg-primary group-hover:fill-highlight"
              >
                <path d="M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm72,88a64,64,0,1,1-64-64A64.07,64.07,0,0,1,192,128Zm-16,0a48,48,0,1,0-48,48A48.05,48.05,0,0,0,176,128ZM58.34,69.66A8,8,0,0,0,69.66,58.34l-16-16A8,8,0,0,0,42.34,53.66Zm0,116.68-16,16a8,8,0,0,0,11.32,11.32l16-16a8,8,0,0,0-11.32-11.32ZM192,72a8,8,0,0,0,5.66-2.34l16-16a8,8,0,0,0-11.32-11.32l-16,16A8,8,0,0,0,192,72Zm5.66,114.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32-11.32ZM48,128a8,8,0,0,0-8-8H16a8,8,0,0,0,0,16H40A8,8,0,0,0,48,128Zm80,80a8,8,0,0,0-8,8v24a8,8,0,0,0,16,0V216A8,8,0,0,0,128,208Zm112-88H216a8,8,0,0,0,0,16h24a8,8,0,0,0,0-16Z"></path>
              </svg>
            )}
          </button>
        </div>
        <div
          className={`bg-text-secondary flex items-center justify-center gap-4 rounded p-2`}
        >
          <NavButton Target="details">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 256 256"
              className="fill-bg-primary group-hover:fill-highlight"
            >
              <path d="M232,48H160a40,40,0,0,0-32,16A40,40,0,0,0,96,48H24a8,8,0,0,0-8,8V200a8,8,0,0,0,8,8H96a24,24,0,0,1,24,24,8,8,0,0,0,16,0,24,24,0,0,1,24-24h72a8,8,0,0,0,8-8V56A8,8,0,0,0,232,48ZM96,192H32V64H96a24,24,0,0,1,24,24V200A39.81,39.81,0,0,0,96,192Zm128,0H160a39.81,39.81,0,0,0-24,8V88a24,24,0,0,1,24-24h64Z"></path>
            </svg>
          </NavButton>
          <NavButton Target="home">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 256 256"
              className="fill-bg-primary group-hover:fill-highlight"
            >
              <path d="M219.31,108.68l-80-80a16,16,0,0,0-22.62,0l-80,80A15.87,15.87,0,0,0,32,120v96a8,8,0,0,0,8,8H216a8,8,0,0,0,8-8V120A15.87,15.87,0,0,0,219.31,108.68ZM208,208H48V120l80-80,80,80Z"></path>
            </svg>
          </NavButton>
          <NavButton Target="projects">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 256 256"
              className="fill-bg-primary group-hover:fill-highlight"
            >
              <path d="M208,24H72A32,32,0,0,0,40,56V224a8,8,0,0,0,8,8H192a8,8,0,0,0,0-16H56a16,16,0,0,1,16-16H208a8,8,0,0,0,8-8V32A8,8,0,0,0,208,24ZM120,40h48v72L148.79,97.6a8,8,0,0,0-9.6,0L120,112Zm80,144H72a31.82,31.82,0,0,0-16,4.29V56A16,16,0,0,1,72,40h32v88a8,8,0,0,0,12.8,6.4L144,114l27.21,20.4A8,8,0,0,0,176,136a8,8,0,0,0,8-8V40h16Z"></path>
            </svg>
          </NavButton>
        </div>
        <div
          className={`bg-text-secondary flex items-center justify-center rounded`}
        >
          <button
            className={`group flex h-10 w-10 cursor-pointer items-center justify-center rounded-full p-2`}
          >
            <a
              href="https://github.com/Otavio14/portfolio"
              target="_blank"
              rel="noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 256 256"
                className="fill-bg-primary group-hover:fill-highlight"
              >
                <path d="M208.31,75.68A59.78,59.78,0,0,0,202.93,28,8,8,0,0,0,196,24a59.75,59.75,0,0,0-48,24H124A59.75,59.75,0,0,0,76,24a8,8,0,0,0-6.93,4,59.78,59.78,0,0,0-5.38,47.68A58.14,58.14,0,0,0,56,104v8a56.06,56.06,0,0,0,48.44,55.47A39.8,39.8,0,0,0,96,192v8H72a24,24,0,0,1-24-24A40,40,0,0,0,8,136a8,8,0,0,0,0,16,24,24,0,0,1,24,24,40,40,0,0,0,40,40H96v16a8,8,0,0,0,16,0V192a24,24,0,0,1,48,0v40a8,8,0,0,0,16,0V192a39.8,39.8,0,0,0-8.44-24.53A56.06,56.06,0,0,0,216,112v-8A58.14,58.14,0,0,0,208.31,75.68ZM200,112a40,40,0,0,1-40,40H112a40,40,0,0,1-40-40v-8a41.74,41.74,0,0,1,6.9-22.48A8,8,0,0,0,80,73.83a43.81,43.81,0,0,1,.79-33.58,43.88,43.88,0,0,1,32.32,20.06A8,8,0,0,0,119.82,64h32.35a8,8,0,0,0,6.74-3.69,43.87,43.87,0,0,1,32.32-20.06A43.81,43.81,0,0,1,192,73.83a8.09,8.09,0,0,0,1,7.65A41.72,41.72,0,0,1,200,104Z"></path>
              </svg>
            </a>
          </button>
          <button
            className={`group flex h-10 w-10 cursor-pointer items-center justify-center rounded-full p-2`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 256 256"
              className="fill-bg-primary group-hover:fill-highlight"
            >
              <path d="M247.15,212.42l-56-112a8,8,0,0,0-14.31,0l-21.71,43.43A88,88,0,0,1,108,126.93,103.65,103.65,0,0,0,135.69,64H160a8,8,0,0,0,0-16H104V32a8,8,0,0,0-16,0V48H32a8,8,0,0,0,0,16h87.63A87.76,87.76,0,0,1,96,116.35a87.74,87.74,0,0,1-19-31,8,8,0,1,0-15.08,5.34A103.63,103.63,0,0,0,84,127a87.55,87.55,0,0,1-52,17,8,8,0,0,0,0,16,103.46,103.46,0,0,0,64-22.08,104.18,104.18,0,0,0,51.44,21.31l-26.6,53.19a8,8,0,0,0,14.31,7.16L148.94,192h70.11l13.79,27.58A8,8,0,0,0,240,224a8,8,0,0,0,7.15-11.58ZM156.94,176,184,121.89,211.05,176Z"></path>
            </svg>
          </button>
        </div>
      </nav>
      {/* <---------------------------------------------------------- Navbar */}
      {/* <----------------------------------------------------------- Cards */}
      <DetailsComponent Id={`details`} ProfileData={profileData} />
      <HomeComponent Id={`home`} ProfileData={profileData} />
      {profileData.projectRepositories.map((repository, i) => (
        <ProjectComponent
          Repository={repositoryData[i]}
          key={i}
          Id={repository.repository}
        />
      ))}
      {/* <---------------------------------------------------------- Navbar */}
    </div>
  );
};
