import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProfilPage from "./pages/ProfilPage";
import SubjectPage from "./pages/SubjectPage";
import CreateSubject from "./pages/CreateSubject";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      { path: "/register", element: <RegisterPage /> },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/subject/:id",
        element: <SubjectPage />,
      },
      {
        path: "/subjectCreate",
        element: <CreateSubject />,
      },
      {
        path: "/profil",
        element: <ProfilPage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
