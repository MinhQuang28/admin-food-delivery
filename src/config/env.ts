export const env = {
  MONGODB_URL: process.env.MONGODB_URL,
  PORT: process.env.PORT,
  secret: process.env.JWT_SECRET,
  accessExpirationMinutes: process.env.JWT_ACCESS_EXPIRATION_MINUTES,
  refreshExpirationDays: process.env.JWT_REFRESH_EXPIRATION_DAYS,
};
