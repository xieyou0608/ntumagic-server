const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const authRoute = require("./routes").auth_route;
const seatRoute = require("./routes").seat_route;
const adminRoute = require("./routes").admin_route;
const audienceRoute = require("./routes").audience_route;
const Seat = require("./models").seatModel;
const passport = require("passport");
require("./config/passport")(passport);
const cors = require("cors");

//connect to Database
mongoose
  .connect(process.env.DB_CONNECT)
  .then(() => {
    console.log("connect to MongoDB Atlas");
  })
  .catch((e) => {
    console.log(e);
  });


// app.use(
//   cors({
//     origin: 'https://ntumagic.vercel.app/booking',
//     credentials: true
//   })
// );

//middelwares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// routes which are not protected
app.use("/api/user", authRoute);
app.use("/api/seats", seatRoute);

// routes which are protected

app.use(
  "/api/audience",
  passport.authenticate("jwt", { session: false }),
  audienceRoute
);

app.use(
  "/api/admin",
  passport.authenticate("jwt", { session: false }),
  adminRoute
);

app.get("/", (req, res) => {
  res.send("This is ntumagic API.");
});

// This route is same as /api/seats but not be protected
app.get("/api/preview", async (req, res) => {
  let seats = await Seat.find({}).sort({ _id: 1 });
  if (seats) {
    res.status(200).send(seats);
  } else {
    res.status(500).send("Please try again");
  }
});

app.listen(process.env.PORT || 8080, () => {
  console.log("Server is running.");
});
