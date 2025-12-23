import rateLimit from 'express-rate-limit';
import { config } from '../config';

// ============================================
// RATE LIMITING MIDDLEWARE
// PREVENTS API ABUSE
// ============================================

const limiter = rateLimit({
  windowMs: config.rateLimitWindowMs,
  max: config.rateLimitMaxRequests,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export default limiter;
