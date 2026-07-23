const User = require('../models/User');
const { hashPassword } = require('../utils/hashPassword');
const { generateToken } = require('../utils/generateToken');

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const hashedPassword = await hashPassword(password);
    const user = await User.create({ username, password: hashedPassword });
    const token = generateToken(user);

    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};