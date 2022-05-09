const router = require("express").Router();
const User = require("../models").userModel;
const friendsValidation = require("../validation").friendsValidation;

router.use((req, res, next) => {
  console.log("A request is coming into audience router");
  next();
});

router.get("/", async (req, res) => {
  let user = await User.findOne({ _id: req.user._id });
  if (!user) {
    return res.status(404).send("Cannot find user.");
  }
  console.log(user.friends);
  res.send(user);
});

// // add a friend
// router.post("/", async (req, res) => {
//   try {
//     console.log(req.body);
//     let user = await User.findOne({ _id: req.user._id });
//     if (!user) return res.status(404).send("Cannot find user.");
//     console.log(user.friends);
//     user.friends.push(req.body);
//     await user.save();
//     res.send("add a friend.");
//   } catch (err) {
//     res.send(err);
//   }
// });

// modify friends
router.patch("/friends", async (req, res) => {
  newFriends = req.body.friends;
  console.log(newFriends);
  //check validation of input
  const { error } = friendsValidation(newFriends);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    let doc = await User.findOneAndUpdate(
      { _id: req.user._id },
      { friends: newFriends },
      {
        new: true,
      }
    );
    // console.log(doc);
    res.send("updated");
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
