const router = require("express").Router();
const User = require("../models").userModel;
const Seat = require("../models").seatModel;
const generate_seats = require("./generate_seats");
const { startSession } = require("mongoose");

router.use((req, res, next) => {
  console.log("A request is coming into admin router");
  if (!req.user.isAdmin()) {
    console.log("there");
    return res.send("You have no authorization.");
  }
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

// 拿到所有user資料
router.get("/users", async (req, res) => {
  users = await User.find({});
  if (users) {
    res.status(200).send(users);
  } else {
    res.status(500).send("Please try again");
  }
});

router.patch("/clearSeatById", async (req, res) => {
  let { _user_id } = req.body;
  const session = await startSession();
  try {
    session.startTransaction();
    await Seat.updateMany(
      { buyer: _user_id },
      { sold: 0, buyer: null },
      {
        new: true,
        runValidators: true,
      }
    );
    let user_doc = await User.findOneAndUpdate(
      { _id: _user_id },
      { tickets: [] },
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

router.patch("/user", async (req, res) => {
  let { _user_id } = req.body;
  console.log("here2");
  try {
    seats = await Seat.find({ buyer: _user_id });
    res.send(seats);
  } catch (e) {
    res.send(e);
  }

  // User.updateMany(
  //   { position: { $in: positions } },
  //   { area: newArea },
  //   {
  //     new: true,
  //     runValidators: true,
  //   }
  // )
  //   .then(() => {
  //     res.send("modify area success.");
  //   })
  //   .catch((e) => {
  //     res.send({
  //       success: false,
  //       message: "Please try again",
  //     });
  //   });
});

router.post("/user", async (req, res) => {
  let { _user_id } = req.body;
  console.log("here");
  try {
    await User.deleteOne({ _id: _user_id });
    res.send("刪除完畢" + _user_id);
  } catch (e) {
    res.send(e);
  }
});

// router.get("/withBuyer", (req, res) => {
//   Seat.find({})
//     .populate("buyer", ["username"])
//     .then((seats) => {
//       res.send(seats);
//     })
//     .catch((e) => {
//       res.status(500).send("Cannot get seats information.");
//     });
// });

// // 插入所有座位
// router.post("/seats/all", (req, res) => {
//   const seats = generate_seats();
//   Seat.insertMany(seats)
//     .then(() => {
//       res.send("All inserted");
//     })
//     .catch((e) => {
//       res.send(e);
//     });
// });

// // 刪除所有座位
// router.delete("/seats/all", async (req, res) => {
//   try {
//     await Seat.deleteMany({});
//     res.send("All deleted");
//   } catch (e) {
//     res.send(e);
//   }
// });

// // 清空座位購買情形
// router.patch("/seats/clearPaid", async (req, res) => {
//   const session = await startSession();
//   try {
//     session.startTransaction();
//     await Seat.updateMany(
//       {},
//       { sold: false, paid: false, buyer: null },
//       { upsert: true }
//     );
//     await User.updateMany({}, { tickets: [] }, { upsert: true });

//     await session.commitTransaction();
//     session.endSession();
//     res.send("更新完畢");
//   } catch (err) {
//     await session.abortTransaction();
//     session.endSession();
//     console.log(err);
//     res.send(err);
//   }
// });

// // 座位加上position屬性 (單次使用)(已棄用)
// router.patch("/seats/all", async (req, res) => {
//   let seats = await Seat.find({});
//   if (!seats) {
//     return res.status(404).send("Cannot find seat.");
//   }

//   for (s of seats) {
//     console.log(s.row.toString() + "-" + s.col.toString());
//     Seat.findOneAndUpdate(
//       { row: s.row, col: s.col },
//       { position: { row: s.row, col: s.col } },
//       {
//         new: true,
//         runValidators: true,
//       }
//     )
//       .then(() => {
//         // do nothing
//       })
//       .catch((e) => {
//         return res.send(e);
//       });
//   }
//   res.send("updated");
// });

// // 替所有帳號加上初始化朋友陣列(單次使用)(已棄用)
// router.patch("/friend", async (req, res) => {
//   try {
//     await User.updateMany(
//       { username: "李俊昇" },
//       { isStudent: true },
//       { upsert: true }
//     );
//     res.send("update done.");
//   } catch (err) {
//     res.send(err);
//   }
// });

// });
// // 替所有帳號加上初始化票數(單次使用)
// router.patch("/usermodel/all", async (req, res) => {
//   try {
//     await User.updateMany(
//       {},
//       { ticketsNum: 0, bankAccount: "" },
//       { upsert: true }
//     );
//     res.send("update done.");
//   } catch (err) {
//     res.send(err);
//   }
// });

// 修改座位的 area
router.patch("/area", async (req, res) => {
  let { positions, newArea, user_id } = req.body;

  let seats = await Seat.find({ position: { $in: positions } });
  if (!seats) {
    return res.status(404).send("Cannot find seat.");
  }

  Seat.updateMany(
    { position: { $in: positions } },
    { area: newArea },
    {
      new: true,
      runValidators: true,
    }
  )
    .then(() => {
      res.send("modify area success.");
    })
    .catch((e) => {
      res.send({
        success: false,
        message: "Please try again",
      });
    });
});

//傳入user id，將其所有座位標記為已付款
router.patch("/seat/paid", async (req, res) => {
  let { user_id } = req.body;
  try {
    const user_doc = await User.findOne({ _id: user_id });
    user_doc.tickets = user_doc.tickets.map((seat) => {
      seat.paid = true;
      return seat;
    });
    await user_doc.save();
    res.send(user_doc);
  } catch (e) {
    res.send(e);
  }
});

module.exports = router;
