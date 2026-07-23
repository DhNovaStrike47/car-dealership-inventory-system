const Vehicle = require('../models/Vehicle');

exports.createVehicle = async (req, res) => {
  try {
    const { make, model, category, price, quantity } = req.body;

    if (!make || !model || !category || price === undefined || quantity === undefined) {
      return res.status(400).json({ error: 'make, model, category, price, and quantity are required' });
    }

    const vehicle = await Vehicle.create({ make, model, category, price, quantity });
    res.status(201).json(vehicle);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.status(200).json(vehicles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};