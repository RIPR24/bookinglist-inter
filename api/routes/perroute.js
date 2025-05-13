const { getPer, updatePer } = require("../controler/percon");
const { authUser, chkAdmin } = require("../middleware/auth");

const perroute = require("express").Router();

perroute.get("/", authUser, chkAdmin, getPer);
perroute.put("/", authUser, chkAdmin, updatePer);

module.exports = perroute;
