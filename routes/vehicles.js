const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const {
  createVehicle,
  getAllVehicles,
  searchVehicles
} = require('../controllers/vehicleController');

router.post('/', authenticate, createVehicle);
router.get('/search', authenticate, searchVehicles);
router.get('/', authenticate, getAllVehicles);

module.exports = router;