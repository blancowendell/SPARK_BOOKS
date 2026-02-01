import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { TourProvider } from "./components/Tour/context/TourContext.jsx";
import logo from "./assets/images/logo2.png";

const theme = createTheme();

const favicon = document.querySelector("link[rel~='icon']") || document.createElement("link");
favicon.rel = "icon";
favicon.type = "image/jpeg";
favicon.href = logo;
document.head.appendChild(favicon);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <TourProvider>
        <App />
      </TourProvider>
    </ThemeProvider>
  </StrictMode>
);
