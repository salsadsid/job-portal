const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const colors = require("colors");

const app = require("./app");

// database connection
// mongoose.connect(process.env.DATABASE_LOCAL).then(() => {
//     console.log("Database in Connected".red.bold)
// })
mongoose.connect("mongodb+srv://dbuser1:yhHR4E8ZXY05LYMB@cluster0.fr7f4kz.mongodb.net/job-portal?retryWrites=true&w=majority", {

    useNewUrlParser: "true",
    useUnifiedTopology: "true"

})
mongoose.connection.on("error", err => {

    console.log("err", err)

})
mongoose.connection.on("connected", (err, res) => {

    console.log("mongoose is connected")

})

// server
const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`App is running on port ${port}`.yellow.bold);
});

