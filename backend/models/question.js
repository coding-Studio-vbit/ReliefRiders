const mongoose = require("mongoose");

const Question = new mongoose.Schema({
  questions: [
    {
      type: String,
    },
  ],
  latest:{
      type:Boolean
  }
});

const QuestionsList = mongoose.model("questions", Question);

module.exports = QuestionsList;
