const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const authRouter = require("./routes/authRoute");
const UserModel = require('./models/user');

const SERVICE_NAME = 'blw-dataroom-backend';
const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.DB_CONNECTION_STRING;

const startApp = async () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(helmet());
  app.use((req, res, next) => {
    next();
  });

  app.use("/api/v1/auth", authRouter);

  await mongoose.connect(MONGOURL)
                .then(() => {
                  console.log('Connected to the database');
                  app.listen(PORT, () => {
                    console.log(`Server running on port ${PORT}`);
                  });
                })

};

startApp().catch((error) => {
  console.error(error);
});