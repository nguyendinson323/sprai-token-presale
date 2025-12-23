import cors from 'cors';
import { config } from '../config';

// ============================================
// CORS MIDDLEWARE
// ALLOWS FRONTEND TO ACCESS BACKEND API
// ============================================

const corsOptions: cors.CorsOptions = {
  origin: config.corsOrigin,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400, // 24 hours
};

export default cors(corsOptions);
