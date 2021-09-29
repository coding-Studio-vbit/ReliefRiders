const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const adminController = require("../controllers/adminController")
const { sendError, sendResponse } = require("../controllers/common");
const verify_token = require("./verify_token/verify_token");


router.post("/requestOTP", (req, res) => {
    console.log(req.body);
    authController.requestOTP(req.body.phoneNumber,req.body.operation)
        .then(response => {
            res.json(response);
        })
        .catch(error => {
            console.log(error);
            res.json(error);
        })
});

router.post("/verifyOTP", (req, res) => {
    authController.verifyOTP(req.body.phoneNumber, req.body.OTP)
        .then(response => {
            res.json(response);
        })
        .catch(error => {
            console.log(error);
            res.json(sendError("Internal Server Response"));
        })
});

router.post("/createAdmin", async(req, res) => {
    console.log(req.body);
    const response = await adminController.createAdmin(req.body.phoneNumber, req.body.name,req.body.OTP)
    console.log(response);
    res.json(response);
})

router.post("/deleteAdmin", async(req, res) => {

    const response = await adminController.deleteAdmin(req.body.phoneNumber)
        //send data back
    res.json(response);
})
router.get("/fetchAdmins", async(req, res) => {

    const response = await adminController.fetchAdmins()
        //send data back
    res.json(response);
})
module.exports = router;