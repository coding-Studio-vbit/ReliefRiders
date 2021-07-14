require("dotenv").config();
const express = require('express');
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 8000;
const cors = require('cors')
var path = require('path');

//express middleware usage.
app.use(express.json());
app.use(cors())
app.use(
	express.static(path.join(__dirname + '/' +  process.env.IMAGE_DIR_PATH)));

//mongoose connection.
mongoose.set('useFindAndModify', false);
mongoose.connect(`mongodb+srv://admin:${process.env.MONGO_PASSWORD}@cluster0.xgkw0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.once('open',function(){
	console.log('You are connected to the database');
}).on('error', function(error){
	console.log('error :', error);
})


//Import routers here.
const authRouter = require("./routes/authentication/authRouter");
const requesterRouter = require("./routes/requester/requesterRouter");
const riderRouter = require("./routes/rider/riderRouter");
const requestsRouter = require("./routes/requests/requestsRouter");

app.get("/", (req, res)=>{
	res.send("Hey I am alive!");
});


//Use routers here.

app.use("/auth", authRouter);
app.use("/requester", requesterRouter);
app.use("/rider", riderRouter);
app.use("/requests",requestsRouter);
//This call starts the periodic cleanup of the TEMP_OTP.json file, which is handled by the clearAllExpiredOTPs.js script.

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
  //Expired OTPs are cleared periodically at an interval defined in the .env file as OTP_FILE_CLEAR_INTERVAL
})
