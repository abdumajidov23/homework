const express = require("express");

const mongoose = require("mongoose");

const config = require("config");

const PORT = config.get("port");

const app = express();

app.use(express.json());

app.use("/api", require("./routes/index.routes"));

async function start() {
  try {
    await mongoose.connect(config.get("dbUri"));

    app.listen(PORT, () => console.log(`Server started at: ${PORT}`));
  } catch (error) {
    console.log(error);
  }
}

start();
