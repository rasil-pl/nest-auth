import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({
  path: path.resolve('.env'),
});

export const config = {
  app: {
    port: process.env.PORT || 8000,
  },
  db: {
    connectionString:
      process.env.CONNECTION_STRING || 'mongodb://localhost:27017',
  },
  jwt: {
    secret: `${process.env.JWT_SECRET}`,
    accessTokenExpiry: process.env.ACCESS_TOKEN_EXPIRY,
    refreshTokenExpiry: process.env.REFRESH_TOKEN_EXPIRY,
  },
  auth0: {
    issuerUrl: process.env.AUTH0_ISSUER_URL,
    audience: process.env.AUTH0_AUDIENCE,
  },
  cloudindary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || '',
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET || '',
  },
};
