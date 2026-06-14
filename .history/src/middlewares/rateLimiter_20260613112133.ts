import rateLimit from "express-rate-limit";

// অথেন্টিকেশন রাউটের জন্য কড়া সিকিউরিটি (যেমন: ১৫ মিনিটে সর্বোচ্চ ৫ বা ১০ বার রিকোয়েস্ট দেওয়া যাবে)
export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // ১৫ মিনিট
  max: 10, // ১৫ মিনিটে একটি নির্দিষ্ট IP থেকে সর্বোচ্চ ১০ বার রিকোয়েস্ট পাঠানো যাবে
  message: {
    success: false,
    statusCode: 429,
    message:
      "Too many requests from this IP, please try again after 15 minutes.",
  },
  standardHeaders: true, // রেসপন্স হেডার্সে `RateLimit-*` ইনফো দেখাবে
  legacyHeaders: false, // পুরোনো `X-RateLimit-*` হেডার্স বন্ধ রাখবে
});
