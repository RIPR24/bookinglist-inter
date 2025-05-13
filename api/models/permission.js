const mongoose = require("mongoose");

const PermissionSchema = new mongoose.Schema({
  name: Boolean,
  address: Boolean,
  pin: Boolean,
  phone: Boolean,
});

const Permissionmodel = mongoose.model("permission", PermissionSchema);
module.exports = Permissionmodel;
