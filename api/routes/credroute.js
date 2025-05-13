const {
  getCards,
  newCard,
  modifyCard,
  deleteCard,
} = require("../controler/credcon");
const { authUser, chkAdmin } = require("../middleware/auth");

const credroute = require("express").Router();

credroute.get("/", authUser, getCards);
credroute.post("/", authUser, chkAdmin, newCard);
credroute.put("/", authUser, chkAdmin, modifyCard);
credroute.delete("/", authUser, chkAdmin, deleteCard);

module.exports = credroute;
