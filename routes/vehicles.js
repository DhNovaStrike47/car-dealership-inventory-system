const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const { createVehicle, getAllVehicles } = require('../controllers/vehicleController');

router.post('/', authenticate, createVehicle);
router.get('/', authenticate, getAllVehicles);

module.exports = router;