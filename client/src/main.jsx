import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/user.jsx";
import { ApplyProvider } from "./context/apply.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <ApplyProvider>
        <App />
        <ToastContainer />
      </ApplyProvider>
    </AuthProvider>
  </BrowserRouter>
);
