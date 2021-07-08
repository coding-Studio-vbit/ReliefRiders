const mongoose = require("mongoose");
const otpSchema = require("./otpSchema");

const schema = new mongoose.Schema({
	type: String,
	phoneNumber: Number,
	OTP: otpSchema
});

module.exports = mongoose.model("registrations", schema)
