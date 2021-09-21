const admins = require("../models/admin");
const otpController = require("./otpController");
const { sendResponse, sendError } = require("./common");

async function requestOTP(phoneNumber) {
    return new Promise((resolve, reject) => {
        let userDoc, phone;
        admins.find({ phoneNumber: phoneNumber })
            .then(doc => {
                //console.log(doc.length);

                if (doc.length === 0) {
                    reject(sendError("No such admin found!"));
                } else {
                    userDoc = doc;
                    if (doc.OTP) {
                        //OTP already set.
                        if (doc.OTP.resendsLeft <= 0) {
                            const timeDiff = (Date.now() - doc.OTP.otpSetTime) / (60 * 1000);
                            if (timeDiff > process.env.OTP_PUNISHMENT_INTERVAL) {
                                return otpController.newOTP(doc);
                            } else
                                return resolve(sendError("Exceeded Max resends, try again after some time"));
                        }
                        return otpController.resendOTP(doc.OTP);
                    } else {
                        //OTP not already set.
                        otpController.newOTP(doc);
                    }
                }
            })
            .then(() => {
                return userDoc.save();
            })
            .then(() => {
                sms.sendOTP(phoneNumber, userDoc.OTP.currentOTP);
                resolve(sendResponse(`New OTP set`));
            })
            .catch(error => {
                if (error.status == "failure") {
                    return sendError(error);
                } else
                    return sendError(error);
            })
    })
}

async function verifyOTP(phoneNumber, otpSent) {
    return new Promise((resolve, reject) => {

        let userDoc;
        admins.findOne({ phoneNumber: phoneNumber })
            .then((doc) => {
                if (!doc)
                    return resolve(sendError(`Admin with phone ${phone} not found!, please register!`));
                else {
                    userDoc = doc;
                    otpController.verifyOTP(userDoc, type, OTP)
                        .then(token => {
                            resolve(sendResponse(token));
                        })
                        .catch(errorMessage => {
                            console.log(errorMessage);
                            resolve(sendError(errorMessage));
                        })
                }
                return doc.save();
            })
            .catch(error => {
                console.log(error);
                resolve(sendError("Internal Server Error"));
            })
    })
}

module.exports = {
    requestOTP,
    verifyOTP
}