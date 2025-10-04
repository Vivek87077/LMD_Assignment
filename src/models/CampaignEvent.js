import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  campaign: { type: mongoose.Schema.Types.ObjectId, ref: 'Campaign' },
  email: { type: String },
  eventType: { type: String },
  payload: { type: mongoose.Schema.Types.Mixed },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('CampaignEvent', EventSchema);
