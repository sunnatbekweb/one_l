import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Search } from "@/pages/Search";
import { Bookmarks } from "@/pages/Bookmarks";
import { CargoDetail } from "@/pages/CargoDetail";
import { Add } from "@/pages/Add";
import { Notifications } from "@/pages/Notifications";
import { Applications } from "@/pages/Applications";
import { Welcome } from "@/pages/Welcome";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Search />,
      },
      {
        path: "/bookmarks",
        element: <Bookmarks />,
      },
      {
        path: "/cargo/:id",
        element: <CargoDetail />,
      },
      {
        path: "/add",
        element: <Add />,
      },
      {
        path: "/notifications",
        element: <Notifications />,
      },
      {
        path: "/applications",
        element: <Applications />,
      },
    ],
  },
  {
    path: "/:id/:lang/",
    element: <Welcome />,
  },
]);
