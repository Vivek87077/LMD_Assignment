import express from 'express';
import {
  createCampaign,
  getCampaigns,
  getCampaignById,
  updateCampaign,
  deleteCampaign,
  sendCampaign,
  getAudiences,
} from '../controllers/marketingController.js';

const router = express.Router();

// Create a new campaign
router.post('/campaigns', createCampaign);

// Get all campaigns with pagination
router.get('/campaigns', getCampaigns);

// Get single campaign with stats
router.get('/campaigns/:id', getCampaignById);

// Update a campaign
router.put('/campaigns/:id', updateCampaign);

// Delete a campaign
router.delete('/campaigns/:id', deleteCampaign);

// Send campaign immediately
router.post('/campaigns/:id/send', sendCampaign);

// Get audience segments
router.get('/audiences', getAudiences);

export default router;
