const { Schema, model } = require("mongoose");

const authorSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
      trim: true,
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
    },
    full_name : String,
    nick_name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,,
        "Please enter the correct email address!",
      ],
    },
    phone: {
      type: String,
      unique: true,
      validate: {
        validator: function (value) {
            return /^\d{2}-\d{3}-\d{2}-\d{2}$/.test(value);
        },
        message: (props) => `${props.value}-Enter the correct phone number!`,
      },
    },
    password: {
      type: String,
      required: true,
      minlength: [6,'The password is ...too short'],
    },
    info: {
      type: String,
      maxlength: 2000,
    },
    position: {
      type: String,
      trim: true,
    },
    photo: {
      type: String,
      default: "photo.png",
    },
    is_expert: {
      type: Boolean,
      default: false,
    },
    is_active: {
      type: Boolean,
      default: true,
    }
  },
  {
    versionKey: false,
  }
);

module.exports = model("Author", authorSchema);
