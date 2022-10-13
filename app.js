const express = require("express");
const app = express();
const cors = require("cors");
const jobRoute = require('./routes/job.route');
const companyRoute = require('./routes/company.route');
const hiringManagerRoute = require('./routes/hiringManager.route');
const userRoute = require('./routes/user.route');
const candidateRoute = require('./routes/candidate.route');
const applyRoute = require('./routes/apply.route');

app.use(express.json());
app.use(cors());
app.use("/api/v1/jobs", jobRoute)
app.use("/api/v1/company", companyRoute)
app.use("/api/v1/manager", hiringManagerRoute)
app.use("/api/v1/user", userRoute)
app.use("/api/v1/candidate", candidateRoute)
app.use("/api/v1/apply", applyRoute)


app.get("/", (req, res) => {
    res.send("Route is working! YaY!");
});


module.exports = app;
