const { Schema, model } = require("mongoose");

const topicSchema = new Schema(
  {
    author_id: {
      type: Schema.Types.ObjectId,
      ref: "Author",
    },
    topic_title: {
      type: String,
      required: true,
      trim: true,
    },
    topic_text: {
      type: String,
      required: true,
      trim: true,
    },
    created_date: {
      type: Date,
      default: Date.now,
    },
    updated_date: {
      type: Date,
    },
    is_checked: {
      type: Boolean,
      default: false,
    },
    is_approved: {
      type: Boolean,
      default: false,
    },
    expert_id: {
      type: Schema.Types.ObjectId,
      ref: "Author",
    },
  },
  {
    versionKey: false,
  }
);

module.exports = model("Topic", topicSchema);
