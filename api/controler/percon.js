const Permissionmodel = require("../models/permission");

const getPer = async (req, res) => {
  const pers = await Permissionmodel.findOne({});
  res.json({ status: "success", pers });
};

const updatePer = async (req, res) => {
  const { perm } = req.body;
  const per = await Permissionmodel.findOne({});
  if (per) {
    per.name = perm.name;
    per.address = perm.address;
    per.pin = perm.pin;
    per.phone = perm.phone;
    await per.save();
    const pers = await Permissionmodel.find({});
    res.json({ status: "success", pers });
  } else {
    res.json({ status: "failed" });
  }
};

module.exports = { getPer, updatePer };
