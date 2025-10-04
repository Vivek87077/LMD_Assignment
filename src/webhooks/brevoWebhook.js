import express from 'express';
import CampaignEvent from '../models/CampaignEvent.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { event, email, 'message-id': messageId, ts, campaign_id } = req.body;

    // Assuming the payload structure from Brevo
    const eventData = {
      campaign: campaign_id,
      email,
      eventType: event,
      payload: req.body,
      createdAt: ts ? new Date(ts * 1000) : new Date()
    };

    const campaignEvent = new CampaignEvent(eventData);
    await campaignEvent.save();

    res.status(200).send('OK');
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).send('Error');
  }
});

export default router;
