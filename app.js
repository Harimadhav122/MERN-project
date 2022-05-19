const express = require("express");
const mongoose = require("mongoose");
const mongodbUrl = "mongodb://localhost:27017";
//const mongodbUrl = "mongodb://mongo:27017/nodeapp";
const empRouter = require("./routes/employeesRoute");
const seqRouter = require("./routes/sequencesRoute");
const app = express();
app.use(express.json());
app.use("/", empRouter);
app.use("/seq", seqRouter);

mongoose.connect(mongodbUrl);
const con = mongoose.connection;

con.on("open", () => console.log("Mongodb Connected"));

//app.listen(3000, () => console.log("Server running"));

app.listen(8080, () => console.log("Server running"));

app.use((req, res) => {
    const error = new Error("Url not found");
    error.status = 404;
    res.send(error.message)
})