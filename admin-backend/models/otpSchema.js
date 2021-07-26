const mongoose = require("mongoose");

module.exports = new mongoose.Schema({
	currentOTP: {type: String, required: true},
	otpSetTime: {type: String, required: true},
	resendsLeft:{type: Number, required: true},
	guessesLeft:{type:Number, required: true}
})
