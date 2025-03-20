import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

import { Role } from '../enums';

export class CreateUserDto {
  @ApiProperty({ example: 'Rasil', description: 'First name of the user' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  firstName: string;

  @ApiProperty({ example: 'Maharjan', description: 'Last name of the user' })
  @IsString()
  @IsOptional()
  @MinLength(3)
  lastName: string;

  @ApiProperty({ example: 'rasil@yopmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'Rasil@123' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
    message:
      'Minimum eight characters, at least one letter, one number and one special character.',
  })
  password: string;
}

export class CreateUserResponseDto {
  @Expose()
  @ApiProperty({ example: 'abcdef-abcdef-abcdef' })
  uuid: string;

  @Expose()
  @ApiProperty({ example: 'Rasil' })
  firstName: string;

  @Expose()
  @ApiProperty({ example: 'Maharjan' })
  lastName: string;

  @Expose()
  @ApiProperty({ example: 'Rasil@123' })
  email: string;

  @Expose()
  @ApiProperty({ example: '2024-04-24T12:00:00.000Z' })
  createdAt: Date;

  @Expose()
  @ApiProperty({ example: '2024-04-24T12:00:00.000Z' })
  updatedAt: Date;

  @Exclude()
  @ApiProperty({ example: 'Password' })
  password: string;

  @Expose()
  @ApiProperty({ enum: Role })
  role: Role;
}

export class LoginUserResponseDto {
  @Expose()
  @ApiProperty({ example: 'abcdef-ghijkl' })
  accessToken: string;
}
