const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const {
  createVehicle,
  getAllVehicles,
  searchVehicles,
  updateVehicle
} = require('../controllers/vehicleController');

router.post('/', authenticate, createVehicle);
router.get('/search', authenticate, searchVehicles);
router.get('/', authenticate, getAllVehicles);
router.put('/:id', authenticate, updateVehicle);

module.exports = router;