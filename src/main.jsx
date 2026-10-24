import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { SavedProjectsProvider } from "./context/SavedProjectsContext";
import { ToastProvider } from "./components/ui/Toast";
import { ErrorBoundary } from "./components/layout/ErrorBoundary";
import "./styles.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <ToastProvider>
          <SavedProjectsProvider>
            <App />
          </SavedProjectsProvider>
        </ToastProvider>
      </ErrorBoundary>
    </BrowserRouter>
  </StrictMode>,
);
