const { Schema, model } = require("mongoose");

const descQaSchema = new Schema(
  {
    qa_id: {
        type: Schema.Types.ObjectId,
        ref: "Question_Answer",
        default: null
    },
    social_id: {
        type: Schema.Types.ObjectId,
        ref: "Description",
        default: null
    }
  },
  {
    versionKey: false,
  }
);

module.exports = model("Desc_QA", descQaSchema);
