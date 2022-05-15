const router = require("express").Router();
const Seat = require("../models").seatModel;
const seatValidation = require("../validation").seatValidation;

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

  Seat.updateMany(
    { position: { $in: positions } },
    { sold: 1, buyer: user_id },
    {
      new: true,
      runValidators: true,
    }
  )
    .then(() => {
      res.send("Booking success.");
    })
    .catch((e) => {
      res.send({
        success: false,
        message: "Please try again",
      });
    });
});

module.exports = router;
