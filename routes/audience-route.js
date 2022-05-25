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

router.get("/reload", async (req, res) => {
  let user_doc = await User.findOne({ _id: req.user._id });
  if (!user_doc) {
    return res.status(404).send("Cannot find user.");
  }
  res.send(user_doc);
});

// modify bankAccount
router.patch("/bankAccount", async (req, res) => {
  newBank = req.body.bankAccount;
  console.log(newBank);

  try {
    let doc = await User.findOneAndUpdate(
      { _id: req.user._id },
      { bankAccount: newBank },
      { new: true, upsert: true }
    );
    // res.send("Bank account updated.");
    res.send(doc);
  } catch (err) {
    res.send(err);
  }
});

// modify friends
router.patch("/friends", async (req, res) => {
  newFriends = req.body.friends;
  console.log(newFriends);
  //check validation of input
  const { error } = friendsValidation(newFriends);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    await User.findOneAndUpdate(
      { _id: req.user._id },
      { friends: newFriends },
      {
        new: true,
      }
    );
    res.send("Friends updated.");
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
