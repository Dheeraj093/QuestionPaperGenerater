const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Question is required"],
    },
    subject: {
      type: String,
      required: [true, "Question Subject is required"],
    },
    topic: {
      type: String,
      required: [true, "Question Topic is required"],
    },
    difficulty: {
      type: String,
      required: [true, "Difficulty is required"],
    },
    marks: {
      type: Number,
      require : [true, "Question marks is required"]
    },
    
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Question", questionSchema);