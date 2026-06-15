import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export const env = {
  port: parseInt(process.env.PORT || "5000", 10),
  nodeEnv: process.env.NODE_ENV || "development",
  databaseUrl: process.env.DATABASE_URL,
  jwt: {
    secret: process.env.JWT_SECRET || "fallback_jwt_secret_key",
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  },
  security: {
    desktopAppSecret:
      process.env.DESKTOP_APP_SECRET || "fallback_desktop_secret",
    internalApiHash:
      process.env.INTERNAL_API_HASH || "default-internal-secure-path",
  },
};
