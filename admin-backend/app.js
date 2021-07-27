require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 8002;
const cors = require("cors");

//express middleware usage.
app.use(express.json());
app.use(cors());
var path = require("path");
//mongoose connection.
mongoose.set("useFindAndModify", false);
mongoose.connect(
  `mongodb+srv://admin:${process.env.MONGO_PASSWORD}@cluster0.xgkw0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);
app.use(
  express.static(path.join(__dirname + "/" + process.env.IMAGE_DIR_PATH))
);

mongoose.connection
  .once("open", function () {
    console.log("You are connected to the database");
  })
  .on("error", function (error) {
    console.log("error :", error);
  });

app.get("/", (req, res) => {
  res.send("Hey I am alive!");
});

app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});
