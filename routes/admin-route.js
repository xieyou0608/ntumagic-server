const router = require("express").Router();
const User = require("../models").userModel;
const Seat = require("../models").seatModel;
const generate_seats = require("./generate_seats");
const { startSession } = require("mongoose");
const nodemailer = require("nodemailer");

router.use((req, res, next) => {
  console.log("A request is coming into admin router");
  if (!req.user.isAdmin()) {
    console.log("there");
    return res.send("You have no authorization.");
  }
  next();
});

router.get("/", async (req, res) => {
  const seats = await Seat.find({});
  if (seats) {
    // console.log(seats);
    res.status(200).send(seats);
  } else {
    res.status(500).send("Please try again");
  }
});

// 拿到所有user資料
router.get("/users", async (req, res) => {
  const users = await User.find({});
  if (users) {
    res.status(200).send(users);
  } else {
    res.status(500).send("Please try again");
  }
});

// 刪除用戶的所有座位，並回傳新的 doc
router.patch("/clearSeatById", async (req, res) => {
  let { user_id } = req.body;
  const session = await startSession();
  try {
    session.startTransaction();
    await Seat.updateMany(
      { buyer: user_id },
      { sold: 0, buyer: null },
      {
        new: true,
        runValidators: true,
      }
    );
    let user_doc = await User.findOneAndUpdate(
      { _id: user_id },
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
    const seats = await Seat.find({ buyer: _user_id });
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

//傳入user id，將其所有座位標記為已付款，並回傳修改過後的 doc
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

router.patch("/seat/email", async (req, res) => {
  let { user_id } = req.body;
  try {
    let user_doc = await User.findOneAndUpdate(
      { _id: user_id },
      { emailSent: true },
      { new: true, upsert: true }
    );
    res.send(user_doc);
  } catch (e) {
    res.send(e);
  }
});

router.post("/seat/email", async (req, res) => {
  let { user_id } = req.body;
  try {
    const user_doc = await User.findOne({ _id: user_id });

    console.log(process.env.GMAIL_ACCOUNT);
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.GMAIL_ACCOUNT,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    const options = {
      from: process.env.GMAIL_ACCOUNT,
      to: user_doc.email,
      cc: process.env.GMAIL_ACCOUNT,
      subject: "【第27屆台大魔幻之夜】付款成功通知信",
      html: `<h3>${user_doc.username} 您好：</h3>
    <p>恭喜您！您已成功付款！</p>
    <p>您的座位：</p>
    ${user_doc.tickets
      .map((t) => {
        return `<h4>
        ${t.area} 區 ${t.row} 排 ${t.col} 號
        </h4>`;
      })
      .join("")}
      <p>感謝您支持第27屆台大魔幻之夜《ALL IN MAGIC》</p>
      <p>當日請出示此封信件領取實體門票</p>
      <p>以下附上魔夜晚會資訊</p>
      <p>預祝您有個愉快的夜晚</p>
      <p>跟著我們一起ALL IN吧！</p>
      <p>================================================</p>
      <h3>【🎩第27屆台大魔幻之夜🎩】</h3>
      <p>魔夜時間：2022/6/14（二）18:00進場 18:30開始</p>
      <p>魔夜地點：民生社區活動中心集會堂</p>
      <p>（近捷運南京三民站1號出口）</p>
      <p>第27屆台大魔幻之夜期待您的蒞臨！</p>`,
    };

    transporter.sendMail(options, async function (err, info) {
      if (err) {
        console.log(err);
        return res.send(err);
      } else {
        console.log("email發送成功: " + info.response);
        user_doc.emailSent = true;
        await user_doc.save();
        res.send(user_doc);
      }
    });
  } catch (e) {
    res.send(e);
  }
});

router.post("/test", (req, res) => {
  res.send("admin route is working");
});

module.exports = router;
