import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Search } from "@/pages/Search";
import { Bookmarks } from "@/pages/Bookmarks";

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
    ],
  },
]);
