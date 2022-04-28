const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models").userModel;

// 這裡是 export 一個 function
module.exports = (passport) => {
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt"); // 從Header的Auth送jwt
  opts.secretOrKey = process.env.PASSPORT_SECRET;
  passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
      User.findOne({ _id: jwt_payload._id }, (err, user) => {
        if (err) return done(err, false);
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      });
    })
  );
};
