import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "@app/components/core";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
