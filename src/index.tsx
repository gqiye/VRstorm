import { createRoot } from "react-dom/client";
import App from "./App";
import { WaitForFonts } from "./WaitForFonts";
import "./styles.css";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <WaitForFonts>
    <App />
  </WaitForFonts>
);
