require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const VERIFY_TOKEN = process.env.VERIFY_TOKEN; // The token you define for verification

app.use(bodyParser.json());

// Webhook verification endpoint
app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  // Verify the request came from Facebook
  if (mode && token && mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('WEBHOOK VERIFIED');
    res.status(200).send(challenge); // Send back the challenge token to verify
  } else {
    res.sendStatus(403); // Forbidden if verification fails
  }
});

// Webhook event endpoint
app.post('/webhook', (req, res) => {
  const { object, entry } = req.body;

  if (object === 'page') {
    entry.forEach((eventEntry) => {
      const webhookEvent = eventEntry.messaging[0];
      const senderId = webhookEvent.sender.id;

      // Handle referral event from QR code
      if (webhookEvent.referral && webhookEvent.referral.ref === 'qr_entry') {
        sendTextMessage(senderId, 'Welcome! Thanks for scanning the QR code.');
      } 
      
      // Handle other events (e.g., messages)
      else if (webhookEvent.message) {
        sendTextMessage(senderId, 'Hello! How can I assist you today?');
      }
    });

    // Respond to all received webhook events
    res.status(200).send('EVENT_RECEIVED');
  } else {
    res.sendStatus(404);
  }
});

function sendTextMessage(senderId, text) {
  // Logic to send a text message back to the user through the Messenger API
}

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Webhook server is running on http://localhost:${PORT}`);
});
