import { useContext, useEffect, useState } from "react";
import { Context } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";
import { getReq } from "../Utils/request";
import "./home.css";
import Card from "./Card";
import Form from "./Form";
import lo from "../assets/logos/logout.svg";
import { AnimatePresence } from "framer-motion";
import Permissions from "./Permissions";

export type card = {
  _id?: string;
  name: string;
  address?: string;
  pin?: string;
  phone?: string;
};

export const def = {
  name: "",
  address: "",
  pin: "",
  phone: "",
};

const Home = () => {
  const { user, setUser } = useContext(Context);
  const navigate = useNavigate();
  const [cards, setCards] = useState<card[]>([]);
  const [form, setForm] = useState<card | null>(null);
  const [perpop, setPerpop] = useState(false);

  const getData = async () => {
    const res = await getReq(
      user?.role === "admin" ? "cred/admin" : "cred",
      user?.token || ""
    );
    setCards(res.cards);
  };

  useEffect(() => {
    if (user?.token) {
      getData();
    } else {
      navigate("/");
    }
  }, []);
  return (
    <div className="con">
      <div className="inline wel">
        <p>Welcome {user?.role}</p>
        <img
          src={lo}
          className="imgbtn"
          onClick={() => {
            if (setUser) setUser(null);
            localStorage.removeItem("tok");
            navigate("/");
          }}
        />
      </div>
      <div className="grid3">
        {cards &&
          cards.map((el, i) => (
            <Card key={i} setCards={setCards} setForm={setForm} card={el} />
          ))}
      </div>
      {user?.role === "admin" && (
        <div
          style={{
            position: "fixed",
            bottom: 10,
            right: 10,
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <button
            onClick={() => {
              setPerpop(true);
            }}
          >
            Permissions
          </button>
          <button
            onClick={() => {
              setForm(def);
            }}
          >
            Add Credentials
          </button>
        </div>
      )}
      <AnimatePresence>
        {perpop && <Permissions setPerpop={setPerpop} />}
      </AnimatePresence>
      <AnimatePresence>
        {form && <Form form={form} setForm={setForm} setCards={setCards} />}
      </AnimatePresence>
    </div>
  );
};

export default Home;
