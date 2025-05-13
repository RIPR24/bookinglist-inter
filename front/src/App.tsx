import { Outlet } from "react-router-dom";
import Popup from "./Reusable/Popup";
import { useContext } from "react";
import { Context } from "./Context/AppContext";
import { AnimatePresence } from "framer-motion";

const App = () => {
  const { pop } = useContext(Context);
  return (
    <div className="con">
      <Outlet />
      <AnimatePresence>{pop && <Popup />}</AnimatePresence>
    </div>
  );
};

export default App;
