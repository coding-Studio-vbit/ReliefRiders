const admins = require("../models/admin");
const otpController = require("./otpController.js");
const sms = require("./sms.js");
const { sendError, sendResponse } = require("../controllers/common");

async function createAdmin(phoneNumber, name,otp) {
    try {
        
        const admin = await admins.findOne({ phoneNumber: phoneNumber })
        if(admin.OTP.currentOTP === otp){
            admin.name = name
            await admin.save()
            return sendResponse("Admin created")
        }else{

            return sendError("Incorrect OTP")
        }
        
        
    } catch (error) {
        console.log(error)
        return sendError('Internal Server Error')
    }
}

async function deleteAdmin(phoneNumber) {
    console.log(phoneNumber);
    try {
        const admin = await admins.findOne({ phoneNumber: phoneNumber })
        if (!admin) {
            return sendError("Admin not found")
        }
        admin.deleteOne()
        return sendResponse("Admin Deleted")
    } catch (error) {
        return sendError('Internal Server Error')
    }
}

async function fetchAdmins() {
    try {
        const admin = await admins.find()
        console.log(admin);
        return sendResponse(admin)
    } catch (error) {
        return sendError('Internal Server Error')
    }
}

module.exports = {
    createAdmin,
    deleteAdmin,
    fetchAdmins
}