import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Search } from "@/pages/Search";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Search />,
      },
    ],
  },
]);
