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

router.get("/getDeliveries", async(req, res) => {
    const response = await riderController.getDeliveries()
        //send data back

    res.json(response);
})

router.get("/searchByRequestNumber", async(req, res) => {
    const response = await riderController.searchByRequestNumber(req.body.requestNumber)
        //send data back

    res.json(response);
})

router.get("/searchByName", async(req, res) => {
    const response = await riderController.searchByName(req.body.name)
        //send data back

    res.json(response);
})

router.get("/getDeliveriesByRequestStatus", async(req, res) => {
    const response = await riderController.getDeliveriesByRequestStatus()
        //send data back

    res.json(response);
})


router.get("/getDeliveriesByRequestNumber", async(req, res) => {
    searchByRequestNumber,
    const response = await riderController.searchByRequestNumber(req.body.requestNumber)
        //send data back

    res.json(response);
})

module.exports = router;
