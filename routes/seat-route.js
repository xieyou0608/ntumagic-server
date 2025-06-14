const router = require("express").Router();
const Seat = require("../models").seatModel;
const User = require("../models").userModel;
const seatValidation = require("../validation").seatValidation;
const { startSession } = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const moment = require("moment-timezone");
moment.tz.setDefault("Asia/Taipei");

const PHASE = {
  TEST_END: moment("2025-05-19 20:00:00", "YYYY-MM-DD HH:mm:ss"),
  NTU_END: moment("2025-05-20 15:00:00", "YYYY-MM-DD HH:mm:ss"),
  GAP_END: moment("2025-05-20 20:00:00", "YYYY-MM-DD HH:mm:ss"),
  PUBLIC_END: moment("2025-06-12 15:00:00", "YYYY-MM-DD HH:mm:ss"),
};

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


router.use("/booking", (req, res, next) => {
  const now = moment();
  const email = (req.body.email || "").toLowerCase();

  let phase;
  if (now.isBefore(PHASE.TEST_END)) phase = "TEST";
  else if (now.isBefore(PHASE.NTU_END)) phase = "NTU_ONLY";
  else if (now.isBefore(PHASE.GAP_END)) phase = "GAP";
  else if (now.isBefore(PHASE.PUBLIC_END)) phase = "PUBLIC";
  else phase = "CLOSED";
  switch (phase) {
    case "NTU_ONLY":
      if (!email.endsWith("@ntu.edu.tw")) {
        return res.status(403).json({ success: false, message: "目前為校內優先時段，請使用台大信箱" });
      }
      break;
    case "TEST":
    case "PUBLIC":
    case "GAP":
      break;
    case "CLOSED":
    default:
      return res.status(403).json({ success: false, message: "線上劃位已截止，請至現場購票！" });
  }
  next();
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
      return res.status(400).send("位置已被其他人選擇，請重新劃位");
    }
  }
  let user = await User.findOne({ email: email });
  let needVerify = true;
  if (user) {
    needVerify = false;
    const numBooked = user.tickets.length;
    if (numBooked + positions.length > 6) {
      console.log("使用者劃位達上限");
      return res.status(400).send(`劃位上限為 6 張，您已劃 ${numBooked} 張`);
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

    const emailHash = crypto
      .createHash("sha256")
      .update(email + process.env.EMAIL_HASH)
      .digest("hex");

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
          verified: !needVerify,
          verifyToken: emailHash,
        },
      },
      { new: true, upsert: true }
    );

    // 寄出信
    const verifyLink = `https://www.ntumagic.club/verify?email=${email}&verifyToken=${emailHash}`;
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.GMAIL_ACCOUNT,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    const price = {
      A: 500,
      B: 400,
      C: 300,
    };
    const totalPayment = seats.reduce((acc, cur) => {
      return acc + price[cur.area];
    }, 0);

    const options = {
      from: process.env.GMAIL_ACCOUNT,
      to: user_doc.email,
      cc: process.env.GMAIL_ACCOUNT,
      subject: "【第 29 屆台大魔幻之夜】劃位通知",
      html: `<h3>${username} 您好：</h3>
      <p>感謝您支持第 29 屆台大魔幻之夜《Blooming Mirage》</p>
      <p>首次劃位請點擊<a href=${verifyLink}>驗證連結</a>來進行信箱驗證</p>
      <p>================================================</p>
      <p>您此次所劃的座位：</p>
      ${seats
          .map((t) => {
            return `<h4>
          ${t.area} 區 ${t.row} 排 ${t.col} 號
          </h4>`;
          })
          .join("")}
      <p>共 ${totalPayment} 元</p>
      <p>================================================</p>
      【匯款資訊】
      <p>銀行代碼：700 中華郵政</p>
      <p>帳號：00312180252039</p>
      <p>戶名：黃宗軒</p>
      <p>================================================</p>
      <h3>【🎩第 29 屆台大魔幻之夜🎩】</h3>
      <p>魔夜時間：2025/6/12（四）18:30進場 19:00開始</p>
      <p>魔夜地點：國立臺灣藝術教育館 南海劇場</p>
      <p>（近捷運小南門站 3 號出口）</p>
      <p>第 29 屆台大魔幻之夜期待您的蒞臨！</p>`,
    };

    transporter.sendMail(options, async function (err, info) {
      if (err) {
        console.log(err);
        throw new Error(err);
      } else {
        console.log("劃位 email 發送成功: " + info.response);
      }
    });

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
