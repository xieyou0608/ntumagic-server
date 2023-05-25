const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema({
  area: {
    type: String,
    enum: ["A", "B", "C", "D", "S", "M", "X", "F", "T"],
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
    // required: true,
  },
  sold: {
    type: Boolean,
    default: false,
  },
  buyer: {
    type: String,
    ref: "User",
    default: null,
  },
  paid: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Seat", seatSchema);
