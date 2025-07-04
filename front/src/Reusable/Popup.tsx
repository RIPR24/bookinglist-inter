import { motion } from "framer-motion";
import { useContext, useEffect } from "react";
import { Context } from "../Context/AppContext";

const Popup = () => {
  const { pop, setPop } = useContext(Context);

  useEffect(() => {
    setTimeout(() => {
      if (setPop) setPop("");
    }, 3000);
  }, []);

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      style={{
        position: "fixed",
        top: 40,
        right: 10,
        width: 300,
        borderRadius: 10,
        backgroundColor: "#e4e4e4",
        padding: 20,
        border: "1px solid #555555",
      }}
    >
      {pop}
    </motion.div>
  );
};

export default Popup;
