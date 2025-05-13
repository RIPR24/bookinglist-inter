import { useContext, useEffect, useState } from "react";
import eye from "../assets/logos/eye.svg";
import eyes from "../assets/logos/eye-s.svg";
import { Context } from "../Context/AppContext";
import { getReq, putReq } from "../Utils/request";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

type per = {
  name: boolean;
  address: boolean;
  pin: boolean;
  phone: boolean;
};

const Permissions = ({
  setPerpop,
}: {
  setPerpop: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { user, setPop } = useContext(Context);
  const navigate = useNavigate();
  const [per, setPer] = useState<per>({
    name: true,
    address: false,
    pin: false,
    phone: false,
  });

  const getData = async () => {
    const res = await getReq("per/", user?.token || "");
    console.log(res);
    setPer(res.pers);
  };

  const update = async () => {
    const res = await putReq("per/", { perm: per }, user?.token || "");
    if (res.status === "success") {
      setPer(res.pers);
      setPerpop(false);
      if (setPop) setPop("permission Updated");
    } else {
      if (setPop) setPop(res.status);
    }
  };

  useEffect(() => {
    if (user?.token) {
      getData();
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div className="form-con">
      <div className="back" onClick={() => setPerpop(false)}></div>
      <motion.div
        className="con form"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
      >
        <div className="inline">
          <p>Name:</p>
          <img
            src={per.name ? eye : eyes}
            className="imgbtn"
            onClick={() => {
              setPer((p) => ({ ...p, name: !p.name }));
            }}
          />
        </div>
        <div className="inline">
          <p>Address:</p>
          <img
            src={per.address ? eye : eyes}
            className="imgbtn"
            onClick={() => {
              setPer((p) => ({ ...p, address: !p.address }));
            }}
          />
        </div>
        <div className="inline">
          <p>PIN:</p>
          <img
            src={per.pin ? eye : eyes}
            className="imgbtn"
            onClick={() => {
              setPer((p) => ({ ...p, pin: !p.pin }));
            }}
          />
        </div>
        <div className="inline">
          <p>Phone:</p>
          <img
            src={per.phone ? eye : eyes}
            className="imgbtn"
            onClick={() => {
              setPer((p) => ({ ...p, phone: !p.phone }));
            }}
          />
        </div>
        <div className="inline">
          <button
            onClick={() => {
              setPerpop(false);
            }}
          >
            Cancel
          </button>
          <button onClick={update}>Update</button>
        </div>
      </motion.div>
    </div>
  );
};

export default Permissions;
