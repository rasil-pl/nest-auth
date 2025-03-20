import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDto {
  @IsString()
  @IsNotEmpty()
  token: string;

  @IsDate()
  @IsNotEmpty()
  expiresAt: Date;

  @IsString()
  @IsNotEmpty()
  userId: string;
}
