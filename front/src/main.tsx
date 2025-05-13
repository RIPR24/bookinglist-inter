import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { Txrouter } from "./router/txrouter.tsx";
import AppContext from "./Context/AppContext.tsx";

createRoot(document.getElementById("root")!).render(
  <AppContext>
    <RouterProvider router={Txrouter} />
  </AppContext>
);
