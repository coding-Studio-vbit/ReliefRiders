const mongoose = require("mongoose");
const validator = require('validator');
const OTPSchema = require("./otpSchema");

const user = new mongoose.Schema({

  phoneNumber: {
    type: Number,
    required: [true, "Phone Number is required"],
    min: 1000000000,
    max: 9999999999,
    validate:{
          validator: (phone)=> {
            var patt = /^[6789]\d{9}$/; return patt.test(phone)
          }
        }

  },
  name: {
      type: String,
      required: [true, "Name is required"],
      minLength: 3,
      maxLength: 40
  },
  lastLocation: {
		type: {type: String, default: "Point"},
		coordinates: [Number]
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
      type: Number,
      default : null
  },
  OTP: OTPSchema
});


const riders = mongoose.model("riders", user);

module.exports = riders;
