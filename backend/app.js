const express = require('express')
const app = express()
const port = process.env.PORT || 8000;

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
