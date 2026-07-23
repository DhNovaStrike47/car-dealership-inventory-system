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
exports.searchVehicles = async (req, res) => {
  try {
    const { make, model, category, minPrice, maxPrice } = req.query;
    const filter = {};

    if (make) filter.make = new RegExp(make, 'i');
    if (model) filter.model = new RegExp(model, 'i');
    if (category) filter.category = new RegExp(category, 'i');
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const vehicles = await Vehicle.find(filter);
    res.status(200).json(vehicles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.updateVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }

    res.status(200).json(vehicle);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};