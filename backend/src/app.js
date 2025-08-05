const express = require('express');
const app = express();

app.use(express.json());

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Tredia Investing backend is running.' });
});

module.exports = app; 