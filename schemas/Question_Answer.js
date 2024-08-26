const { Schema, model } = require("mongoose");

const QaSchema = new Schema(
  {
    question: {
        type: String,
        required: true,
        trim: true
    },
    answer: {
        type: String,
        required: true,
        trim: true
    },
    created_date: {
        type: Date,
        default: Date.now,
    },
    updated_date: {
        type: Date,
        default: Date.now,
    },
    is_checked: {
        type: String,
        required: true,
        default: false
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: null
    },
    expert_id : {
        type: Schema.Types.ObjectId,
        ref: "Author",
        default: null
    }
  },
  {
    versionKey: false,
  }
);

module.exports = model("Question_Answer", QaSchema);
