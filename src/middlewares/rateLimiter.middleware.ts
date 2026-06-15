import rateLimit from "express-rate-limit";

// Rate limiter accept only 15 requests per 15 minutes from a single IP address
export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  message: {
    success: false,
    statusCode: 429,
    message:
      "Too many requests from this IP, please try again after 15 minutes.",
  },
  standardHeaders: "draft-8",
  legacyHeaders: false,
  ipv6Subnet: 56,
});

export const publicApiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    statusCode: 429,
    message: "Too many requests, please slow down.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});