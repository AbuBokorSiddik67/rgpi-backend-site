import rateLimit from "express-rate-limit";

// Rate Limiter Accept 
export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 15,
  message: {
    success: false,
    statusCode: 429,
    message:
      "Too many requests from this IP, please try again after 15 minutes.",
  },
  standardHeaders: true, // রেসপন্স হেডার্সে `RateLimit-*` ইনফো দেখাবে
  legacyHeaders: false, // পুরোনো `X-RateLimit-*` হেডার্স বন্ধ রাখবে
});
