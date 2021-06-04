const mongoose = require("mongoose");
const validator = require('validator');
const user = new mongoose.Schema({

  phoneNumber: {
    type: Number,
    required: [true, "Phone Number is required"],
    min: 1000000000,
    max: 9999999999,

  },
  name: {
      type: String,
      required: [true, "Name is required"],
      minLength: 3,
      maxLength: 40
  },
  lastLocation: {
    latitude : {
      type: Number,
      minimum: -90,
      maximum: 90,
      default: NULL
    },
    longitude : {
      type: Number,
      minimum: -180,
      maximum: 180,
      default: NULL
    }
  },
  currentStatus: {
    type: String,
    enum: [ "AVAILABLE", "UNAVAILABLE", "BUSY" ]
  },
  currentRequestType: {
    type: String,
    enum: ["P&D","GENERAL"]
  },
  currentRequest: {
    requestID: {
      type: mongoose.Schema.Types.ObjectId,
      default : NULL
    }
  }
});


const rider = mongoose.model("rider", user);

module.exports = rider;
