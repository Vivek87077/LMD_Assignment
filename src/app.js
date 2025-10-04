import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

// Routes
import marketingRoutes from './routes/marketing.js';
import brevoWebhook from './webhooks/brevoWebhook.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use(morgan('dev'));

// Root route (for testing deployment)
app.get("/", (req, res) => {
  res.send("🚀 Email Marketing Backend is running successfully on Render!");
});

// Routes
app.use('/marketing', marketingRoutes);
app.use('/marketing/webhooks/brevo', brevoWebhook);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('🔥 Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
  });
});

export default app;
