
const express = require("express");
const { saveFeedback } = require("../../controllers/feedbackController");
const tokenAuth = require("../common/tokenAuth");
const router = express.Router();
router.use(tokenAuth)
router.post("/", saveFeedback)

module.exports = router;
