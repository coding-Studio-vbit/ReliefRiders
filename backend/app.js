require("dotenv").config();
const express = require('express');
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 8000;
const cors = require('cors')
const clearExpiredOTP = require("./clearExpiredOTPs")
app.use(cors())

//express middleware usage.
app.use(express.json());


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
const requesterProfileRouter = require("./routes/requester/requesterProfile");
const riderProfileRouter = require("./routes/rider/riderProfile");

app.get("/", (req, res)=>{
	res.send("Hey I am alive!");
});


//Use routers here.

app.use("/auth", authRouter);
app.use("/profilePageRequester", requesterProfileRouter);
app.use("/profilePageRider", riderProfileRouter);

clearExpiredOTP();

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
  //Expired OTPs are cleared periodically at an interval defined in the .env file as OTP_FILE_CLEAR_INTERVAL
})
