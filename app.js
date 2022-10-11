const express = require("express");
const app = express();
const cors = require("cors");
const jobRoute = require('./routes/job.route');

app.use(express.json());
app.use(cors());
app.use("/api/v1/jobs", jobRoute)


app.get("/", (req, res) => {
    res.send("Route is working! YaY!");
});


module.exports = app;
