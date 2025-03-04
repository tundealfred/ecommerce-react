"use strict";

const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8080;
require("dotenv").config();

//const bodyParser = require("body-parser");
//const connectDB = require("./config/dbConfig");
//const formRoutes = require("./routes/formRoutes");

// this settting says that everyone is allowed to speak to our server
//app.use(cors());
//app.use(bodyParser.json());

// Routes
//app.use("/api", formRoutes);

// Database Connection
//connectDB();

// this is a route.
app.get("/", (request, response) => {
  response.send("hello from the home route, Server is Running");
});

// this turns the server on to the port that you specifed in your .env file
app.listen(PORT, () => console.log(`Server is Running!. listening on ${PORT}`));
