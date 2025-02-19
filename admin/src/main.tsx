import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import RootLayout from "./layouts/RootLayout";
import "./scss/index.scss";
import "./scss/avatar.scss";
import "./scss/pages.scss";
import "./scss/background.scss";
import "bootstrap/dist/js/bootstrap.bundle.min";
import UsersOverview from "./pages/Users/Overview";
import Login from "./pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "users",
        element: <UsersOverview />,
        children: [
          {
            path: "add",
            element: <div>Add User</div>,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
