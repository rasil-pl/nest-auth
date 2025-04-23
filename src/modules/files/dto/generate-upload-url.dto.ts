import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class GenerateUploadUrlResponseDto {
  @Expose()
  @ApiProperty({
    example: 'https://placehold.co/128x128.png',
  })
  uploadUrl: string;
}
