import cron from 'node-cron';
import Campaign from '../models/Campaign.js';
import AudienceService from '../services/AudienceService.js';
import BrevoService from '../services/BrevoService.js';

export const startCampaignScheduler = () => {
  cron.schedule('* * * * *', async () => {
    const now = new Date();
    const campaigns = await Campaign.find({
      status: 'scheduled',
      schedule: { $lte: now },
    });

    for (const campaign of campaigns) {
      const audience = await AudienceService.getAudience(campaign.targetAudience);
      await BrevoService.sendBulkEmails(campaign, audience);

      campaign.status = 'sent';
      campaign.sentAt = new Date();
      await campaign.save();

      console.log(`Scheduled campaign sent: ${campaign.name}`);
    }
  });
};
