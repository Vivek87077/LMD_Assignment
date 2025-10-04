import mongoose from 'mongoose';

const CampaignSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subject: { type: String, required: true },
  htmlBody: { type: String, required: true },
  targetAudience: {
    type: String,
    enum: ['ALL', 'RECENT_BUYERS', 'ABANDONED_CARTS', 'CUSTOM'],
    default: 'ALL'
  },
  // optional extra params for custom audiences
  audienceParams: { type: mongoose.Schema.Types.Mixed },

  schedule: { type: Date },
  status: { type: String, enum: ['DRAFT', 'SCHEDULED', 'SENDING', 'SENT', 'CANCELED'], default: 'DRAFT' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  recipientsCount: { type: Number, default: 0 },
  stats: {
    sent: { type: Number, default: 0 },
    opens: { type: Number, default: 0 },
    clicks: { type: Number, default: 0 },
    bounces: { type: Number, default: 0 },
    unsubscribes: { type: Number, default: 0 }
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

CampaignSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('Campaign', CampaignSchema);
