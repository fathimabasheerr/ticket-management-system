const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const genericRoutes = require("./routes/genericRoutes");
const destinationRoutes = require("./routes/destinationRoutes");
const parkingRoutes = require("./routes/parkingRoutes");
const eventRoutes = require("./routes/eventRoutes");
const { checkUser } = require("./middleware/authMiddleware");


const app = express();

const PORT = 3000;

mongoose.connect(process.env.DBURI,{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then((result) => {
  app.listen(PORT,() => {
    console.log(`listening on http://localhost:${PORT}`);
  });
})
  .catch((err) => {
    console.log(err);
  });

//set up CORS headers

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

  
    //setting up view engine
app.set("view engine", "ejs");

//using static middleware to acces static files
app.use(express.static("public"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("*",checkUser);
app.use(genericRoutes,authRoutes,destinationRoutes,parkingRoutes,eventRoutes);




