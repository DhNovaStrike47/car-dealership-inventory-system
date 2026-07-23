const mongoose = require('mongoose');
require('dotenv').config();

beforeAll(async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  // One-time cleanup: remove any leftover test users from before
  // this cleanup logic existed.
  const User = mongoose.models.User || require('../models/User');
  await User.deleteMany({
    username: { $in: ['testuser', 'onlyusername', 'loginuser'] }
  });
});

afterEach(async () => {
  const User = mongoose.models.User;
  if (User) {
    await User.deleteMany({
      username: { $in: ['testuser', 'onlyusername', 'loginuser'] }
    });
  }
});

afterAll(async () => {
  await mongoose.connection.close();
});