var express = require("express");
var router = express.Router();
const User = require("../models/User");

router.get("/", async function (req, res, next) {
  let usersData = {
    totalUsers: 0,
    totalCompleted: 0,
    totalPoints: 0,
    totalData: [],
  };
  let data = [];
  let users;
  try {
    users = await User.find();
    usersData.totalUsers = users.length;

    for (let a = 0; a < users.length; a++) {
      if (users[a].level == 5) {
        usersData.totalCompleted = usersData.totalCompleted + 1;
      }

      let dumm = {
        rank: a,
        username: users[a].name,
        email: users[a].email,
        level: users[a].level,
        points: users[a].points,
        time: users[a].time,
      };
      data.push(dumm);
      if (usersData.totalPoints < users[a].points) {
        usersData.totalPoints = users[a].points;
      }
    }
    data.sort((a, b) => {
      return b.points - a.points;
    });
    for (let a = 0; a < data.length; a++) {
      data[a].rank = a + 1;
    }
    usersData.totalData = data;
  } catch (err) {
    console.log(err);
  }
  if (!users) {
    return res.status(404).json({ message: "No Users Found" });
  }
  return res.status(200).json({ usersData });
});

module.exports = router;
