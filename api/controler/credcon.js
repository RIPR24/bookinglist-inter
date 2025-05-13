const Credmodel = require("../models/Cred");
const { encrypt, decrypt } = require("../utils/encription");
let cached = null; // caching the creds

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
  if (cached) {
    res.json({ status: "success", cards: cached });
  } else {
    const cards = await Credmodel.find({});
    cached = cards.map((el) => ({
      name: el.name,
      _id: el._id,
      address: decrypt(el.name, el.address), //Decryption of data
      pin: decrypt(el.name, el.pin),
      phone: decrypt(el.name, el.phone),
    }));
    res.json({ status: "success", cards: cached });
  }
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
      cached = cards.map((el) => ({
        name: el.name,
        _id: el._id,
        address: decrypt(el.name, el.address), //Decryption of data
        pin: decrypt(el.name, el.pin),
        phone: decrypt(el.name, el.phone),
      }));
      res.json({ status: "success", cards: cached });
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
    cached = cards.map((el) => ({
      name: el.name,
      _id: el._id,
      address: decrypt(el.name, el.address), //Decryption of data
      pin: decrypt(el.name, el.pin),
      phone: decrypt(el.name, el.phone),
    }));
    res.json({ status: "success", cards: cached });
  } catch (error) {
    res.json({ status: "failed" });
  }
};

module.exports = {
  newCard,
  deleteCard,
  getCards,
  modifyCard,
};
