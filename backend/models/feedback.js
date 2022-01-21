const mongoose = require("mongoose");

const feedback = new mongoose.Schema({

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


const Feedback = mongoose.model("feedbacks", feedback);

module.exports = Feedback;
