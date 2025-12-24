import { config } from "dotenv";

config();

const appConfig = {
  appName: process.env.APP_NAME || "TodoApp",
  business_url: process.env.BUSINESS_URL || "http://localhost:3001",
  environment: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  appKey: process.env.APP_KEY || "default",
  jwt: {
    secret: process.env.JWT_SECRET || "defaultsecret",
    ttl: process.env.JWT_TTL || "10m",
    otp_ttl: process.env.OTP_TTL || "10m",
    refreshttl: process.env.JWT_REFRESH_TTL || "60m",
  },
  database: {
    dev: {
      host: process.env.DEV_DB_HOST || "localhost",
      port: process.env.DEV_DB_PORT || 3306,
      user: process.env.DEV_DB_USER || "scott",
      password: process.env.DEV_DB_PASSWORD || "Password@123",
      name: process.env.DEV_DB_NAME || "todo_app",
      dialect: process.env.DEV_DB_NAME || "mysql",
    },
    prod: {
      host: process.env.PROD_DB_HOST || "localhost",
      port: process.env.PROD_DB_PORT || 3306,
      user: process.env.PROD_DB_USER || "scott",
      password: process.env.PROD_DB_PASSWORD || "Password@123",
      name: process.env.PROD_DB_NAME || "todo_app",
      dialect: "mysql",
    },
    migrate: process.env.DB_MIGRATE === "true" || false,
  },
};

export default appConfig;
