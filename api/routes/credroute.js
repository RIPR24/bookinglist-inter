const {
  getCards,
  newCard,
  modifyCard,
  deleteCard,
  getCardsg,
} = require("../controler/credcon");
const { authUser, chkAdmin } = require("../middleware/auth");

const credroute = require("express").Router();

credroute.get("/admin", authUser, chkAdmin, getCards);
credroute.get("/", authUser, getCardsg);
credroute.post("/", authUser, chkAdmin, newCard);
credroute.put("/", authUser, chkAdmin, modifyCard);
credroute.delete("/", authUser, chkAdmin, deleteCard);

module.exports = credroute;
