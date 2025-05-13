import { useContext, useState } from "react";
import eye from "../assets/logos/eye.svg";
import eyes from "../assets/logos/eye-s.svg";
import { postReq } from "../Utils/request";
import { useNavigate } from "react-router-dom";
import { Context } from "../Context/AppContext";

type info = {
  email: string;
  password: string;
  conpass: string;
};

const Signup = () => {
  const [show, setShow] = useState(false);
  const [disable, setDisable] = useState(false);
  const [prob, setProb] = useState("");
  const { setUser } = useContext(Context);
  const [info, setInfo] = useState<info>({
    email: "",
    password: "",
    conpass: "",
  });
  const navigate = useNavigate();

  const signup = async () => {
    const reg =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    //email Validation
    if (reg.test(info.email)) {
      if (info.password === info.conpass) {
        setDisable(true);
        const res = await postReq("user/signup", { ...info }, "");
        if (res.status === "success") {
          if (setUser) setUser(res.user);
          navigate("/role");
        } else {
          setProb(res.status);
          setDisable(false);
        }
      } else {
        setProb("Password not matching");
      }
    } else {
      setProb("Enter Valid email");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === "email")
      setInfo((p) => ({ ...p, email: e.target.value }));
    if (e.target.id === "password")
      setInfo((p) => ({ ...p, password: e.target.value }));
    if (e.target.id === "conpass")
      setInfo((p) => ({ ...p, conpass: e.target.value }));
  };

  return (
    <div
      className="con"
      style={{ justifyContent: "space-evenly", height: 400 }}
    >
      <h1>CRUD App</h1>
      <input
        type="email"
        id="email"
        onChange={handleChange}
        value={info.email}
        placeholder="Email"
      />
      <div className="inp-div">
        <input
          style={{ border: "none", padding: "0 10px", borderRadius: 0 }}
          type={show ? "text" : "password"}
          id="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <img
          style={{ height: 20, width: 20 }}
          src={show ? eyes : eye}
          onClick={() => {
            setShow((p) => !p);
          }}
        />
      </div>
      <input
        type="password"
        id="conpass"
        onChange={handleChange}
        value={info.conpass}
        placeholder="Confirm Password"
      />
      <p style={{ color: "red" }}>{prob}</p>
      <p className="pl">
        Already have an account?{" "}
        <span
          className="prm-p"
          onClick={() => {
            navigate("/");
          }}
        >
          login.
        </span>
      </p>
      <div>
        <button disabled={disable} onClick={signup}>
          Sign up
        </button>
      </div>
    </div>
  );
};

export default Signup;
