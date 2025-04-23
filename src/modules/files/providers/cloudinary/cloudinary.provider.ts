import { Provider } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { config } from 'src/config';

export const CloudinaryProvider: Provider = {
  provide: 'CLOUDINARY',
  useFactory: () => {
    return cloudinary.config({
      cloud_name: config.cloudindary.cloudName,
      api_key: config.cloudindary.apiKey,
      api_secret: config.cloudindary.apiSecret,
    });
  },
};
