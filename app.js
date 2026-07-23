const express = require('express');
const app = express();

app.use(express.json());

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const vehicleRoutes = require('./routes/vehicles');
app.use('/api/vehicles', vehicleRoutes);

module.exports = app;