import { useContext, useEffect, useState } from "react";
import eye from "../assets/logos/eye.svg";
import eyes from "../assets/logos/eye-s.svg";
import { postReq } from "../Utils/request";
import { useNavigate } from "react-router-dom";
import { Context } from "../Context/AppContext";

type info = {
  email: string;
  password: string;
};

const Login = () => {
  const [show, setShow] = useState(false);
  const [disable, setDisable] = useState(false);
  const [prob, setProb] = useState("");
  const [info, setInfo] = useState<info>({ email: "", password: "" });
  const navigate = useNavigate();
  const { setUser } = useContext(Context);

  const login = async () => {
    const reg =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    //email Validation
    if (reg.test(info.email)) {
      setDisable(true);
      const res = await postReq("user/login", { ...info }, "");
      if (res.status === "success") {
        if (setUser) setUser(res.user);
        localStorage.setItem("tok", res.user.token);
        if (res.user.role === "") {
          navigate("/role");
        } else {
          navigate("/home");
        }
      } else {
        setDisable(false);
        setProb(res.status);
      }
    } else {
      setProb("Enter Valid email");
    }
  };

  const logtok = async () => {
    const tok = localStorage.getItem("tok");
    if (tok) {
      localStorage.removeItem("tok");
      const res = await postReq("user/logtok", { tok }, "");
      if (res.status === "success") {
        if (setUser) setUser(res.user);
        localStorage.setItem("tok", res.user.token);
        if (res.user.role === "") {
          navigate("/role");
        } else {
          navigate("/home");
        }
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === "email")
      setInfo((p) => ({ ...p, email: e.target.value }));
    if (e.target.id === "password")
      setInfo((p) => ({ ...p, password: e.target.value }));
  };

  useEffect(() => {
    logtok();
  }, []);

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
      />
      <div className="inp-div">
        <input
          style={{ border: "none", padding: "0 10px", borderRadius: 0 }}
          type={show ? "text" : "password"}
          id="password"
          onChange={handleChange}
          value={info.password}
        />
        <img
          style={{ height: 20, width: 20 }}
          src={show ? eyes : eye}
          onClick={() => {
            setShow((p) => !p);
          }}
        />
      </div>
      <p style={{ color: "red" }}>{prob}</p>
      <p className="pl">
        Don't have an account?{" "}
        <span
          className="prm-p"
          onClick={() => {
            navigate("/signup");
          }}
        >
          Sign up
        </span>
      </p>
      <div className="inline">
        <button disabled={disable} onClick={login}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
