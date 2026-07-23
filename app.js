const express = require('express');
const app = express();

app.use(express.json());

// Routes will be mounted here as we build them (Phase 1 onward)

module.exports = app;