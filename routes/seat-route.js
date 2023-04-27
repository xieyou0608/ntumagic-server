const router = require("express").Router();
const Seat = require("../models").seatModel;
const User = require("../models").userModel;
const seatValidation = require("../validation").seatValidation;
const { startSession } = require("mongoose");

router.use((req, res, next) => {
  console.log("A request is coming into seat router");
  next();
});

router.get("/", async (req, res) => {
  const seats = await Seat.find({}).sort({ _id: 1 });
  if (seats) {
    // console.log(seats);
    res.status(200).send(seats);
  } else {
    res.status(500).send("Please try again");
  }
});

router.post("/getSeat", (req, res) => {
  let { user_id } = req.body;
  Seat.find({ buyer: user_id })
    .then((data) => {
      res.send(data);
    })
    .catch((e) => {
      res.status(500).send("Cannot get seat data");
    });
});

//劃位: 檢查位子是否被劃走後，以Atomic方式更新座位及用戶資訊，然後response新的用戶資訊
//see passport.js to use req.user
router.patch("/booking", async (req, res) => {
  let { positions, email, username, bankAccount } = req.body;

  let seats = await Seat.find({ position: { $in: positions } });
  if (!seats) {
    return res.status(404).send("Cannot find seat.");
  }

  for (const seat of seats) {
    if (seat.sold != 0) {
      return res.status(400).send({
        success: false,
        message: "Seat already been sold.",
      });
    }
  }
  let user = await User.findOne({ email: email });
  if (user) {
    if (user.tickets.length + positions.length > 6) {
      return res.status(400).send("劃位超過上限");
    }
  }

  const session = await startSession();
  try {
    session.startTransaction();
    await Seat.updateMany(
      { position: { $in: positions } },
      { sold: 1, buyer: email },
      {
        new: true,
        runValidators: true,
      }
    );
    let user_doc = await User.findOneAndUpdate(
      { email: email },
      {
        $push: {
          tickets: seats.map((x) => {
            return {
              _id: x._id,
              area: x.area,
              row: x.row,
              col: x.col,
              paid: 0,
              bookDate: new Date(),
            };
          }),
        },
        $set: {
          username,
          bankAccount,
          emailSent: false,
        },
      },
      { new: true, upsert: true }
    );

    await session.commitTransaction();
    session.endSession();
    res.send(user_doc);
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.log(err);
    res.send("Error, please try again");
  }
});

module.exports = router;
