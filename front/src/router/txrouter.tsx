import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../Login";
import Signup from "../Login/Signup";
import SelectRole from "../Login/SelectRole";
import Home from "../Home";

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
        element: <Signup />,
      },
      {
        path: "/role",
        element: <SelectRole />,
      },
      {
        path: "/home",
        element: <Home />,
      },
    ],
  },
]);
