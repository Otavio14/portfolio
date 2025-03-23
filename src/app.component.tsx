import { useEffect, useRef, useState } from "react";
import { ProfileData } from ".";
import { DetailsComponent } from "./components/details.component";
import { HomeComponent } from "./components/home.component";
import { ProjectComponent } from "./components/project.component";
import { defaultProfileData, fetchProfileData } from "./services/fetch-data";

export const AppComponent = () => {
  const [profileData, setProfileData] =
    useState<ProfileData>(defaultProfileData);
  const [currentSection, setCurrentSection] = useState<string>("");

  const tickingRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const goToSection = (section: string) => {
    const container = containerRef.current;
    if (!container) return;

    const sections = Array.from(container.children) as HTMLElement[];

    const target = sections.find((s) => s.id === section);

    if (target) {
      setCurrentSection(target.id);
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    fetchProfileData().then(setProfileData);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const query =
      new URLSearchParams(window.location.search).get("section") || "home";
    goToSection(query);
  }, []);

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

          if (snappedSection) {
            setCurrentSection(snappedSection.id);
            const newQuery = `?section=${snappedSection.id}`;
            if (window.location.search !== newQuery) {
              window.history.replaceState(null, "", newQuery);
            }
          }

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
  }: {
    Target: "details" | "home" | "projects";
  }) => {
    const style =
      `before:absolute before:top-full before:h-0 before:w-0 before:translate-x-[-50%] before:border-t-8 before:border-transparent before:border-t-[#e9dddd] ` +
      (Target === "details"
        ? `right-1/2 rounded-br-none before:right-[-4px] before:border-l-8`
        : Target === "home"
          ? `left-1/2 translate-x-[-50%] before:left-1/2 before:border-r-8 before:border-l-8`
          : Target === "projects"
            ? `left-1/2 rounded-bl-none before:left-[4px] before:border-r-8`
            : ``);

    const onClick = () => {
      if (Target === "projects" && profileData.projectRepositories.length > 0) {
        const firstRepositorySection =
          profileData.projectRepositories[0].split("/").pop() || "";

        if (currentSection === firstRepositorySection)
          goToSection(
            profileData.projectRepositories[
              profileData.projectRepositories.length - 1
            ]
              .split("/")
              .pop() || "",
          );
        goToSection(firstRepositorySection);
      } else goToSection(Target);
    };

    return (
      <button
        onClick={onClick}
        className={`group relative h-4 w-4 cursor-pointer rounded-full bg-[#2c2b2b]`}
      >
        <span
          className={`invisible absolute bottom-[calc(100%+15px)] h-fit w-fit rounded bg-[#e9dddd] px-2 py-1 whitespace-nowrap text-black group-hover:visible ${style}`}
        >
          Go to {Target}
        </span>
      </button>
    );
  };

  return (
    <div
      ref={containerRef}
      className="scrollbar-hidden flex h-screen w-full min-w-screen snap-x snap-mandatory items-center overflow-x-scroll"
    >
      {/* <---------------------------------------------------------- Navbar */}
      <div
        className={`fixed bottom-12 left-[50%] flex h-fit w-fit translate-x-[-50%] items-center justify-center gap-4 rounded bg-[#696666] p-2`}
      >
        <NavButton Target="details" />
        <NavButton Target="home" />
        <NavButton Target="projects" />
      </div>
      {/* <---------------------------------------------------------- Navbar */}
      {/* <----------------------------------------------------------- Cards */}
      <DetailsComponent Id={`details`} />
      <HomeComponent Id={`home`} />
      {profileData.projectRepositories.map((repository, i) => (
        <ProjectComponent
          Repository={repository}
          key={i}
          Id={repository.split("/").pop() || i.toString()}
        />
      ))}
      {/* <---------------------------------------------------------- Navbar */}
    </div>
  );
};
