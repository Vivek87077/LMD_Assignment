import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_BASE_URL = 'https://api.brevo.com/v3';

const brevoAxios = axios.create({
  baseURL: BREVO_BASE_URL,
  headers: {
    'api-key': BREVO_API_KEY,
    'Content-Type': 'application/json',
  },
});

const SENDER_EMAIL = process.env.SENDER_EMAIL;
const SENDER_NAME = process.env.SENDER_NAME;

const BrevoService = {
  async sendBulkEmails(campaign, recipients) {
    try {
      if (!recipients.length) {
        throw new Error('No recipients found for this campaign');
      }

      const emails = recipients.map((u) => u.email);

      const payload = {
        sender: { name: SENDER_NAME, email: SENDER_EMAIL },
        to: emails.map((email) => ({ email })),
        subject: campaign.subject,
        htmlContent: campaign.htmlBody,
      };

      const { data } = await brevoAxios.post('/smtp/email', payload);

      return { emailsSent: emails.length, messageId: data.messageId };
    } catch (error) {
      console.error('Error sending emails via Brevo:', error.response?.data || error.message);
      throw new Error('Failed to send emails');
    }
  },
};

export default BrevoService;
