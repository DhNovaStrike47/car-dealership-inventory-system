const mongoose = require('mongoose');
require('dotenv').config();

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase(); // optional: clean slate
  await mongoose.connection.close();
});