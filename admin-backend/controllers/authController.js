const admins = require("../models/admin");
const otpController = require("./otpController");
const { sendResponse, sendError } = require("./common");
const { sendOTP } = require("./sms");

//operation == 1 LOGIN
//operation == 2 REGISTER
async function requestOTP(phoneNumber,operation) {
    
    try {
        let admin = await admins.findOne({phoneNumber:phoneNumber});
        if(admin && operation === 2) return sendError("Admin already exists")
        if(operation === 2) return requestOTPUnverified(phoneNumber)
        if(!admin){
            return sendError("No admin found")
        }
        
        if (admin.OTP) {
            //OTP already set.
            if (admin.OTP.resendsLeft <= 0) {
                const timeDiff = (Date.now() - admin.OTP.otpSetTime) / (60 * 1000);
                if (timeDiff > process.env.OTP_PUNISHMENT_INTERVAL) {
                    await otpController.newOTP(admin);
                } else
                    return sendError("Exceeded Max resends, try again after some time")
            }
            await otpController.resendOTP(admin.OTP);
        } else {
            //OTP not already set.
            
            await otpController.newOTP(admin);
        }
        await admin.save()
        
        await sendOTP(phoneNumber,admin.OTP.currentOTP)
        return sendResponse('OTP sent')

    } catch (error) {

        sendError("Internal error occured")
        
    }
    
}

async function requestOTPUnverified(number){
    const admin = new admins({
        name:'UNVERIFIED',
        phoneNumber:number
    })
    await otpController.newOTP(admin)
    await admin.save()
    await sendOTP(number,admin.OTP.currentOTP)
    return sendResponse('OTP sent')

    
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
                    console.log(userDoc.OTP);
                    otpController.verifyOTP(userDoc, otpSent)
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