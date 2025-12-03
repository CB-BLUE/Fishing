// server/server.js
const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const crypto = require('crypto');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PF_VALIDATE_URL = process.env.PF_VALIDATE_URL || 'https://sandbox.payfast.co.za/eng/query/validate'; // production differs
const MERCHANT_ID = process.env.PF_MERCHANT_ID || 'your_merchant_id';
const MERCHANT_KEY = process.env.PF_MERCHANT_KEY || 'your_merchant_key';

app.post('/payfast/ipn', async (req, res) => {
  const ipn = req.body;
  console.log('IPN received', ipn);

  // Build POST back string:
  // PayFast requires reconstructing the data in the original format (see PayFast docs).
  const validateResponse = await fetch(PF_VALIDATE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(ipn)
  });
  const text = await validateResponse.text();
  // PayFast returns 'VALID' or 'INVALID'
  if (text.trim() === 'VALID') {
    // TODO: update your DB: mark competitor as paid (use the custom_field or merchant_reference you supplied)
    console.log('IPN validated — mark as paid in DB.');
    res.status(200).send('OK');
  } else {
    console.warn('IPN validation failed');
    res.status(400).send('INVALID');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Webhook listening on port', PORT));
