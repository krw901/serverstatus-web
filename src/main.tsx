import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

const el = document.getElementById("root");
if (el === null) {
  throw new Error("root container missing in index.html");
}

createRoot(el).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
