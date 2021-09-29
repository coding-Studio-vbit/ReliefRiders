const express = require("express");
const { searchByRequestNumber } = require("../../controllers/requestsController");
const router = express.Router();
const generalRequestRouter = require("./general");
const pdRequestRouter = require("./pd");

router.use("/general", generalRequestRouter);
router.use("/pd", pdRequestRouter);
router.post("/byRequestNumber", async(req, res) => {
    
    const response = await searchByRequestNumber(req.body.requestNumber)
        //send data back

    res.json(response);
})

module.exports = router;
