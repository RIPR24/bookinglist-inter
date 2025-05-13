const jwt = require("jsonwebtoken");

const authUser = (req, res, next) => {
  console.log(req.headers.authorization);
  jwt.verify(
    req.headers.authorization,
    process.env.ACCESS_TOKEN,
    async (err, pl) => {
      if (err) {
        res.json({ status: "Unauthorised Access" });
      } else {
        const chk = await Usermodel.findById(pl.id);
        if (chk.email) {
          req.user = chk;
          next();
        } else {
          res.json({ status: "Unauthorised Access" });
        }
      }
    }
  );
};

const chkAdmin = (req, res, next) => {
  if (req.user.role === "admin") {
    next();
  } else {
    res.json({ status: "Unauthorised Access" });
  }
};

module.exports = { authUser, chkAdmin };
