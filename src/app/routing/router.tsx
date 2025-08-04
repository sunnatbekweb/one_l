import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Search } from "@/pages/Search";
import { Bookmarks } from "@/pages/Bookmarks";
import { CargoDetail } from "@/pages/CargoDetail";

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
    ],
  },
]);
