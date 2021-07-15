const express = require('express');
const router = express.Router();
const imageController = require('../../controllers/imageController');
const requestsController = require('../../controllers/requestsController');
const { sendError, sendResponse } = require('../../controllers/common');
const verifyToken = require('../common/tokenAuth');

router.use(verifyToken);


router.post('/new', imageController.upload.any('images'), (req, res) => {
    requestsController.pdRequest(req.body,req.files,req.user)
    .then(response=>{
        res.json(response);
    })
    .catch(error=>{
        console.log(error);
		res.json(sendError("Internal Server Error"));
    })
    
})


module.exports = router;
