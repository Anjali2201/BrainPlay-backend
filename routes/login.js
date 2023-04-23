var express = require("express");
var router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

router.post("/", async function (req, res, next) {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
    console.log(existingUser);
    let logcount = existingUser.loginCount+1;
    await User.findOneAndUpdate(
      {email: email},
      { loginCount: logcount },
      function (err, docs) {
        if (err) {
          console.log(err);
        } else {
          console.log("Updated User : ", docs);
          return res.status(200).json({
            message: "Login Successful",
            user: existingUser,
          });
        }
      }
    );

  } catch (err) {
    return console.log(err);
  }
  if (!existingUser) {
    return res
      .status(404)
      .json({ message: "couldn't Find User By This Email" });
  }

  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect Password" });
  }

});

module.exports = router;
