import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppComponent } from "./app.component.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppComponent />
  </StrictMode>
);
