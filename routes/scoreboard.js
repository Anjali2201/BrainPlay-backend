var express = require("express");
var router = express.Router();
const User = require("../models/User");

router.post("/", async function (req, res, next) {
  const { username } = req.body;
  let usersData = {
    username: username,
    rank: 0,
    points: 0,
    level: 0,
    time: 0,
    graph: [],
  };
  let users;
  let id;
  let data = [];
  try {
    users = await User.find();

    for (let a = 0; a < users.length; a++) {
      let dumm = {
        rank: a,
        username: users[a].name,
        email: users[a].email,
        level: users[a].level,
        points: users[a].points,
        time: users[a].time,
        index: a,
      };
      data.push(dumm);
    }
    data.sort((a, b) => {
      return a.points - b.points;
    });
    for (let a = 0; a < data.length; a++) {
      data[a].rank = a + 1;
      if (data[a].username == username) {
        usersData.rank = a + 1;
        usersData.points = data[a].points;
        usersData.time = data[a].time;
        usersData.level = data[a].level;
        id = data[a].index;
        break;
      }
    }
    let pp=0;
    if(users[id].game1[0]==1){
      pp=100-(users[id].game1[1]*5);
    }
    let dumm1={
      name: "game1",
      score: pp,
      time: users[id].game1[2]
    }
    usersData.graph.push(dumm1);
    pp=0;
    if(users[id].game2[0]==1){
      pp=100-(users[id].game2[1]*5);
    }
    let dumm2={
      name: "game2",
      score: pp,
      time: users[id].game2[2]
    }
    usersData.graph.push(dumm2);
    pp=0;
    if(users[id].game3[0]==1){
      pp=100-(users[id].game3[1]*5);
    }
    let dumm3={
      name: "game3",
      score: pp,
      time: users[id].game3[2]
    }
    usersData.graph.push(dumm3);
    pp=0;
    if(users[id].game4[0]==1){
      pp=100-(users[id].game4[1]*5);
    }
    let dumm4={
      name: "game4",
      score: pp,
      time: users[id].game4[2]
    }
    usersData.graph.push(dumm4);

  } catch (err) {
    console.log(err);
  }
  if (!users) {
    return res.status(404).json({ message: "No Users Found" });
  }
  return res.status(200).json({ usersData });
});

module.exports = router;
