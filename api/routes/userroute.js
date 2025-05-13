const {
  login,
  signup,
  logTok,
  glogin,
  setRole,
} = require("../controler/usercon");

const userroute = require("express").Router();

userroute.post("/login", login);
userroute.post("/signup", signup);
userroute.post("/logtok", logTok);
userroute.post("/glogin", glogin);
userroute.post("setrole", setRole);

module.exports = userroute;
