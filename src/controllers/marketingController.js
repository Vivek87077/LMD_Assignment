import Campaign from '../models/Campaign.js';
import AudienceService from '../services/AudienceService.js';
import BrevoService from '../services/BrevoService.js';
import CampaignAnalyticsService from '../services/CampaignAnalyticsService.js';

export const createCampaign = async (req, res) => {
  try {
    const { name, subject, htmlBody, targetAudience, audienceParams, schedule } = req.body;
    const campaign = new Campaign({
      name,
      subject,
      htmlBody,
      targetAudience,
      audienceParams,
      schedule,
      createdBy: req.user?.id // assuming auth middleware sets req.user
    });
    await campaign.save();
    res.status(201).json({ success: true, campaign });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCampaigns = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const campaigns = await Campaign.find()
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    const total = await Campaign.countDocuments();
    res.json({ success: true, campaigns, total, page: parseInt(page), pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCampaignById = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) return res.status(404).json({ success: false, message: 'Campaign not found' });
    const stats = await CampaignAnalyticsService.getCampaignStats(req.params.id);
    res.json({ success: true, campaign: { ...campaign.toObject(), stats } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!campaign) return res.status(404).json({ success: false, message: 'Campaign not found' });
    res.json({ success: true, campaign });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findByIdAndDelete(req.params.id);
    if (!campaign) return res.status(404).json({ success: false, message: 'Campaign not found' });
    res.json({ success: true, message: 'Campaign deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const sendCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) return res.status(404).json({ success: false, message: 'Campaign not found' });
    const audience = await AudienceService.getAudience(campaign.targetAudience);
    const result = await BrevoService.sendBulkEmails(campaign, audience);
    campaign.status = 'SENT';
    campaign.sentAt = new Date();
    campaign.stats.sent = audience.length;
    await campaign.save();
    res.json({ success: true, result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAudiences = async (req, res) => {
  try {
    const segments = await AudienceService.getAllSegments();
    res.json({ success: true, segments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
