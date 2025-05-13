import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../Login";

export const Txrouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Login />,
      },
    ],
  },
]);
