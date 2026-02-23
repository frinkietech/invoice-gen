const express = require('express');
const path = require('path');

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve static files from project root
app.use(express.static(path.join(__dirname)));

// Mount the serverless function handler for local testing
try {
  const generateInvoice = require('./api/generate-invoice.js');
  app.post('/api/generate-invoice', (req, res) => {
    // The function expects (req, res)
    return generateInvoice(req, res);
  });
} catch (err) {
  console.error('Failed to load API handler:', err);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Dev server listening: http://localhost:${port}`));
