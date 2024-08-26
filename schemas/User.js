const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    user_name: {
      type: String,
      required: true,
      trim: true,
    },
    user_email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,,
        "Please enter the correct email address!",
      ],
    },
    user_password: {
      type: String,
      required: true,
      minlength: [6,'The password is ...too short'],
    },
    user_info: {
      type: String,
      maxlength: 2000,
    },
    user_photo: {
      type: String,
      default: "photo.png",
    },
    created_date: {
        type: Date,
        default: Date.now,
    },
    updated_date: {
        type: Date,
        default: Date.now,
    },
    user_is_active: {
      type: Boolean,
      default: true,
    }
  },
  {
    versionKey: false,
  }
);

module.exports = model("User", userSchema);
