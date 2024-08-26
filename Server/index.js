const express = require("express");
const cors = require("cors");
require("dotenv").config();

const startApp = async () => {
  const db = require("./db/mongo/MongoDB")
  const app = express();
  const { startServerWithDbConnection } = require("./configs/db");
  app.use(cors());
  app.use(express.json());

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
}