import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

import { config } from '../../../../config';

@Injectable()
export class CloudinaryService {
  signUrl() {
    const timestamp = Date.now();
    const signature = cloudinary.utils.api_sign_request(
      {
        upload_preset: 'default',
        timestamp,
      },
      config.cloudindary.apiSecret,
    );

    const uploadUrl = `https://api.cloudinary.com/v1_1/${config.cloudindary.cloudName}/image/upload?api_key=${config.cloudindary.apiKey}&timestamp=${timestamp}&signature=${signature}`;
    return {
      signature,
      uploadUrl,
      timestamp,
      apiKey: config.cloudindary.apiKey,
    };
  }
}
