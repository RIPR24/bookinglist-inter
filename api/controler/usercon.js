const jwt = require("jsonwebtoken");
const { createHmac } = require("crypto");
const Usermodel = require("../models/Users");
const { OAuth2Client } = require("google-auth-library");

const getCred = async (code) => {
  try {
    const oauth2Client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      "postmessage"
    );
    const googleRes = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(googleRes.tokens);

    const res = await fetch(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
    );
    const userCred = await res.json();
    return userCred;
  } catch (error) {
    console.log(error);
    return {};
  }
};

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
  const { _id, role } = req.body;
  const user = await Usermodel.findById(_id);
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

const glogin = async (req, res) => {
  const gres = await getCred(req.body.code);
  let user = await Usermodel.findOne({ email: gres.email });
  if (!user._id) {
    user = await Usermodel.create({
      email,
      password: "google",
      role: "",
    });
  }
  if (user._id) {
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
  } else {
    res.json({ status: "failed" });
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
          user: { email: user.email, role: user.role, token: tok },
        });
      }
    }
  });
};

module.exports = {
  login,
  signup,
  glogin,
  logTok,
  setRole,
};
