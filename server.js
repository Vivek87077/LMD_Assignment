import 'dotenv/config';
import mongoose from 'mongoose';
import app from './src/app.js';
import scheduler from './src/services/scheduler.js';

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    // MongoDB connect
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/email-marketing-module';
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');

    // Server start
    app.listen(PORT, () => console.log(`🚀 Server listening on port ${PORT}`));

    // Start scheduler after DB connection
    scheduler.start();
  } catch (err) {
    console.error('❌ Failed to start app', err);
    process.exit(1);
  }
}

start();
