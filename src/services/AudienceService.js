import User from '../models/User.js';
import Order from '../models/Order.js';
import Cart from '../models/Cart.js';

const AudienceService = {
  async getAudience(segment) {
    switch (segment) {
      case 'ALL':
        return await User.find({}, 'email');

      case 'RECENT_BUYERS': {
        const recentOrders = await Order.find({
          createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
        });
        const buyerIds = [...new Set(recentOrders.map((o) => o.userId.toString()))];
        return await User.find({ _id: { $in: buyerIds } }, 'email');
      }

      case 'ABANDONED_CARTS': {
        const carts = await Cart.find({ status: 'abandoned' });
        const userIds = [...new Set(carts.map((c) => c.userId.toString()))];
        return await User.find({ _id: { $in: userIds } }, 'email');
      }

      default:
        return [];
    }
  },

  async getAllSegments() {
    return ['ALL', 'RECENT_BUYERS', 'ABANDONED_CARTS'];
  },
};

export default AudienceService;
