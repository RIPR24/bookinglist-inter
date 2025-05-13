import { useContext, useState } from "react";
import { Context } from "../Context/AppContext";
import { postReq } from "../Utils/request";
import { useNavigate } from "react-router-dom";

const SelectRole = () => {
  const { user, setUser, setPop } = useContext(Context);
  const [disable, setDisable] = useState(false);
  const [role, setRole] = useState("guest");
  const navigate = useNavigate();

  const setrole = async () => {
    if (user) {
      setDisable(true);
      const res = await postReq("user/setrole", { role }, user.token);
      if (res.status === "success") {
        if (setUser) setUser(res.user);
        localStorage.setItem("tok", res.user.token);
        navigate("/home");
      } else {
        if (setPop) setPop(res.status);
        setDisable(false);
      }
    } else {
      navigate("/");
    }
  };
  return (
    <div className="con" style={{ gap: 40, margin: 20 }}>
      <h1>CRUD App</h1>
      <p style={{ fontSize: "1.4rem" }}>Select your role {user?.email}</p>
      <div className="inline">
        <label htmlFor="role">Role:</label>
        <select
          name="role"
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="guest">Guest</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <button onClick={setrole} disabled={disable}>
        Set Role
      </button>
    </div>
  );
};

export default SelectRole;
