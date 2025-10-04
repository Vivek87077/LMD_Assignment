import CampaignEvent from '../models/CampaignEvent.js';

const CampaignAnalyticsService = {
  async getCampaignStats(campaignId) {
    const events = await CampaignEvent.find({ campaignId });

    const total = events.length;
    const openRate =
      ((events.filter((e) => e.type === 'open').length / total) * 100) || 0;
    const clickRate =
      ((events.filter((e) => e.type === 'click').length / total) * 100) || 0;
    const bounceRate =
      ((events.filter((e) => e.type === 'bounce').length / total) * 100) || 0;
    const unsubscribeRate =
      ((events.filter((e) => e.type === 'unsubscribe').length / total) * 100) ||
      0;

    return { total, openRate, clickRate, bounceRate, unsubscribeRate };
  },
};

export default CampaignAnalyticsService;
