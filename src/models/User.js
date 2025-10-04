import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String },
  role: { type: String, enum: ['customer', 'vendor', 'admin'], default: 'customer' },
  subscribed: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('User', UserSchema);
