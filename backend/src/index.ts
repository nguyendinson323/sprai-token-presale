import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { config } from './config';
import sequelize from './database/config';
import transactionRoutes from './routes/transactionRoutes';

// ============================================
// BACKEND SERVER - EXPRESS + POSTGRESQL
// ============================================

const app = express();

// Rate limiting
const limiter = rateLimit({
  windowMs: config.rateLimitWindowMs,
  max: config.rateLimitMaxRequests,
  message: 'Too many requests from this IP, please try again later',
});

// Middleware
app.use(helmet());
app.use(cors({ origin: config.corsOrigin }));
app.use(express.json());
app.use(limiter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/transactions', transactionRoutes);

// Database connection
async function startServer() {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log('✅ Database connected successfully');

    // Sync models (in development)
    if (config.nodeEnv === 'development') {
      await sequelize.sync({ alter: true });
      console.log('✅ Database models synced');
    }

    // Start server
    app.listen(config.backendPort, () => {
      console.log(`🚀 Backend running on http://${config.backendHost}:${config.backendPort}`);
      console.log(`📋 Environment: ${config.nodeEnv}`);
      console.log(`🔗 CORS Origin: ${config.corsOrigin}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
