import pino from "pino";

const isProduction = process.env.NODE_ENV === "production";

const logger = pino({
  level: isProduction ? "info" : "debug",

  // 💡 এখানে কন্ডিশন দিয়ে দিলাম: প্রোডাকশন হলে transport হবে undefined, নাহলে pino-pretty চলবে
  transport: !isProduction
    ? {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "SYS:standard",
          ignore: "pid,hostname",
        },
      }
    : undefined,
});

export default logger;
