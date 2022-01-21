const mongoose = require("mongoose");

const Feedback = new mongoose.Schema({

  userID:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'requesters',
  },
  questionsID:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'questions',
  },
  response: [
      {
          type:Boolean
      }
  ]
});


const Feedback = mongoose.model("feedbacks", Feedback);

module.exports = Feedback;
