import rateLimit from 'express-rate-limit';

export const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 100,
  message:
    'Too many requests created from this IP, please try again after an hour',
  statusCode: 429,
});
