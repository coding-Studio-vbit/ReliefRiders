const express = require("express");
const router = express.Router();
const riderController = require("../controllers/riderController");
const { sendError, sendResponse } = require("../controllers/common");

router.post("/riderByName", async(req, res) => {
    const response = await riderController.riderByName(req.body.name)
        //send data back

    res.json(response);
})

router.post("/assignRider", async(req, res) => {
    const response = await riderController.assignRider(req.body.phoneNumber, req.body.requestNumber)
        //send data back

    res.json(response);
})

module.exports = router;