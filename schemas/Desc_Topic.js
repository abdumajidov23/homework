const { Schema, model } = require("mongoose");

const descTopicSchema = new Schema(
  {
    desc_id: {
        type: Schema.Types.ObjectId,
        ref: "Description",
        default: null
    },
    topic_id: {
        type: Schema.Types.ObjectId,
        ref: "Topic",
        default: null
    }
  },
  {
    versionKey: false,
  }
);

module.exports = model("Desc_Topic", descTopicSchema);
