const { Schema, model } = require("mongoose");

const guestSchema = new Schema(
  {
    guest_ip: {
      type: String,
      required: true,
      trim: true,
    },
    guest_os: {
      type: String,
      required: true,
      trim: true,
    },
    guest_browser: {
      type: String,
      required: true,
      trim: true,
    },
    guest_device: {
      type: String,
      required: true,
      trim: true,
    },
    guest_reg_date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = model("Guest", guestSchema);
