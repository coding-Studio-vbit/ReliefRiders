const admins = require("../models/admin");
const { sendError, sendResponse } = require("../controllers/common");

async function createAdmin(phoneNumber, name) {
    try {
        const admin = await admins.findOne({ phoneNumber: phoneNumber })
        if (admin) {
            return sendError("Admin already exists")
        }
        const newAdmin = new admins({
            phoneNumber: phoneNumber,
            name: name
        });
        await newAdmin.save();
        return sendResponse("Admin Created")
    } catch (error) {
        console.log(error)
        return sendError('Internal Server Error')
    }
}

async function deleteAdmin(phoneNumber) {
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

module.exports = {
    createAdmin,
    deleteAdmin
}