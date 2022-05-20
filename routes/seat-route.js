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
  seats = await Seat.find({});
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
  let { positions, user_id } = req.body;

  let seats = await Seat.find({ position: { $in: positions } });
  if (!seats) {
    return res.status(404).send("Cannot find seat.");
  }

  for (seat of seats) {
    if (seat.sold != 0) {
      return res.status(400).send({
        success: false,
        message: "Seat already been sold.",
      });
    }
  }

  const session = await startSession();
  try {
    session.startTransaction();
    await Seat.updateMany(
      { position: { $in: positions } },
      { sold: 1, buyer: user_id },
      {
        new: true,
        runValidators: true,
      }
    );
    let user_doc = await User.findOneAndUpdate(
      { _id: user_id },
      {
        $push: {
          tickets: seats.map((x) => {
            return {
              _id: x._id,
              area: x.area,
              row: x.row,
              col: x.col,
              paid: 0,
            };
          }),
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
  // 以上為使用ACID原則更新座位及user資訊
  // 以下為只更新座位
  // Seat.updateMany(
  //   { position: { $in: positions } },
  //   { sold: 1, buyer: user_id },
  //   {
  //     new: true,
  //     runValidators: true,
  //   }
  // )
  //   .then(() => {
  //     res.send("Booking success.");
  //   })
  //   .catch((e) => {
  //     res.send({
  //       success: false,
  //       message: "Please try again",
  //     });
  //   });
});

module.exports = router;
