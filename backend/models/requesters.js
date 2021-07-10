const mongoose = require("mongoose");
const OTPSchema = require("./otpSchema");

const user = new mongoose.Schema({

  phoneNumber: {
    type: Number,
    required: [true, "Phone Number is required"],
    min: 1000000000,
    max: 9999999999,
    validate: {
      validator: (phone) => {
        var patt = /^[6789]\d{9}$/; return patt.test(phone)
      }
    }
  },
  lastRequestTime: { type: Number, default: Date.now() },
  name: {
    type: String,
    required: [true, "Name is required"],
    minLength: 3,
    maxLength: [40, "Exceeded Characters"]
  },
  yearOfBirth: {
    type: Number,
    required: true,
    minLength: 4,
    maxLength: 4,
    validate: {
      validator: (yearOfBirth) => {
        var date = new Date();
        var year = date.getFullYear();
        return (year >= year - 100 && year <= year + 15)
      }
    }
  },
  defaultAddress: {
    address: {
      type: String
    },
    city: {
      type: String
    },
    area: {
      type: String
    }
  },
  location: {
    type: { type: String, default: "Point" },
    coordinates: [Number]
  },
  OTP: OTPSchema
});


const requesters = mongoose.model("requesters", user);

module.exports = requesters;
