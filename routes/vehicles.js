const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');

router.get('/', authenticate, (req, res) => {
  res.status(200).json([]); // placeholder — real vehicle list comes in Phase 4
});

module.exports = router;