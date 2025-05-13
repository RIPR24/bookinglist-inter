import { useState } from "react";
import eye from "../assets/logos/eye.svg";
import eyes from "../assets/logos/eye-s.svg";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { postReq } from "../Utils/request";

type info = {
  email: string;
  password: string;
};

const Login = () => {
  const [show, setShow] = useState(false);
  const [disable, setDisable] = useState(false);
  const [prob, setProb] = useState("");
  const [info, setInfo] = useState<info>({ email: "", password: "" });

  const responseGoogle = async (authRes: any) => {
    try {
      if (authRes.code) {
        const res = await postReq("glogin", { code: authRes.code }, "");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const login = async () => {
    const reg =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    //email Validation
    if (reg.test(info.email)) {
      setDisable(true);
      const res = await postReq("login", { ...info }, "");
    } else {
      setProb("Enter Valid email");
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === "email")
      setInfo((p) => ({ ...p, email: e.target.value }));
    if (e.target.id === "password")
      setInfo((p) => ({ ...p, password: e.target.value }));
  };

  return (
    <div>
      <input type="email" id="email" onChange={handleChange} />
      <div className="inp-div">
        <input
          style={{ border: "none", padding: 0, borderRadius: 0 }}
          type={show ? "text" : "password"}
          id="password"
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
      <p style={{ color: "red" }}>{prob}</p>
      <p>
        Don't have an account? <span className="prm-p">Sign up</span>
      </p>
      <div>
        <button disabled={disable} onClick={login}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
