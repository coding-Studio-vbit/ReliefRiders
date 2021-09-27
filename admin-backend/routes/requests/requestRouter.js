const express = require("express");
const router = express.Router();
const generalRequestRouter = require("./general");
const pdRequestRouter = require("./pd");

router.use("/general", generalRequestRouter);
router.use("/pd", pdRequestRouter);

module.exports = router;
