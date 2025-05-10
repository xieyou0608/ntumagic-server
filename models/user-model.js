const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 100,
  },
  password: {
    type: String,
    required: false,
    minlength: 6,
    maxlength: 1024,
  },
  phone: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    enum: ["audience", "admin"],
    default: "audience",
  },
  isStudent: {
    type: Boolean,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  bankAccount: {
    type: String,
    default: "",
  },
  tickets: {
    type: [
      {
        _id: mongoose.Schema.Types.ObjectId,
        area: String,
        row: Number,
        col: Number,
        paid: Boolean,
        bookDate: Date,
      },
    ],
    default: [],
  },
  emailSent: {
    type: Boolean,
    default: false,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  verifyToken: {
    type: String,
  },
});

userSchema.methods.isAudience = function () {
  return this.role == "audience";
};
userSchema.methods.isAdmin = function () {
  return this.role == "admin";
};


// hash
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (err) {
    next(err);
  }
});

//validate password
userSchema.methods.comparePassword = function (password, callback) {
  bcrypt.compare(password, this.password, (err, result) => {
    if (err) {
      return callback(err, result);
    }
    callback(null, result);
  });
};


module.exports = mongoose.model("User", userSchema);
