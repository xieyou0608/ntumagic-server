const router = require("express").Router();
const registerValidation = require("../validation").registerValidation;
const loginValidation = require("../validation").loginValidation;
const User = require("../models").userModel;
const jwt = require("jsonwebtoken");

router.use((req, res, next) => {
  console.log("A request is coming into auth.js");
  next();
});

router.get("/testAPI", (req, res) => {
  const msgObj = {
    message: "Test API is working",
  };
  return res.json(msgObj);
});

router.post("/register", async (req, res) => {
  // check validation of data
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check if user exists
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist)
    return res.status(400).send("Email has already been registered");

  let isStudent;
  if (req.body.email.search("@ntu.edu.tw") !== -1) {
    isStudent = true;
  } else {
    isStudent = false;
  }

  const newUser = new User({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password, //password will be encrypted before save, see user-model.js
    phone: req.body.phone,
    isStudent: isStudent,
  });
  try {
    const saveUser = await newUser.save();
    console.log("user registed", req.body.username);
    res.status(200).send({
      msg: "success",
      saveObject: saveUser,
    });
  } catch (err) {
    res.status(400).send("Registration failed, please try again.");
  }
});

router.post("/login", (req, res) => {
  // check validation of data
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) return res.status(400).send(err);

    if (!user) {
      res.status(401).send("User not found.");
    } else {
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (err) return res.status(400).send(err);
        if (isMatch) {
          const tokenObject = { _id: user._id, email: user.email };
          const token = jwt.sign(tokenObject, process.env.PASSPORT_SECRET);
          console.log("user login", user.username);
          res.send({ success: true, token: "JWT " + token, user });
        } else {
          console.log(err);
          res.status(401).send("Wrong password.");
        }
      });
    }
  });
});

module.exports = router;
