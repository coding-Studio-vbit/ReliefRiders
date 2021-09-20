const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const adminController = require("../controllers/adminController")
const { sendError, sendResponse } = require("../controllers/common");


router.post("/requestOTP", (req, res) => {
    authController.requestOTP(req.body.phoneNumber)
        .then(response => {
            res.json(response);
        })
        .catch(error => {
            console.log(error);
            res.json(error);
        })
});

router.post("/verifyOTP", (req, res) => {
    authController.verify(req.body.phoneNumber, req.body.OTP)
        .then(response => {
            res.json(response);
        })
        .catch(error => {
            console.log(error);
            res.json(sendError("Internal Server Response"));
        })
});

router.post("/createAdmin", async(req, res) => {
    console.log(req.body)
    const response = await adminController.createAdmin(req.body.phoneNumber, req.body.name)
        //send data back

    res.json(response);
})

router.post("/deleteAdmin", async(req, res) => {

    const response = await adminController.deleteAdmin(req.body.phoneNumber)
        //send data back
    res.json(response);
})

module.exports = router;