import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class DeleteProductResponseDto {
  @Expose()
  @ApiProperty({ example: '1cb43716-c96e-4d8c-9b5c-9290e311ae71' })
  uuid: string;

  @Expose()
  @ApiProperty({ example: 'Lenovo Legion' })
  name: string;
}
