import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{ productId: String, qty: Number, price: Number }],
  total: Number,
  status: { type: String, default: 'completed' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Order', OrderSchema);
