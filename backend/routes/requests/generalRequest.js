const express = require('express');
const router = express.Router();
const imageController = require('../../controllers/imageController');
const requestsController = require('../../controllers/requestsController');
const verifyToken = require('../common/tokenAuth');
const { sendError, sendResponse } = require('../../controllers/common');


router.use(verifyToken);


router.post('/new', imageController.upload.any('images'), (req, res) => {
    requestsController.generalRequest(req.body,req.files,req.user)
    .then(response=>{
        res.json(response);
    })
    .catch(error=>{
        console.log(error);
		res.json(sendError("Internal Server Error"));
    })   
})
// --------------------------
module.exports = router;
