const Credmodel = require("../models/Cred");
const Permissionmodel = require("../models/permission");
const { copy } = require("../routes/userroute");
const { encrypt, decrypt } = require("../utils/encription");

const newCard = async (req, res) => {
  const data = req.body;
  if (data.name) {
    const card = await Credmodel.create({
      name: data.name,
      address: encrypt(data.name, data.address), //Encryption of data
      pin: encrypt(data.name, data.pin),
      phone: encrypt(data.name, data.phone),
    });
    cached = null;
    res.json({ status: "success", card: { ...data, _id: card._id } });
  } else {
    res.json({ status: "enter name of the card" });
  }
};

const getCards = async (req, res) => {
  const cards = await Credmodel.find({});
  let copy = cards.map((el) => ({
    name: el.name,
    _id: el._id,
    address: decrypt(el.name, el.address), //Decryption of data
    pin: decrypt(el.name, el.pin),
    phone: decrypt(el.name, el.phone),
  }));
  res.json({ status: "success", cards: copy });
};

const getCardsg = async (req, res) => {
  const cards = await Credmodel.find({});
  const per = await Permissionmodel.findOne({});
  const crds = cards.map((el) => {
    let copy = { name: el.name, _id: el._id };
    if (per.address) copy.address = decrypt(el.name, el.address); //Decryption of data
    if (per.pin) copy.pin = decrypt(el.name, el.pin);
    if (per.phone) copy.phone = decrypt(el.name, el.phone);
    return copy;
  });
  res.json({ status: "success", cards: crds });
};

const modifyCard = async (req, res) => {
  const { _id, name, address, pin, phone } = req.body;
  try {
    const card = await Credmodel.findById(_id);
    if (card.id) {
      card.name = name;
      card.address = encrypt(name, address);
      card.pin = encrypt(name, pin);
      card.phone = encrypt(name, phone);
      await card.save();
      const cards = await Credmodel.find({});
      let copy = cards.map((el) => ({
        name: el.name,
        _id: el._id,
        address: decrypt(el.name, el.address), //Decryption of data
        pin: decrypt(el.name, el.pin),
        phone: decrypt(el.name, el.phone),
      }));
      cached = null;
      res.json({ status: "success", cards: copy });
    }
  } catch (error) {
    res.json({ status: "failed" });
  }
};

const deleteCard = async (req, res) => {
  const { _id } = req.body;
  try {
    await Credmodel.findByIdAndDelete(_id);
    const cards = await Credmodel.find({});
    let copy = cards.map((el) => ({
      name: el.name,
      _id: el._id,
      address: decrypt(el.name, el.address), //Decryption of data
      pin: decrypt(el.name, el.pin),
      phone: decrypt(el.name, el.phone),
    }));
    cached = null;
    res.json({ status: "success", cards: copy });
  } catch (error) {
    res.json({ status: "failed" });
  }
};

module.exports = {
  newCard,
  deleteCard,
  getCards,
  getCardsg,
  modifyCard,
};
