const express = require("express");
const router = express.Router();
const generalRequestRouter = require("./generalRequest");
const pdRequestRouter = require("./pdRequest");

router.use("/general", generalRequestRouter);
router.use("/pd", pdRequestRouter);

module.exports = router;
