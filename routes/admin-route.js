const router = require("express").Router();
const Seat = require("../models").seatModel;

router.use((req, res, next) => {
  console.log("A request is coming into admin router");
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

// router.post("/all", async (req, res) => {

//   Seat.insertMany()
//     .then(() => {
//       res.send("insert all seats success");
//     })
//     .catch((e) => {
//       res.send("error");
//     });
// });

router.delete("/all", async (req, res) => {
  if (!req.user.isAdmin()) {
    return res.send("You have no authorization.");
  }

  try {
    await Seat.deleteMany({});
    res.send("All deleted");
  } catch (e) {
    res.send(e);
  }
});

router.patch("/", async (req, res) => {
  // if (!req.user.isAdmin()) {
  //   return res.send("You have no authorization.");
  // }

  let seats = await Seat.find({});
  if (!seats) {
    return res.status(404).send("Cannot find seat.");
  }

  seats.forEach((s) => {
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
  });

  res.send("updated");
});

module.exports = router;
