require("dotenv").config();
const express = require('express');
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 8000;

//express middleware usage.
app.use(express.json());


//mongoose connection.

mongoose.connect(`mongodb+srv://admin:${process.env.MONGO_PASSWORD}@cluster0.xgkw0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true});

//Import routers here.
const authRouter = require("./routes/authentication/authRouter");


app.get("/", (req, res)=>{
	res.send("Hey I am alive!");
});


//Use routers here.

app.use("/auth", authRouter);



app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
