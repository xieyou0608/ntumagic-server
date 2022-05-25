const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    minlength: 2,
    maxlength: 50,
  },
  email: {
    type: String,
    require: true,
    minlength: 6,
    maxlength: 100,
  },
  password: {
    type: String,
    require: true,
    minlength: 6,
    maxlength: 1024,
  },
  phone: {
    type: String,
    require: true,
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
  friends: {
    type: [{ friendName: String, friendPhone: String }],
    default: [],
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
        paid: Number,
        bookDate: Date,
      },
    ],
    default: [],
  },
});

userSchema.methods.isAudience = function () {
  return this.role == "audience";
};
userSchema.methods.isAdmin = function () {
  return this.role == "admin";
};

//mongoose schema middleware
userSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
  } else {
    return next();
  }
});

userSchema.methods.comparePassword = function (password, callback) {
  bcrypt.compare(password, this.password, (err, result) => {
    if (err) {
      return callback(err, result);
    }
    callback(null, result);
  });
};

module.exports = mongoose.model("User", userSchema);
