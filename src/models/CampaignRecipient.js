import mongoose from 'mongoose';

const RecipientSchema = new mongoose.Schema({
  campaign: { type: mongoose.Schema.Types.ObjectId, ref: 'Campaign', required: true },
  email: { type: String, required: true },
  name: { type: String },
  status: { type: String, enum: ['PENDING', 'SENT', 'BOUNCED', 'UNSUBSCRIBED'], default: 'PENDING' },
  brevoMessageId: { type: String },
  sentAt: { type: Date },
  opens: { type: Number, default: 0 },
  clicks: { type: Number, default: 0 }
});

export default mongoose.model('CampaignRecipient', RecipientSchema);
