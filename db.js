const mongoose = require("mongoose");
require("dotenv").config();

const conection = mongoose.connect(process.env.url);

module.exports = conection;
