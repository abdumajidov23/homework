const { Schema, model } = require("mongoose");

const TagSchema = new Schema(
  {
    topic_id: {
        type: Schema.Types.ObjectId,
        ref: "Topic",
        default: null
    },
    category_id: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        default: null
    }
  },
  {
    versionKey: false,
  }
);

module.exports = model("Tag", TagSchema);
