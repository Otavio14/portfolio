import { useState } from "react";
import { DetailsComponent } from "./components/details.component";
import { HomeComponent } from "./components/home.component";
import { ProjectComponent } from "./components/project.component";

export const AppComponent = () => {
  const [repositories, setRepositories] = useState<Array<string>>([
    "https://github.com/Otavio14/fatec-pi-2-semestre",
  ]);

  return (
    <div>
      <DetailsComponent />
      <HomeComponent />
      {repositories.map((_, i) => (
        <ProjectComponent key={i} />
      ))}
    </div>
  );
};
