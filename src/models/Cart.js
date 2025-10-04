import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{ productId: String, qty: Number }],
  checkedOut: { type: Boolean, default: false },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Cart', CartSchema);
