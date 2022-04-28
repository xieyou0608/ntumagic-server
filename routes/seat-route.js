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

router.get("/:row/:col", (req, res) => {
  let { row, col } = req.params;
  Seat.findOne({ row, col })
    .populate("buyer", ["username"])
    .then((seat) => {
      res.send(seat);
    })
    .catch((e) => {
      res.status(500).send("Cannot get seats information.");
    });
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

//to use req.user, see passport.js
router.patch("/booking", async (req, res) => {
  //   const { error } = seatValidation(req.body);
  //   if (error) return res.status(400).send(error.details[0].message);

  let { positions, user_id } = req.body;

  let seats = await Seat.find({ position: { $in: positions } });
  if (!seats) {
    return res.status(404).send("Cannot find seat.");
  }

  seats.forEach((seat) => {
    if (seat.sold != 0) {
      return res.status(400).send({
        success: false,
        message: "Seat already been sold.",
      });
    }
  });

  //   if(seat.buyer.equals(req.user._id) || req.user.isAdmin())
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
