const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose")

const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const snipRouter = require("./routes/snip.js");
const userRouter = require("./routes/user.js");

app.get("/", (req, res) => {
    res.send("hello world");
});

app.use("/snip", snipRouter);
app.use("/auth", userRouter);

mongoose.connect("mongodb://127.0.0.1:27017" + "/snipDB")
    .then(() => console.log('Connected Successfully'));

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});