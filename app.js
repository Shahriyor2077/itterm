const config = require("config");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser')

const indexRouter = require("./routes/index.routes");

const PORT = config.get("port") || 3030;

const app = express();
app.use(cookieParser());
app.use(express.json());

app.use("/api", indexRouter);

async function start() {
  try {
    const uri = config.get("dbUri"); 
    await mongoose.connect(uri);
    app.listen(PORT, () => {
      console.log(`Server running at port http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();