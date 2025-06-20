import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./App.jsx";
import Dashboard from "./Layouts/Dashboard.jsx";
import ActivePage from "./pages/ActivePage.jsx";
import AllsurveyPage from "./pages/AllsurveyPage.jsx";
import DarftPage from "./pages/DarftPage.jsx";
import InactivePage from "./pages/InactivePage.jsx";
import UpgradePage from "./pages/UpgradePage.jsx";
import AddPage from "./pages/AddPage.jsx";

import ChatPage from "./pages/AddPage/ChatPage.jsx";
import EditPage from "./pages/AddPage/EditPage.jsx";
import PreviewPage from "./pages/AddPage/PreviewPage.jsx";
import RespondPage from "./pages/RespondPage.jsx";
import "./index.css";

import Backend1 from "./backend/backend1.jsx";
import Backend2 from "./backend/backend2.jsx";
import Backend3 from "./backend/Backend3.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      { index: true, element: <AllsurveyPage /> },
      { path: "draft", element: <DarftPage /> },
      { path: "active", element: <ActivePage /> },
      { path: "inactive", element: <InactivePage /> },
      { path: "upgrade", element: <UpgradePage /> },
    ],
  },
  {
    path: "/dashboard/add",
    element: <AddPage />,
    children: [
      { index: true, element: <ChatPage /> },
      { path: "edit", element: <EditPage /> },
      { path: "preview", element: <PreviewPage /> },
    ],
  },
  {
    path: "/backend",
    children: [
      { path: "1", element: <Backend1 /> },
      { path: "2", element: <Backend2 /> },
      { path: "3", element: <Backend3 /> },
    ],
  },
  {
    path: "/respond",
    element: <RespondPage />
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
