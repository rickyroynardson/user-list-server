require('dotenv').config();
const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const logger = require('./utils/logger');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
mongoose.set('strictQuery', false);

routes(app);

const port = process.env.EXPRESS_PORT || 3000;
const main = async () => {
  await mongoose.connect(process.env.MONGODB_URL);
  await app.listen(port, () => {
    logger.info(`Server is connected to MongoDB & listening on port ${port}..`);
  });
};

main();
