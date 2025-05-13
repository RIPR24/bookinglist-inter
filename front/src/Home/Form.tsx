import { useContext, useState } from "react";
import { card, def } from ".";
import { postReq, putReq } from "../Utils/request";
import { Context } from "../Context/AppContext";
import { motion } from "framer-motion";

type props = {
  form: card | null;
  setForm: React.Dispatch<React.SetStateAction<card | null>>;
  setCards: React.Dispatch<React.SetStateAction<card[]>>;
};

const Form = ({ form, setForm, setCards }: props) => {
  const [info, setInfo] = useState<card>(form || def);
  const { user, setPop } = useContext(Context);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === "name")
      setInfo((p) => ({ ...p, name: e.target.value }));
    if (e.target.id === "address")
      setInfo((p) => ({ ...p, address: e.target.value }));
    if (e.target.id === "pin") setInfo((p) => ({ ...p, pin: e.target.value }));
    if (e.target.id === "phone")
      setInfo((p) => ({ ...p, phone: e.target.value }));
  };

  const add = async () => {
    if (info.name === "") {
      setForm(null);
      if (setPop) setPop("Enter valid name");
    } else {
      if (form?._id) {
        const res = await putReq("cred/", info, user?.token || "");
        if (res.status === "success") {
          setCards(res.cards);
          if (setPop) setPop("Credentials Modified");
          setForm(null);
        } else {
          if (setPop) setPop(res.status);
        }
      } else {
        const res = await postReq("cred/", info, user?.token || "");
        if (res.status === "success") {
          setCards((p) => [...p, res.card]);
          if (setPop) setPop("Credentials Added");
          setForm(null);
        } else {
          if (setPop) setPop(res.status);
        }
      }
    }
  };

  return (
    <div className="form-con">
      <div className="back" onClick={() => setForm(null)}></div>
      <motion.div
        className="con form"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
      >
        <input
          type="text"
          name="name"
          placeholder="name"
          onChange={handleChange}
          id="name"
          value={info.name}
        />
        <input
          type="text"
          name="address"
          placeholder="address"
          onChange={handleChange}
          id="address"
          value={info.address}
        />
        <input
          type="number"
          name="pin"
          placeholder="pin"
          id="pin"
          onChange={handleChange}
          value={info.pin}
        />
        <input
          type="number"
          name="phone"
          placeholder="phone number"
          id="phone"
          onChange={handleChange}
          value={info.phone}
        />
        <div className="inline">
          <button
            onClick={() => {
              setForm(null);
            }}
          >
            Cancel
          </button>
          <button onClick={add}>{form?._id ? "Modify" : "Add"}</button>
        </div>
      </motion.div>
    </div>
  );
};

export default Form;
