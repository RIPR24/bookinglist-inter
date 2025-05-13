import { card } from ".";
import home from "../assets/logos/home.svg";
import phone from "../assets/logos/phone.svg";
import profile from "../assets/logos/profile.svg";
import keypad from "../assets/logos/keypad.svg";
import { useContext } from "react";
import { Context } from "../Context/AppContext";
import edit from "../assets/logos/edit.svg";
import bin from "../assets/logos/bin.svg";
import { delReq } from "../Utils/request";

type props = {
  card: card;
  setForm: React.Dispatch<React.SetStateAction<card | null>>;
  setCards: React.Dispatch<React.SetStateAction<card[]>>;
};

const Card = ({ card, setForm, setCards }: props) => {
  const { user, setPop } = useContext(Context);

  const del = async () => {
    const res = await delReq("cred/", { _id: card._id }, user?.token || "");
    if (res.status === "success") {
      setCards(res.cards);
      if (setPop) setPop("Credentials Deleted");
      setForm(null);
    } else {
      if (setPop) setPop(res.status);
    }
  };

  const update = () => {
    setForm(card);
  };

  return (
    <div className="card-con crd-wp">
      <img src={profile} />
      <p>{card.name}</p>
      <img src={home} />
      <p>{card.address || "***"}</p>
      <img src={keypad} />
      <p>{card.pin || "***"}</p>
      <img src={phone} />
      <p>{card.phone || "***"}</p>
      {user?.role === "admin" && (
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <img src={edit} onClick={update} className="imgbtn" />
          <img src={bin} onClick={del} className="imgbtn" />
        </div>
      )}
    </div>
  );
};

export default Card;
