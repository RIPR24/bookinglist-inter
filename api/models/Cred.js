const mongoose = require("mongoose");

const CredSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: String,
  pin: Number,
  phone: Number,
});

const Credmodel = mongoose.model("creds", CredSchema);
module.exports = Credmodel;
