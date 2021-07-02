const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./_config");
const mongoose = require("mongoose");

//* mongoose conect *//
mongoose.connect(config.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const usersRoutes = require("./routes/users.js");
const messagesRoutes = require("./routes/message.js");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/messages", messagesRoutes);
app.use("/users", usersRoutes);

app.listen(8000, () => console.log("Server has started"));

module.exports = app;
