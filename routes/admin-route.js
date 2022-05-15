const router = require("express").Router();
const User = require("../models").userModel;
const Seat = require("../models").seatModel;
const generate_seats = require("./generate_seats");

router.use((req, res, next) => {
  console.log("A request is coming into admin router");
  if (!req.user.isAdmin()) {
    return res.send("You have no authorization.");
  }
  next();
});

router.get("/", async (req, res) => {
  seats = await Seat.find({});
  if (seats) {
    console.log(seats);
    res.status(200).send(seats);
  } else {
    res.status(500).send("Please try again");
  }
});

router.get("/withBuyer", (req, res) => {
  Seat.find({})
    .populate("buyer", ["username"])
    .then((seats) => {
      res.send(seats);
    })
    .catch((e) => {
      res.status(500).send("Cannot get seats information.");
    });
});

// 插入所有座位
router.post("/seats/all", (req, res) => {
  const seats = generate_seats();
  Seat.insertMany(seats)
    .then(() => {
      res.send("All inserted");
    })
    .catch((e) => {
      res.send(e);
    });
});

// 刪除所有座位
router.delete("/seats/all", async (req, res) => {
  try {
    await Seat.deleteMany({});
    res.send("All deleted");
  } catch (e) {
    res.send(e);
  }
});

// 座位加上position屬性 (單次使用)(已棄用)
router.patch("/seats/all", async (req, res) => {
  let seats = await Seat.find({});
  if (!seats) {
    return res.status(404).send("Cannot find seat.");
  }

  for (s of seats) {
    console.log(s.row.toString() + "-" + s.col.toString());
    Seat.findOneAndUpdate(
      { row: s.row, col: s.col },
      { position: { row: s.row, col: s.col } },
      {
        new: true,
        runValidators: true,
      }
    )
      .then(() => {
        // do nothing
      })
      .catch((e) => {
        return res.send(e);
      });
  }
  res.send("updated");
});

// 替所有帳號加上初始化朋友陣列(單次使用)(已棄用)
router.patch("/friends/all", async (req, res) => {
  try {
    await User.updateMany({}, { friends: [] }, { upsert: true });
    res.send("update done.");
  } catch (err) {
    res.send(err);
  }
});
// 替所有帳號加上初始化票數(單次使用)
router.patch("/usermodel/all", async (req, res) => {
  try {
    await User.updateMany(
      {},
      { ticketsNum: 0, bankAccount: "" },
      { upsert: true }
    );
    res.send("update done.");
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
