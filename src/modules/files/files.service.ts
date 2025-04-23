import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { GenerateUploadUrlResponseDto } from './dto';
import { CloudinaryService } from './providers';

@Injectable()
export class FilesService {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  generateUploadUrl() {
    const response = this.cloudinaryService.signUrl();
    return plainToInstance(GenerateUploadUrlResponseDto, response, {
      excludeExtraneousValues: true,
    });
  }
}
