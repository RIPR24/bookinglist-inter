const jwt = require("jsonwebtoken");
const { createHmac } = require("crypto");
const Usermodel = require("../models/Users");

const login = async (req, res) => {
  const { email, password } = req.body;
  const chk = await Usermodel.findOne({ email: email });
  if (chk) {
    const hpass = createHmac("sha256", process.env.SECRET)
      .update(password)
      .digest("base64");
    if (hpass === chk.password) {
      const tok = jwt.sign(
        { id: chk._id, role: chk.role },
        process.env.ACCESS_TOKEN,
        {
          expiresIn: "30d",
        }
      );
      res.json({
        status: "success",
        user: { email: chk.email, role: chk.role, token: tok },
      });
    } else if (chk.password === "google") {
      res.json({ status: "Login with Google" });
    } else {
      res.json({ status: "Wrong Password" });
    }
  } else {
    res.json({ status: "No User Found" });
  }
};

const signup = async (req, res) => {
  const { email, password } = req.body;
  const chk = await Usermodel.findOne({ email: email });
  if (chk) {
    res.json({ status: "No User Found" });
  } else {
    const hpass = createHmac("sha256", process.env.SECRET)
      .update(password)
      .digest("base64");
    const user = await Usermodel.create({ email, password: hpass, role: "" });
    const tok = jwt.sign(
      { id: user._id, role: user.role },
      process.env.ACCESS_TOKEN,
      {
        expiresIn: "30d",
      }
    );
    res.json({
      status: "success",
      user: { email: user.email, role: user.role, token: tok },
    });
  }
};

const setRole = async (req, res) => {
  const { role } = req.body;
  const user = await Usermodel.findById(req.user._id);
  if (user._id) {
    user.role = role;
    await user.save();
    const tok = jwt.sign(
      { id: user._id, role: user.role },
      process.env.ACCESS_TOKEN,
      {
        expiresIn: "30d",
      }
    );
    res.json({
      status: "success",
      user: { email: user.email, role: user.role, token: tok },
    });
  }
};

const logTok = async (req, res) => {
  const { tok } = req.body;
  jwt.verify(tok, process.env.ACCESS_TOKEN, async (err, pl) => {
    if (err) {
      res.json({ status: "failed" });
    } else {
      const user = await Usermodel.findById(pl.id);
      if (user.email) {
        const tok = jwt.sign(
          { id: user._id, role: user.role },
          process.env.ACCESS_TOKEN,
          {
            expiresIn: "30d",
          }
        );
        res.json({
          status: "success",
          user: {
            email: user.email,
            role: user.role,
            token: tok,
            _id: user._id,
          },
        });
      }
    }
  });
};

module.exports = {
  login,
  signup,
  logTok,
  setRole,
};
