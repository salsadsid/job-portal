const express = require("express");
const app = express();
const cors = require("cors");
const jobRoute = require('./routes/job.route');
const companyRoute = require('./routes/company.route');
const hiringManagerRoute = require('./routes/hiringManager.route');

app.use(express.json());
app.use(cors());
app.use("/api/v1/jobs", jobRoute)
app.use("/api/v1/company", companyRoute)
app.use("/api/v1/manager", hiringManagerRoute)


app.get("/", (req, res) => {
    res.send("Route is working! YaY!");
});


module.exports = app;
