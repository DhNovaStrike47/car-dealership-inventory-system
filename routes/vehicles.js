const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const { adminOnly } = require('../middleware/adminOnly');
const {
  createVehicle,
  getAllVehicles,
  searchVehicles,
  updateVehicle,
  deleteVehicle
} = require('../controllers/vehicleController');

router.post('/', authenticate, createVehicle);
router.get('/search', authenticate, searchVehicles);
router.get('/', authenticate, getAllVehicles);
router.put('/:id', authenticate, updateVehicle);
router.delete('/:id', authenticate, adminOnly, deleteVehicle);

module.exports = router;