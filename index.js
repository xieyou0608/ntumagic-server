const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const authRoute = require("./routes").auth_route;
const seatRoute = require("./routes").seat_route;
const adminRoute = require("./routes").admin_route;
const audienceRoute = require("./routes").audience_route;
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

//middelwares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// routes which are not protected
app.use("/api/user", authRoute);

// routes which are protected
app.use(
  "/api/seats",
  passport.authenticate("jwt", { session: false }),
  seatRoute
);

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

app.listen(process.env.PORT || 8080, () => {
  console.log("Server is running.");
});
