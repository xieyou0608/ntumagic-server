const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema({
  area: {
    type: String,
    enum: ["A", "B", "C", "D", "X"],
    required: true,
  },
  row: {
    type: Number,
    required: true,
  },
  col: {
    type: Number,
    required: true,
  },
  position: {
    type: Object,
    required: true,
  },
  //   isSeat: {
  //     type: Boolean,
  //     required: true,
  //   },
  sold: {
    type: Number, // 0:空位, 1:已劃位, 2:已付款
    default: 0,
    required: true,
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Seat", seatSchema);
