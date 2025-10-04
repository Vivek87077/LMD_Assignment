export default function auth(req, res, next) {
  // Placeholder authentication middleware
  // In real app, verify JWT or session here
  // For now, mock user
  req.user = { id: 'mockUserId', role: 'admin' };
  next();
}
